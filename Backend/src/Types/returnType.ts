export interface IReturnType<T> {
    success:boolean
    error : { message:string } | null
    message :string | null
    data :T
}