// Prisma 로드
import { prismaClient } from '../../utils/auth/prismaClient';

// 예외 로드
import { NotFoundException } from '../../utils/exceptions/NotFoundException';
import { ExceptionMessage } from '../../utils/exceptions/ExceptionMessage';

// 도메인 로드
import { CommentDomain } from '../../utils/domain/Comment.js';
import { UserDomain } from '../../utils/domain/User.js';

export class GetProductCommentListHandler {
    static async handle({ productId, cursor, limit }: { productId: number; cursor?: number; limit: number }) {
        const commentEntities = await prismaClient.$transaction(async (tx) => {
            const targetProductEntity = await tx.product.findUnique({
                where: {
                    id: Number(productId),
                },
            });

            if (!targetProductEntity) {
                throw new NotFoundException('Not Found', ExceptionMessage.PRODUCT_NOT_FOUND);
            }

            return tx.comment.findMany({
                cursor: cursor
                    ? {
                        id: cursor,
                    }
                    : undefined,
                take: limit + 1,
                where: {
                    productId: Number(productId),
                },
            });
        });

        const comments = commentEntities.map((commentEntity) => new CommentDomain(commentEntity));

        const writerEntities = await prismaClient.user.findMany({
            where: {
                id: {
                    in: Array.from(new Set(comments.map((comment) => comment.getWriterId()))),
                },
            },
        });

        const writers = writerEntities.map((writerEntity) => new UserDomain(writerEntity));
        const hasNext = comments.length === limit + 1;

        return {
            list: comments.slice(0, limit).map((comment) => {
                const writer = writers.find((writer) => writer.getId() === comment.getWriterId());

                if (!writer) {
                    throw new NotFoundException('Not Found', ExceptionMessage.USER_NOT_FOUND);
                }

                return {
                    id: comment.getId(),
                    writer: {
                        id: writer.getId(),
                        nickname: writer.getNickname(),
                        image: writer.getImage(),
                    },
                    productId: comment.getProductId(),
                    content: comment.getContent(),
                    createdAt: comment.getCreatedAt(),
                    updatedAt: comment.getUpdatedAt(),
                };
            }),
            nextCursor: hasNext ? comments[comments.length - 1].getId() : null,
        };
    }
}
