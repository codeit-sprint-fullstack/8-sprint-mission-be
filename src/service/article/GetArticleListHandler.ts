// Prisma 로드
import { prismaClient } from '../../utils/auth/prismaClient';

// 도메인 로드
import { ArticleDomain } from '../../utils/domain/Article';
import { UserDomain } from '../../utils/domain/User';
import { LikeDomain } from '../../utils/domain/Like';

export class GetArticleListHandler {
    static async handle(requester: {userId: number}, { cursor, limit, orderBy, keyword }: { cursor?: number; limit: number; orderBy: 'recent' | 'favorite'; keyword?: string }) {
        const orderByOption = (() => {
            switch (orderBy) {
                case 'favorite':
                    return {
                        likes: {
                            _count: 'desc' as const, // 좋아요 많은 순으로 정렬
                        },
                    };
                case 'recent':
                default:
                    return { createdAt: 'desc' as const };
            }
        })();

        const articleEntities = await prismaClient.article.findMany({
            cursor: cursor
                ? {
                    id: cursor,
                }
                : undefined,
            take: limit + 1,
            orderBy: orderByOption,
            where: {
                title: keyword ? { contains: keyword } : undefined,
            },
            include: {
                likes: true,
            },
        });

        const articles = articleEntities.map(
            (articleEntity) => new ArticleDomain(articleEntity)
        );

        const writerEntities = await prismaClient.user.findMany({
            where: {
                id: {
                    in: Array.from(
                        new Set(articles.map((article) => article.getWriterId()))
                    ),
                },
            },
        });

        const writers = writerEntities.map(
            (writerEntity) => new UserDomain(writerEntity)
        );

        const likeEntities = await prismaClient.like.findMany({
            where: {
                userId: requester.userId,
                articleId: {
                    in: Array.from(new Set(articles.map((article) => article.getId()))),
                },
            },
        });

        const likes = likeEntities.map((likeEntity) => new LikeDomain(likeEntity));

        const hasNext = articles.length === limit + 1;

        return {
            list: articles.slice(0, limit).map((article) => {
                const writer = writers.find(
                    (writer) => writer.getId() === article.getWriterId()
                );
                const like = likes.find(
                    (like) => like.getArticleId() === article.getId()
                );

                if (!writer) {
                    throw new Error('작성자를 찾을 수 없습니다.');
                }

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
                    isFavorite: !!like,
                };
            }),
            nextCursor: hasNext ? articles[articles.length - 1].getId() : null,
        };
    }
}
