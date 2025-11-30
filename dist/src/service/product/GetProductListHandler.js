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
exports.GetProductListHandler = void 0;
// Prisma 로드
const prismaClient_1 = require("../../utils/auth/prismaClient");
// 도메인 로드
const Product_js_1 = require("../../utils/domain/Product.js");
class GetProductListHandler {
    static handle(requester_1, _a) {
        return __awaiter(this, arguments, void 0, function* (requester, { page, pageSize, orderBy, keyword }) {
            const whereClause = keyword
                ? {
                    OR: [
                        {
                            name: {
                                contains: keyword,
                            },
                        },
                        {
                            description: {
                                contains: keyword,
                            },
                        },
                    ],
                }
                : undefined;
            const matchedProductCount = yield prismaClient_1.prismaClient.product.count({
                where: whereClause,
            });
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
            const productEntities = yield prismaClient_1.prismaClient.product.findMany({
                skip: pageSize * (page - 1),
                take: pageSize,
                where: whereClause,
                orderBy: orderByOption,
                include: {
                    _count: {
                        select: { likes: true }, // 각 Product의 전체 Like 개수
                    },
                    likes: {
                        select: {
                            // 좋아요의 id, userId만 필요함
                            id: true,
                            userId: true,
                        },
                    },
                },
            });
            const products = productEntities.map((productEntity) => new Product_js_1.ProductDomain(productEntity));
            return {
                totalCount: matchedProductCount,
                list: products.slice(0, pageSize).map((product) => ({
                    id: product.getId(),
                    ownerId: product.getOwnerId(),
                    name: product.getName(),
                    description: product.getDescription(),
                    price: product.getPrice(),
                    tags: product.getTags(),
                    images: product.getImages(),
                    createdAt: product.getCreatedAt(),
                    favoriteCount: product.getFavoriteCount(),
                    isFavorite: product.getIsFavorite(requester.userId),
                })),
            };
        });
    }
}
exports.GetProductListHandler = GetProductListHandler;
