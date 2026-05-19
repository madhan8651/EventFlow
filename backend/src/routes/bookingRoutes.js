import express from 'express';
import { body } from 'express-validator';
import { createBooking, getBookings, getMyBookings, updatePaymentStatus } from '../controllers/bookingController.js';
import { authorize, protect } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validate.js';

const router = express.Router();

router.post(
  '/',
  protect,
  [
    body('eventId').isMongoId().withMessage('Valid eventId is required'),
    body('seats').optional().isInt({ min: 1 }).withMessage('Seats must be at least 1')
  ],
  validate,
  createBooking
);

router.get('/my', protect, getMyBookings);
router.get('/', protect, authorize('admin'), getBookings);
router.patch(
  '/:id/status',
  protect,
  authorize('admin'),
  body('paymentStatus').isIn(['pending', 'paid', 'failed', 'refunded']),
  validate,
  updatePaymentStatus
);

export default router;
