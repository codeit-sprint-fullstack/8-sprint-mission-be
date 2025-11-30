// Prisma 로드
import { prismaClient } from '../../utils/auth/prismaClient';

// 유틸리티 로드
import { AuthTokenManager } from '../../utils/auth/AuthTokenManager';

// 예외 로드
import { ExceptionMessage } from '../../utils/exceptions/ExceptionMessage';
import { NotFoundException } from '../../utils/exceptions/NotFoundException';
import { UnprocessableEntityException } from '../../utils/exceptions/UnprocessableEntityException.js';

// 도메인 로드
import { UserDomain } from '../../utils/domain/User';

export class RefreshTokenHandler {
    static async handle({ refreshToken }: { refreshToken: string }) {
        if (!AuthTokenManager.isValidRefreshToken(refreshToken)) {
            throw new UnprocessableEntityException('Unprocessable Entity', ExceptionMessage.INVALID_REFRESH_TOKEN);
        }

        const requester = AuthTokenManager.getRequesterFromToken(`bearer ${refreshToken}`);

        const userEntity = await prismaClient.user.findUnique({
            where: {
                id: requester.userId,
            },
        });
        if (!userEntity) {
            throw new NotFoundException('Not Found', ExceptionMessage.USER_NOT_FOUND);
        }

        const refreshTokenEntity = await prismaClient.refreshToken.findFirst({
            where: {
                userId: requester.userId,
                token: refreshToken,
            },
        });
        if (!refreshTokenEntity) {
            throw new UnprocessableEntityException('Unprocessable Entity', ExceptionMessage.INVALID_REFRESH_TOKEN);
        }
        const user = new UserDomain(userEntity);

        return {
            accessToken: AuthTokenManager.buildAccessToken({
                userId: user.getId(),
            }),
        };
    }
}
