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
exports.getProductCommentList = getProductCommentList;
exports.getProductComment = getProductComment;
exports.createProductComment = createProductComment;
exports.getArticleCommentList = getArticleCommentList;
exports.getArticleComment = getArticleComment;
exports.createArticleComment = createArticleComment;
exports.updateComment = updateComment;
exports.deleteComment = deleteComment;
const db_1 = __importDefault(require("../../config/db"));
const auth_repository_1 = __importDefault(require("../auth/auth.repository"));
const errorTemplate_1 = require("../../config/errorTemplate");
function getProductCommentList(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const productId = req.params.id;
        const { pageSize = "10", lastId = "", orderBy = "recent", keyword = "", } = req.query;
        const limit = parseInt(pageSize);
        //cursor 방식 페이지네이션
        const comments = yield db_1.default.comment.findMany(Object.assign(Object.assign({ where: { productId }, skip: lastId ? 1 : 0, take: limit }, (lastId && { cursor: { id: lastId } })), { orderBy: { createdAt: "desc" } }));
        res.json(comments);
    });
}
function getProductComment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { productId, id } = req.params;
        const comments = yield db_1.default.comment.findMany({
            where: {
                productId,
                id,
            },
            orderBy: { createdAt: "desc" },
        });
        res.json(comments);
    });
}
function createProductComment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const userId = (_a = req.auth) === null || _a === void 0 ? void 0 : _a.userId;
        if (userId) {
            const user = yield auth_repository_1.default.findById(userId);
            const productId = req.params.id;
            const { content } = req.body;
            if (user) {
                const comment = yield db_1.default.comment.create({
                    data: {
                        content,
                        userName: user.name,
                        user: { connect: { id: user.id } },
                        product: {
                            connect: { id: productId },
                        },
                    },
                });
                return res.status(201).json(comment);
            }
            else {
                throw errorTemplate_1.ERROR_USER_NOTFOUND;
            }
        }
        else {
            throw errorTemplate_1.ERROR_UNATHORIZED;
        }
    });
}
/* === 게시글 댓글 api === (조회, 생성) */
function getArticleCommentList(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const articleId = req.params.id;
        const { pageSize = "10", lastId = "", orderBy = "recent", keyword = "", } = req.query;
        const limit = parseInt(pageSize);
        //cursor 방식 페이지네이션
        const comments = yield db_1.default.comment.findMany(Object.assign(Object.assign({ where: { articleId }, skip: lastId ? 1 : 0, take: limit }, (lastId && { cursor: { id: lastId } })), { orderBy: { createdAt: "desc" } }));
        res.json(comments);
    });
}
function getArticleComment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { articleId, id } = req.params;
        const comments = yield db_1.default.comment.findMany({
            where: {
                articleId,
                id,
            },
            orderBy: { createdAt: "desc" },
        });
        res.json(comments);
    });
}
function createArticleComment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const userId = (_a = req.auth) === null || _a === void 0 ? void 0 : _a.userId;
        if (userId) {
            const user = yield auth_repository_1.default.findById(userId);
            const articleId = req.params.id;
            const { content } = req.body;
            if (user) {
                const comment = yield db_1.default.comment.create({
                    data: {
                        content,
                        userName: user.name,
                        user: { connect: { id: user.id } },
                        article: {
                            connect: { id: articleId },
                        },
                    },
                });
                res.status(201).json(comment);
            }
            else {
                throw errorTemplate_1.ERROR_USER_NOTFOUND;
            }
        }
        else {
            throw errorTemplate_1.ERROR_UNATHORIZED;
        }
    });
}
/* === 공통 댓글 api (삭제, 수정)=== */
function updateComment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const { content } = req.body;
        const updated = yield db_1.default.comment.update({
            where: { id },
            data: { content },
        });
        res.json(updated);
    });
}
function deleteComment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        yield db_1.default.comment.delete({
            where: { id },
        });
        res.sendStatus(204);
    });
}
//# sourceMappingURL=comments.controller.js.map