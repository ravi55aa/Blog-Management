import { inject, injectable } from 'tsyringe';
import TYPES from '../config/DI/types';
import { Response, Request, NextFunction } from 'express';
import { IBlogService } from '../Interface/IServices/IBlogService';


@injectable()
class BlogController {

    constructor(
        @inject(TYPES.AuthService)
        private _blogService: IBlogService
    ) {}

    public async CreateBlog(req: Request, res: Response, next: NextFunction) {
        try {
            const { status, responseBody } = await this._blogService.createBlog(req);

            res.status(status).json(responseBody);
        } catch (err) {
            next(err);
        }
    }
}

export default BlogController;
