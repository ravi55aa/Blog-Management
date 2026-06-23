import type { Request, Response } from 'express';
import type { serviceReturnType } from '../../types/serviceReturnType';
import type { IUser } from '../ISchemas/IUserSchema';

export interface IAuthService {
    userRegister(req: Request, res: Response): Promise<serviceReturnType<IUser>>;

    userLogin(loginCredential: {
        email: string;
        password: string;
    }): Promise<serviceReturnType<IUser>>;

    // refreshAccessToken(refreshToken: string): Promise<string>;
    // logoutUser(refreshToken: string): Promise<void>;
}
