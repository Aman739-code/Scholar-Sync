import mongoose, { Schema, Document } from 'mongoose';

export interface IStudentProfile extends Document {
  userId: mongoose.Types.ObjectId;
  studentId: string;
  department: string;
  year: number;
  gpa: number;
  rank: string;
}

const studentProfileSchema = new Schema<IStudentProfile>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  studentId: { type: String, required: true, unique: true, trim: true },
  department: { type: String, required: true, trim: true },
  year: { type: Number, required: true, min: 1, max: 6 },
  gpa: { type: Number, default: 0, min: 0, max: 4.0 },
  rank: { type: String, default: 'N/A' },
});



export default mongoose.model<IStudentProfile>('StudentProfile', studentProfileSchema);
