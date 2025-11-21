// Prisma 로드
import { prismaClient } from '../../utils/auth/prismaClient';

import { NotFoundException } from '../../utils/exceptions/NotFoundException';
import { ForbiddenException } from '../../utils/exceptions/ForbiddenException';
import { ExceptionMessage } from '../../utils/exceptions/ExceptionMessage';

import { ProductDomain } from '../../utils/domain/Product.js';

export class UpdateProductHandler {
    static async handle(requester: {userId: number}, { productId, name, description, price, tags, images }: {productId: number, name: string, description: string, price: number, tags: string[], images: string[]}) {
        const productEntity = await prismaClient.$transaction(async (tx) => {
            const targetProductEntity = await tx.product.findUnique({
                where: {
                    id: Number(productId),
                },
            });

            if (!targetProductEntity) {
                throw new NotFoundException('Not Found', ExceptionMessage.PRODUCT_NOT_FOUND);
            }

            if (targetProductEntity.ownerId !== requester.userId) {
                throw new ForbiddenException('Forbidden', ExceptionMessage.FORBIDDEN);
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
