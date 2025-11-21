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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateArticleCommentHandler = void 0;
// Prisma 로드
const prismaClient_1 = require("../../../prisma/prismaClient");
// 예외 로드
const NotFoundException_1 = require("../../utils/exceptions/NotFoundException");
const ExceptionMessage_1 = require("../../utils/exceptions/ExceptionMessage");
// 도메인 로드
const Comment_js_1 = require("../../utils/domain/Comment.js");
const User_js_1 = require("../../utils/domain/User.js");
class CreateArticleCommentHandler {
    static handle(requester_1, _a) {
        return __awaiter(this, arguments, void 0, function* (requester, { articleId, content }) {
            /**
             * [게시글 댓글 등록 트랜잭션]
             *
             * 1. 게시글이 존재하는지 확인합니다.
             * 2. 게시글이 존재한다면, 댓글을 등록합니다.
             */
            const commentEntity = yield prismaClient_1.prismaClient.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                const targetArticleEntity = yield tx.article.findUnique({
                    where: {
                        id: articleId,
                    },
                });
                if (!targetArticleEntity) {
                    throw new NotFoundException_1.NotFoundException('Not Found', ExceptionMessage_1.ExceptionMessage.ARTICLE_NOT_FOUND);
                }
                return tx.comment.create({
                    data: {
                        articleId,
                        writerId: requester.userId,
                        content,
                    },
                });
            }));
            const comment = new Comment_js_1.CommentDomain(commentEntity);
            const writerEntity = yield prismaClient_1.prismaClient.user.findUnique({
                where: {
                    id: comment.getWriterId(),
                },
            });
            if (!writerEntity) {
                throw new NotFoundException_1.NotFoundException('Not Found', ExceptionMessage_1.ExceptionMessage.USER_NOT_FOUND);
            }
            const writer = new User_js_1.UserDomain(writerEntity);
            return {
                id: comment.getId(),
                writer: {
                    id: writer.getId(),
                    nickname: writer.getNickname(),
                    image: writer.getImage(),
                },
                content: comment.getContent(),
                createdAt: comment.getCreatedAt(),
            };
        });
    }
}
exports.CreateArticleCommentHandler = CreateArticleCommentHandler;
