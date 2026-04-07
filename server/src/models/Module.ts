import mongoose, { Schema, Document } from 'mongoose';

export interface IModule extends Document {
  courseId: mongoose.Types.ObjectId;
  title: string;
  orderIndex: number;
  duration: string;
  status: 'completed' | 'current' | 'upcoming';
  contentUrls: string[];
}

const moduleSchema = new Schema<IModule>({
  courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  title: { type: String, required: true, trim: true },
  orderIndex: { type: Number, required: true },
  duration: { type: String, required: true },
  status: { type: String, enum: ['completed', 'current', 'upcoming'], default: 'upcoming' },
  contentUrls: [{ type: String }],
});

moduleSchema.index({ courseId: 1, orderIndex: 1 });

export default mongoose.model<IModule>('Module', moduleSchema);
