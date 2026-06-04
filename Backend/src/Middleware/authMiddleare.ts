import {Request,Response,NextFunction} from "express";
import { NotFoundError } from "./narrowDownError";

const handleAuthMiddleware =
(req:Request,res:Response,next:NextFunction)=>{
    try {
        const accessToken = req.cookies.token;

        if(!accessToken) {
            throw new NotFoundError("Access token is missing");
        }

        //refreshToken =
        //session config;
        //token create while register
        
    } catch (error) {

    }
} 