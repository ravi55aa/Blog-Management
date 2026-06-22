import { injectable, inject } from 'tsyringe';
import {Request} from "express";
import TYPES from '../config/DI/types';
import { serviceReturnType } from '../types/serviceReturnType';
import { ApiResponse } from '../Helper/ApiResponse';
import { BadRequestError, FailureError } from '../Middleware/narrowDownError';
import { BlogMessage } from '../Constant/ResponseMessage';
import { IBlogService } from '../Interface/IServices/IBlogService';
import { IBlog } from '../Models/blogModel';
import { IBlogRepository } from '../Interface/IRepository/IBlogRepository';
import BlogDTO from '../DTO/blogDTO';
import { errorLogger } from '../Utils/logger';

@injectable()
class BlogService implements IBlogService {
    constructor(
        @inject(TYPES.BlogRepository)
        private _blogRepository: IBlogRepository
    ) {}

    async createBlog(req: Request): Promise<serviceReturnType<IBlog>> {
        const blogPayload:Partial<IBlog>=BlogDTO.createBlog(req.body);

        //dto

        if ( !blogPayload?.title || !blogPayload?.title.trim() || !blogPayload?.contentHtml || !blogPayload?.contentHtml.trim()) {
            throw new BadRequestError(BlogMessage.InvalidBlogData);
        }

        const existingBlog = await this._blogRepository.createBlog(blogPayload);
        
        if (existingBlog) {
            throw new FailureError(BlogMessage.BlogCreated);
        }
        
        const blog = await this._blogRepository.createBlog(blogPayload);

        if(!blog){
            errorLogger.error(blog,BlogMessage.BlogNotCreated);
            throw new FailureError(BlogMessage.BlogNotCreated);
        }

        return ApiResponse.success<IBlog>(blog, BlogMessage.BlogCreated);
    }
}

export default BlogService;
