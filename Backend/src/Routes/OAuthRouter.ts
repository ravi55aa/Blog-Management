import { Router } from 'express';
import { handleAuthCallback, handleOAuth } from '../config/Oauth';
const router = Router();

//google
router.get('/auth', handleOAuth);
router.get('/auth/callback', handleAuthCallback);

//facebook
//git
export default router;
