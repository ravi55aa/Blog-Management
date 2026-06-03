import jwt from "jsonwebtoken";
import env from "./env.config";
import { Request, Response } from "express";

interface IJwtPayload {
    id: string;
    email: string;
    role: string;
}

export const generateAccessToken = (payload: IJwtPayload): string => {
    return jwt.sign(payload, env.JWT_SECRET as string, {
        expiresIn: "15m",
    });
};

export const generateRefreshToken = (payload: IJwtPayload): string => {
    return jwt.sign(payload, env.REFRESH_TOKEN_SECRET as string, {
        expiresIn: "7d",
    });
};


//Verify token

export const verifyAccessToken = (
    token: string
) => {
    return jwt.verify( 
        token,
        env.JWT_SECRET as string
    );
};

export const verifyRefreshToken = (
    token: string
) => {
    return jwt.verify(
        token,
        env.REFRESH_TOKEN_SECRET as string
    );
};


//handle token generation and sending response
const handleJwtTokensGenerator = (payload: IJwtPayload, req: Request, res: Response) => {
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    return {accessToken, refreshToken};
};

const handleVerifyToken = (token: string, secret: string) => {
    try {
        const decoded = jwt.verify(token, secret);
        return decoded;
    } catch (error) {
        throw new Error("Invalid token");
    }
};

const handleCreateNewAccessToken = (refreshToken: string) => {
    try {
        const decoded = handleVerifyToken(refreshToken, env.REFRESH_TOKEN_SECRET as string) as IJwtPayload;

        const newAccessToken = generateAccessToken(decoded);

        return newAccessToken;
        
    } catch (error) {
        //issue in refresh token is invalid or expired
        throw new Error("Invalid refresh token");
    }
};
