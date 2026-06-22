import { IBlog } from '../../Models/blogModel';

export interface IBlogRepository {
    createBlog(blogData: Partial<IBlog>): Promise<IBlog | null>;

    findById(blogId: string): Promise<IBlog | null>;

    findAll(): Promise<IBlog[]>;

    findMany(filter: Partial<IBlog>): Promise<IBlog[]>;

    updateBlog(blogId: string, payload: Partial<IBlog>): Promise<IBlog | null>;

    deleteBlog(blogId: string): Promise<boolean>;
}
