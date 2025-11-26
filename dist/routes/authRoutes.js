import express from "express";
import { register, login, refreshAccessToken, } from "../controllers/authController.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";
const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: 사용자 인증 관련 API
 */
/**
 * @swagger
 * /auth/signUp:
 *   post:
 *     summary: 회원가입
 *     description: 이메일, 닉네임, 비밀번호를 입력해 새 사용자를 등록합니다.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - nickname
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               nickname:
 *                 type: string
 *                 example: pandaUser
 *               password:
 *                 type: string
 *                 format: password
 *                 example: mySecurePassword123
 *     responses:
 *       201:
 *         description: 회원가입 완료
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 회원가입 완료
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     email:
 *                       type: string
 *                     nickname:
 *                       type: string
 *       400:
 *         description: 잘못된 요청 또는 이미 등록된 이메일
 */
router.post("/signUp", asyncHandler(register));
/**
 * @swagger
 * /auth/signIn:
 *   post:
 *     summary: 로그인
 *     description: 등록된 이메일과 비밀번호를 입력하여 JWT 토큰을 발급받습니다.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: mySecurePassword123
 *     responses:
 *       200:
 *         description: 로그인 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 로그인 성공
 *                 token:
 *                   type: string
 *                   description: JWT 인증 토큰
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     email:
 *                       type: string
 *                     nickname:
 *                       type: string
 *       401:
 *         description: 이메일 또는 비밀번호 불일치
 */
router.post("/signIn", asyncHandler(login));
/**
 * @swagger
 * /auth/refresh-token:
 *   post:
 *     summary: "Access Token 갱신"
 *     description: "Refresh Token을 사용해 새로운 Access Token을 발급합니다."
 *     tags: [Auth]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 description: "Refresh Token (쿠키 또는 body 중 하나)"
 *     responses:
 *       200:
 *         description: "새로운 Access Token 발급 성공"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *       400:
 *         description: "리프레시 토큰이 제공되지 않음"
 *       401:
 *         description: "토큰 검증 실패 또는 만료"
 */
router.post("/refresh-token", refreshAccessToken);
export default router;
