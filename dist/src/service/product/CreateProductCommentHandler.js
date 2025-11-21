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
exports.CreateProductCommentHandler = void 0;
// Prisma 로드
const prismaClient_1 = require("../../utils/auth/prismaClient");
// 예외 로드
const NotFoundException_1 = require("../../utils/exceptions/NotFoundException");
const ExceptionMessage_1 = require("../../utils/exceptions/ExceptionMessage");
// 도메인 로드
const Comment_1 = require("../../utils/domain/Comment");
const User_1 = require("../../utils/domain/User");
class CreateProductCommentHandler {
    static handle(requester_1, _a) {
        return __awaiter(this, arguments, void 0, function* (requester, { productId, content }) {
            const commentEntity = yield prismaClient_1.prismaClient.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                const targetProductEntity = yield tx.product.findUnique({
                    where: {
                        id: productId,
                    },
                });
                if (!targetProductEntity) {
                    throw new NotFoundException_1.NotFoundException('Not Found', ExceptionMessage_1.ExceptionMessage.PRODUCT_NOT_FOUND);
                }
                return tx.comment.create({
                    data: {
                        productId: productId,
                        writerId: requester.userId,
                        content,
                    },
                });
            }));
            const comment = new Comment_1.CommentDomain(commentEntity);
            const writerEntity = yield prismaClient_1.prismaClient.user.findUnique({
                where: {
                    id: comment.getWriterId(),
                },
            });
            if (!writerEntity) {
                throw new NotFoundException_1.NotFoundException('Not Found', ExceptionMessage_1.ExceptionMessage.USER_NOT_FOUND);
            }
            const writer = new User_1.UserDomain(writerEntity);
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
exports.CreateProductCommentHandler = CreateProductCommentHandler;
