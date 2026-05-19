import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    bookingDate: { type: Date, default: Date.now },
    seats: { type: Number, default: 1, min: 1 },
    paymentStatus: { type: String, enum: ['pending', 'paid', 'failed', 'refunded'], default: 'pending' },
    confirmationCode: { type: String, required: true },
    emailConfirmationSent: { type: Boolean, default: true }
  },
  { timestamps: true }
);

bookingSchema.index({ userId: 1, eventId: 1 });

export default mongoose.model('Booking', bookingSchema);
