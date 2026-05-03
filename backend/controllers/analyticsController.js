const axios = require('axios');
const UMAMI_BASE = process.env.UMAMI_API_URL || 'https://api.umami.is/v1';
const UMAMI_KEY  = process.env.UMAMI_API_KEY;
const WEBSITE_ID = process.env.UMAMI_WEBSITE_ID;

console.log('UMAMI_BASE:', UMAMI_BASE);
console.log('UMAMI_KEY:', UMAMI_KEY);
console.log('WEBSITE_ID:', WEBSITE_ID);

const umamiClient = axios.create({
  baseURL: UMAMI_BASE,
  headers: {
    'x-umami-api-key': UMAMI_KEY,
  },
});
const resolveTimeRange = (query) => {
  const now = Date.now();
  const thirtyDaysAgo = now - 30 * 24 * 60 * 60 * 1000;

  return {
    startAt: query.startAt ? Number(query.startAt) : thirtyDaysAgo,
    endAt:   query.endAt   ? Number(query.endAt)   : now,
  };
};

const formatDuration = (totalSeconds) => {
  if (!totalSeconds || totalSeconds === 0) return '0m 0s';
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.round(totalSeconds % 60);
  return `${minutes}m ${seconds}s`;
};


const normalizeDevice = (type) => {
  const map = { desktop: 'Desktop', mobile: 'Mobile', tablet: 'Tablet' };
  return map[type?.toLowerCase()] || type;
};

const getAnalyticsOverview = async (req, res) => {
  try {
    const { startAt, endAt } = resolveTimeRange(req.query);

    const { data } = await umamiClient.get(`/websites/${WEBSITE_ID}/stats`, {
      params: { startAt, endAt },
    });

    const pageviews       = data.pageviews?.value   ?? 0;
    const prevPageviews   = data.pageviews?.prev     ?? 0;
    const visitors        = data.visitors?.value     ?? 0;
    const prevVisitors    = data.visitors?.prev      ?? 0;
    const visits          = data.visits?.value       ?? 0;      
    const prevVisits      = data.visits?.prev        ?? 0;
    const bounces         = data.bounces?.value      ?? 0;
    const prevBounces     = data.bounces?.prev       ?? 0;
    const totalTime       = data.totaltime?.value    ?? 0;    
    const prevTotalTime   = data.totaltime?.prev     ?? 0;

    const bounceRate     = visits > 0 ? ((bounces / visits) * 100).toFixed(1) : '0.0';
    const prevBounceRate = prevVisits > 0 ? ((prevBounces / prevVisits) * 100).toFixed(1) : '0.0';

    const avgDuration     = visits > 0 ? totalTime / visits : 0;
    const prevAvgDuration = prevVisits > 0 ? prevTotalTime / prevVisits : 0;

   
    const pctChange = (curr, prev) => {
      if (prev === 0) return curr > 0 ? 100 : 0;
      return Number((((curr - prev) / prev) * 100).toFixed(1));
    };

    return res.status(200).json({
      pageViews: {
        value: pageviews,
        change: pctChange(pageviews, prevPageviews),
      },
      uniqueVisitors: {
        value: visitors,
        change: pctChange(visitors, prevVisitors),
      },
      sessions: {
        value: visits,
        change: pctChange(visits, prevVisits),
      },
      bounceRate: {
        value: `${bounceRate}%`,
        change: pctChange(Number(bounceRate), Number(prevBounceRate)),
      },
      avgDuration: {
        value: formatDuration(avgDuration),
        change: pctChange(avgDuration, prevAvgDuration),
      },
    });
  } catch (error) {
    console.error('Analytics overview error:', error?.response?.data || error.message);
    return res.status(500).json({ message: 'Failed to fetch analytics overview.' });
  }
};

const getTopPages = async (req, res) => {
  try {
    const { startAt, endAt } = resolveTimeRange(req.query);
    const limit = Number(req.query.limit) || 5;

    const { data } = await umamiClient.get(`/websites/${WEBSITE_ID}/metrics`, {
      params: { startAt, endAt, type: 'url', limit },
    });

    const pages = data.map((item) => ({
      path:  item.x,
      views: item.y,
    }));

    return res.status(200).json({ pages });
  } catch (error) {
    console.error('Top pages error:', error?.response?.data || error.message);
    return res.status(500).json({ message: 'Failed to fetch top pages.' });
  }
};

const getTopReferrers = async (req, res) => {
  try {
    const { startAt, endAt } = resolveTimeRange(req.query);
    const limit = Number(req.query.limit) || 4;

    const { data } = await umamiClient.get(`/websites/${WEBSITE_ID}/metrics`, {
      params: { startAt, endAt, type: 'referrer', limit },
    });

    const referrers = data.map((item) => ({
      source:  item.x || 'Direct',
      visitors: item.y,
    }));

    return res.status(200).json({ referrers });
  } catch (error) {
    console.error('Top referrers error:', error?.response?.data || error.message);
    return res.status(500).json({ message: 'Failed to fetch top referrers.' });
  }
};

