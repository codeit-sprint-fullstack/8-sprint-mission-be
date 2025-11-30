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
exports.CreateProductHandler = void 0;
// Prisma 로드
const prismaClient_1 = require("../../utils/auth/prismaClient");
// 도메인 로드
const Product_js_1 = require("../../utils/domain/Product.js");
class CreateProductHandler {
    static handle(requester_1, _a) {
        return __awaiter(this, arguments, void 0, function* (requester, { name, description, price, tags, images }) {
            const productEntity = yield prismaClient_1.prismaClient.product.create({
                data: {
                    ownerId: requester.userId,
                    name,
                    description,
                    price,
                    tags,
                    images,
                },
            });
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
exports.CreateProductHandler = CreateProductHandler;
