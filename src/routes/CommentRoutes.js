import { Router } from "express";
import commentController from "../controllers/commentController.js";
const router = Router();

// 댓글 등록
// router.post("/comment", commentController.createComment);

// 댓글 목록 조회
// router.get("/comment/:id", commentController.getComment);

// 댓글 수정
// router.patch("/comment/:id", commentController.updateComment);

// 댓글 삭제
// router.delete("/comment/:id", commentController.deleteComment);

// 중고마켓 댓글 등록
router.post(
  "/products/:productId/comments",
  commentController.createProductComment
);

// 중고마켓 댓글 목록 조회
router.get(
  "/products/:productId/comments",
  commentController.getProductComments
);

// 중고마켓 댓글 수정
router.patch(
  "/products/:productId/comments/:commentId",
  commentController.updateProductComment
);

// 중고마켓 댓글 삭제
router.delete(
  "/products/:productId/comments/:commentId",
  commentController.deleteProductComment
);

// 게시글 댓글 목록 조회
router.get(
  "/articles/:articleId/comments",
  commentController.getArticleComments
);

// 게시글 댓글 등록
router.post(
  "/articles/:articleId/comments",
  commentController.createArticleComment
);

router.patch(
  "/articles/:articleId/comments/:commentId",
  commentController.updateArticleComment
);

router.delete(
  "/articles/:articleId/comments/:commentId",
  commentController.deleteArticleComment
);

export default router;
