// Prisma 로드
import { prismaClient } from '../../utils/auth/prismaClient';

// 예외 로드
import { NotFoundException } from '../../utils/exceptions/NotFoundException';
import { ExceptionMessage } from '../../utils/exceptions/ExceptionMessage';

// 도메인 로드
import { ProductDomain } from '../../utils/domain/Product';

export class GetProductHandler {
    static async handle(requester: {userId: number}, { productId }: {productId: number}) {
        const productEntity = await prismaClient.product.findUnique({
            where: {
                id: Number(productId),
            },
            include: {
                likes: {
                    select: {
                        // 좋아요의 id, userId만 필요함
                        id: true,
                        userId: true,
                    },
                },
            },
        });

        if (!productEntity) {
            throw new NotFoundException('Not Found', ExceptionMessage.PRODUCT_NOT_FOUND);
        }

        const product = new ProductDomain(productEntity);

        return {
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
        };
    }
}
