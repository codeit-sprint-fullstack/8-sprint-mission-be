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
exports.GetArticleHandler = void 0;
// Prisma 로드
const prismaClient_1 = require("../../utils/auth/prismaClient");
// 예외 로드
const NotFoundException_1 = require("../../utils/exceptions/NotFoundException");
const ExceptionMessage_1 = require("../../utils/exceptions/ExceptionMessage");
// 도메인 로드
const Article_js_1 = require("../../utils/domain/Article.js");
const User_js_1 = require("../../utils/domain/User.js");
class GetArticleHandler {
    static handle(requester_1, _a) {
        return __awaiter(this, arguments, void 0, function* (requester, { articleId }) {
            const articleEntity = yield prismaClient_1.prismaClient.article.findUnique({
                where: {
                    id: Number(articleId), // params 에서 가져온 값은 문자열이므로, 여기서는 숫자로 변환하여 사용해야 합니다.
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
            });
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
                favoriteCount: article.getFavoriteCount(),
                isFavorite: article.getIsFavorite(requester.userId),
            };
        });
    }
}
exports.GetArticleHandler = GetArticleHandler;
