import { Router,Request,Response,NextFunction } from "express";
import { authMiddleware } from "../Middleware/authMiddleare";
import { blogController } from "../config/DI/resolve";
const router=Router();

router.post("/create",authMiddleware,(req:Request,res:Response,next:NextFunction)=>blogController.createBlog(req,res,next));

export default router; 