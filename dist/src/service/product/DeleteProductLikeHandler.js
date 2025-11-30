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
exports.DeleteProductLikeHandler = void 0;
// Prisma 로드
const prismaClient_1 = require("../../utils/auth/prismaClient");
// 예외 로드
const NotFoundException_1 = require("../../utils/exceptions/NotFoundException");
const ExceptionMessage_1 = require("../../utils/exceptions/ExceptionMessage");
// 도메인 로드
const Product_1 = require("../../utils/domain/Product");
class DeleteProductLikeHandler {
    static handle(requester_1, _a) {
        return __awaiter(this, arguments, void 0, function* (requester, { productId }) {
            const productEntity = yield prismaClient_1.prismaClient.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                const targetProductEntity = yield tx.product.findUnique({
                    where: {
                        id: productId,
                    },
                });
                if (!targetProductEntity) {
                    throw new NotFoundException_1.NotFoundException('Not Found', ExceptionMessage_1.ExceptionMessage.PRODUCT_NOT_FOUND);
                }
                const likeEntity = yield tx.like.findUnique({
                    where: {
                        userId_productId: {
                            userId: requester.userId,
                            productId,
                        },
                    },
                });
                if (likeEntity) {
                    yield tx.like.delete({
                        where: {
                            userId_productId: {
                                userId: requester.userId,
                                productId,
                            },
                        },
                    });
                }
                return targetProductEntity;
            }));
            const product = new Product_1.ProductDomain(productEntity);
            return {
                id: product.getId(),
                ownerId: product.getOwnerId(),
                name: product.getName(),
                description: product.getDescription(),
                price: product.getPrice(),
                tags: product.getTags(),
                images: product.getImages(),
                createdAt: product.getCreatedAt(),
                isFavorite: false,
            };
        });
    }
}
exports.DeleteProductLikeHandler = DeleteProductLikeHandler;
