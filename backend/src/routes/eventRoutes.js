import express from 'express';
import { body } from 'express-validator';
import {
  createEvent,
  deleteEvent,
  getEventById,
  getEvents,
  updateApproval,
  updateEvent
} from '../controllers/eventController.js';
import { authorize, protect } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';
import { validate } from '../middleware/validate.js';

const router = express.Router();

const eventValidation = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('category').notEmpty().withMessage('Category is required'),
  body('date').isISO8601().withMessage('Valid date is required'),
  body('time').notEmpty().withMessage('Time is required'),
  body('location').trim().notEmpty().withMessage('Location is required'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be zero or more'),
  body('seatsAvailable').isInt({ min: 0 }).withMessage('Seats must be zero or more')
];

router.get('/', getEvents);
router.get('/:id', getEventById);
router.post('/', protect, upload.single('image'), eventValidation, validate, createEvent);
router.put('/:id', protect, upload.single('image'), eventValidation, validate, updateEvent);
router.delete('/:id', protect, deleteEvent);
router.patch('/:id/approval', protect, authorize('admin'), body('status').isIn(['approved', 'rejected']), validate, updateApproval);

export default router;
