// Prisma 로드
import { prismaClient } from '../../utils/auth/prismaClient';

// 예외 로드
import { NotFoundException } from '../../utils/exceptions/NotFoundException';
import { ForbiddenException } from '../../utils/exceptions/ForbiddenException';
import { ExceptionMessage } from '../../utils/exceptions/ExceptionMessage';

// 도메인 로드
import { ArticleDomain } from '../../utils/domain/Article.js';
import { UserDomain } from '../../utils/domain/User.js';

export class UpdateArticleHandler {
    static async handle(requester: {userId: number}, { articleId, title, content, image }: { articleId: number; title: string; content: string; image: string }) {
        /**
         * [게시글 수정 트랜잭션]
         *
         * 1. 게시글을 수정하기 전에 해당 게시글이 존재하는지 확인합니다.
         * 2. 게시글이 존재한다면, 게시글을 수정합니다.
         *
         * update() 하나만 사용해도 결과적으로는 동일합니다.
         */
        const articleEntity = await prismaClient.$transaction(async (tx) => {
            const targetArticleEntity = await tx.article.findUnique({
                where: {
                    id: articleId,
                },
            });

            if (!targetArticleEntity) {
                throw new NotFoundException('Not Found', ExceptionMessage.ARTICLE_NOT_FOUND);
            }

            if (targetArticleEntity.writerId !== requester.userId) {
                throw new ForbiddenException('Forbidden', ExceptionMessage.FORBIDDEN);
            }

            return tx.article.update({
                where: {
                    id: articleId,
                },
                include: {
                    likes: {
                        select: {
                            // 좋아요의 id, userId만 필요함
                            id: true,
                            userId: true,
                        },
                    },
                },
                data: {
                    title,
                    content,
                    image,
                },
            });
        });

        if (!articleEntity) {
            throw new NotFoundException('Not Found', ExceptionMessage.ARTICLE_NOT_FOUND);
        }

        const article = new ArticleDomain(articleEntity);

        const writerEntity = await prismaClient.user.findUnique({
            where: {
                id: article.getWriterId(),
            },
        });

        if (!writerEntity) {
            throw new NotFoundException('Not Found', ExceptionMessage.USER_NOT_FOUND);
        }

        const writer = new UserDomain(writerEntity);

        return {
            id: article.getId(),
            writer: {
                id: writer.getId(),
                nickname: writer.getNickname(),
            },
            title: article.getTitle(),
            content: article.getContent(),
            image: article.getImage(),
            createdAt: article.getCreatedAt(),
        };
    }
}
