import type { IDBBlog } from "../../Interface/IBlog";
import { BaseService } from "./BaseService";

export class BlogService extends BaseService {
    static createBlog(blogPayload: {
        title: string;
        contentHtml: string;
        contentDelta: unknown;
    }) {
        return this.post("/blog/create", blogPayload, {});
    }

    static getABlog(blogId: string) {
        return this.get<IDBBlog>(`/blog/get/${blogId}`);
    }

    static updateBlog(
        blogId: string,
        blogPayload: {
        title: string;
        contentHtml: string;
        contentDelta: unknown;
        },
    ) {
        return this.put(`/blog/${blogId}`, blogPayload, {});
    }

    static getAllBlogs() {
        return this.get<IDBBlog[]>("/blog");
    }

    static getMyBlogs() {
        return this.get<IDBBlog[]>("/blog/my-blogs");
    }

    static deleteBlog(blogId: string) {
        return this.delete(`/blog/${blogId}`);
    }
}
