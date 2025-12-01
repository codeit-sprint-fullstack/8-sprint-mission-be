import express from "express";
import {
  updateComment,
  deleteComment,
} from "../controllers/commentController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import { checkOwnership } from "../middlewares/ownership.js";

const router = express.Router();

/**
 * @swagger
 * /comments/{id}:
 *   patch:
 *     summary: 댓글 수정
 *     description: 작성자 본인만 댓글 내용을 수정할 수 있습니다.
 *     tags: [Comment]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: 수정할 댓글의 ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *                 example: "수정된 댓글 내용입니다."
 *     responses:
 *       200:
 *         description: 댓글 수정 완료
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 댓글 수정 완료
 *                 comment:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: cmnt_123456
 *                     content:
 *                       type: string
 *                       example: 수정된 댓글 내용입니다.
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2025-10-26T09:30:00.000Z
 *                     writer:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: user_123
 *                         nickname:
 *                           type: string
 *                           example: 홍길동
 *                         image:
 *                           type: string
 *                           example: "https://example.com/default-profile.png"
 *       401:
 *         description: 인증 실패 (토큰 누락 또는 만료)
 *       403:
 *         description: 권한 없음 (작성자 아님)
 *       404:
 *         description: 존재하지 않는 댓글
 *
 *   delete:
 *     summary: 댓글 삭제
 *     description: 작성자 본인만 댓글을 삭제할 수 있습니다.
 *     tags: [Comment]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: 삭제할 댓글의 ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 댓글 삭제 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 댓글이 삭제되었습니다
 *       401:
 *         description: 인증 실패 (토큰 누락 또는 만료)
 *       403:
 *         description: 권한 없음 (작성자 아님)
 *       404:
 *         description: 존재하지 않는 댓글
 */
router.patch(
  "/:id",
  authMiddleware,
  checkOwnership("comment"),
  asyncHandler(updateComment)
);
router.delete(
  "/:id",
  authMiddleware,
  checkOwnership("comment"),
  asyncHandler(deleteComment)
);

export default router;
