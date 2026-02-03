# Admin Dashboard with Analytics & Reporting (MEAN Stack)

## Project Overview

A complete admin dashboard built with MongoDB, Express.js, Angular, and Node.js featuring real-time analytics, data visualization, user management, and secure authentication.

## Features

### Core Features
✅ **Responsive Design** - Works on desktop, tablet, and mobile
✅ **Secure Authentication** - JWT-based authentication with role-based access control
✅ **Real-time Analytics** - Live charts and graphs showing business metrics
✅ **User Management** - Admin controls to manage users
✅ **Data Visualization** - Interactive charts using Chart.js
✅ **Dashboard Metrics** - Active users, sign-ups, sales, revenue tracking

### Tech Stack
- **Frontend**: Angular 17
- **Backend**: Node.js + Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Charts**: Chart.js
- **Styling**: Custom CSS with modern design

## Prerequisites

Before running this project, make sure you have the following installed:

### Required Software Versions
- **Node.js**: v18.x or higher (LTS recommended)
- **npm**: v9.x or higher (comes with Node.js)
- **MongoDB**: v6.x or higher
- **Angular CLI**: v17.x

### Check Your Versions
```bash
node --version    # Should show v18.x or higher
npm --version     # Should show v9.x or higher
mongo --version   # Should show v6.x or higher
ng version        # Should show Angular CLI 17.x
```

## Installation Guide

### Step 1: Install Node.js and npm
1. Download Node.js from: https://nodejs.org/
2. Install the LTS version (includes npm)
3. Verify installation:
   ```bash
   node --version
   npm --version
   ```

### Step 2: Install MongoDB
**Option A: MongoDB Community Edition (Local)**
1. Download from: https://www.mongodb.com/try/download/community
2. Follow installation instructions for your OS
3. Start MongoDB service:
   ```bash
   # On Windows
   net start MongoDB
   
   # On macOS/Linux
   brew services start mongodb-community
   # OR
   sudo systemctl start mongod
   ```

**Option B: MongoDB Atlas (Cloud - Recommended for beginners)**
1. Create free account at: https://www.mongodb.com/cloud/atlas
2. Create a cluster (Free tier available)
3. Get connection string and update in backend/.env file

### Step 3: Install Angular CLI
```bash
npm install -g @angular/cli@17
```

### Step 4: Extract and Setup Project
1. Extract the admin-dashboard-mean.zip file
2. Open terminal/command prompt in the extracted folder

## Running the Project

### Method 1: Quick Start (Both Frontend & Backend Together)

1. **Navigate to project root:**
   ```bash
   cd admin-dashboard-mean
   ```

2. **Install all dependencies:**
   ```bash
   # Install backend dependencies
   cd backend
   npm install
   
   # Install frontend dependencies
   cd ../frontend
   npm install
   cd ..
   ```

3. **Configure MongoDB connection:**
   - Open `backend/.env` file
   - Update MongoDB connection string if needed:
     ```
     MONGODB_URI=mongodb://localhost:27017/admin-dashboard
     # OR for MongoDB Atlas:
     # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/admin-dashboard
     ```

4. **Start Backend Server:**
   ```bash
   cd backend
   npm start
   ```
   - Backend will run on: http://localhost:3000
   - Keep this terminal window open

5. **Start Frontend (in a new terminal):**
   ```bash
   cd frontend
   npm start
   # OR
   ng serve
   ```
   - Frontend will run on: http://localhost:4200
   - Keep this terminal window open

6. **Access the Application:**
   - Open browser and go to: http://localhost:4200

### Method 2: Step by Step (Recommended for Learning)

#### Backend Setup (Terminal 1)
```bash
# Step 1: Go to backend folder
cd backend

# Step 2: Install dependencies
npm install

# Step 3: Start MongoDB (if not running)
# Check if MongoDB is running
mongosh
# If not running, start it based on your OS

# Step 4: Start backend server
npm start

# You should see: "Server running on port 3000" and "MongoDB Connected"
```

#### Frontend Setup (Terminal 2 - Keep backend running)
```bash
# Step 1: Go to frontend folder (from project root)
cd frontend

# Step 2: Install dependencies
npm install

# Step 3: Start Angular development server
npm start
# OR
ng serve

# You should see: "Angular Live Development Server is listening on localhost:4200"
```

## Default Login Credentials

### Admin Account
- **Email**: admin@admin.com
- **Password**: admin123

### Regular User Account
- **Email**: user@user.com
- **Password**: user123

## Project Structure

