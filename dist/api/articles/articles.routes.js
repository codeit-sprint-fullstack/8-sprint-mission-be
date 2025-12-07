"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const errorHandler_1 = require("../../utils/errorHandler");
const authGuard_1 = require("../../middlewares/authGuard");
const articles_controller_1 = require("./articles.controller");
const errorHandler_2 = __importDefault(require("../../middlewares/errorHandler"));
const router = (0, express_1.Router)();
/* === 게시글 api === */
router.get("", (0, errorHandler_1.asyncHandeler)(articles_controller_1.getArticleList), errorHandler_2.default);
router.get("/:id", (0, errorHandler_1.asyncHandeler)(articles_controller_1.getArticle), errorHandler_2.default);
//로그인한 유저(verifyAccessToken), 소유권이 있는 유저(checkOwner)
router.post("", authGuard_1.verifyAccessToken, (0, errorHandler_1.asyncHandeler)(articles_controller_1.createArticle), errorHandler_2.default);
router.patch("/:id", authGuard_1.verifyAccessToken, articles_controller_1.checkOwner, (0, errorHandler_1.asyncHandeler)(articles_controller_1.updateArticle), errorHandler_2.default);
router.delete("/:id", authGuard_1.verifyAccessToken, articles_controller_1.checkOwner, (0, errorHandler_1.asyncHandeler)(articles_controller_1.deleteArticle), errorHandler_2.default);
router.post("/:id/checkOwner", authGuard_1.verifyAccessToken, articles_controller_1.checkOwner, errorHandler_2.default);
exports.default = router;
//# sourceMappingURL=articles.routes.js.map