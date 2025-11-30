// Prisma 로드
import { prismaClient } from '../../utils/auth/prismaClient';

// 예외 로드
import { NotFoundException } from '../../utils/exceptions/NotFoundException';
import { ExceptionMessage } from '../../utils/exceptions/ExceptionMessage';

// 도메인 로드
import { UserDomain } from '../../utils/domain/User';

export class GetUserProfileHandler {
    static async handle(requester: { userId: number }) {
        const userEntity = await prismaClient.user.findUnique({
            where: {
                id: requester.userId,
            },
        });

        if (!userEntity) {
            throw new NotFoundException('Not Found', ExceptionMessage.USER_NOT_FOUND);
        }

        const user = new UserDomain(userEntity);

        return {
            id: user.getId(),
            email: user.getEmail(),
            nickname: user.getNickname(),
            image: user.getImage(),
            createdAt: user.getCreatedAt(),
            updatedAt: user.getUpdatedAt(),
        };
    }
}
