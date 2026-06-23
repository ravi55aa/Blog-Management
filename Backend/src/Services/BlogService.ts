import { injectable, inject } from 'tsyringe';
import { Request } from 'express';
import TYPES from '../config/DI/types';
import { serviceReturnType } from '../typesConfig/serviceReturnType';
import { ApiResponse } from '../Helper/ApiResponse';
import { BadRequestError, FailureError } from '../Middleware/narrowDownError';
import { BlogMessage } from '../Constant/ResponseMessage';
import { IBlogService } from '../Interface/IServices/IBlogService';
import { IBlog } from '../Models/blogModel';
import { IBlogRepository } from '../Interface/IRepository/IBlogRepository';
import BlogDTO from '../DTO/blogDTO';

import { Types } from 'mongoose';
import { handleDecodeToken } from '../config/jwt';

@injectable()
class BlogService implements IBlogService {
    constructor(
        @inject(TYPES.BlogRepository)
        private _blogRepository: IBlogRepository
    ) {}

    async createBlog(req: Request): Promise<serviceReturnType<IBlog>> {
        const blogPayload: Partial<IBlog> = BlogDTO.createBlog(req.body);

        if (!blogPayload.title?.trim() || !blogPayload.contentHtml?.trim()) {
            throw new BadRequestError(BlogMessage.InvalidBlogData);
        }

        const decodedValue = handleDecodeToken(req);

        blogPayload.userId = new Types.ObjectId(decodedValue.id);

        const blog = await this._blogRepository.createBlog(blogPayload);

        if (!blog) {
            throw new FailureError(BlogMessage.BlogNotCreated);
        }

        return ApiResponse.success(blog, BlogMessage.BlogCreated);
    }

    async updateBlog(blogId: string, req: Request): Promise<serviceReturnType<IBlog>> {
        const payload: Partial<IBlog> = BlogDTO.createBlog(req.body);

        if (!payload.title?.trim() || !payload.contentHtml?.trim()) {
            throw new BadRequestError(BlogMessage.InvalidBlogData);
        }

        const blog = await this._blogRepository.findById(blogId);

        if (!blog) {
            throw new FailureError(BlogMessage.BlogNotFound);
        }

        const updatedBlog = await this._blogRepository.updateBlog(blogId, payload);

        if (!updatedBlog) {
            throw new FailureError(BlogMessage.BlogNotUpdated);
        }

        return ApiResponse.success(updatedBlog, BlogMessage.BlogUpdated);
    }

    async getABlog(blogId: string): Promise<serviceReturnType<IBlog>> {
        const blog = await this._blogRepository.findById(blogId);

        if (!blog) {
            throw new FailureError(BlogMessage.BlogNotFound);
        }

        return ApiResponse.success(blog, BlogMessage.BlogFetched);
    }

    async getAllBlogs(): Promise<serviceReturnType<IBlog[]>> {
        const blogs = await this._blogRepository.findAll();

        return ApiResponse.success(blogs, BlogMessage.BlogFetched);
    }

    async getMyBlogs(req: Request): Promise<serviceReturnType<IBlog[]>> {
        const decodedValue = handleDecodeToken(req);

        const blogs = await this._blogRepository.findMany({
            userId: new Types.ObjectId(decodedValue.id),
            isDelete: false,
        });

        return ApiResponse.success(blogs, BlogMessage.BlogFetched);
    }

    async deleteBlog(blogId: string): Promise<serviceReturnType<null>> {
        const blog = await this._blogRepository.findById(blogId);

        if (!blog) {
            throw new FailureError(BlogMessage.BlogNotFound);
        }

        await this._blogRepository.updateBlog(blogId, {
            isDelete: true,
        });

        return ApiResponse.success(null, BlogMessage.BlogDeleted);
    }
}

export default BlogService;
