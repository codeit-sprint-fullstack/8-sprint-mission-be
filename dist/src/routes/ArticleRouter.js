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
exports.ArticleRouter = void 0;
// 라이브러리 로드
const superstruct_1 = require("superstruct");
const express_1 = __importDefault(require("express"));
// 유틸리티 로드
const AuthN_1 = require("../utils/auth/AuthN");
const AuthTokenManager_1 = require("../utils/auth/AuthTokenManager");
const asyncErrorHandler_1 = require("./utils/asyncErrorHandler");
// Structs 로드
const CreateArticleRequestStruct_1 = require("../utils/structs/article/CreateArticleRequestStruct");
const UpdateArticleRequestStruct_1 = require("../utils/structs/article/UpdateArticleRequestStruct");
const GetArticleListRequestStruct_1 = require("../utils/structs/article/GetArticleListRequestStruct");
const CreateCommentRequestStruct_1 = require("../utils/structs/comment/CreateCommentRequestStruct");
const GetCommentListRequestStruct_1 = require("../utils/structs/comment/GetCommentListRequestStruct");
// 핸들러 로드
const CreateArticleHandler_1 = require("../service/article/CreateArticleHandler");
const GetArticleHandler_1 = require("../service/article/GetArticleHandler");
const UpdateArticleHandler_1 = require("../service/article/UpdateArticleHandler");
const DeleteArticleHandler_1 = require("../service/article/DeleteArticleHandler");
const GetArticleListHandler_1 = require("../service/article/GetArticleListHandler");
const CreateArticleCommentHandler_1 = require("../service/article/CreateArticleCommentHandler");
const GetArticleCommentListHandler_1 = require("../service/article/GetArticleCommentListHandler");
const CreateArticleLikeHandler_1 = require("../service/article/CreateArticleLikeHandler");
const DeleteArticleLikeHandler_1 = require("../service/article/DeleteArticleLikeHandler");
exports.ArticleRouter = express_1.default.Router();
// 게시글 등록 api
exports.ArticleRouter.post('/', (0, AuthN_1.AuthN)(), (0, asyncErrorHandler_1.asyncErrorHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const requester = AuthTokenManager_1.AuthTokenManager.getRequesterFromToken(req.headers.authorization);
    /**
     * [API 요청 유효성 검사]
     *
     * assert 메서드는 유효성 검사만 시도하는데 비해,
     * create 메서드는 데이터를 전처리하고, 유효성 검사를 같이 시도합니다.
     *
     * 전처리를 하는 이유는 아래와 같이 다양합니다.
     * - 기본값을 설정하기 위해              @see GetArticleListRequestStruct
     * - 데이터를 변환하기 위해
     *     1. 문자열 앞뒤에 있는 공백 제거    @see CreateArticleRequestStruct
     *     2. 문자열로 이루어진 숫자 -> 숫자  @see GetArticleListRequestStruct
     *     ...
     */
    const { title, content, image } = (0, superstruct_1.create)(req.body, CreateArticleRequestStruct_1.CreateArticleRequestStruct);
    if (!image) {
        throw new Error('Image is required');
    }
    const articleView = yield CreateArticleHandler_1.CreateArticleHandler.handle(requester, {
        title,
        content,
        image,
    });
    res.status(201).send(articleView);
})));
// 게시글 조회 api
exports.ArticleRouter.get('/:articleId', (0, asyncErrorHandler_1.asyncErrorHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const requester = AuthTokenManager_1.AuthTokenManager.getRequesterFromTokenOrDefault(req.headers.authorization);
    const articleId = Number(req.params.articleId);
    const articleView = yield GetArticleHandler_1.GetArticleHandler.handle(requester, {
        articleId,
    });
    res.status(201).send(articleView);
})));
// 게시글 수정 api
exports.ArticleRouter.patch('/:articleId', (0, AuthN_1.AuthN)(), (0, asyncErrorHandler_1.asyncErrorHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const requester = AuthTokenManager_1.AuthTokenManager.getRequesterFromToken(req.headers.authorization);
    const { articleId } = req.params;
    const { title, content, image } = (0, superstruct_1.create)(req.body, UpdateArticleRequestStruct_1.UpdateArticleRequestStruct);
    if (!title || !content || !image) {
        throw new Error('All fields are required');
    }
    const articleView = yield UpdateArticleHandler_1.UpdateArticleHandler.handle(requester, {
        articleId: Number(articleId),
        title,
        content,
        image,
    });
    res.status(201).send(articleView);
})));
// 게시글 삭제 api
exports.ArticleRouter.delete('/:articleId', (0, AuthN_1.AuthN)(), (0, asyncErrorHandler_1.asyncErrorHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const requester = AuthTokenManager_1.AuthTokenManager.getRequesterFromToken(req.headers.authorization);
    const { articleId } = req.params;
    yield DeleteArticleHandler_1.DeleteArticleHandler.handle(requester, {
        articleId: Number(articleId),
    });
    res.status(204).send();
})));
// 게시글 목록 조회 api
exports.ArticleRouter.get('/', (0, asyncErrorHandler_1.asyncErrorHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const requester = AuthTokenManager_1.AuthTokenManager.getRequesterFromTokenOrDefault(req.headers.authorization);
    const { cursor, limit, orderBy, keyword } = (0, superstruct_1.create)(req.query, GetArticleListRequestStruct_1.GetArticleListRequestStruct);
    const articleListView = yield GetArticleListHandler_1.GetArticleListHandler.handle(requester, {
        cursor,
        limit,
        orderBy,
        keyword,
    });
    res.send(articleListView);
})));
// 게시글 댓글 등록 api
exports.ArticleRouter.post('/:articleId/comments', (0, AuthN_1.AuthN)(), (0, asyncErrorHandler_1.asyncErrorHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const requester = AuthTokenManager_1.AuthTokenManager.getRequesterFromToken(req.headers.authorization);
    const { articleId } = req.params;
    const { content } = (0, superstruct_1.create)(req.body, CreateCommentRequestStruct_1.CreateCommentRequestStruct);
    const articleCommentView = yield CreateArticleCommentHandler_1.CreateArticleCommentHandler.handle(requester, {
        articleId: Number(articleId),
        content,
    });
    res.status(201).send(articleCommentView);
})));
// 게시글 댓글 목록 조회 api
exports.ArticleRouter.get('/:articleId/comments', (0, asyncErrorHandler_1.asyncErrorHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { articleId } = req.params;
    const { cursor, take } = (0, superstruct_1.create)(req.query, GetCommentListRequestStruct_1.GetCommentListRequestStruct);
    const articleCommentListView = yield GetArticleCommentListHandler_1.GetArticleCommentListHandler.handle({
        articleId: Number(articleId),
        cursor,
        take,
    });
    res.send(articleCommentListView);
})));
// 게시글 좋아요 API
exports.ArticleRouter.post('/:articleId/like', (0, AuthN_1.AuthN)(), (0, asyncErrorHandler_1.asyncErrorHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const requester = AuthTokenManager_1.AuthTokenManager.getRequesterFromToken(req.headers.authorization);
    const articleId = Number(req.params.articleId);
    const articleView = yield CreateArticleLikeHandler_1.CreateArticleLikeHandler.handle(requester, {
        articleId,
    });
    res.status(201).send(articleView);
})));
// 게시글 좋아요 취소 API
exports.ArticleRouter.delete('/:articleId/like', (0, AuthN_1.AuthN)(), (0, asyncErrorHandler_1.asyncErrorHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const requester = AuthTokenManager_1.AuthTokenManager.getRequesterFromToken(req.headers.authorization);
    const articleId = Number(req.params.articleId);
    const articleView = yield DeleteArticleLikeHandler_1.DeleteArticleLikeHandler.handle(requester, {
        articleId,
    });
    res.status(201).send(articleView);
})));
