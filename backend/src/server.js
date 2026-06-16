import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import connectDB from './config/db.js';

import authRoutes from './routes/authRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

const app = express();

/* =========================
   DATABASE
========================= */

connectDB();

/* =========================
   MIDDLEWARE
========================= */

app.use(helmet());

app.use(
  cors({
    origin: true,
    credentials: true
  })
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(morgan('dev'));

/* =========================
   ROUTES
========================= */

app.get('/', (req, res) => {

  res.send('API Running...');
});

app.get('/api/health', (req, res) => {

  res.json({
    success: true,
    message: 'Backend Working'
  });
});

/* =========================
   API ROUTES
========================= */

app.use('/api/auth', authRoutes);

app.use('/api/events', eventRoutes);

app.use('/api/bookings', bookingRoutes);

app.use('/api/payment', paymentRoutes);

app.use('/api/admin', adminRoutes);

/* =========================
   SERVER
========================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );
});