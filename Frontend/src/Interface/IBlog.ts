export interface IBlog {
    _id?:string;
    title: string;
    content: string;
}
export interface IDBBlog {
    _id?:string;
    title:string;
    contentDelta: object;
    contentHtml:string;
}
