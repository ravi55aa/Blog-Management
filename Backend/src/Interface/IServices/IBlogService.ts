import type { Request } from 'express';
import type { IBlog } from '../../Models/blogModel';
import type { serviceReturnType } from '../../types/serviceReturnType';

export interface IBlogService {
    createBlog(req: Request): Promise<serviceReturnType<IBlog>>;

    updateBlog(blogId: string, req: Request): Promise<serviceReturnType<IBlog>>;

    deleteBlog(blogId: string): Promise<serviceReturnType<null>>;

    getABlog(blogId: string): Promise<serviceReturnType<IBlog>>;

    getAllBlogs(): Promise<serviceReturnType<IBlog[]>>;

    getMyBlogs(req: Request): Promise<serviceReturnType<IBlog[]>>;
}
