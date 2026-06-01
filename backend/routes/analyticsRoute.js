const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
  getAnalyticsOverview,
  getTopPages,
  getTopReferrers,
  getDeviceBreakdown,
  getDashboardSummary,
  getTodayVisitors,
} = require('../controllers/analyticsController');

router.use(authMiddleware);



router.get('/overview', getAnalyticsOverview);
router.get('/top-pages', getTopPages);
router.get('/top-referrers', getTopReferrers);
router.get('/devices', getDeviceBreakdown);
router.get('/dashboard', getDashboardSummary);
router.get('/today-visitors', getTodayVisitors);

module.exports = router;