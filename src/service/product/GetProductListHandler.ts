// Prisma 로드
import { prismaClient } from '../../utils/auth/prismaClient';

// 도메인 로드
import { ProductDomain } from '../../utils/domain/Product.js';

export class GetProductListHandler {
    static async handle(requester: {userId: number}, { page, pageSize, orderBy, keyword }: { page: number; pageSize: number; orderBy: 'recent' | 'favorite'; keyword?: string }) {
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

        const matchedProductCount = await prismaClient.product.count({
            where: whereClause,
        });

        const orderByOption = (() => {
            switch (orderBy) {
                case 'favorite':
                    return {
                        likes: {
                            _count: 'desc' as const, // 좋아요 많은 순으로 정렬
                        },
                    };
                case 'recent':
                default:
                    return { createdAt: 'desc' as const };
            }
        })();

        const productEntities = await prismaClient.product.findMany({
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

        const products = productEntities.map(
            (productEntity) => new ProductDomain(productEntity)
        );

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
    }
}
