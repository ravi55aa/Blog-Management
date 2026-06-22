import { injectable, inject } from 'tsyringe';
import { IUser } from '../Interface/ISchemas/IUserSchema';
import { IAuthService } from '../Interface/IServices/IAuthService';
import userModel from '../Models/userModel';
import TYPES from '../config/DI/types';
import { IAuthRepository } from '../Interface/IRepository/IAuthRepository';
import { Request, Response } from 'express';
import { UserDto } from '../DTO/UserDto';
import { compareHashPassword, hashPassword } from '../Utils/bcrypt';
import { serviceReturnType } from '../types/serviceReturnType';
import { ApiResponse } from '../Helper/ApiResponse';
import { handleJwtTokensGenerator } from '../config';
import { BadRequestError, FailureError, NotFoundError } from '../Middleware/narrowDownError';
import { AuthMessage } from '../Constant/ResponseMessage';

@injectable()
class AuthService implements IAuthService {
    constructor(
        @inject(TYPES.AuthRepository)
        private _authRepository: IAuthRepository
    ) {}

    async userRegister(req: Request, res: Response): Promise<serviceReturnType<IUser>> {
        const userData: Partial<IUser> = UserDto.registerUser(req);
        //! validation

        // If User Exists
        const existingUser = await userModel.findOne({ email: userData.email! }).lean<IUser>();

        if (existingUser) {
            throw new Error(AuthMessage.EmailExists);
        }

        userData.password = await hashPassword(userData.password!);

        // Create new user
        const user: Partial<IUser> = {
            name: userData.name!,
            email: userData.email!,
            password: userData.password!,
            googleId: userData.googleId!,
        };

        const newUser = new userModel(user);

        await newUser.save();

        const payload = {
            id: String(newUser._id),
            name: newUser.name,
            email: newUser.email,
        };

        //create Token + session for refreshToken
        handleJwtTokensGenerator(payload, req, res);

        return ApiResponse.created(newUser.toObject() as IUser);
    }

    //token generation :controller while login
    async userLogin(loginCredential: {
        email: string;
        password: string;
    }): Promise<serviceReturnType<IUser>> {
        //validation:

        const { email, password } = loginCredential;

        if (!email.trim() || !password.trim() || password.length < 6) {
            throw new BadRequestError(AuthMessage.InvalidCredentials);
        } //replace by zod

        const user: IUser | null = await userModel.findOne({ email }).lean<IUser>();

        if (!user || !user.password) {
            throw new NotFoundError(AuthMessage.not_Found);
        }

        const isPasswordVerify = await compareHashPassword(password, user.password);

        if (!isPasswordVerify) {
            throw new FailureError(AuthMessage.InvalidCurrentPassword);
        }

        return ApiResponse.success<IUser>(user, AuthMessage.UserLoggedIn);
    }
}

export default AuthService;
