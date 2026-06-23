export interface IBlog {
    _id?:string;
    title: string;
    content: string;
}

export type IPartialUser = {name:string,email:string,_id:string};

export interface IDBBlog {
    _id?:string;
    title:string;
    contentDelta: object;
    contentHtml:string;
    createdAt?:string;
    userId?: string | IPartialUser;
}
