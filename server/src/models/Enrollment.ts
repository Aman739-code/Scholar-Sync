import mongoose, { Schema, Document } from 'mongoose';

export interface IEnrollment extends Document {
  studentId: mongoose.Types.ObjectId;
  courseId: mongoose.Types.ObjectId;
  enrolledDate: Date;
  progress: number;
  status: 'active' | 'completed' | 'dropped';
  completedModules: mongoose.Types.ObjectId[];
}

const enrollmentSchema = new Schema<IEnrollment>({
  studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  enrolledDate: { type: Date, default: Date.now },
  progress: { type: Number, default: 0, min: 0, max: 100 },
  status: { type: String, enum: ['active', 'completed', 'dropped'], default: 'active' },
  completedModules: [{ type: Schema.Types.ObjectId, ref: 'Module' }],
});

enrollmentSchema.index({ studentId: 1, courseId: 1 }, { unique: true });

export default mongoose.model<IEnrollment>('Enrollment', enrollmentSchema);
