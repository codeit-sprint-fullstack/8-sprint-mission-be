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
exports.GetProductCommentListHandler = void 0;
// Prisma 로드
const prismaClient_1 = require("../../utils/auth/prismaClient");
// 예외 로드
const NotFoundException_1 = require("../../utils/exceptions/NotFoundException");
const ExceptionMessage_1 = require("../../utils/exceptions/ExceptionMessage");
// 도메인 로드
const Comment_js_1 = require("../../utils/domain/Comment.js");
const User_js_1 = require("../../utils/domain/User.js");
class GetProductCommentListHandler {
    static handle(_a) {
        return __awaiter(this, arguments, void 0, function* ({ productId, cursor, limit }) {
            const commentEntities = yield prismaClient_1.prismaClient.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                const targetProductEntity = yield tx.product.findUnique({
                    where: {
                        id: Number(productId),
                    },
                });
                if (!targetProductEntity) {
                    throw new NotFoundException_1.NotFoundException('Not Found', ExceptionMessage_1.ExceptionMessage.PRODUCT_NOT_FOUND);
                }
                return tx.comment.findMany({
                    cursor: cursor
                        ? {
                            id: cursor,
                        }
                        : undefined,
                    take: limit + 1,
                    where: {
                        productId: Number(productId),
                    },
                });
            }));
            const comments = commentEntities.map((commentEntity) => new Comment_js_1.CommentDomain(commentEntity));
            const writerEntities = yield prismaClient_1.prismaClient.user.findMany({
                where: {
                    id: {
                        in: Array.from(new Set(comments.map((comment) => comment.getWriterId()))),
                    },
                },
            });
            const writers = writerEntities.map((writerEntity) => new User_js_1.UserDomain(writerEntity));
            const hasNext = comments.length === limit + 1;
            return {
                list: comments.slice(0, limit).map((comment) => {
                    const writer = writers.find((writer) => writer.getId() === comment.getWriterId());
                    if (!writer) {
                        throw new NotFoundException_1.NotFoundException('Not Found', ExceptionMessage_1.ExceptionMessage.USER_NOT_FOUND);
                    }
                    return {
                        id: comment.getId(),
                        writer: {
                            id: writer.getId(),
                            nickname: writer.getNickname(),
                            image: writer.getImage(),
                        },
                        productId: comment.getProductId(),
                        content: comment.getContent(),
                        createdAt: comment.getCreatedAt(),
                        updatedAt: comment.getUpdatedAt(),
                    };
                }),
                nextCursor: hasNext ? comments[comments.length - 1].getId() : null,
            };
        });
    }
}
exports.GetProductCommentListHandler = GetProductCommentListHandler;
