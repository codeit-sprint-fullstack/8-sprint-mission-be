/**
 * @swagger
 * /upload/image:
 *   post:
 *     summary: 단일 이미지 업로드
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - image
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: 업로드할 이미지 파일
 *     responses:
 *       200:
 *         description: 이미지 업로드 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     url:
 *                       type: string
 *                       description: 이미지 URL
 *                     filename:
 *                       type: string
 *                     originalname:
 *                       type: string
 *                     mimetype:
 *                       type: string
 *                     size:
 *                       type: integer
 *       400:
 *         description: 이미지 파일이 없거나 잘못된 형식
 *       401:
 *         description: 인증 실패
 */

/**
 * @swagger
 * /upload/images:
 *   post:
 *     summary: 다중 이미지 업로드
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - images
 *             properties:
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: 업로드할 이미지 파일들 (최대 10개)
 *     responses:
 *       200:
 *         description: 이미지 업로드 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       url:
 *                         type: string
 *                       filename:
 *                         type: string
 *                       originalname:
 *                         type: string
 *                       mimetype:
 *                         type: string
 *                       size:
 *                         type: integer
 *       400:
 *         description: 이미지 파일이 없거나 잘못된 형식
 *       401:
 *         description: 인증 실패
 */

import { Router } from "express";
import upload from "../middlewares/upload.js";
import uploadController from "../controllers/uploadController.js";
import { authenticate } from "../middlewares/authenticate.js";

const router = Router();

// 단일 이미지 업로드
router.post(
  "/upload/image",
  authenticate,
  upload.single("image"),
  uploadController.uploadImage
);

// 다중 이미지 업로드 (최대 10개)
router.post(
  "/upload/images",
  authenticate,
  upload.array("images", 10),
  uploadController.uploadImages
);

export default router;
