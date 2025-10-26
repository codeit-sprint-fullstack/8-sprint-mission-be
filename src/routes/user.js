import express from 'express';
import { userController } from '../controllers/userController.js';
import { asyncHandler } from '../middlewares/errorHandler.js';
import {
  validateUser,
  validateUUID,
  validateLogin,
} from '../middlewares/validation.js';

const router = express.Router();

/**
 * @swagger
 * /auth/signIn:
 *   post:
 *     tags: [Auth]
 *     summary: 로그인
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email: { type: string, format: email }
 *               password: { type: string }
 *     responses:
 *       200:
 *         description: 로그인 성공
 *         headers:
 *           Set-Cookie:
 *             description: refreshToken 쿠키
 *             schema:
 *               type: string
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken: { type: string }
 *                 user: { $ref: '#/components/schemas/User' }
 *       400:
 *         description: 유효하지 않은 요청
 *       401:
 *         description: 인증 실패
 */
// 로그인
router.post('/signIn', validateLogin, asyncHandler(userController.login));

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     tags: [Auth]
 *     summary: 로그아웃
 *     responses:
 *       200:
 *         description: 로그아웃 성공
 *         headers:
 *           Set-Cookie:
 *             description: refreshToken 쿠키 삭제
 *             schema:
 *               type: string
 */
// 로그아웃
router.post('/logout', asyncHandler(userController.logout));

/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     tags: [Auth]
 *     summary: 토큰 갱신
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: 토큰 갱신 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken: { type: string }
 *       401:
 *         description: 유효하지 않은 리프레시 토큰
 */
// 토큰 갱신
router.post('/refresh', asyncHandler(userController.refreshToken));

/**
 * @swagger
 * /auth/signUp:
 *   post:
 *     tags: [Auth]
 *     summary: 회원가입
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, nickname, password, passwordConfirmation]
 *             properties:
 *               email: { type: string, format: email }
 *               nickname: { type: string }
 *               password: { type: string, minLength: 8 }
 *               passwordConfirmation: { type: string }
 *     responses:
 *       201:
 *         description: 회원가입 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: 유효하지 않은 요청
 *       409:
 *         description: 이미 존재하는 이메일
 */
// 사용자 등록
router.post('/signUp', validateUser, asyncHandler(userController.createUser));

/**
 * @swagger
 * /auth/{id}:
 *   get:
 *     tags: [User]
 *     summary: 사용자 단건 조회
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: 사용자를 찾을 수 없음
 */
// 사용자 단건 조회
router.get('/:id', validateUUID, asyncHandler(userController.getUserById));

/**
 * @swagger
 * /auth/{id}:
 *   patch:
 *     tags: [User]
 *     summary: 사용자 수정
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nickname: { type: string }
 *               password: { type: string }
 *     responses:
 *       200:
 *         description: 수정 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: 사용자를 찾을 수 없음
 */
// 사용자 수정
router.patch('/:id', validateUUID, asyncHandler(userController.updateUser));

/**
 * @swagger
 * /auth/{id}:
 *   delete:
 *     tags: [User]
 *     summary: 사용자 삭제
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       204:
 *         description: 삭제 성공
 *       404:
 *         description: 사용자를 찾을 수 없음
 */
// 사용자 삭제
router.delete('/:id', validateUUID, asyncHandler(userController.deleteUser));

export default router;
