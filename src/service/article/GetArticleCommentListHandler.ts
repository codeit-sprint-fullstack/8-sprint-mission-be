// Prisma 로드
import { prismaClient } from '../../utils/auth/prismaClient';

// 예외 로드
import { NotFoundException } from '../../utils/exceptions/NotFoundException';
import { ExceptionMessage } from '../../utils/exceptions/ExceptionMessage';

// 도메인 로드
import { CommentDomain } from '../../utils/domain/Comment';
import { UserDomain } from '../../utils/domain/User';

export class GetArticleCommentListHandler {
    static async handle({ articleId, cursor, take }: {articleId: number; cursor?: number; take: number}) {
        const commentEntities = await prismaClient.$transaction(async (tx) => {
            const targetArticleEntity = await tx.article.findUnique({
                where: {
                    id: articleId,
                },
            });

            if (!targetArticleEntity) {
                throw new NotFoundException('Not Found', ExceptionMessage.ARTICLE_NOT_FOUND);
            }

            return tx.comment.findMany({
                cursor: cursor
                    ? {
                        id: cursor,
                    }
                    : undefined,
                take: take + 1,
                where: {
                    articleId: articleId,
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

        const hasNext = comments.length === take + 1;

        return {
            data: comments.slice(0, take).map((comment) => {
                const writer = writers.find((writer) => writer.getId() === comment.getWriterId());

                if (!writer) {
                    throw new NotFoundException('글쓴이를 찾을 수 없습니다.', ExceptionMessage.USER_NOT_FOUND);
                }

                return {
                    id: comment.getId(),
                    writer: {
                        id: writer.getId(),
                        nickname: writer.getNickname(),
                        image: writer.getImage(),
                    },
                    articleId: comment.getArticleId(),
                    content: comment.getContent(),
                    createdAt: comment.getCreatedAt(),
                };
            }),
            hasNext,
            nextCursor: hasNext ? comments[comments.length - 1].getId() : null,
        };
    }
}
