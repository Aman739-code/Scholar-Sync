import mongoose, { Schema, Document } from 'mongoose';

export interface IRubricCriteria {
  criteria: string;
  weight: string;
  description: string;
}

export interface IAssignmentResource {
  name: string;
  type: string;
  url?: string;
}

export interface IAssignment extends Document {
  courseId: mongoose.Types.ObjectId;
  title: string;
  slug: string;
  description: string;
  type: 'lab' | 'quiz' | 'project' | 'reflection' | 'submission';
  deadline: Date;
  points: number;
  status: 'available' | 'due_soon' | 'urgent';
  requirements: string[];
  rubric: IRubricCriteria[];
  resources: IAssignmentResource[];
  instructorNote: string;
  icon: string;
  bannerImage: string;
  createdAt: Date;
}

const assignmentSchema = new Schema<IAssignment>(
  {
    courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true },
    type: { type: String, enum: ['lab', 'quiz', 'project', 'reflection', 'submission'], required: true },
    deadline: { type: Date, required: true },
    points: { type: Number, required: true, min: 0 },
    status: { type: String, enum: ['available', 'due_soon', 'urgent'], default: 'available' },
    requirements: [{ type: String }],
    rubric: [
      {
        criteria: { type: String, required: true },
        weight: { type: String, required: true },
        description: { type: String, required: true },
      },
    ],
    resources: [
      {
        name: { type: String, required: true },
        type: { type: String, required: true },
        url: { type: String },
      },
    ],
    instructorNote: { type: String, default: '' },
    icon: { type: String, default: 'assignment' },
    bannerImage: { type: String, default: '' },
  },
  { timestamps: true }
);

assignmentSchema.index({ courseId: 1, deadline: 1 });

export default mongoose.model<IAssignment>('Assignment', assignmentSchema);
