const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
  getAnalyticsOverview,
  getTopPages,
  getTopReferrers,
  getDeviceBreakdown,
  getBrowserBreakdown,
  getOsBreakdown,
  getTopCountries,
  getTrafficTrend,
  getDashboardSummary,
  getTodayVisitors,
  getLiveVisitors,
} = require('../controllers/analyticsController');

router.use(authMiddleware);

router.get('/overview', getAnalyticsOverview);
router.get('/top-pages', getTopPages);
router.get('/top-referrers', getTopReferrers);
router.get('/devices', getDeviceBreakdown);
router.get('/browsers', getBrowserBreakdown);
router.get('/os', getOsBreakdown);
router.get('/countries', getTopCountries);
router.get('/trend', getTrafficTrend);
router.get('/dashboard', getDashboardSummary);
router.get('/today-visitors', getTodayVisitors);
router.get('/live-visitors', getLiveVisitors);

module.exports = router;