import { injectable } from "tsyringe";
import { IUser } from "../Interface/ISchemas/IUserSchema";
import { IAuthService } from "../Interface/IServices/IAuthService";
import userModel from "../Models/userModel";

@injectable
class AuthService implements IAuthService {

    constructor(repository:any)
    {}

    async registerUser(name: string, email: string, password: string, role: string): Promise<{ accessToken: string; refreshToken: string }> {

        // Check if user already exists
        const existingUser = await userModel.findOne({ email }).lean<IUser>();

        if (existingUser) {
            throw new Error("User already exists");
        }

        // Create new user
        const newUser = new userModel({ name, email, password, role });

        await newUser.save();

        // Generate tokens
        const accessToken = await newUser.generateAccessToken();
        const refreshToken = await newUser.generateRefreshToken();

        return { accessToken, refreshToken };
    }
}

export default AuthService;