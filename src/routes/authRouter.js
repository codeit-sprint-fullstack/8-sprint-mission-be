import Router from 'express';
import { signup, signin, refreshToken } from '../controllers/authControllers.js';
import { signupValidator, signinValidator } from '../middlewares/validate/authValidator.js';
import { handleValidation } from '../middlewares/validate/index.js';

const router = Router();

router.post('/signup', signupValidator, handleValidation, signup);
router.post('/signin', signinValidator, handleValidation, signin);
router.post('/refresh', refreshToken);

export default router;
