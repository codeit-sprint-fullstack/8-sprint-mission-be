// Prisma 로드
import { prismaClient } from '../../utils/auth/prismaClient';

// 유틸리티 로드
import { AuthTokenManager } from '../../utils/auth/AuthTokenManager';
import { googleOAuthHelper } from '../../utils/auth/GoogleOAuthAdapter';

// 예외 로드
import { ExceptionMessage } from '../../utils/exceptions/ExceptionMessage';
import { InternalServerErrorException } from '../../utils/exceptions/InternalServerErrorException';

// 도메인 로드
import { UserDomain } from '../../utils/domain/User';

export class AuthByGoogleHandler {
    static async handle({ code }: { code: string }) {
        const googleAccessToken = await googleOAuthHelper.getAccessToken(code);
        const googleProfile = await googleOAuthHelper.getProfile(googleAccessToken);

        // 이미 존재하는 이메일인지 확인
        const existingUserEntity = await prismaClient.user.findUnique({
            where: {
                email: googleProfile.email,
            },
        });

        // 이미 존재하는 경우, 로그인 처리
        if (existingUserEntity) {
            const user = new UserDomain(existingUserEntity);

            const accessToken = AuthTokenManager.buildAccessToken({ userId: user.getId() });
            const refreshToken = AuthTokenManager.buildRefreshToken({ userId: user.getId() });
            await prismaClient.refreshToken.create({
                data: {
                    userId: user.getId(),
                    token: refreshToken,
                },
            });

            return {
                accessToken,
                refreshToken,
                user: {
                    id: user.getId(),
                    email: user.getEmail(),
                    nickname: user.getNickname(),
                    image: user.getImage(),
                    createdAt: user.getCreatedAt(),
                    updatedAt: user.getUpdatedAt(),
                },
            };
        }

        // 존재하지 않는 경우, 회원가입 처리
        if (!existingUserEntity) {
            const createdUserEntity = await prismaClient.user.create({
                data: {
                    email: googleProfile.email,
                    nickname: googleProfile.nickname,
                    password: '', // 써드파티 유저의 경우 패스워드가 필요하지 않습니다.
                    image: googleProfile.image,
                },
            });

            const user = new UserDomain(createdUserEntity);

            const accessToken = AuthTokenManager.buildAccessToken({ userId: user.getId() });
            const refreshToken = AuthTokenManager.buildRefreshToken({ userId: user.getId() });
            await prismaClient.refreshToken.create({
                data: {
                    userId: user.getId(),
                    token: refreshToken,
                },
            });

            return {
                accessToken,
                refreshToken,
                user: {
                    id: user.getId(),
                    email: user.getEmail(),
                    nickname: user.getNickname(),
                    image: user.getImage(),
                    createdAt: user.getCreatedAt(),
                    updatedAt: user.getUpdatedAt(),
                },
            };
        }

        throw new InternalServerErrorException('Internal Server Error', ExceptionMessage.GOOGLE_LOGIN_FAILED);
    }
}
