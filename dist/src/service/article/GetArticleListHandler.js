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
exports.GetArticleListHandler = void 0;
// Prisma 로드
const prismaClient_1 = require("../../utils/auth/prismaClient");
// 도메인 로드
const Article_1 = require("../../utils/domain/Article");
const User_1 = require("../../utils/domain/User");
const Like_1 = require("../../utils/domain/Like");
class GetArticleListHandler {
    static handle(requester_1, _a) {
        return __awaiter(this, arguments, void 0, function* (requester, { cursor, limit, orderBy, keyword }) {
            const orderByOption = (() => {
                switch (orderBy) {
                    case 'favorite':
                        return {
                            likes: {
                                _count: 'desc', // 좋아요 많은 순으로 정렬
                            },
                        };
                    case 'recent':
                    default:
                        return { createdAt: 'desc' };
                }
            })();
            const articleEntities = yield prismaClient_1.prismaClient.article.findMany({
                cursor: cursor
                    ? {
                        id: cursor,
                    }
                    : undefined,
                take: limit + 1,
                orderBy: orderByOption,
                where: {
                    title: keyword ? { contains: keyword } : undefined,
                },
                include: {
                    likes: true,
                },
            });
            const articles = articleEntities.map((articleEntity) => new Article_1.ArticleDomain(articleEntity));
            const writerEntities = yield prismaClient_1.prismaClient.user.findMany({
                where: {
                    id: {
                        in: Array.from(new Set(articles.map((article) => article.getWriterId()))),
                    },
                },
            });
            const writers = writerEntities.map((writerEntity) => new User_1.UserDomain(writerEntity));
            const likeEntities = yield prismaClient_1.prismaClient.like.findMany({
                where: {
                    userId: requester.userId,
                    articleId: {
                        in: Array.from(new Set(articles.map((article) => article.getId()))),
                    },
                },
            });
            const likes = likeEntities.map((likeEntity) => new Like_1.LikeDomain(likeEntity));
            const hasNext = articles.length === limit + 1;
            return {
                list: articles.slice(0, limit).map((article) => {
                    const writer = writers.find((writer) => writer.getId() === article.getWriterId());
                    const like = likes.find((like) => like.getArticleId() === article.getId());
                    if (!writer) {
                        throw new Error('작성자를 찾을 수 없습니다.');
                    }
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
                        isFavorite: !!like,
                    };
                }),
                nextCursor: hasNext ? articles[articles.length - 1].getId() : null,
            };
        });
    }
}
exports.GetArticleListHandler = GetArticleListHandler;
