import { Router } from 'express';
import { handleAuthCallback, handleOAuth } from '../config/Oauth';
const router = Router();

//google
router.get('/auth', handleOAuth);
router.get('/callback', handleAuthCallback);

//facebook
//git
export default router;
