import mongoose, { Schema, Document } from 'mongoose';

export interface ILibraryResource extends Document {
  title: string;
  slug: string;
  author: string;
  year: string;
  type: 'textbook' | 'journal' | 'video_lecture';
  category: string;
  description: string;
  coverImage: string;
  isbn: string;
  issn: string;
  publisher: string;
  series: string;
  pages: number;
  duration: string;
  resolution: string;
  hasTranscript: boolean;
  addedDate: Date;
}

const libraryResourceSchema = new Schema<ILibraryResource>({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, trim: true },
  author: { type: String, required: true, trim: true },
  year: { type: String, required: true },
  type: { type: String, enum: ['textbook', 'journal', 'video_lecture'], required: true },
  category: { type: String, required: true },
  description: { type: String, default: '' },
  coverImage: { type: String, default: '' },
  isbn: { type: String, default: '' },
  issn: { type: String, default: '' },
  publisher: { type: String, default: '' },
  series: { type: String, default: '' },
  pages: { type: Number, default: 0 },
  duration: { type: String, default: '' },
  resolution: { type: String, default: '' },
  hasTranscript: { type: Boolean, default: false },
  addedDate: { type: Date, default: Date.now },
});

libraryResourceSchema.index({ title: 'text', author: 'text', category: 'text' });

export default mongoose.model<ILibraryResource>('LibraryResource', libraryResourceSchema);
