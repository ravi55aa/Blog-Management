import { Request, Response } from 'express';
import { serviceReturnType } from '../../types/serviceReturnType';

export interface IAuthService {
    registerUser(req: Request, res: Response): Promise<serviceReturnType>;

    // loginUser(email: string, password: string): Promise<{ accessToken: string; refreshToken: string }>;
    // refreshAccessToken(refreshToken: string): Promise<string>;
    // logoutUser(refreshToken: string): Promise<void>;
}
