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
exports.CreateArticleHandler = void 0;
// Prisma 로드
const prismaClient_1 = require("../../utils/auth/prismaClient");
// 도메인 로드
const Article_js_1 = require("../../utils/domain/Article.js");
const User_js_1 = require("../../utils/domain/User.js");
class CreateArticleHandler {
    static handle(requester_1, _a) {
        return __awaiter(this, arguments, void 0, function* (requester, { title, content, image }) {
            const articleEntity = yield prismaClient_1.prismaClient.article.create({
                data: {
                    writerId: requester.userId,
                    title,
                    content,
                    image,
                },
                include: {
                    likes: true,
                }
            });
            /**
             * [클래스 객체로 변환]
             *
             * articleEntity 는 Article 클래스의 인스턴스가 아니므로,
             * Article 클래스에 정의된 메서드를 사용할 수 없습니다.
             */
            if (!articleEntity) {
                throw new Error('Failed to create article');
            }
            const article = new Article_js_1.ArticleDomain(articleEntity);
            const writerEntity = yield prismaClient_1.prismaClient.user.findUnique({
                where: {
                    id: article.getWriterId(),
                },
            });
            if (!writerEntity) {
                throw new Error('Writer not found');
            }
            const writer = new User_js_1.UserDomain(writerEntity);
            return {
                id: article.getId(),
                writer: {
                    id: writer.getId(),
                    nickname: writer.getNickname(),
                    image: writer.getImage(),
                },
                title: article.getTitle(),
                content: article.getContent(),
                image: article.getImage(),
                createdAt: article.getCreatedAt(),
                updatedAt: article.getUpdatedAt(),
            };
        });
    }
}
exports.CreateArticleHandler = CreateArticleHandler;
