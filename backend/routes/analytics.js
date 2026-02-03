const express = require('express');
const router = express.Router();
const Analytics = require('../models/Analytics');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

// All routes are protected
router.use(protect);

// @route   GET /api/analytics/dashboard
// @desc    Get dashboard overview statistics
// @access  Private
router.get('/dashboard', async (req, res) => {
  try {
    // Get latest analytics data
    const latestAnalytics = await Analytics.findOne().sort({ date: -1 });

    // Get real user counts
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ isActive: true });

    // Calculate new signups in last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const newSignups = await User.countDocuments({
      createdAt: { $gte: thirtyDaysAgo }
    });

    // Get analytics data for last 7 days for trend
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const weekData = await Analytics.find({
      date: { $gte: sevenDaysAgo }
    }).sort({ date: 1 });

    // Calculate trends
    const calculateTrend = (data, field) => {
      if (data.length < 2) return 0;
      const latest = data[data.length - 1][field];
      const previous = data[0][field];
      return previous === 0 ? 0 : ((latest - previous) / previous * 100).toFixed(1);
    };

    res.status(200).json({
      success: true,
      data: {
        overview: {
          totalUsers,
          activeUsers,
          newSignups,
          totalSales: latestAnalytics ? latestAnalytics.totalSales : 0,
          revenue: latestAnalytics ? latestAnalytics.revenue : 0,
          conversionRate: latestAnalytics ? latestAnalytics.conversionRate : 0
        },
        trends: {
          usersTrend: calculateTrend(weekData, 'totalUsers'),
          salesTrend: calculateTrend(weekData, 'totalSales'),
          revenueTrend: calculateTrend(weekData, 'revenue')
        },
        recentActivity: weekData
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching dashboard data',
      error: error.message
    });
  }
});

// @route   GET /api/analytics/sales
// @desc    Get sales data for charts
// @access  Private
router.get('/sales', async (req, res) => {
  try {
    const { period = '30' } = req.query;
    
    const daysAgo = new Date();
    daysAgo.setDate(daysAgo.getDate() - parseInt(period));

    const salesData = await Analytics.find({
      date: { $gte: daysAgo }
    }).sort({ date: 1 }).select('date totalSales revenue');

    res.status(200).json({
      success: true,
      data: salesData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching sales data',
      error: error.message
    });
  }
});

// @route   GET /api/analytics/users
// @desc    Get user growth data
// @access  Private
router.get('/users', async (req, res) => {
  try {
    const { period = '90' } = req.query;
    
    const daysAgo = new Date();
    daysAgo.setDate(daysAgo.getDate() - parseInt(period));

    const userData = await Analytics.find({
      date: { $gte: daysAgo }
    }).sort({ date: 1 }).select('date totalUsers activeUsers newSignups');

    res.status(200).json({
      success: true,
      data: userData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching user data',
      error: error.message
    });
  }
});

// @route   GET /api/analytics/revenue
// @desc    Get revenue breakdown
// @access  Private
router.get('/revenue', async (req, res) => {
  try {
    const { period = '30' } = req.query;
    
    const daysAgo = new Date();
    daysAgo.setDate(daysAgo.getDate() - parseInt(period));

    const revenueData = await Analytics.find({
      date: { $gte: daysAgo }
    }).sort({ date: 1 }).select('date revenue totalSales conversionRate');

    // Calculate revenue breakdown by category (sample data)
    const totalRevenue = revenueData.reduce((sum, item) => sum + item.revenue, 0);
    
    const breakdown = {
      products: (totalRevenue * 0.6).toFixed(2),
      services: (totalRevenue * 0.25).toFixed(2),
      subscriptions: (totalRevenue * 0.15).toFixed(2)
    };

    res.status(200).json({
      success: true,
      data: {
        timeline: revenueData,
        breakdown,
        total: totalRevenue.toFixed(2)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching revenue data',
      error: error.message
    });
  }
});

// @route   GET /api/analytics/monthly
// @desc    Get monthly analytics summary
// @access  Private
router.get('/monthly', async (req, res) => {
  try {
    const { months = '12' } = req.query;
    
    const monthsAgo = new Date();
    monthsAgo.setMonth(monthsAgo.getMonth() - parseInt(months));

    const monthlyData = await Analytics.aggregate([
      {
        $match: {
          date: { $gte: monthsAgo }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$date' },
            month: { $month: '$date' }
          },
          totalUsers: { $avg: '$totalUsers' },
          totalSales: { $sum: '$totalSales' },
          totalRevenue: { $sum: '$revenue' },
          avgConversion: { $avg: '$conversionRate' }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 }
      }
    ]);

    res.status(200).json({
      success: true,
      data: monthlyData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching monthly data',
      error: error.message
    });
  }
});

// @route   POST /api/analytics
// @desc    Create new analytics entry (for testing)
// @access  Private/Admin
router.post('/', async (req, res) => {
  try {
    const analytics = await Analytics.create(req.body);

    res.status(201).json({
      success: true,
      data: analytics
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating analytics',
      error: error.message
    });
  }
});

module.exports = router;
