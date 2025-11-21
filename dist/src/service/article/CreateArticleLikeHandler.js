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
exports.CreateArticleLikeHandler = void 0;
// Prisma 로드
const prismaClient_1 = require("../../utils/auth/prismaClient");
// 예외 로드
const NotFoundException_1 = require("../../utils/exceptions/NotFoundException");
const ExceptionMessage_1 = require("../../utils/exceptions/ExceptionMessage");
// 도메인 로드
const Article_1 = require("../../utils/domain/Article");
const User_1 = require("../../utils/domain/User");
class CreateArticleLikeHandler {
    static handle(requester_1, _a) {
        return __awaiter(this, arguments, void 0, function* (requester, { articleId }) {
            const articleEntity = yield prismaClient_1.prismaClient.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                const targetArticleEntity = yield tx.article.findUnique({
                    where: {
                        id: articleId,
                    },
                    include: {
                        likes: true,
                    }
                });
                if (!targetArticleEntity) {
                    throw new NotFoundException_1.NotFoundException('Not Found', ExceptionMessage_1.ExceptionMessage.ARTICLE_NOT_FOUND);
                }
                const likeEntity = yield tx.like.findUnique({
                    where: {
                        userId_articleId: {
                            userId: requester.userId,
                            articleId,
                        },
                    },
                });
                if (!likeEntity) {
                    yield tx.like.create({
                        data: {
                            userId: requester.userId,
                            articleId,
                        },
                    });
                }
                return targetArticleEntity;
            }));
            if (!articleEntity) {
                throw new NotFoundException_1.NotFoundException('Not Found', ExceptionMessage_1.ExceptionMessage.ARTICLE_NOT_FOUND);
            }
            const article = new Article_1.ArticleDomain(articleEntity);
            const writerEntity = yield prismaClient_1.prismaClient.user.findUnique({
                where: {
                    id: articleEntity.writerId,
                },
            });
            if (!writerEntity) {
                throw new NotFoundException_1.NotFoundException('Not Found', ExceptionMessage_1.ExceptionMessage.USER_NOT_FOUND);
            }
            const writer = new User_1.UserDomain(writerEntity);
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
                isFavorite: true,
            };
        });
    }
}
exports.CreateArticleLikeHandler = CreateArticleLikeHandler;
