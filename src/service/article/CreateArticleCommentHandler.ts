// Prisma 로드
import { prismaClient } from '../../../prisma/prismaClient';

// 예외 로드
import { NotFoundException } from '../../utils/exceptions/NotFoundException';
import { ExceptionMessage } from '../../utils/exceptions/ExceptionMessage';

// 도메인 로드
import { CommentDomain } from '../../utils/domain/Comment.js';
import { UserDomain } from '../../utils/domain/User.js';

export class CreateArticleCommentHandler {
    static async handle(requester: { userId: number; }, {articleId, content}: { articleId: number; content: string; }) {
        /**
         * [게시글 댓글 등록 트랜잭션]
         *
         * 1. 게시글이 존재하는지 확인합니다.
         * 2. 게시글이 존재한다면, 댓글을 등록합니다.
         */
        const commentEntity = await prismaClient.$transaction(async (tx) => {
            const targetArticleEntity = await tx.article.findUnique({
                where: {
                    id: articleId,
                },
            });

            if (!targetArticleEntity) {
                throw new NotFoundException('Not Found', ExceptionMessage.ARTICLE_NOT_FOUND);
            }

            return tx.comment.create({
                data: {
                    articleId,
                    writerId: requester.userId,
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

        if (!writerEntity) {
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
            content: comment.getContent(),
            createdAt: comment.getCreatedAt(),
        };
    }
}
