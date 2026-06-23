import type { Document, Types } from 'mongoose';
import mongoose, { Schema } from 'mongoose';
type CONTENT_DELTA_TYPE = { ops: unknown[] };

export interface IBlog extends Document {
    title: string;
    contentHtml: string;
    contentDelta: CONTENT_DELTA_TYPE;

    isDelete: boolean;
    userId: Types.ObjectId;
}

const blogSchema = new Schema<IBlog>(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

        title: { type: String, required: true },

        contentHtml: { type: String, required: true },

        contentDelta: { type: Object, default: {} },

        isDelete: { type: Boolean, default: false },
    },
    { timestamps: true }
);

const blogModel = mongoose.model<IBlog>('Blog', blogSchema);
export default blogModel;
