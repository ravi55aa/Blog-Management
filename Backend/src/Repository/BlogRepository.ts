import { injectable } from 'tsyringe';
//import { Types } from 'mongoose';

import { IBlog } from '../Models/blogModel'; 
import blogModel from '../Models/blogModel'; 

import { IBlogRepository } from '../Interface/IRepository/IBlogRepository'; 

import { errorLogger, logger } from '../Utils/logger';

@injectable()
export class BlogRepository implements IBlogRepository {

    async createBlog(blogData: Partial<IBlog>): Promise<IBlog|null> {
        try{
            logger.info('[BlogRepository] Creating blog');

            const blog = await blogModel.create(blogData);

            if(!blog){
                errorLogger.error(`[BlogRepository] Blog create error: ${blog}`);
                return blog;
            }

            logger.info(`[BlogRepository] Blog created: ${blog.title}`);

            return blog;
            
        } catch (error:unknown){
            logger.info(`[BlogRepository] Blog created: ${error}`);
            return null;
        }
    }

    // async findById(blogId: string): Promise<IBlog | null> {
    //     logger.info(`[BlogRepository] Fetching blog ${blogId}`);

    //     return await blogModel
    //         .findOne({
    //             _id: blogId,
    //             isDelete: false,
    //         })
    //         .lean<IBlog>();
    // }

    // async findByUserId(userId: Types.ObjectId): Promise<IBlog[]> {
    //     logger.info(`[BlogRepository] Fetching blogs of user ${userId}`);

    //     return await blogModel
    //         .find({
    //             userId,
    //             isDelete: false,
    //         })
    //         .sort({
    //             createdAt: -1,
    //         })
    //         .lean<IBlog[]>();
    // }

    // async updateBlog(blogId: string, updateData: Partial<IBlog>): Promise<IBlog | null> {
    //     logger.info(`[BlogRepository] Updating blog ${blogId}`);

    //     const updatedBlog = await blogModel
    //         .findOneAndUpdate(
    //             {
    //                 _id: blogId,
    //                 isDelete: false,
    //             },
    //             {
    //                 $set: updateData,
    //             },
    //             {
    //                 new: true,
    //             }
    //         )
    //         .lean<IBlog>();

    //     logger.info(`[BlogRepository] Blog updated ${blogId}`);

    //     return updatedBlog;
    // }

    // async softDeleteBlog(blogId: string): Promise<IBlog | null> {
    //     logger.info(`[BlogRepository] Soft deleting blog ${blogId}`);

    //     const deletedBlog = await blogModel
    //         .findOneAndUpdate(
    //             {
    //                 _id: blogId,
    //             },
    //             {
    //                 $set: {
    //                     isDelete: true,
    //                 },
    //             },
    //             {
    //                 new: true,
    //             }
    //         )
    //         .lean<IBlog>();

    //     logger.info(`[BlogRepository] Blog soft deleted ${blogId}`);

    //     return deletedBlog;
    // }
}
