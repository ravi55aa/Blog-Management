import { IBlog } from "../../Models/blogModel";
import { serviceReturnType } from "../../types/serviceReturnType"; 
import {Request} from "express";

//import {IUpdateBlogDTO } from "../Other/IBlog" 

export interface IBlogService {

    createBlog(
        req:Request
    ): Promise<serviceReturnType<Partial<IBlog>>>;

    // updateBlog(
    //     blogId: string,
    //     blogData: IUpdateBlogDTO
    // ): Promise<serviceReturnType<Partial<IBlog>>>;

    // deleteBlog(
    //     blogId: string
    // ): Promise<serviceReturnType<null>>;

    // getBlogById(
    //     blogId: string
    // ): Promise<serviceReturnType<Partial<IBlog>>>;

    // getBlogsByUser(
    //     userId: string
    // ): Promise<serviceReturnType<IBlog[]>>;
}