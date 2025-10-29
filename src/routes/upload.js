import { uploadMultiple } from '../middlewares/upload.js';
import { asyncHandler } from '../middlewares/errorHandler.js';
import express from 'express';

const router = express.Router();

/**
 * @swagger
 * /upload/images:
 *   post:
 *     tags: [Upload]
 *     summary: 다중 이미지 업로드 (최대 3개)
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 maxItems: 3
 *     responses:
 *       200:
 *         description: 업로드 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string }
 *                 images:
 *                   type: array
 *                   items:
 *                     type: string
 *       400:
 *         description: 업로드 실패
 */
// 다중 이미지 업로드 (최대 3개)
router.post(
  '/images',
  asyncHandler(async (req, res, next) => {
    uploadMultiple(req, res, err => {
      if (err) {
        return res.status(400).json({
          message: err.message || '이미지 업로드에 실패했습니다.',
        });
      }

      if (!req.files || req.files.length === 0) {
        return res.status(400).json({
          message: '최소 1개의 이미지를 업로드해야 합니다.',
        });
      }

      // 업로드된 이미지 URL 목록 생성
      const imageUrls = req.files.map(
        file => `/uploads/products/${file.filename}`,
      );

      res.status(200).json({
        message: '이미지 업로드 성공',
        images: imageUrls,
      });
    });
  }),
);

/**
 * @swagger
 * /upload/image:
 *   post:
 *     tags: [Upload]
 *     summary: 단일 이미지 업로드
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: 업로드 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string }
 *                 imageUrl: { type: string }
 *       400:
 *         description: 업로드 실패
 */
// 단일 이미지 업로드
router.post(
  '/image',
  asyncHandler(async (req, res, next) => {
    const { upload } = await import('../middlewares/upload.js');

    upload.single('image')(req, res, err => {
      if (err) {
        return res.status(400).json({
          message: err.message || '이미지 업로드에 실패했습니다.',
        });
      }

      if (!req.file) {
        return res.status(400).json({
          message: '이미지를 업로드해야 합니다.',
        });
      }

      const imageUrl = `/uploads/products/${req.file.filename}`;

      res.status(200).json({
        message: '이미지 업로드 성공',
        imageUrl,
      });
    });
  }),
);

export default router;
