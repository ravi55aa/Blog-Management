//import { Types } from "mongoose";
import { IBlog } from "../../Models/blogModel"; 

export interface IBlogRepository {

    createBlog(
        blogData: Partial<IBlog>
    ): Promise<IBlog|null>;

    // findById(
    //     blogId: string
    // ): Promise<IBlog | null>;

    // findByUserId(
    //     userId: Types.ObjectId
    // ): Promise<IBlog[]>;

    // updateBlog(
    //     blogId: string,
    //     updateData: Partial<IBlog>
    // ): Promise<IBlog | null>;

    // softDeleteBlog(
    //     blogId: string
    // ): Promise<IBlog | null>;
}