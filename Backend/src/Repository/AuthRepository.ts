import { IAuthRepository } from "../Interface/IRepository/IAuthRepository";
import { injectable } from "tsyringe";

@injectable()
class AuthRepository implements IAuthRepository {
    
    async createUser(name: string, email: string, password: string, role: string): Promise<{ id: string; name: string; email: string; role: string }> {

        // Simulate database operation
        const newUser = {
            id: "generated-id",
            name,
            email,
            role,
        };
        return newUser;
    }

}

export default AuthRepository; 