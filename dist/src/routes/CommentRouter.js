"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentRouter = void 0;
// 라이브러리 로드
const superstruct_1 = require("superstruct");
const express_1 = __importDefault(require("express"));
// 유틸리티 로드
const AuthN_1 = require("../utils/auth/AuthN");
const AuthTokenManager_js_1 = require("../utils/auth/AuthTokenManager.js");
const asyncErrorHandler_1 = require("../utils/asyncErrorHandler");
// Structs 로드
const UpdateCommentRequestStruct_1 = require("../utils/structs/comment/UpdateCommentRequestStruct");
// 핸들러 로드
const UpdateCommentHandler_1 = require("../service/comment/UpdateCommentHandler");
const DeleteCommentHandler_1 = require("../service/comment/DeleteCommentHandler");
exports.CommentRouter = express_1.default.Router();
// 댓글 수정 api
exports.CommentRouter.patch('/:commentId', (0, AuthN_1.AuthN)(), (0, asyncErrorHandler_1.asyncErrorHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let requester = undefined;
    if (req.headers.authorization != null) {
        requester = AuthTokenManager_js_1.AuthTokenManager.getRequesterFromToken(req.headers.authorization);
    }
    const { commentId } = req.params;
    const { content } = (0, superstruct_1.create)(req.body, UpdateCommentRequestStruct_1.UpdateCommentRequestStruct);
    const commentView = yield UpdateCommentHandler_1.UpdateCommentHandler.handle(requester, {
        commentId: Number(commentId),
        content: content,
    });
    res.send(commentView);
})));
// 댓글 삭제 api
exports.CommentRouter.delete('/:commentId', (0, AuthN_1.AuthN)(), (0, asyncErrorHandler_1.asyncErrorHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let requester = undefined;
    if (req.headers.authorization != null) {
        requester = AuthTokenManager_js_1.AuthTokenManager.getRequesterFromToken(req.headers.authorization);
    }
    const { commentId } = req.params;
    yield DeleteCommentHandler_1.DeleteCommentHandler.handle(requester, Number(commentId));
    res.status(204).send();
})));
