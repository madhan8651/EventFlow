import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: ['Technology', 'Business', 'Education', 'Music', 'Sports', 'Art', 'Community']
    },
    date: { type: Date, required: true, index: true },
    time: { type: String, required: true },
    location: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    image: { type: String, default: '' },
    organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    seatsAvailable: { type: Number, required: true, min: 0 },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending', index: true },
    featured: { type: Boolean, default: false }
  },
  { timestamps: true }
);

eventSchema.index({ title: 'text', description: 'text', location: 'text' });
eventSchema.index({ category: 1, date: 1, status: 1 });

export default mongoose.model('Event', eventSchema);
