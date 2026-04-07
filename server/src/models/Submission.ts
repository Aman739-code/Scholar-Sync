import mongoose, { Schema, Document } from 'mongoose';

export interface ISubmission extends Document {
  assignmentId: mongoose.Types.ObjectId;
  studentId: mongoose.Types.ObjectId;
  files: { filename: string; mimetype: string; size: number; url: string }[];
  note: string;
  submittedAt: Date;
  status: 'draft' | 'submitted' | 'late' | 'graded';
}

const submissionSchema = new Schema<ISubmission>({
  assignmentId: { type: Schema.Types.ObjectId, ref: 'Assignment', required: true },
  studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  files: [
    {
      filename: { type: String },
      mimetype: { type: String },
      size: { type: Number },
      url: { type: String },
    },
  ],
  note: { type: String, default: '' },
  submittedAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['draft', 'submitted', 'late', 'graded'], default: 'submitted' },
});

submissionSchema.index({ assignmentId: 1, studentId: 1 });

export default mongoose.model<ISubmission>('Submission', submissionSchema);
