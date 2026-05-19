import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    permissions: [{ type: String, enum: ['events', 'users', 'bookings', 'analytics'] }],
    activityLog: [
      {
        action: String,
        target: String,
        createdAt: { type: Date, default: Date.now }
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model('Admin', adminSchema);
