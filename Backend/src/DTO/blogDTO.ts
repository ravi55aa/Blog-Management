import { IBlog } from "../Models/blogModel";

class BlogDTO {
    //createBlog =>{all three} + updateblog+editBlog =>{partial of three} + validation(payload);

    static createBlog(payload:Partial<IBlog>):Partial<IBlog>{
        const dto={
            ...(payload.title && {title:payload.title}),
            ...(payload.contentHtml && {contentHtml:payload.contentHtml}),
            ...(payload.contentDelta && {contentDelta:payload.contentDelta}),
        }

        return dto;
    }
}

export default BlogDTO;