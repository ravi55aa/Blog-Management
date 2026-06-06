import { Router } from "express";
import { authController } from "../config/DI/resolve";
import { Request,Response,NextFunction } from "express";

const router=Router();

router.post('/login', 
    (req:Request,res:Response,next:NextFunction)=>authController.loginUser(req,res,next));

    
router.post('/register', 
    (req:Request,res:Response,next:NextFunction)=>authController.registerUser
(req,res,next));

export default router;