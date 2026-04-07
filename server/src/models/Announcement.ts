import mongoose, { Schema, Document } from 'mongoose';

export interface IAnnouncement extends Document {
  courseId: mongoose.Types.ObjectId;
  postedBy: mongoose.Types.ObjectId;
  text: string;
  postedDate: Date;
}

const announcementSchema = new Schema<IAnnouncement>({
  courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  postedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  postedDate: { type: Date, default: Date.now },
});

announcementSchema.index({ courseId: 1 });

export default mongoose.model<IAnnouncement>('Announcement', announcementSchema);
