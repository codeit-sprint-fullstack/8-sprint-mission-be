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
exports.UpdateArticleHandler = void 0;
// Prisma 로드
const prismaClient_1 = require("../../utils/auth/prismaClient");
// 예외 로드
const NotFoundException_1 = require("../../utils/exceptions/NotFoundException");
const ForbiddenException_1 = require("../../utils/exceptions/ForbiddenException");
const ExceptionMessage_1 = require("../../utils/exceptions/ExceptionMessage");
// 도메인 로드
const Article_js_1 = require("../../utils/domain/Article.js");
const User_js_1 = require("../../utils/domain/User.js");
class UpdateArticleHandler {
    static handle(requester_1, _a) {
        return __awaiter(this, arguments, void 0, function* (requester, { articleId, title, content, image }) {
            /**
             * [게시글 수정 트랜잭션]
             *
             * 1. 게시글을 수정하기 전에 해당 게시글이 존재하는지 확인합니다.
             * 2. 게시글이 존재한다면, 게시글을 수정합니다.
             *
             * update() 하나만 사용해도 결과적으로는 동일합니다.
             */
            const articleEntity = yield prismaClient_1.prismaClient.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                const targetArticleEntity = yield tx.article.findUnique({
                    where: {
                        id: articleId,
                    },
                });
                if (!targetArticleEntity) {
                    throw new NotFoundException_1.NotFoundException('Not Found', ExceptionMessage_1.ExceptionMessage.ARTICLE_NOT_FOUND);
                }
                if (targetArticleEntity.writerId !== requester.userId) {
                    throw new ForbiddenException_1.ForbiddenException('Forbidden', ExceptionMessage_1.ExceptionMessage.FORBIDDEN);
                }
                return tx.article.update({
                    where: {
                        id: articleId,
                    },
                    include: {
                        likes: {
                            select: {
                                // 좋아요의 id, userId만 필요함
                                id: true,
                                userId: true,
                            },
                        },
                    },
                    data: {
                        title,
                        content,
                        image,
                    },
                });
            }));
            if (!articleEntity) {
                throw new NotFoundException_1.NotFoundException('Not Found', ExceptionMessage_1.ExceptionMessage.ARTICLE_NOT_FOUND);
            }
            const article = new Article_js_1.ArticleDomain(articleEntity);
            const writerEntity = yield prismaClient_1.prismaClient.user.findUnique({
                where: {
                    id: article.getWriterId(),
                },
            });
            if (!writerEntity) {
                throw new NotFoundException_1.NotFoundException('Not Found', ExceptionMessage_1.ExceptionMessage.USER_NOT_FOUND);
            }
            const writer = new User_js_1.UserDomain(writerEntity);
            return {
                id: article.getId(),
                writer: {
                    id: writer.getId(),
                    nickname: writer.getNickname(),
                },
                title: article.getTitle(),
                content: article.getContent(),
                image: article.getImage(),
                createdAt: article.getCreatedAt(),
            };
        });
    }
}
exports.UpdateArticleHandler = UpdateArticleHandler;
