import mongoose, { Schema, Document } from 'mongoose';

export interface IReadingProgress extends Document {
  userId: mongoose.Types.ObjectId;
  resourceId: mongoose.Types.ObjectId;
  currentPage: number;
  currentTime: string;
  lastAccessed: Date;
}

const readingProgressSchema = new Schema<IReadingProgress>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  resourceId: { type: Schema.Types.ObjectId, ref: 'LibraryResource', required: true },
  currentPage: { type: Number, default: 0 },
  currentTime: { type: String, default: '0:00' },
  lastAccessed: { type: Date, default: Date.now },
});

readingProgressSchema.index({ userId: 1, resourceId: 1 }, { unique: true });

export default mongoose.model<IReadingProgress>('ReadingProgress', readingProgressSchema);
