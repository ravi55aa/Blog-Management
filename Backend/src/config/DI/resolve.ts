import {container} from "tsyringe";
import AuthController from "../../Controllers/AuthController";


export const authController = container.resolve(AuthController);
