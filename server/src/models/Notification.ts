import mongoose, { Schema, Document } from 'mongoose';

export interface INotification extends Document {
  userId: mongoose.Types.ObjectId;
  type: 'deadline' | 'grade' | 'announcement' | 'enrollment';
  message: string;
  isRead: boolean;
  referenceId: mongoose.Types.ObjectId;
  referenceType: string;
  createdAt: Date;
}

const notificationSchema = new Schema<INotification>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['deadline', 'grade', 'announcement', 'enrollment'], required: true },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    referenceId: { type: Schema.Types.ObjectId },
    referenceType: { type: String },
  },
  { timestamps: true }
);

notificationSchema.index({ userId: 1, isRead: 1 });

export default mongoose.model<INotification>('Notification', notificationSchema);
