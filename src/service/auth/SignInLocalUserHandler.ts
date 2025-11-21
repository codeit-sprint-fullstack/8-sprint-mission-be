// Prisma 로드
import { prismaClient } from '../../utils/auth/prismaClient';

// 타입 로드
import {User} from "@prisma/client";

// 유틸리티 로드
import { AuthTokenManager } from '../../utils/auth/AuthTokenManager';
import { UserPasswordBuilder } from '../../utils/auth/UserPasswordBuilder';

// 예외 로드
import { ExceptionMessage } from '../../utils/exceptions/ExceptionMessage';
import { NotFoundException } from '../../utils/exceptions/NotFoundException';

// 도메인 로드
import { UserDomain } from '../../utils/domain/User';

export class SignInLocalUserHandler {
    static async handle({ email, password }: { email: User['email']; password: User['password'] }) {
        const userEntity = await prismaClient.user.findUnique({
            where: {
                email,
            },
        });
        if (!userEntity) {
            throw new NotFoundException('Not Found', ExceptionMessage.USER_NOT_FOUND);
        }

        const user = new UserDomain(userEntity);

        // 패스워드 일치 여부 확인
        if (!user.checkPassword(UserPasswordBuilder.hashPassword(password))) {
            // 보안을 위해 비밀번호가 일치하지 않는 경우에도 USER_NOT_FOUND 에러메시지를 반환합니다.
            throw new NotFoundException('Not Found', ExceptionMessage.USER_NOT_FOUND);
        }

        // 액세스 토큰 및 리프레시 토큰 발급
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
}
