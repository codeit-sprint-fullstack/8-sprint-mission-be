import Router from 'express';
import { refreshAccessTokenController } from '../controllers/token.controller';

const router = Router();

router.post('/refresh', refreshAccessTokenController);

export default router;
