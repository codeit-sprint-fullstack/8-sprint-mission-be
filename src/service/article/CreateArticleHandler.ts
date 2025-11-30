// Prisma 로드
import { prismaClient } from '../../utils/auth/prismaClient';

// 도메인 로드
import { ArticleDomain } from '../../utils/domain/Article.js';
import { UserDomain } from '../../utils/domain/User.js';

export class CreateArticleHandler {
    static async handle(requester: {userId: number}, { title, content, image }: { title: string; content: string; image?: string }) {
        const articleEntity = await prismaClient.article.create({
            data: {
                writerId: requester.userId,
                title,
                content,
                image,
            },
            include: {
                likes: true,
            }
        });

        /**
         * [클래스 객체로 변환]
         *
         * articleEntity 는 Article 클래스의 인스턴스가 아니므로,
         * Article 클래스에 정의된 메서드를 사용할 수 없습니다.
         */

        if (!articleEntity) {
            throw new Error('Failed to create article');
        }

        const article = new ArticleDomain(articleEntity);

        const writerEntity = await prismaClient.user.findUnique({
            where: {
                id: article.getWriterId(),
            },
        });

        if(!writerEntity) {
            throw new Error('Writer not found');
        }

        const writer = new UserDomain(writerEntity);

        return {
            id: article.getId(),
            writer: {
                id: writer.getId(),
                nickname: writer.getNickname(),
                image: writer.getImage(),
            },
            title: article.getTitle(),
            content: article.getContent(),
            image: article.getImage(),
            createdAt: article.getCreatedAt(),
            updatedAt: article.getUpdatedAt(),
        };
    }
}
