
import type { IDBBlog } from "../../Interface/IBlog";
import { BaseService } from "./BaseService";

export class BlogService extends BaseService{

    static createBlog(blogPayload:{title: string,contentHtml: string,contentDelta: unknown}){
        return this.post("/blog/create",blogPayload ,{});
    }

    static getABlog(blogId:string){
        return this.get<IDBBlog>("/blog/get",{blogId:blogId});
    }

    // static login(userPayload:{email:string,password:string}){
    //     return this.post("/auth/login",userPayload ,{});
    // }
}