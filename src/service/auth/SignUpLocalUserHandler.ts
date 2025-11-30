// Prisma 로드
import { prismaClient } from '../../utils/auth/prismaClient';

// 타입 로드
import {User} from "@prisma/client";

// 유틸리티 로드
import { AuthTokenManager } from '../../utils/auth/AuthTokenManager';
import { UserPasswordBuilder } from '../../utils/auth/UserPasswordBuilder';

// 예외 로드
import { ExceptionMessage } from '../../utils/exceptions/ExceptionMessage';
import { UnprocessableEntityException } from '../../utils/exceptions/UnprocessableEntityException';

// 도메인 로드
import { UserDomain } from '../../utils/domain/User';

export class SignUpLocalUserHandler {
    static async handle({ email, nickname, password, passwordConfirmation }: {
        email: User['email'],
        nickname: User['nickname'],
        password: User['password'],
        passwordConfirmation: User['password']
    }) {
        // 패스워드 및 패스워드 확인 일치 여부 확인
        if (password !== passwordConfirmation) {
            throw new UnprocessableEntityException('Unprocessable Entity', 
                ExceptionMessage.PASSWORD_CONFIRMATION_NOT_MATCH,
            );
        }

        // 이미 존재하는 이메일인지 확인
        const existingUser = await prismaClient.user.findUnique({
            where: {
                email,
            },
        });
        if (existingUser) {
            throw new UnprocessableEntityException('Unprocessable Entity', ExceptionMessage.ALREADY_REGISTERED_EMAIL);
        }

        const userEntity = await prismaClient.user.create({
            data: {
                email,
                nickname,
                password: UserPasswordBuilder.hashPassword(password),
            },
        });

        const user = new UserDomain(userEntity);

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
