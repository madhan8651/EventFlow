import User from '../models/User.js';
import Event from '../models/Event.js';
import Booking from '../models/Booking.js';

export const getUsers = async (_req, res, next) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json({ success: true, users });
  } catch (error) {
    next(error);
  }
};

export const getStats = async (_req, res, next) => {
  try {
    const [users, events, bookings, pendingEvents, revenueResult, categoryBreakdown] = await Promise.all([
      User.countDocuments(),
      Event.countDocuments(),
      Booking.countDocuments(),
      Event.countDocuments({ status: 'pending' }),
      Booking.aggregate([
        { $match: { paymentStatus: 'paid' } },
        { $lookup: { from: 'events', localField: 'eventId', foreignField: '_id', as: 'event' } },
        { $unwind: '$event' },
        { $group: { _id: null, revenue: { $sum: { $multiply: ['$seats', '$event.price'] } } } }
      ]),
      Event.aggregate([{ $group: { _id: '$category', total: { $sum: 1 } } }, { $sort: { total: -1 } }])
    ]);

    res.json({
      success: true,
      stats: {
        users,
        events,
        bookings,
        pendingEvents,
        revenue: revenueResult[0]?.revenue || 0,
        categoryBreakdown
      }
    });
  } catch (error) {
    next(error);
  }
};