```
admin-dashboard-mean/
│
├── backend/                    # Node.js + Express Backend
│   ├── config/                # Configuration files
│   │   └── db.js             # MongoDB connection
│   ├── models/               # Mongoose models
│   │   ├── User.js          # User model
│   │   └── Analytics.js     # Analytics model
│   ├── routes/              # API routes
│   │   ├── auth.js         # Authentication routes
│   │   ├── users.js        # User management routes
│   │   └── analytics.js    # Analytics routes
│   ├── middleware/          # Custom middleware
│   │   └── auth.js         # JWT authentication middleware
│   ├── .env                # Environment variables
│   ├── server.js           # Main server file
│   └── package.json        # Backend dependencies
│
├── frontend/                  # Angular Frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/        # Angular components
│   │   │   │   ├── login/        # Login page
│   │   │   │   ├── dashboard/    # Main dashboard
│   │   │   │   ├── analytics/    # Analytics page
│   │   │   │   └── users/        # User management
│   │   │   ├── services/         # Angular services
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── user.service.ts
│   │   │   │   └── analytics.service.ts
│   │   │   ├── guards/           # Route guards
│   │   │   │   └── auth.guard.ts
│   │   │   └── app.routes.ts     # Application routes
│   │   ├── styles.css           # Global styles
│   │   └── index.html          # Main HTML file
│   └── package.json           # Frontend dependencies
│
└── README.md                 # This file
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (requires token)

### User Management (Admin only)
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Analytics
- `GET /api/analytics/dashboard` - Get dashboard statistics
- `GET /api/analytics/sales` - Get sales data
- `GET /api/analytics/users` - Get user statistics
- `GET /api/analytics/revenue` - Get revenue data

## Features Explained (Simple Terms)

### 1. Authentication (Login System)
- Users can create accounts and login
- Passwords are encrypted (hashed) for security
- JWT tokens are used to keep users logged in
- Admin and regular users have different permissions

### 2. Dashboard
- Shows overview of important metrics
- Cards displaying: Total Users, Active Users, Total Sales, Revenue
- Real-time data updates

### 3. Analytics Page
- Interactive charts showing business data
- Sales over time (line chart)
- User growth (bar chart)
- Revenue distribution (pie chart)
- Uses Chart.js library for visualizations

### 4. User Management (Admin Only)
- View all registered users
- Edit user details
- Delete users
- See user roles and status

### 5. Responsive Design
- Works on desktop (large screens)
- Works on tablets (medium screens)
- Works on mobile phones (small screens)

## Troubleshooting

### MongoDB Connection Issues
**Problem**: "MongoNetworkError" or "connection refused"
**Solution**:
1. Make sure MongoDB service is running
2. Check connection string in `backend/.env`
3. For local MongoDB: Use `mongodb://localhost:27017/admin-dashboard`
4. For Atlas: Use connection string from MongoDB Atlas dashboard

### Port Already in Use
**Problem**: "Port 3000 already in use" or "Port 4200 already in use"
**Solution**:
```bash
# Find and kill process on port 3000 (backend)
# On Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# On macOS/Linux:
lsof -ti:3000 | xargs kill -9

# Find and kill process on port 4200 (frontend)
# On Windows:
netstat -ano | findstr :4200
taskkill /PID <PID> /F

# On macOS/Linux:
lsof -ti:4200 | xargs kill -9
```

### npm install fails
**Problem**: Dependencies fail to install
**Solution**:
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Install again
npm install
```

### Angular CLI not found
**Problem**: "ng: command not found"
**Solution**:
```bash
# Install Angular CLI globally
npm install -g @angular/cli@17

# Verify installation
ng version
```

## Development Tips

### Hot Reload
- **Backend**: Uses nodemon - saves in files automatically restart server
- **Frontend**: Angular's dev server - saves automatically reload browser

### Testing the API
Use Postman or cURL to test API endpoints:
```bash
# Login example
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@admin.com","password":"admin123"}'

# Get dashboard data (replace TOKEN with actual JWT token)
curl -X GET http://localhost:3000/api/analytics/dashboard \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Adding New Features
1. **Backend**: Add route in `backend/routes/`
2. **Backend**: Add model in `backend/models/` if needed
3. **Frontend**: Add service in `frontend/src/app/services/`
4. **Frontend**: Add component in `frontend/src/app/components/`

## Browser Compatibility
- ✅ Chrome (Recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ⚠️ Internet Explorer (Not supported)

## Production Deployment

### Backend Deployment (Node.js)
1. Set environment variables on hosting platform
2. Use `npm start` or `node server.js`
3. Recommended platforms: Heroku, AWS, DigitalOcean, Render

### Frontend Deployment (Angular)
```bash
cd frontend
ng build --configuration production
```
- Deploy `dist/` folder to: Netlify, Vercel, AWS S3, Firebase Hosting

### Database Deployment
- Use MongoDB Atlas (free tier available)
- Or deploy MongoDB on cloud server

## Security Best Practices

1. **Never commit `.env` file** - Contains sensitive information
2. **Use strong passwords** - In production
3. **Enable HTTPS** - For production deployment
4. **Rate limiting** - Prevent abuse of API endpoints
5. **Input validation** - Always validate user inputs
6. **Keep dependencies updated** - Run `npm audit` regularly

## Performance Optimization

1. **Enable caching** - Cache frequently accessed data
2. **Use indexes** - MongoDB indexes for faster queries
3. **Lazy loading** - Load components only when needed
4. **Image optimization** - Compress images
5. **Minification** - Production builds are automatically minified

## Support & Resources

### Official Documentation
- [Node.js Documentation](https://nodejs.org/docs/)
- [Express.js Guide](https://expressjs.com/)
- [Angular Documentation](https://angular.io/docs)
- [MongoDB Manual](https://docs.mongodb.com/)

### Learning Resources
- [MongoDB University](https://university.mongodb.com/) - Free courses
- [Angular Tutorial](https://angular.io/tutorial)
- [Express.js Tutorial](https://expressjs.com/en/starter/installing.html)

## License
This project is for educational purposes.

## Contact
For questions and support, please contact the development team.

---

## Quick Reference Commands

```bash
# Start MongoDB
mongod  # or brew services start mongodb-community

# Backend
cd backend
npm install
npm start

# Frontend (in new terminal)
cd frontend
npm install
npm start

# Access application
http://localhost:4200

# Login credentials
Email: admin@admin.com
Password: admin123
```

---

**Congratulations! You're ready to use the Admin Dashboard.**

If you encounter any issues, please check the Troubleshooting section above.
