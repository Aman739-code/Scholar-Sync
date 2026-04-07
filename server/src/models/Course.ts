import mongoose, { Schema, Document } from 'mongoose';

export interface ICourse extends Document {
  title: string;
  code: string;
  slug: string;
  description: string;
  instructorId: mongoose.Types.ObjectId;
  bannerImage: string;
  units: number;
  semester: string;
  schedule: string;
  track: string;
  maxCapacity: number;
  createdAt: Date;
}

const courseSchema = new Schema<ICourse>(
  {
    title: { type: String, required: true, trim: true },
    code: { type: String, required: true, unique: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true },
    instructorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    bannerImage: { type: String, default: '' },
    units: { type: Number, required: true, min: 1 },
    semester: { type: String, required: true },
    schedule: { type: String, default: '' },
    track: { type: String, required: true },
    maxCapacity: { type: Number, default: 100 },
  },
  { timestamps: true }
);


courseSchema.index({ track: 1, semester: 1 });

export default mongoose.model<ICourse>('Course', courseSchema);
