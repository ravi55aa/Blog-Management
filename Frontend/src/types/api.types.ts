export type HttpMethod = "get" | "post" | "put" | "patch" | "delete";

// export enum HttpMethodType  {
//     "GET"="get", 
//     "POST"="post", 
//     "PUT"="put" ,
//     "PATCH"="patch", 
//     "DELETE"="delete"
// } 

export interface HandleApiOptions<TRequestData> {
    method: HttpMethod;
    endPoint: string;
    payload?: TRequestData;
    headers?: Record<string, string>;
    params?: Record<string, unknown >;
}

export interface IResponse<T> {
    success?: boolean;
    message?: string;
    data?: T | null;
    error?: string | unknown;
}