import type { Request, Response, NextFunction } from 'express';
import { Router } from 'express';
import { authMiddleware } from '../Middleware/authMiddleare';
import { blogController } from '../config/DI/resolve';
const router = Router();

router.post('/create', authMiddleware, (req: Request, res: Response, next: NextFunction) =>
    blogController.createBlog(req, res, next)
);

router.put('/:blogId', authMiddleware, (req: Request, res: Response, next: NextFunction) =>
    blogController.updateBlog(req, res, next)
);

router.get('/', (req: Request, res: Response, next: NextFunction) =>
    blogController.getAllBlogs(req, res, next)
);

router.get('/my-blogs', authMiddleware, (req: Request, res: Response, next: NextFunction) =>
    blogController.getMyBlogs(req, res, next)
);

router.get('/:blogId', authMiddleware, (req: Request, res: Response, next: NextFunction) =>
    blogController.getABlog(req, res, next)
);

router.delete('/:blogId', authMiddleware, (req: Request, res: Response, next: NextFunction) =>
    blogController.deleteBlog(req, res, next)
);

export default router;
