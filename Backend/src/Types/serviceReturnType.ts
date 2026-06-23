import type { IReturnType } from './returnType';

export interface serviceReturnType<T> {
    status: number;
    responseBody: IReturnType<T>;
}
