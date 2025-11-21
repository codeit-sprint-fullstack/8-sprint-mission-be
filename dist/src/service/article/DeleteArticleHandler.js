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
exports.DeleteArticleHandler = void 0;
// Prisma 로드
const prismaClient_1 = require("../../utils/auth/prismaClient");
// 예외 로드
const NotFoundException_1 = require("../../utils/exceptions/NotFoundException");
const ForbiddenException_1 = require("../../utils/exceptions/ForbiddenException");
const ExceptionMessage_1 = require("../../utils/exceptions/ExceptionMessage");
class DeleteArticleHandler {
    static handle(requester_1, _a) {
        return __awaiter(this, arguments, void 0, function* (requester, { articleId }) {
            yield prismaClient_1.prismaClient.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
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
                return tx.article.delete({
                    where: {
                        id: articleId,
                    },
                });
            }));
        });
    }
}
exports.DeleteArticleHandler = DeleteArticleHandler;
