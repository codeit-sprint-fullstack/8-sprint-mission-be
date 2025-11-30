// Prisma 로드
import { prismaClient } from '../../utils/auth/prismaClient';

// 예외 로드
import { NotFoundException } from '../../utils/exceptions/NotFoundException';
import { ExceptionMessage } from '../../utils/exceptions/ExceptionMessage';

// 도메인 로드
import { ProductDomain } from '../../utils/domain/Product';

export class GetUserProductListHandler {
    static async handle(requester: {userId: number}, { page, pageSize, keyword }: { page: number; pageSize: number; keyword?: string }) {
        const userEntity = await prismaClient.user.findUnique({
            where: {
                id: requester.userId,
            },
        });
        if (!userEntity) {
            throw new NotFoundException('Not Found', ExceptionMessage.USER_NOT_FOUND);
        }

        const productCount = await prismaClient.product.count({
            where: {
                ownerId: requester.userId,
                name: {
                    contains: keyword,
                },
            },
        });

        const productEntities = await prismaClient.product.findMany({
            where: {
                ownerId: requester.userId,
                name: {
                    contains: keyword,
                },
            },
            skip: (page - 1) * pageSize,
            take: pageSize,
        });

        if (!productEntities) {
            throw new NotFoundException('Products not found', ExceptionMessage.PRODUCT_NOT_FOUND);
        }

        const products = productEntities.map((productEntity) => new ProductDomain(productEntity));

        return {
            totalCount: productCount,
            list: products.map((product) => ({
                id: product.getId(),
                ownerId: product.getOwnerId(),
                name: product.getName(),
                description: product.getDescription(),
                price: product.getPrice(),
                tags: product.getTags(),
                images: product.getImages(),
                createdAt: product.getCreatedAt(),
                updatedAt: product.getUpdatedAt(),
            })),
        };
    }
}
