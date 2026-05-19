# Event Management System

A full-stack Event Management Website built with React, Tailwind CSS, Node.js, Express, MongoDB, JWT authentication, role-based dashboards, event booking, image upload support, and admin analytics.

## Tech Stack

Frontend: React, Vite, Tailwind CSS, React Router, Axios, Framer Motion, React Icons, React Hot Toast, Recharts.

Backend: Node.js, Express, MongoDB, Mongoose, JWT, bcrypt, multer, express-validator, Helmet, CORS.

## Folder Structure

```text
event-management-system/
  backend/
    src/
      config/
      controllers/
      middleware/
      models/
      routes/
      utils/
      server.js
    .env.example
    package.json
  frontend/
    src/
      api/
      components/
      context/
      data/
      pages/
      utils/
      App.jsx
      main.jsx
    package.json
    tailwind.config.js
  README.md
```

## Installation

```bash
npm run install:all
```

Create environment files:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

Update `backend/.env` with your MongoDB URI and JWT secret.

## Run Locally

```bash
npm run dev
```

Frontend: `http://localhost:5173`
Backend: `http://localhost:5000/api`

## MongoDB Setup

1. Create a free MongoDB Atlas cluster or run MongoDB locally.
2. Create a database named `event_management`.
3. Paste the connection string into `backend/.env` as `MONGO_URI`.
4. Start the backend. Mongoose creates collections automatically.

## API Documentation

Auth:
- `POST /api/auth/register` - create account
- `POST /api/auth/login` - login and receive JWT
- `GET /api/auth/me` - current authenticated user

Events:
- `GET /api/events` - list events with `search`, `category`, `page`, `limit`
- `GET /api/events/:id` - event details
- `POST /api/events` - create event, authenticated
- `PUT /api/events/:id` - update own/admin event
- `DELETE /api/events/:id` - delete own/admin event
- `PATCH /api/events/:id/approval` - approve/reject, admin only

Bookings:
- `POST /api/bookings` - book an event
- `GET /api/bookings/my` - current user's bookings
- `GET /api/bookings` - all bookings, admin only
- `PATCH /api/bookings/:id/status` - update payment status, admin only

Admin:
- `GET /api/admin/users` - list users
- `GET /api/admin/stats` - dashboard analytics

## Deployment

Backend on Render:
1. Create a new Web Service.
2. Root directory: `backend`
3. Build command: `npm install`
4. Start command: `npm start`
5. Add env vars from `backend/.env.example`.

Frontend on Vercel:
1. Import the repository.
2. Root directory: `frontend`
3. Build command: `npm run build`
4. Output directory: `dist`
5. Set `VITE_API_URL` to your Render API URL, for example `https://your-api.onrender.com/api`.

## Demo Admin

Register a user, then update their `role` to `admin` in MongoDB Compass or Atlas for admin dashboard access.
