import Router from 'express';
import {
  getMyInfoController,
  signinController,
  signupController,
} from '../controllers/auth.controller';
import { validate } from '../middlewares/validator.middleware';
import { signinSchema, signupSchema } from '../validators/auth.validator';
import { verifyAccessToken } from '../middlewares/auth.middleware';

const router = Router();

// TODO: 로그아웃 로직 추가
router.get('/me', verifyAccessToken, getMyInfoController);
router.post('/signup', validate(signupSchema), signupController);
router.post('/signin', validate(signinSchema), signinController);

export default router;