const getDeviceBreakdown = async (req, res) => {
  try {
    const { startAt, endAt } = resolveTimeRange(req.query);

    const { data } = await umamiClient.get(`/websites/${WEBSITE_ID}/metrics`, {
      params: { startAt, endAt, type: 'device' },
    });

    // Calculate total to derive percentages
    const total = data.reduce((sum, item) => sum + item.y, 0);

    const devices = data.map((item) => ({
      type:       normalizeDevice(item.x),
      visitors:   item.y,
      percentage: total > 0 ? Number(((item.y / total) * 100).toFixed(0)) : 0,
    }));
    const order = ['Desktop', 'Mobile', 'Tablet'];
    devices.sort((a, b) => order.indexOf(a.type) - order.indexOf(b.type));

    return res.status(200).json({ devices });
  } catch (error) {
    console.error('Device breakdown error:', error?.response?.data || error.message);
    return res.status(500).json({ message: 'Failed to fetch device breakdown.' });
  }
};

const getDashboardSummary = async (req, res) => {
  try {
    const { startAt, endAt } = resolveTimeRange(req.query);
    const pagesLimit     = Number(req.query.pagesLimit)     || 5;
    const referrersLimit = Number(req.query.referrersLimit) || 4;

    const [statsRes, pagesRes, referrersRes, devicesRes] = await Promise.allSettled([
      umamiClient.get(`/websites/${WEBSITE_ID}/stats`, {
        params: { startAt, endAt },
      }),
      umamiClient.get(`/websites/${WEBSITE_ID}/metrics`, {
        params: { startAt, endAt, type: 'url', limit: pagesLimit },
      }),
      umamiClient.get(`/websites/${WEBSITE_ID}/metrics`, {
        params: { startAt, endAt, type: 'referrer', limit: referrersLimit },
      }),
      umamiClient.get(`/websites/${WEBSITE_ID}/metrics`, {
        params: { startAt, endAt, type: 'device' },
      }),
    ]);

   
    let overview = null;
    if (statsRes.status === 'fulfilled') {
      const d = statsRes.value.data;

      const pageviews       = d.pageviews?.value  ?? 0;
      const prevPageviews   = d.pageviews?.prev   ?? 0;
      const visitors        = d.visitors?.value   ?? 0;
      const prevVisitors    = d.visitors?.prev    ?? 0;
      const visits          = d.visits?.value     ?? 0;
      const prevVisits      = d.visits?.prev      ?? 0;
      const bounces         = d.bounces?.value    ?? 0;
      const prevBounces     = d.bounces?.prev     ?? 0;
      const totalTime       = d.totaltime?.value  ?? 0;
      const prevTotalTime   = d.totaltime?.prev   ?? 0;

      const bounceRate     = visits > 0 ? ((bounces / visits) * 100).toFixed(1) : '0.0';
      const prevBounceRate = prevVisits > 0 ? ((prevBounces / prevVisits) * 100).toFixed(1) : '0.0';
      const avgDuration     = visits > 0 ? totalTime / visits : 0;
      const prevAvgDuration = prevVisits > 0 ? prevTotalTime / prevVisits : 0;

      const pctChange = (curr, prev) => {
        if (prev === 0) return curr > 0 ? 100 : 0;
        return Number((((curr - prev) / prev) * 100).toFixed(1));
      };

      overview = {
        pageViews:      { value: pageviews,              change: pctChange(pageviews, prevPageviews) },
        uniqueVisitors: { value: visitors,               change: pctChange(visitors, prevVisitors) },
        sessions:       { value: visits,                 change: pctChange(visits, prevVisits) },
        bounceRate:     { value: `${bounceRate}%`,       change: pctChange(Number(bounceRate), Number(prevBounceRate)) },
        avgDuration:    { value: formatDuration(avgDuration), change: pctChange(avgDuration, prevAvgDuration) },
      };
    }

    
    const pages = pagesRes.status === 'fulfilled'
      ? pagesRes.value.data.map((item) => ({ path: item.x, views: item.y }))
      : [];

    const referrers = referrersRes.status === 'fulfilled'
      ? referrersRes.value.data.map((item) => ({ source: item.x || 'Direct', visitors: item.y }))
      : [];

    let devices = [];
    if (devicesRes.status === 'fulfilled') {
      const raw   = devicesRes.value.data;
      const total = raw.reduce((sum, item) => sum + item.y, 0);
      const order = ['Desktop', 'Mobile', 'Tablet'];
      devices = raw
        .map((item) => ({
          type:       normalizeDevice(item.x),
          visitors:   item.y,
          percentage: total > 0 ? Number(((item.y / total) * 100).toFixed(0)) : 0,
        }))
        .sort((a, b) => order.indexOf(a.type) - order.indexOf(b.type));
    }

    return res.status(200).json({ overview, pages, referrers, devices });
  } catch (error) {
    console.error('Dashboard summary error:', error?.response?.data || error.message);
    return res.status(500).json({ message: 'Failed to fetch dashboard summary.' });
  }
};


module.exports = {
  getAnalyticsOverview,
  getTopPages,
  getTopReferrers,
  getDeviceBreakdown,
  getDashboardSummary,
};
