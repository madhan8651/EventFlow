import express from 'express';
import { getStats, getUsers } from '../controllers/adminController.js';
import { authorize, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect, authorize('admin'));
router.get('/users', getUsers);
router.get('/stats', getStats);

export default router;
