// Prisma 로드
import { prismaClient } from '../../utils/auth/prismaClient';

// 유틸리티 로드
import { UserPasswordBuilder } from '../../utils/auth/UserPasswordBuilder';

// 예외 로드
import { UnprocessableEntityException } from '../../utils/exceptions/UnprocessableEntityException';
import { NotFoundException } from '../../utils/exceptions/NotFoundException';
import { ExceptionMessage } from '../../utils/exceptions/ExceptionMessage';

// 도메인 로드
import { UserDomain } from '../../utils/domain/User';

export class UpdateUserPasswordHandler {
    static async handle(requester: {userId: number}, { password, passwordConfirmation, currentPassword }: {password: string, passwordConfirmation: string, currentPassword: string}) {
        // 패스워드와 패스워드 확인이 일치하는지 검증
        if (password !== passwordConfirmation) {
            throw new UnprocessableEntityException('Unprocessable Entity', 
                ExceptionMessage.PASSWORD_CONFIRMATION_NOT_MATCH,
            );
        }

        const userEntity = await prismaClient.user.findUnique({
            where: {
                id: requester.userId,
            },
        });
        if (!userEntity) {
            throw new NotFoundException('Not Found', ExceptionMessage.USER_NOT_FOUND);
        }

        const user = new UserDomain(userEntity);

        // 현재 패스워드가 일치하는지 검증
        if (!user.checkPassword(UserPasswordBuilder.hashPassword(currentPassword))) {
            throw new UnprocessableEntityException('Unprocessable Entity', ExceptionMessage.CURRENT_PASSWORD_NOT_MATCH);
        }

        // 비밀번호 변경 진행
        const hashedPassword = UserPasswordBuilder.hashPassword(password);
        user.setPassword(hashedPassword);
        await prismaClient.user.update({
            where: {
                id: user.getId(),
            },
            data: {
                password: hashedPassword,
            },
        });

        return {
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
