import mongoose, { Schema, Document } from 'mongoose';

export interface IInstructorProfile extends Document {
  userId: mongoose.Types.ObjectId;
  facultyId: string;
  department: string;
  specialization: string;
  bio: string;
}

const instructorProfileSchema = new Schema<IInstructorProfile>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  facultyId: { type: String, required: true, unique: true, trim: true },
  department: { type: String, required: true, trim: true },
  specialization: { type: String, default: '' },
  bio: { type: String, default: '' },
});



export default mongoose.model<IInstructorProfile>('InstructorProfile', instructorProfileSchema);
