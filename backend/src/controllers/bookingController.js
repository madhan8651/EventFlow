import Booking from '../models/Booking.js';
import Event from '../models/Event.js';

export const createBooking = async (req, res, next) => {
  try {
    const { eventId, seats = 1, paymentStatus = 'paid' } = req.body;

    const event = await Event.findById(eventId);

    // FIXED HERE
    if (!event) {
      res.status(404);
      throw new Error('Event not found');
    }

    if (event.seatsAvailable < seats) {
      res.status(400);
      throw new Error('Not enough seats available');
    }

    event.seatsAvailable -= seats;
    await event.save();

    const booking = await Booking.create({
      userId: req.user._id,
      eventId,
      seats,
      paymentStatus,
      confirmationCode: `EVT-${Date.now().toString(36).toUpperCase()}`
    });

    res.status(201).json({
      success: true,
      message: 'Booking confirmed successfully.',
      booking
    });
  } catch (error) {
    next(error);
  }
};

export const getMyBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ userId: req.user._id })
      .populate('eventId')
      .sort({ createdAt: -1 });

    res.json({ success: true, bookings });
  } catch (error) {
    next(error);
  }
};

export const getBookings = async (_req, res, next) => {
  try {
    const bookings = await Booking.find()
      .populate('userId', 'name email')
      .populate('eventId', 'title date price');

    res.json({ success: true, bookings });
  } catch (error) {
    next(error);
  }
};

export const updatePaymentStatus = async (req, res, next) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { paymentStatus: req.body.paymentStatus },
      { new: true }
    );

    if (!booking) {
      res.status(404);
      throw new Error('Booking not found');
    }

    res.json({ success: true, booking });
  } catch (error) {
    next(error);
  }
};