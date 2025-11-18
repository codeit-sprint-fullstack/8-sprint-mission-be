// Prisma 로드
import { prismaClient } from '../../utils/auth/prismaClient';

// 타입 로드
import {Comment} from "@prisma/client";

// 예외 로드
import { NotFoundException } from '../../utils/exceptions/NotFoundException';
import { ForbiddenException } from '../../utils/exceptions/ForbiddenException';
import { ExceptionMessage } from '../../utils/exceptions/ExceptionMessage';

import { CommentDomain } from '../../utils/domain/Comment';
import { UserDomain } from '../../utils/domain/User';

export class UpdateCommentHandler {
    static async handle(requester: any, { commentId, content }: { commentId: Comment['id'], content: NonNullable<Comment['content']> }): Promise<any> {
        const commentEntity = await prismaClient.$transaction(async (tx) => {
            const targetCommentEntity = await tx.comment.findUnique({
                where: {
                    id: commentId,
                },
            });

            if (!targetCommentEntity) {
                throw new NotFoundException('Not Found', ExceptionMessage.COMMENT_NOT_FOUND);
            }

            if (targetCommentEntity.writerId !== requester.userId) {
                throw new ForbiddenException('Forbidden', ExceptionMessage.FORBIDDEN);
            }

            return tx.comment.update({
                where: {
                    id: commentId,
                },
                data: {
                    content,
                },
            });
        });

        const comment = new CommentDomain(commentEntity);

        const writerEntity = await prismaClient.user.findUnique({
            where: {
                id: comment.getWriterId(),
            },
        });

        if(!writerEntity) {
            throw new NotFoundException('Not Found', ExceptionMessage.USER_NOT_FOUND);
        }

        const writer = new UserDomain(writerEntity);

        return {
            id: comment.getId(),
            writer: {
                id: writer.getId(),
                nickname: writer.getNickname(),
                image: writer.getImage(),
            },
            articleId: comment.getArticleId(),
            productId: comment.getProductId(),
            content: comment.getContent(),
            createdAt: comment.getCreatedAt(),
        };
    }
}

