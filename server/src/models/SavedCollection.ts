import mongoose, { Schema, Document } from 'mongoose';

export interface ISavedCollection extends Document {
  userId: mongoose.Types.ObjectId;
  resourceIds: mongoose.Types.ObjectId[];
  createdAt: Date;
}

const savedCollectionSchema = new Schema<ISavedCollection>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    resourceIds: [{ type: Schema.Types.ObjectId, ref: 'LibraryResource' }],
  },
  { timestamps: true }
);



export default mongoose.model<ISavedCollection>('SavedCollection', savedCollectionSchema);
