import { CONTENT_DELTA_TYPE } from '../ISchemas/IBlogSchema';

export interface IUpdateBlogDTO {
    title?: string;
    contentHtml?: string;
    contentDelta?: CONTENT_DELTA_TYPE;
}

export interface IDeleteBlogDTO {
    blogId: string;
}

export interface IGetBlogDTO {
    blogId: string;
}
