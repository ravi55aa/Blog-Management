import type { Request, Response, NextFunction } from 'express';
import { Router } from 'express';
import { authController } from '../config/DI/resolve';
import { authMiddleware } from '../Middleware/authMiddleare';

const router = Router();

router.post('/login', (req: Request, res: Response, next: NextFunction) =>
    authController.loginUser(req, res, next)
);

router.post('/register', (req: Request, res: Response, next: NextFunction) =>
    authController.registerUser(req, res, next)
);

router.get('/me', authMiddleware, (req: Request, res: Response) =>
    authController.currentUser(req, res)
);

router.post('/logout', (req: Request, res: Response) => authController.logout(req, res));

export default router;
