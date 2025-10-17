import Router from 'express';
import { signup, signin, refreshToken } from '../controllers/authControllers.js';

const router = Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/refresh', refreshToken);

export default router;
