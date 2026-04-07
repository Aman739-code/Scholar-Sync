import mongoose, { Schema, Document } from 'mongoose';

export interface IResourceChapter extends Document {
  resourceId: mongoose.Types.ObjectId;
  title: string;
  pages: string;
  timestamp: string;
  orderIndex: number;
  isRead: boolean;
  isWatched: boolean;
}

const resourceChapterSchema = new Schema<IResourceChapter>({
  resourceId: { type: Schema.Types.ObjectId, ref: 'LibraryResource', required: true },
  title: { type: String, required: true, trim: true },
  pages: { type: String, default: '' },
  timestamp: { type: String, default: '' },
  orderIndex: { type: Number, required: true },
  isRead: { type: Boolean, default: false },
  isWatched: { type: Boolean, default: false },
});

resourceChapterSchema.index({ resourceId: 1, orderIndex: 1 });

export default mongoose.model<IResourceChapter>('ResourceChapter', resourceChapterSchema);
