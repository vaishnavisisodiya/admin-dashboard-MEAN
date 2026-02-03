Admin Dashboard with Analytics (MEAN Stack)
Overview

This project is a role-based Admin Dashboard built using the MEAN stack (MongoDB, Express.js, Angular, Node.js).
It allows admins to securely log in, view analytics data, manage users, and monitor key metrics through interactive charts.

This project is designed to reflect real-world admin panels used in CRM and analytics platforms.

Features

Secure login using JWT authentication

Role-based access (Admin / User)

Admin dashboard with key metrics

Analytics with charts (Chart.js)

User management (view & manage users)

Fully responsive UI (desktop & mobile)

Tech Stack

Frontend: Angular 17

Backend: Node.js, Express.js

Database: MongoDB

Authentication: JWT

Charts: Chart.js

Prerequisites

Make sure the following are installed:

Node.js (v18+)

npm (v9+)

MongoDB (local or Atlas)

Angular CLI (v17)

Check versions:

node -v
npm -v
ng version

Project Setup
1. Clone / Extract Project
cd admin-dashboard-mean

2. Backend Setup
cd backend
npm install
npm start


Backend runs on:

http://localhost:3000


Make sure MongoDB is running and .env has:

MONGODB_URI=mongodb://localhost:27017/admin-dashboard

3. Frontend Setup

Open a new terminal:

cd frontend
npm install
npm start


Frontend runs on:

http://localhost:4200

Login Credentials
Admin
Email: admin@admin.com
Password: admin123

User
Email: user@user.com
Password: user123

Folder Structure (Simplified)
admin-dashboard-mean/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   └── .env
│
├── frontend/
│   └── src/app/
│       ├── components/
│       ├── services/
│       └── guards/
│
└── README.md

API Overview
Auth

POST /api/auth/login

GET /api/auth/profile

Users (Admin)

GET /api/users

PUT /api/users/:id

DELETE /api/users/:id

Analytics

GET /api/analytics/dashboard

Notes

Passwords are stored securely using hashing.

Demo credentials are kept simple for testing purposes.

In production, strong password rules and HTTPS should be used.

Common Issues

MongoDB not connecting

Ensure MongoDB service is running

Verify connection string in .env

Port already in use

Stop other apps using port 3000 or 4200

Conclusion

This project demonstrates a complete admin dashboard workflow including authentication, analytics, and user management using the MEAN stack.
It is suitable for college assignments, demos, and interview discussions.
