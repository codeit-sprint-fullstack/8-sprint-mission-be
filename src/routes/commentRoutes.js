import express from "express";
import {
  updateComment,
  deleteComment,
} from "../controllers/commentController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import { checkOwnership } from "../middlewares/ownership.js";

const router = express.Router();

// 댓글 수정 (작성자만)
router.patch(
  "/:id",
  authMiddleware,
  checkOwnership("comment"),
  asyncHandler(updateComment)
);
// 댓글 삭제 (작성자만)
router.delete(
  "/:id",
  authMiddleware,
  checkOwnership("comment"),
  asyncHandler(deleteComment)
);

export default router;
