import type { HandleApiOptions } from "../../types/api.types";
import { handleApi } from "../global.api";

export class BaseService {

    protected static async request<TPayload, TResponse>({
        method,
        endPoint,
        payload,
        params
    }:HandleApiOptions<TPayload>
    ) {
        const config: HandleApiOptions<TPayload> = {
            method,
            endPoint,
            payload: payload ,
            params
        };

        return await handleApi<TPayload, TResponse>(config);
    }

    protected static get<TResponse>(endPoint: string,params?:Record<string,unknown>) {

        return this.request<null, TResponse>({
            method: 'get',
            endPoint,
            params: params ?? {}
        });

    }

    protected static post<TPayload, TResponse>(
        endPoint: string,
        payload: TPayload,
        params?:Record<string,unknown>
    ) {
        return this.request<TPayload, TResponse>({
        method: 'post',
        endPoint,
        payload,
        params:params||{}
        });
    }

    protected static put<TPayload, TResponse>(
        endPoint: string,
        payload: TPayload,
        params?:Record<string,unknown>
    ) {
        return this.request<TPayload, TResponse>({
        method: 'put',
        endPoint,
        payload,
        params:params||{}
        });
    }

    protected static patch<TPayload, TResponse>(
        endPoint: string,
        payload: TPayload,
        params?:Record<string,unknown>
    ) {
        return this.request<TPayload, TResponse>({
        method: 'patch',
        endPoint,
        payload,
        params:params||{}
        });
    }

    protected static delete<TResponse>(
        endPoint: string,
        params?:Record<string,unknown>
    ) {
        return this.request<null, TResponse>({
        method: 'delete',
        endPoint,
        params:params||{}
        });
    }
}
