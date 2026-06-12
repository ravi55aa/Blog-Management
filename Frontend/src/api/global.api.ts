import type { AxiosError, AxiosRequestConfig } from "axios";
import { axiosBaseURL } from "../config/axios.config";
import type { HandleApiOptions, IResponse } from "../types/api.types";

export const handleApi = async <TRequest = unknown, TData = unknown>(
    options: HandleApiOptions<TRequest>,
    ): Promise< IResponse<TData>> => {

        try {
            const config: AxiosRequestConfig = {
                url: options.endPoint,
                method: options.method,
                data: options.payload,
                params: options.params,
                headers: options.headers,
            };

        const response = await axiosBaseURL<IResponse<TData>>(config);

        return response.data;
    
    } catch (err) {

        const error = err as AxiosError;
        const res = error.response?.data as IResponse<TData>;

        return {
            success: false,
            error: res.error , //mention the error type, for now its UNKNOWN
        };
    }
};
