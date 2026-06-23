import { StatusCodes } from '../Constant/StatusCode';
import type { IReturnType } from '../types/returnType';

export class ApiResponse {
    static success<T>(data: T, message: string): { status: number; responseBody: IReturnType<T> } {
        return {
            status: StatusCodes.OK,
            responseBody: {
                data,
                message,
                error: null,
                success: true,
            },
        };
    }

    static unAuthorized(message = 'User unauthorized') {
        return {
            status: StatusCodes.UNAUTHORIZED,
            responseBody: {
                success: true,
                data: null,
                error: null,
                message,
            },
        };
    }

    static forbidden(message = 'Method forbidden') {
        return {
            status: StatusCodes.FORBIDDEN,
            responseBody: {
                success: true,
                data: null,
                error: null,
                message,
            },
        };
    }

    static noContent(message = 'No content') {
        return {
            status: StatusCodes.NO_CONTENT,
            responseBody: {
                success: true,
                data: null,
                error: null,
                message,
            },
        };
    }

    static created<T>(data: T) {
        return {
            status: StatusCodes.CREATED,
            responseBody: {
                success: true,
                data,
                error: null,
                message: 'Created Successfully',
            },
        };
    }

    static notFound(message = 'Resource not found') {
        return {
            status: StatusCodes.NOT_FOUND,
            responseBody: {
                success: false,
                data: null,
                error: message,
                message,
            },
        };
    }

    static failure(message = 'Something went wrong') {
        return {
            status: StatusCodes.BAD_REQUEST,
            responseBody: {
                success: false,
                data: null,
                error: message,
                message,
            },
        };
    }

    static badRequest(message = 'Bad Request') {
        return {
            status: StatusCodes.BAD_REQUEST,
            responseBody: {
                success: false,
                data: null,
                error: 'BAD_REQUEST',
                message,
            },
        };
    }

    static toManyRequest(message = 'To many request') {
        return {
            status: StatusCodes.RATE_LIMIT,
            responseBody: {
                success: false,
                data: null,
                error: message,
                message,
            },
        };
    }

    static internalServerError(message = 'Internal server error') {
        return {
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            responseBody: {
                success: false,
                data: null,
                error: message,
                message,
            },
        };
    }

    static serviceUnavailable(message = 'Service temporarily unavailable') {
        return {
            status: StatusCodes.SERVICE_UNAVAILABLE,
            responseBody: {
                success: false,
                data: null,
                error: message,
                message,
            },
        };
    }

    static gatewayTimeout(message = 'Gateway timeout') {
        return {
            status: StatusCodes.GATEWAY_TIMEOUT,
            responseBody: {
                success: false,
                data: null,
                error: message,
                message,
            },
        };
    }
}
