import jwt from 'jsonwebtoken';
import env from './env.config';
import type { Request, Response } from 'express';
import { errorLogger, logger } from '../Utils/logger';
import type { IJwtPayload } from '../Interface/Other/IPayloadJwt';

const generateAccessToken = (payload: IJwtPayload): string => {
    return jwt.sign(payload, env.JWT_SECRET as string, {
        expiresIn: '15m',
    });
};

const generateRefreshToken = (payload: IJwtPayload): string => {
    return jwt.sign(payload, env.REFRESH_TOKEN_SECRET as string, {
        expiresIn: '7d',
    });
};

//handle token generation and sending response
export const handleJwtTokensGenerator = (payload: IJwtPayload, req: Request, res: Response) => {
    const token = generateAccessToken(payload);

    const refreshToken = generateRefreshToken(payload);

    //store in req.cookie
    res.cookie('token', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        path: '/',
        sameSite: 'lax',
        secure: false,
    });

    //store in session.refreshToken
    req.user = { userId: payload.id, ...payload };
    req.session.refreshToken = refreshToken;

    return { token, refreshToken };
};

export const handleVerifyToken = (token: string, secret: string) => {
    try {
        const decoded = jwt.verify(token, secret);
        return decoded;
    } catch (error) {
        errorLogger.error(error);
        throw new Error('Invalid token');
    }
};

export const handleCreateNewAccessToken = (refreshToken: string) => {
    try {
        const decoded = handleVerifyToken(
            refreshToken,
            env.REFRESH_TOKEN_SECRET as string
        ) as IJwtPayload;

        const newAccessToken = generateAccessToken(decoded);
        logger.info('New access token generated 📦');

        //store token res.cookie
        //iam doing this at the authMiddleware

        return newAccessToken;
    } catch (error) {
        //issue in refresh token is invalid or expired
        errorLogger.error(error);
        throw new Error('Session is done kindly re-login');
    }
};

export const handleDecodeToken = (req: Request) => {
    try {
        const token = req.cookies.token;

        const decoded = handleVerifyToken(token, env.JWT_SECRET as string) as IJwtPayload;

        return decoded;
    } catch (error) {
        //issue in refresh token is invalid or expired
        errorLogger.error(error);
        throw new Error('Session is done kindly re-login');
    }
};
