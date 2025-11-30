// Prisma 로드
import { prismaClient } from '../../utils/auth/prismaClient';

// 예외 로드
import { NotFoundException } from '../../utils/exceptions/NotFoundException';
import { ExceptionMessage } from '../../utils/exceptions/ExceptionMessage';

// 도메인 로드
import { ArticleDomain } from '../../utils/domain/Article';
import { UserDomain } from '../../utils/domain/User';

export class CreateArticleLikeHandler {
    static async handle(requester: {userId: number}, { articleId }: { articleId: number }) {
        const articleEntity = await prismaClient.$transaction(async (tx) => {
            const targetArticleEntity = await tx.article.findUnique({
                where: {
                    id: articleId,
                },
                include: {
                    likes: true,
                }
            });

            if (!targetArticleEntity) {
                throw new NotFoundException('Not Found', ExceptionMessage.ARTICLE_NOT_FOUND);
            }

            const likeEntity = await tx.like.findUnique({
                where: {
                    userId_articleId: {
                        userId: requester.userId,
                        articleId,
                    },
                },
            });

            if (!likeEntity) {
                await tx.like.create({
                    data: {
                        userId: requester.userId,
                        articleId,
                    },
                });
            }

            return targetArticleEntity;
        });

        if (!articleEntity) {
            throw new NotFoundException('Not Found', ExceptionMessage.ARTICLE_NOT_FOUND);
        }

        const article = new ArticleDomain(articleEntity);

        const writerEntity = await prismaClient.user.findUnique({
            where: {
                id: articleEntity.writerId,
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
            isFavorite: true,
        };
    }
}
