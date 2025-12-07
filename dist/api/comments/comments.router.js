"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const errorHandler_1 = require("../../utils/errorHandler");
const authGuard_1 = require("../../middlewares/authGuard");
const comments_controller_1 = require("./comments.controller");
const router = (0, express_1.Router)();
/* === 댓글 api === */
/* === 상품 댓글 api  === (조회, 생성) */
router.get("/products/:id/comments", (0, errorHandler_1.asyncHandeler)(comments_controller_1.getProductCommentList));
router.get("/products/:productId/comments/:id", (0, errorHandler_1.asyncHandeler)(comments_controller_1.getProductComment));
router.post("/products/:id/comments", authGuard_1.verifyAccessToken, (0, errorHandler_1.asyncHandeler)(comments_controller_1.createProductComment));
/* === 게시글 댓글 api === (조회, 생성) */
router.get("/articles/:id/comments", (0, errorHandler_1.asyncHandeler)(comments_controller_1.getArticleCommentList));
router.get("/articles/:articleId/comments/:id", (0, errorHandler_1.asyncHandeler)(comments_controller_1.getArticleComment));
router.post("/articles/:id/comments", authGuard_1.verifyAccessToken, (0, errorHandler_1.asyncHandeler)(comments_controller_1.createArticleComment));
/* === 공통 댓글 api (삭제, 수정)=== */
router.patch("/comments/:id", authGuard_1.verifyAccessToken, (0, errorHandler_1.asyncHandeler)(comments_controller_1.updateComment));
router.delete("/comments/:id", authGuard_1.verifyAccessToken, (0, errorHandler_1.asyncHandeler)(comments_controller_1.deleteComment));
exports.default = router;
//# sourceMappingURL=comments.router.js.map