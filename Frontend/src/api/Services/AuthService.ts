import type { IUserForm } from "../../Interface/IUser";
import { BaseService } from "./BaseService";

export class AuthService extends BaseService {
    static register(userPayload: IUserForm) {
        return this.post("/auth/register", userPayload, {});
    }

    static login(userPayload: { email: string; password: string }) {
        return this.post("/auth/login", userPayload, {});
    }

    static getCurrentUser() {
        return this.get("/auth/me");
    }

    static logout() {
        return this.post("/auth/logout", {}, {});
    }
}
