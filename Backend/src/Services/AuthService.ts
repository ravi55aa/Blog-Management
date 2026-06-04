import { injectable,inject } from "tsyringe";
import { IUser } from "../Interface/ISchemas/IUserSchema";
import { IAuthService } from "../Interface/IServices/IAuthService";
import userModel from "../Models/userModel";
import TYPES from "../config/DI/types";
import { IAuthRepository } from "../Interface/IRepository/IAuthRepository";
import { Request } from "express";
import { UserDto } from "../DTO/UserDto";
import { hashPassword } from "../Utils/bcrypt";
import { serviceReturnType } from "../Types/serviceReturnType";
import { ApiResponse } from "../Helper/ApiResponse";


@injectable()
class AuthService implements IAuthService {

    constructor(
        @inject(TYPES.AuthRepository)
        private _authRepository: IAuthRepository
    ) {}

    async registerUser(req:Request): Promise<serviceReturnType> { 

        const userData:Partial<IUser> = UserDto.registerUser(req);
        //! validation
        
        // If User Exists
        const existingUser = await userModel.findOne({ email: userData.email! }).lean<IUser>();
        
        
        if (existingUser) {
            throw new Error("User already exists");
        } 

        userData.password = await hashPassword(userData.password!);
        
        // Create new user
        const user: Partial<IUser> = { 
            name: userData.name!, 
            email: userData.email!, 
            password: userData.password!, 
            googleId: userData.googleId! };

        const newUser = new userModel(user);

        await newUser.save();

        return ApiResponse.created(newUser.toObject() as IUser);
    }
}

export default AuthService;