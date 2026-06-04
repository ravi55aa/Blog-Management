import {Request} from "express";
import { serviceReturnType } from "../../Types/serviceReturnType";

export interface IAuthService {
    registerUser(req:Request): Promise<serviceReturnType>;

    // loginUser(email: string, password: string): Promise<{ accessToken: string; refreshToken: string }>;
    // refreshAccessToken(refreshToken: string): Promise<string>;
    // logoutUser(refreshToken: string): Promise<void>;
}