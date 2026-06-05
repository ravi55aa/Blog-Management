import type { IUserForm } from "../../Interface/IUser";
import { BaseService } from "./BaseService";

export class AuthService extends BaseService{

    static registerUser(){
        return this.post("/user/register",{} as IUserForm ,{});
    }

}