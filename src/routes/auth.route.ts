import Router from 'express';
import {
  getMyInfoController,
  logoutController,
  signinController,
  signupController,
} from '../controllers/auth.controller';
import { validateBody } from '../middlewares/validator.middleware';
import { signinSchema, signupSchema } from '../validators/auth.validator';
import { verifyAccessToken } from '../middlewares/auth.middleware';

const router = Router();

router.get('/me', verifyAccessToken, getMyInfoController);
router.post('/signup', validateBody(signupSchema), signupController);
router.post('/signin', validateBody(signinSchema), signinController);
router.post('/logout', logoutController);

export default router;
