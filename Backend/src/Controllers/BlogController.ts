import { Request, Response, NextFunction } from 'express';

import { inject, injectable } from 'tsyringe';

import TYPES from '../config/DI/types';

import { IBlogService } from '../Interface/IServices/IBlogService';

@injectable()
class BlogController {
    constructor(
        @inject(TYPES.BlogService)
        private _blogService: IBlogService
    ) {}

    public async createBlog(req: Request, res: Response, next: NextFunction) {
        try {
            const { status, responseBody } = await this._blogService.createBlog(req);

            res.status(status).json(responseBody);
        } catch (err) {
            next(err);
        }
    }

    public async updateBlog(req: Request, res: Response, next: NextFunction) {
        try {
            const { blogId } = req.params as { blogId: string };

            const { status, responseBody } = await this._blogService.updateBlog(blogId, req);

            res.status(status).json(responseBody);
        } catch (err) {
            next(err);
        }
    }

    public async getABlog(req: Request, res: Response, next: NextFunction) {
        try {
            const { blogId } = req.params as { blogId: string };

            const { status, responseBody } = await this._blogService.getABlog(blogId);

            res.status(status).json(responseBody);
        } catch (err) {
            next(err);
        }
    }

    public async getAllBlogs(req: Request, res: Response, next: NextFunction) {
        try {
            const { status, responseBody } = await this._blogService.getAllBlogs();

            res.status(status).json(responseBody);
        } catch (err) {
            next(err);
        }
    }

    public async getMyBlogs(req: Request, res: Response, next: NextFunction) {
        try {
            const { status, responseBody } = await this._blogService.getMyBlogs(req);

            res.status(status).json(responseBody);
        } catch (err) {
            next(err);
        }
    }

    public async deleteBlog(req: Request, res: Response, next: NextFunction) {
        try {
            const { blogId } = req.params as { blogId: string };

            const { status, responseBody } = await this._blogService.deleteBlog(blogId);

            res.status(status).json(responseBody);
        } catch (err) {
            next(err);
        }
    }
}

export default BlogController;
