import { injectable } from 'tsyringe';

import blogModel, { IBlog } from '../Models/blogModel';
import { IBlogRepository } from '../Interface/IRepository/IBlogRepository';

import { logger, errorLogger } from '../Utils/logger';

@injectable()
export class BlogRepository implements IBlogRepository {
    async createBlog(blogData: Partial<IBlog>): Promise<IBlog | null> {
        try {
            logger.info('[BlogRepository] Creating blog');

            const blog = await blogModel.create(blogData);

            logger.info(`[BlogRepository] Blog created: ${blog.title}`);

            return blog;
        } catch (error) {
            errorLogger.error(`[BlogRepository] Create blog error: ${error}`);

            return null;
        }
    }

    async findById(blogId: string): Promise<IBlog | null> {
        try {
            logger.info(`[BlogRepository] Finding blog by id: ${blogId}`);

            return await blogModel.findOne({
                _id: blogId,
                isDelete: false,
            }).populate("userId","name email");

        } catch (error) {
            errorLogger.error(`[BlogRepository] Find blog error: ${error}`);

            return null;
        }
    }

    async findAll(): Promise<IBlog[]> {
        try {
            logger.info('[BlogRepository] Fetching all blogs');

            return await blogModel
                .find({
                    isDelete: false,
                })
                .sort({
                    createdAt: -1,
                });
        } catch (error) {
            errorLogger.error(`[BlogRepository] Find all blogs error: ${error}`);

            return [];
        }
    }

    async findMany(filter: Partial<IBlog>): Promise<IBlog[]> {
        try {
            logger.info('[BlogRepository] Finding blogs');

            return await blogModel.find(filter).sort({
                createdAt: -1,
            });
        } catch (error) {
            errorLogger.error(`[BlogRepository] Find many blogs error: ${error}`);

            return [];
        }
    }

    async updateBlog(blogId: string, payload: Partial<IBlog>): Promise<IBlog | null> {
        try {
            logger.info(`[BlogRepository] Updating blog: ${blogId}`);

            const updatedBlog = await blogModel.findByIdAndUpdate(blogId, payload, {
                new: true,
                runValidators: true,
            });

            return updatedBlog;
        } catch (error) {
            errorLogger.error(`[BlogRepository] Update blog error: ${error}`);

            return null;
        }
    }

    async deleteBlog(blogId: string): Promise<boolean> {
        try {
            logger.info(`[BlogRepository] Soft deleting blog: ${blogId}`);

            const deletedBlog = await blogModel.findByIdAndUpdate(
                blogId,
                {
                    isDelete: true,
                },
                {
                    new: true,
                }
            );

            return !!deletedBlog;
        } catch (error) {
            errorLogger.error(`[BlogRepository] Delete blog error: ${error}`);

            return false;
        }
    }
}
