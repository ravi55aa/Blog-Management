import { Request, Response, NextFunction } from 'express';
import { NotFoundError } from './narrowDownError';
import { logger } from '../Utils/logger';
import { StatusCodes } from '../Constant/StatusCode';
import { env, handleCreateNewAccessToken, handleVerifyToken } from '../config';
import { IJwtPayload } from '../Interface/Other/IPayloadJwt';
import { JwtPayload } from 'jsonwebtoken';
import { AuthMessage } from '../Constant/ResponseMessage';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const accessToken = req.cookies.token; //expired token back-listing

        if (!accessToken) {
            logger.warn(
                {
                    path: req.originalUrl,
                },
                'Access token missing'
            );

            return res.status(StatusCodes.UNAUTHORIZED).json({
                success: false,
                message: 'User Unauthorized',
            });
        }

        /* ========Try Verify Access Token========= */
        try {
            const decoded = handleVerifyToken(accessToken, env.JWT_SECRET!) as IJwtPayload;

            if (decoded && req.user) {
                req.user.email = decoded.email;
                req.user.userId = decoded.id;
                req.user.name = decoded.name;
            }

            return next();
        } catch (accessError: unknown) {
            /* Token expired ; try refresh */
            if (accessError instanceof Error && accessError.name !== 'TokenExpiredError') {
                logger.warn({ error: accessError.message }, AuthMessage.InvalidAccessToken);

                return res.status(StatusCodes.UNAUTHORIZED).json({
                    success: false,
                    message: 'Invalid authentication token',
                });
            }
        }

        /* ===========Refresh Flow========== */
        const refreshToken = req.session?.refreshToken;

        if (!refreshToken) {
            logger.warn('Refresh token missing');

            return res.status(StatusCodes.UNAUTHORIZED).json({
                success: false,
                message: 'Session expired. Please login again.',
            });
        }

        const newAccessToken = handleCreateNewAccessToken(refreshToken);

        if (!newAccessToken) {
            logger.warn('Failed to generate new access token');

            return res.status(StatusCodes.UNAUTHORIZED).json({
                success: false,
                message: 'Session expired. Please login again.',
            });
        }

        /* ===========Set New Access Token Cookie============*/
        res.cookie('token', newAccessToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 2 * 60 * 1000, // 2 minutes (consider moving to env)
        });

        const decoded = handleVerifyToken(newAccessToken, env.JWT_SECRET!) as JwtPayload;

        if (decoded && req.user) {
            req.user.email = decoded.email;
            req.user.name = decoded.name;
            req.user.userId = decoded.id;
        }

        logger.info({ userId: decoded?.id }, 'NewTokenGenerated🆕🎫');

        return next();
    } catch (error) {
        logger.error(
            {
                error: error,
                path: req.originalUrl,
            },
            'Auth middleware unexpected error'
        );

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Internal authentication error',
        });
    }
};
