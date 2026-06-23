import type { Types } from 'mongoose';

export type CONTENT_DELTA_TYPE = {
    ops: unknown[];
};

export interface ICreateBlogDTO {
    title: string;
    contentHtml: string;
    contentDelta: CONTENT_DELTA_TYPE;
    userId: Types.ObjectId;
}
