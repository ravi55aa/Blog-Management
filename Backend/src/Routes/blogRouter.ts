import { Router } from "express";
import { authMiddleware } from "../Middleware/authMiddleare";
import { blogController } from "../config/DI/resolve";
const router=Router();

router.post("/create",authMiddleware,blogController.CreateBlog)

export default router; 