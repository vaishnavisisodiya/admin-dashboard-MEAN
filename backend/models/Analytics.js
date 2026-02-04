const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  totalUsers: {
    type: Number,
    default: 0
  },
  activeUsers: {
    type: Number,
    default: 0
  },
  newSignups: {
    type: Number,
    default: 0
  },
  totalSales: {
    type: Number,
    default: 0
  },
  revenue: {
    type: Number,
    default: 0
  },
  conversionRate: {
    type: Number,
    default: 0
  },
  // Additional metrics
  pageViews: {
    type: Number,
    default: 0
  },
  bounceRate: {
    type: Number,
    default: 0
  },
  avgSessionDuration: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});


analyticsSchema.index({ date: -1 });

module.exports = mongoose.model('Analytics', analyticsSchema);
