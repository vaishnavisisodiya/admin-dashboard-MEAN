const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    await seedInitialData();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const seedInitialData = async () => {
  const User = require('../models/User');
  const Analytics = require('../models/Analytics');

  try {
    const adminExists = await User.findOne({ email: 'admin@admin.com' });
    
    if (!adminExists) {
      console.log('Creating initial admin user...');
      await User.create({
        name: 'Admin User',
        email: 'admin@admin.com',
        password: 'admin123',
        role: 'admin',
        isActive: true
      });
      console.log('Admin user created successfully');
    }

    const userExists = await User.findOne({ email: 'user@user.com' });
    
    if (!userExists) {
      console.log('Creating initial regular user...');
      await User.create({
        name: 'Regular User',
        email: 'user@user.com',
        password: 'user123',
        role: 'user',
        isActive: true
      });
      console.log('Regular user created successfully');
    }

    const analyticsExists = await Analytics.findOne();
    
    if (!analyticsExists) {
      console.log('Creating initial analytics data...');
      
     
      const currentDate = new Date();
      const analyticsData = [];
      
      for (let i = 11; i >= 0; i--) {
        const date = new Date(currentDate);
        date.setMonth(date.getMonth() - i);
        
        analyticsData.push({
          date: date,
          totalUsers: Math.floor(Math.random() * 500) + 100,
          activeUsers: Math.floor(Math.random() * 300) + 50,
          newSignups: Math.floor(Math.random() * 50) + 10,
          totalSales: Math.floor(Math.random() * 1000) + 200,
          revenue: Math.floor(Math.random() * 50000) + 10000,
          conversionRate: (Math.random() * 5 + 2).toFixed(2)
        });
      }
      
      await Analytics.insertMany(analyticsData);
      console.log('Analytics data created successfully');
    }
  } catch (error) {
    console.log('Seed data already exists or error:', error.message);
  }
};

module.exports = connectDB;
