// Prisma 로드
import { prismaClient } from '../../utils/auth/prismaClient';

// 예외 로드
import { NotFoundException } from '../../utils/exceptions/NotFoundException';
import { ExceptionMessage } from '../../utils/exceptions/ExceptionMessage';

// 도메인 로드
import { ArticleDomain } from '../../utils/domain/Article.js';
import { UserDomain } from '../../utils/domain/User.js';

export class GetArticleHandler {
    static async handle(requester: { userId: number }, { articleId }: { articleId: number }) {
        const articleEntity = await prismaClient.article.findUnique({
            where: {
                id: Number(articleId), // params 에서 가져온 값은 문자열이므로, 여기서는 숫자로 변환하여 사용해야 합니다.
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
            favoriteCount: article.getFavoriteCount(),
            isFavorite: article.getIsFavorite(requester.userId),
        };
    }
}
