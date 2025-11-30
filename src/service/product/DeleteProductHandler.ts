// Prisma 로드
import { prismaClient } from '../../utils/auth/prismaClient';

// 예외 로드
import { NotFoundException } from '../../utils/exceptions/NotFoundException';
import { ForbiddenException } from '../../utils/exceptions/ForbiddenException';
import { ExceptionMessage } from '../../utils/exceptions/ExceptionMessage';

export class DeleteProductHandler {
    static async handle(requester: {userId: number}, { productId }: {productId: number}) {
        await prismaClient.$transaction(async (tx) => {
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

            return tx.product.delete({
                where: {
                    id: Number(productId),
                },
            });
        });
    }
}
