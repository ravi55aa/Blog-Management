import { BaseService } from "./BaseService";

export class BlogService extends BaseService{

    static createBlog(blogPayload:{title: string,contentHtml: string,contentDelta: unknown}){
        return this.post("/blog/create",blogPayload ,{});
    }

    // static login(userPayload:{email:string,password:string}){
    //     return this.post("/auth/login",userPayload ,{});
    // }
}