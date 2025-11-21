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
exports.UpdateProductHandler = void 0;
// Prisma 로드
const prismaClient_1 = require("../../utils/auth/prismaClient");
const NotFoundException_1 = require("../../utils/exceptions/NotFoundException");
const ForbiddenException_1 = require("../../utils/exceptions/ForbiddenException");
const ExceptionMessage_1 = require("../../utils/exceptions/ExceptionMessage");
const Product_js_1 = require("../../utils/domain/Product.js");
class UpdateProductHandler {
    static handle(requester_1, _a) {
        return __awaiter(this, arguments, void 0, function* (requester, { productId, name, description, price, tags, images }) {
            const productEntity = yield prismaClient_1.prismaClient.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                const targetProductEntity = yield tx.product.findUnique({
                    where: {
                        id: Number(productId),
                    },
                });
                if (!targetProductEntity) {
                    throw new NotFoundException_1.NotFoundException('Not Found', ExceptionMessage_1.ExceptionMessage.PRODUCT_NOT_FOUND);
                }
                if (targetProductEntity.ownerId !== requester.userId) {
                    throw new ForbiddenException_1.ForbiddenException('Forbidden', ExceptionMessage_1.ExceptionMessage.FORBIDDEN);
                }
                return tx.product.update({
                    where: {
                        id: Number(productId),
                    },
                    data: {
                        name,
                        description,
                        price,
                        tags,
                        images,
                    },
                });
            }));
            const product = new Product_js_1.ProductDomain(productEntity);
            return {
                id: product.getId(),
                ownerId: product.getOwnerId(),
                name: product.getName(),
                description: product.getDescription(),
                price: product.getPrice(),
                tags: product.getTags(),
                images: product.getImages(),
                createdAt: product.getCreatedAt(),
            };
        });
    }
}
exports.UpdateProductHandler = UpdateProductHandler;
