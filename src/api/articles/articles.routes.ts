import { Router } from "express";
import { asyncHandeler } from "../../utils/errorHandler";
import { verifyAccessToken } from "../../middlewares/authGuard";
import {
  getArticleList,
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle,
  checkOwner,
} from "./articles.controller";
import errorHandler from "../../middlewares/errorHandler";

const router = Router();

/* === 게시글 api === */
router.get("", asyncHandeler(getArticleList), errorHandler);
router.get("/:id", asyncHandeler(getArticle), errorHandler);

//로그인한 유저(verifyAccessToken), 소유권이 있는 유저(checkOwner)
router.post("", verifyAccessToken, asyncHandeler(createArticle), errorHandler);
router.patch(
  "/:id",
  verifyAccessToken,
  checkOwner,
  asyncHandeler(updateArticle),
  errorHandler
);
router.delete(
  "/:id",
  verifyAccessToken,
  checkOwner,
  asyncHandeler(deleteArticle),
  errorHandler
);
router.post("/:id/checkOwner", verifyAccessToken, checkOwner, errorHandler);

export default router;
