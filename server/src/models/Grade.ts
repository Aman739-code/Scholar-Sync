import mongoose, { Schema, Document } from 'mongoose';

export interface IGrade extends Document {
  studentId: mongoose.Types.ObjectId;
  courseId: mongoose.Types.ObjectId;
  assignmentId: mongoose.Types.ObjectId;
  submissionId: mongoose.Types.ObjectId;
  score: number;
  maxScore: number;
  letterGrade: string;
  feedback: string;
  gradedBy: mongoose.Types.ObjectId;
  gradedAt: Date;
}

const gradeSchema = new Schema<IGrade>({
  studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  assignmentId: { type: Schema.Types.ObjectId, ref: 'Assignment', required: true },
  submissionId: { type: Schema.Types.ObjectId, ref: 'Submission' },
  score: { type: Number, required: true, min: 0 },
  maxScore: { type: Number, required: true, min: 0 },
  letterGrade: { type: String, required: true },
  feedback: { type: String, default: '' },
  gradedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  gradedAt: { type: Date, default: Date.now },
});

gradeSchema.index({ studentId: 1, courseId: 1 });
gradeSchema.index({ assignmentId: 1, studentId: 1 });

export default mongoose.model<IGrade>('Grade', gradeSchema);
