const axios = require('axios');

const POSTHOG_HOST       = (process.env.POSTHOG_HOST || 'https://eu.posthog.com').replace(/\/$/, '');
// The PostHog query API requires a Personal API Key (phx_...). Accept the
// older POSTHOG_API_KEY name as a fallback for existing local deployments.
const POSTHOG_API_KEY    = (process.env.POSTHOG_PERSONAL_API_KEY || process.env.POSTHOG_API_KEY || '').trim();
const POSTHOG_PROJECT_ID = process.env.POSTHOG_PROJECT_ID;
const CACHE_TTL_MS       = Number(process.env.ANALYTICS_CACHE_TTL_MS) || 60 * 1000;

if (!POSTHOG_API_KEY) {
  console.warn('PostHog analytics is not configured: set POSTHOG_PERSONAL_API_KEY to a PostHog Personal API Key.');
}

const posthogClient = axios.create({
  baseURL: POSTHOG_HOST,
  headers: {
    Authorization: `Bearer ${POSTHOG_API_KEY}`,
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

const queryCache = new Map();

const runQuery = async (sql, name = 'analytics') => {
  const cached = queryCache.get(sql);
  if (cached && cached.expires > Date.now()) return cached.rows;

  const { data } = await posthogClient.post(`/api/projects/${POSTHOG_PROJECT_ID}/query/`, {
    query: { kind: 'HogQLQuery', query: sql },
    name,
  });

  const rows = data.results || [];
  queryCache.set(sql, { rows, expires: Date.now() + CACHE_TTL_MS });

  if (queryCache.size > 200) {
    const now = Date.now();
    for (const [key, value] of queryCache) {
      if (value.expires <= now) queryCache.delete(key);
    }
  }

  return rows;
};

const toNumber = (value) => {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
};

const clampLimit = (value, fallback) => {
  const n = Math.floor(Number(value));
  if (!Number.isFinite(n) || n <= 0) return fallback;
  return Math.min(n, 100);
};

const resolveTimeRange = (query) => {
  const now = Date.now();
  const thirtyDaysAgo = now - 30 * 24 * 60 * 60 * 1000;

  const startAt = Number(query.startAt);
  const endAt   = Number(query.endAt);

  const resolvedEnd   = Number.isFinite(endAt) && endAt > 0 ? endAt : now;
  const resolvedStart = Number.isFinite(startAt) && startAt > 0 ? startAt : thirtyDaysAgo;

  return resolvedStart < resolvedEnd
    ? { startAt: resolvedStart, endAt: resolvedEnd }
    : { startAt: resolvedEnd - 30 * 24 * 60 * 60 * 1000, endAt: resolvedEnd };
};

const previousRange = ({ startAt, endAt }) => {
  const duration = endAt - startAt;
  return { startAt: startAt - duration, endAt: startAt };
};

const rangeClause = (column, startAt, endAt) =>
  `${column} >= fromUnixTimestamp(${Math.floor(startAt / 1000)}) AND ${column} < fromUnixTimestamp(${Math.floor(endAt / 1000)})`;

const formatDuration = (totalSeconds) => {
  if (!totalSeconds || totalSeconds === 0) return '0m 0s';
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.round(totalSeconds % 60);
  return `${minutes}m ${seconds}s`;
};

const normalizeDevice = (type) => {
  if (!type) return 'Unknown';
  const map = { desktop: 'Desktop', mobile: 'Mobile', tablet: 'Tablet' };
  return map[String(type).toLowerCase()] || String(type);
};

const pctChange = (curr, prev) => {
  if (prev === 0) return curr > 0 ? 100 : 0;
  return Number((((curr - prev) / prev) * 100).toFixed(1));
};

const withPercentages = (items) => {
  const total = items.reduce((sum, item) => sum + item.visitors, 0);
  return items.map((item) => ({
    ...item,
    percentage: total > 0 ? Number(((item.visitors / total) * 100).toFixed(0)) : 0,
  }));
};

const fetchPeriodStats = async ({ startAt, endAt }) => {
  const eventsSql = `
    SELECT
      count() AS pageviews,
      uniq(person_id) AS visitors
    FROM events
    WHERE event = '$pageview'
      AND ${rangeClause('timestamp', startAt, endAt)}
  `;

  const sessionsSql = `
    SELECT
      count() AS sessions,
      countIf(\`$is_bounce\`) AS bounces,
      ifNull(avg(\`$session_duration\`), 0) AS avg_duration
    FROM sessions
    WHERE ${rangeClause('`$start_timestamp`', startAt, endAt)}
  `;

  const [eventsRows, sessionsRows] = await Promise.all([
    runQuery(eventsSql, 'overview-events'),
    runQuery(sessionsSql, 'overview-sessions'),
  ]);

  const [pageviews, visitors]           = eventsRows[0] || [0, 0];
  const [sessions, bounces, avgDuration] = sessionsRows[0] || [0, 0, 0];

  const sessionCount = toNumber(sessions);
  const bounceCount  = toNumber(bounces);

  return {
    pageviews:   toNumber(pageviews),
    visitors:    toNumber(visitors),
    sessions:    sessionCount,
    bounceRate:  sessionCount > 0 ? Number(((bounceCount / sessionCount) * 100).toFixed(1)) : 0,
    avgDuration: toNumber(avgDuration),
  };
};

const fetchOverview = async (range) => {
  const [current, previous] = await Promise.all([
    fetchPeriodStats(range),
    fetchPeriodStats(previousRange(range)),
  ]);

  return {
    pageViews: {
      value:  current.pageviews,
      change: pctChange(current.pageviews, previous.pageviews),
    },
    uniqueVisitors: {
      value:  current.visitors,
      change: pctChange(current.visitors, previous.visitors),
    },
    sessions: {
      value:  current.sessions,
      change: pctChange(current.sessions, previous.sessions),
    },
    bounceRate: {
      value:  `${current.bounceRate.toFixed(1)}%`,
      change: pctChange(current.bounceRate, previous.bounceRate),
    },
    avgDuration: {
      value:  formatDuration(current.avgDuration),
      change: pctChange(current.avgDuration, previous.avgDuration),
    },
  };
};

const fetchTopPages = async ({ startAt, endAt }, limit) => {
  const rows = await runQuery(`
    SELECT
      properties.$pathname AS path,
      count() AS views,
      uniq(person_id) AS visitors
    FROM events
    WHERE event = '$pageview'
      AND properties.$pathname IS NOT NULL
      AND ${rangeClause('timestamp', startAt, endAt)}
    GROUP BY path
    ORDER BY views DESC
    LIMIT ${limit}
  `, 'top-pages');

  return rows.map(([path, views, visitors]) => ({
    path,
    views:    toNumber(views),
    visitors: toNumber(visitors),
  }));
};

const fetchTopReferrers = async ({ startAt, endAt }, limit) => {
  const rows = await runQuery(`
    SELECT
      if(ifNull(properties.$referring_domain, '') IN ('', '$direct'), 'Direct', properties.$referring_domain) AS source,
      uniq(person_id) AS visitors,
      count() AS views
    FROM events
    WHERE event = '$pageview'
      AND ${rangeClause('timestamp', startAt, endAt)}
    GROUP BY source
    ORDER BY visitors DESC
    LIMIT ${limit}
  `, 'top-referrers');

  return rows.map(([source, visitors, views]) => ({
    source:   source || 'Direct',
    visitors: toNumber(visitors),
    views:    toNumber(views),
  }));
};

const fetchDevices = async ({ startAt, endAt }) => {
  const rows = await runQuery(`
    SELECT
      properties.$device_type AS device,
      uniq(person_id) AS visitors
    FROM events
    WHERE event = '$pageview'
      AND ${rangeClause('timestamp', startAt, endAt)}
    GROUP BY device
    ORDER BY visitors DESC
  `, 'device-breakdown');

  const merged = new Map();
  rows.forEach(([device, visitors]) => {
    const type = normalizeDevice(device);
    merged.set(type, (merged.get(type) || 0) + toNumber(visitors));
  });

  const order = ['Desktop', 'Mobile', 'Tablet'];
  const rank  = (type) => (order.includes(type) ? order.indexOf(type) : order.length);

  const devices = Array.from(merged, ([type, visitors]) => ({ type, visitors }))
    .sort((a, b) => rank(a.type) - rank(b.type) || b.visitors - a.visitors);

  return withPercentages(devices);
};

const fetchBreakdown = async ({ startAt, endAt }, property, label, limit) => {
  const rows = await runQuery(`
    SELECT
      properties.${property} AS name,
      uniq(person_id) AS visitors
    FROM events
    WHERE event = '$pageview'
      AND properties.${property} IS NOT NULL
      AND ${rangeClause('timestamp', startAt, endAt)}
    GROUP BY name
    ORDER BY visitors DESC
    LIMIT ${limit}
  `, label);

  return withPercentages(
    rows.map(([name, visitors]) => ({ name: name || 'Unknown', visitors: toNumber(visitors) }))
  );
};

const fetchCountries = async ({ startAt, endAt }, limit) => {
  const rows = await runQuery(`
    SELECT
      properties.$geoip_country_name AS country,
      properties.$geoip_country_code AS code,
      uniq(person_id) AS visitors
    FROM events
    WHERE event = '$pageview'
      AND properties.$geoip_country_name IS NOT NULL
      AND ${rangeClause('timestamp', startAt, endAt)}
    GROUP BY country, code
    ORDER BY visitors DESC
    LIMIT ${limit}
  `, 'top-countries');

  return withPercentages(
    rows.map(([country, code, visitors]) => ({
      country:  country || 'Unknown',
      code:     code || null,
      visitors: toNumber(visitors),
    }))
  );
};

const fetchCities = async ({ startAt, endAt }, limit) => {
  const rows = await runQuery(`
    SELECT
      properties.$geoip_city_name AS city,
      properties.$geoip_country_name AS country,
      uniq(person_id) AS visitors
    FROM events
    WHERE event = '$pageview'
      AND properties.$geoip_city_name IS NOT NULL
      AND properties.$geoip_city_name != ''
      AND ${rangeClause('timestamp', startAt, endAt)}
    GROUP BY city, country
    ORDER BY visitors DESC
    LIMIT ${limit}
  `, 'top-cities');

  return rows.map(([city, country, visitors]) => ({
    city,
    country: country || 'Unknown',
    visitors: toNumber(visitors),
  }));
};

const fetchTrend = async ({ startAt, endAt }) => {
  const hourly = endAt - startAt <= 2 * 24 * 60 * 60 * 1000;
  const bucket = hourly ? 'toStartOfHour(timestamp)' : 'toStartOfDay(timestamp)';

  const rows = await runQuery(`
    SELECT
      ${bucket} AS bucket,
      count() AS pageviews,
      uniq(person_id) AS visitors
    FROM events
    WHERE event = '$pageview'
      AND ${rangeClause('timestamp', startAt, endAt)}
    GROUP BY bucket
    ORDER BY bucket ASC
  `, 'traffic-trend');

  return {
    interval: hourly ? 'hour' : 'day',
    points: rows.map(([date, pageviews, visitors]) => ({
      date,
      pageviews: toNumber(pageviews),
      visitors:  toNumber(visitors),
    })),
  };
};

const getAnalyticsOverview = async (req, res) => {
  try {
    const range    = resolveTimeRange(req.query);
    const overview = await fetchOverview(range);
    return res.status(200).json(overview);
  } catch (error) {
    console.error('Analytics overview error:', error?.response?.data || error.message);
    return res.status(500).json({ message: 'Failed to fetch analytics overview.' });
  }
};

const getTopPages = async (req, res) => {
  try {
    const range = resolveTimeRange(req.query);
    const limit = clampLimit(req.query.limit, 5);
    const pages = await fetchTopPages(range, limit);
    return res.status(200).json({ pages });
  } catch (error) {
    console.error('Top pages error:', error?.response?.data || error.message);
    return res.status(500).json({ message: 'Failed to fetch top pages.' });
  }
};

const getTopReferrers = async (req, res) => {
  try {
    const range     = resolveTimeRange(req.query);
    const limit     = clampLimit(req.query.limit, 4);
    const referrers = await fetchTopReferrers(range, limit);
    return res.status(200).json({ referrers });
  } catch (error) {
    console.error('Top referrers error:', error?.response?.data || error.message);
    return res.status(500).json({ message: 'Failed to fetch top referrers.' });
  }
};

const getDeviceBreakdown = async (req, res) => {
  try {
    const range   = resolveTimeRange(req.query);
    const devices = await fetchDevices(range);
    return res.status(200).json({ devices });
  } catch (error) {
    console.error('Device breakdown error:', error?.response?.data || error.message);
    return res.status(500).json({ message: 'Failed to fetch device breakdown.' });
  }
};

const getBrowserBreakdown = async (req, res) => {
  try {
    const range    = resolveTimeRange(req.query);
    const limit    = clampLimit(req.query.limit, 6);
    const browsers = await fetchBreakdown(range, '$browser', 'browser-breakdown', limit);
    return res.status(200).json({ browsers });
  } catch (error) {
    console.error('Browser breakdown error:', error?.response?.data || error.message);
    return res.status(500).json({ message: 'Failed to fetch browser breakdown.' });
  }
};

const getOsBreakdown = async (req, res) => {
  try {
    const range = resolveTimeRange(req.query);
    const limit = clampLimit(req.query.limit, 6);
    const os    = await fetchBreakdown(range, '$os', 'os-breakdown', limit);
    return res.status(200).json({ os });
  } catch (error) {
    console.error('OS breakdown error:', error?.response?.data || error.message);
    return res.status(500).json({ message: 'Failed to fetch operating system breakdown.' });
  }
};

const getTopCountries = async (req, res) => {
  try {
    const range     = resolveTimeRange(req.query);
    const limit     = clampLimit(req.query.limit, 5);
    const countries = await fetchCountries(range, limit);
    return res.status(200).json({ countries });
  } catch (error) {
    console.error('Top countries error:', error?.response?.data || error.message);
    return res.status(500).json({ message: 'Failed to fetch top countries.' });
  }
};

const getLocations = async (req, res) => {
  try {
    const range = resolveTimeRange(req.query);
    const limit = clampLimit(req.query.limit, 100);
    const [countries, cities] = await Promise.all([
      fetchCountries(range, limit),
      fetchCities(range, limit),
    ]);
    return res.status(200).json({ countries, cities });
  } catch (error) {
    console.error('Locations error:', error?.response?.data || error.message);
    return res.status(500).json({ message: 'Failed to fetch analytics locations.' });
  }
};

const getTrafficTrend = async (req, res) => {
  try {
    const range = resolveTimeRange(req.query);
    const trend = await fetchTrend(range);
    return res.status(200).json(trend);
  } catch (error) {
    console.error('Traffic trend error:', error?.response?.data || error.message);
    return res.status(500).json({ message: 'Failed to fetch traffic trend.' });
  }
};

const getDashboardSummary = async (req, res) => {
  try {
    const range          = resolveTimeRange(req.query);
    const pagesLimit     = clampLimit(req.query.pagesLimit, 5);
    const referrersLimit = clampLimit(req.query.referrersLimit, 4);
    const countriesLimit = clampLimit(req.query.countriesLimit, 5);
    const browsersLimit  = clampLimit(req.query.browsersLimit, 6);
    const osLimit        = clampLimit(req.query.osLimit, 6);

    const [
      overviewRes,
      pagesRes,
      referrersRes,
      devicesRes,
      countriesRes,
      browsersRes,
      osRes,
      trendRes,
    ] = await Promise.allSettled([
      fetchOverview(range),
      fetchTopPages(range, pagesLimit),
      fetchTopReferrers(range, referrersLimit),
      fetchDevices(range),
      fetchCountries(range, countriesLimit),
      fetchBreakdown(range, '$browser', 'browser-breakdown', browsersLimit),
      fetchBreakdown(range, '$os', 'os-breakdown', osLimit),
      fetchTrend(range),
    ]);

    const settledValue = (result, fallback) => {
      if (result.status === 'fulfilled') return result.value;
      console.error('Dashboard summary partial error:', result.reason?.response?.data || result.reason?.message);
      return fallback;
    };

    return res.status(200).json({
      overview:  settledValue(overviewRes, null),
      pages:     settledValue(pagesRes, []),
      referrers: settledValue(referrersRes, []),
      devices:   settledValue(devicesRes, []),
      countries: settledValue(countriesRes, []),
      browsers:  settledValue(browsersRes, []),
      os:        settledValue(osRes, []),
      trend:     settledValue(trendRes, { interval: 'day', points: [] }),
    });
  } catch (error) {
    console.error('Dashboard summary error:', error?.response?.data || error.message);
    return res.status(500).json({ message: 'Failed to fetch dashboard summary.' });
  }
};

const getTodayVisitors = async (req, res) => {
  try {
    const now           = Date.now();
    const todayMidnight = new Date();
    todayMidnight.setHours(0, 0, 0, 0);
    const startAt = todayMidnight.getTime();

    const rows = await runQuery(`
      SELECT uniq(person_id) AS visitors
      FROM events
      WHERE event = '$pageview'
        AND ${rangeClause('timestamp', startAt, now)}
    `, 'today-visitors');

    const visitors = toNumber(rows[0]?.[0]);

    return res.status(200).json({ visitors, date: todayMidnight.toISOString().split('T')[0] });
  } catch (error) {
    console.error('Today visitors error:', error?.response?.data || error.message);
    return res.status(500).json({ message: 'Failed to fetch today\'s visitors.' });
  }
};

const getLiveVisitors = async (req, res) => {
  try {
    const rows = await runQuery(`
      SELECT uniq(person_id) AS visitors
      FROM events
      WHERE timestamp >= now() - INTERVAL 5 MINUTE
    `, 'live-visitors');

    return res.status(200).json({ visitors: toNumber(rows[0]?.[0]) });
  } catch (error) {
    console.error('Live visitors error:', error?.response?.data || error.message);
    return res.status(500).json({ message: 'Failed to fetch live visitors.' });
  }
};

module.exports = {
  getAnalyticsOverview,
  getTopPages,
  getTopReferrers,
  getDeviceBreakdown,
  getBrowserBreakdown,
  getOsBreakdown,
  getTopCountries,
  getLocations,
  getTrafficTrend,
  getDashboardSummary,
  getTodayVisitors,
  getLiveVisitors,
};
