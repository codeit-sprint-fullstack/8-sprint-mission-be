import express from 'express';
import { userController } from '../controllers/userController.js';
import { asyncHandler } from '../middlewares/errorHandler.js';
import { validateUser, validateUUID } from '../middlewares/validation.js';

const router = express.Router();

// 사용자 목록 조회
router.get('/', asyncHandler(userController.getUsers));

// 사용자 등록
router.post('/', validateUser, asyncHandler(userController.createUser));

// 사용자 단건 조회
router.get('/:id', validateUUID, asyncHandler(userController.getUserById));

// 사용자 수정
router.patch('/:id', validateUUID, asyncHandler(userController.updateUser));

// 사용자 삭제
router.delete('/:id', validateUUID, asyncHandler(userController.deleteUser));

export default router;
