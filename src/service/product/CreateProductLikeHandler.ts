// Prisma 로드
import { prismaClient } from '../../utils/auth/prismaClient';

// 예외 로드
import { NotFoundException } from '../../utils/exceptions/NotFoundException';
import { ExceptionMessage } from '../../utils/exceptions/ExceptionMessage';

// 도메인 로드
import { ProductDomain } from '../../utils/domain/Product.js';

export class CreateProductLikeHandler {
    static async handle(requester: {userId: number}, { productId }: {productId: number}) {
        const productEntity = await prismaClient.$transaction(async (tx) => {
            const targetProductEntity = await tx.product.findUnique({
                where: {
                    id: productId,
                },
            });

            if (!targetProductEntity) {
                throw new NotFoundException('Not Found', ExceptionMessage.PRODUCT_NOT_FOUND);
            }

            const likeEntity = await tx.like.findUnique({
                where: {
                    userId_productId: {
                        userId: requester.userId,
                        productId,
                    },
                },
            });

            if (!likeEntity) {
                await tx.like.create({
                    data: {
                        productId: Number(productId),
                        userId: requester.userId,
                    },
                });
            }

            return targetProductEntity;
        });

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
            isFavorite: true,
        };
    }
}
