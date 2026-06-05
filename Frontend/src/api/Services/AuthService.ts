import type { IUserForm } from "../../Interface/IUser";
import { BaseService } from "./BaseService";

export class AuthService extends BaseService{

    static register(userPayload:IUserForm){
        return this.post("/auth/register",userPayload ,{});
    }

}