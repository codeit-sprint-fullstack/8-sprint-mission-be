// Prisma 로드
import { prismaClient } from '../../utils/auth/prismaClient';

// 도메인 로드
import { ProductDomain } from '../../utils/domain/Product.js';

export class CreateProductHandler {
    static async handle(requester: {userId: number}, { name, description, price, tags, images }: {name: string, description: string, price: number, tags: string[], images: string[]}) {
        const productEntity = await prismaClient.product.create({
            data: {
                ownerId: requester.userId,
                name,
                description,
                price,
                tags,
                images,
            },
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
        };
    }
}
