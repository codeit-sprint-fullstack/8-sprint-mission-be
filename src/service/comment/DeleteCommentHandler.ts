// Prisma 로드
import { prismaClient } from '../../utils/auth/prismaClient';

// 타입 로드
import {Comment} from "@prisma/client";

// 예외 로드
import { NotFoundException } from '../../utils/exceptions/NotFoundException';
import { ForbiddenException } from '../../utils/exceptions/ForbiddenException';
import { ExceptionMessage } from '../../utils/exceptions/ExceptionMessage';

export class DeleteCommentHandler {
    static async handle(requester: { userId: Comment['writerId'] } | undefined, commentId: Comment['id']): Promise<void> {
        await prismaClient.$transaction(async (tx) => {
            const targetCommentEntity = await tx.comment.findUnique({
                where: {
                    id: commentId,
                },
            });

            if (!targetCommentEntity) {
                throw new NotFoundException('Not Found', ExceptionMessage.COMMENT_NOT_FOUND);
            }

            if (!requester) {
                throw new ForbiddenException('Forbidden', ExceptionMessage.FORBIDDEN);
            }

            if (targetCommentEntity.writerId !== requester.userId) {
                throw new ForbiddenException('Forbidden', ExceptionMessage.FORBIDDEN);
            }

            return tx.comment.delete({
                where: {
                    id: commentId,
                },
            });
        });
    }
}
