import { Router } from "express";
import commentController from "../controllers/commentController.js";
const router = Router();

// 댓글 등록
router.post("/comment", commentController.createComment);

// 댓글 목록 조회
router.get("/comment/:id", commentController.getComment);

// 댓글 수정
router.patch("/comment/:id", commentController.updateComment);

// 댓글 삭제
router.delete("/comment/:id", commentController.deleteComment);

export default router;
