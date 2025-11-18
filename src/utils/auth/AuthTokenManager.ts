import jwt, {JwtPayload} from 'jsonwebtoken';
import {RefreshToken, User} from '@prisma/client';

interface TokenPayload {
    userId: User['id'];
}

export class AuthTokenManager {
    /**
     * 현재 시각으로부터 1시간동안 유효한 액세스 토큰을 생성합니다.
     */
    static buildAccessToken(payload: TokenPayload): string {
        return jwt.sign(
            {
                user: {
                    id: payload.userId,
                },
            },
            process.env.JWT_ACCESS_TOKEN_SECRET as string,
            {
                expiresIn: '1h',
            },
        );
    }

    /**
     * 주어진 액세스 토큰이 유효한지 검증합니다.
     */
    static isValidAccessToken(accessToken: string): boolean {
        try {
            jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN_SECRET as string);
            return true;
        } catch (e) {
            return false;
        }
    }

    /**
     * 현재 시각으로부터 14일동안 유효한 리프레시 토큰을 생성합니다.
     */
    static buildRefreshToken(payload: TokenPayload): string {
        return jwt.sign(
            {
                user: {
                    id: payload.userId,
                },
            },
            process.env.JWT_REFRESH_TOKEN_SECRET as string,
            {
                expiresIn: '14d',
            },
        );
    }

    static isValidRefreshToken(refreshToken: RefreshToken['token']): boolean {
        try {
            jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET as string);

            return true;
        } catch (e) {
            return false;
        }
    }

    /**
     * 액세스 토큰 또는 리프래시 토큰으로부터 요청자 정보를 추출합니다.
     */
    static getRequesterFromToken(authorizationHeaderValue: string): {userId: number} {
        const jwtToken = authorizationHeaderValue.split(' ')[1]; // "bearer JWT_TOKEN" 형태로 전달받음

        const jwtPayload: JwtPayload | string | null = jwt.decode(jwtToken);

        if (!jwtPayload || typeof jwtPayload === 'string' || !jwtPayload.user?.id) {
            throw new Error('Invalid token payload');
        }

        return {
            userId: jwtPayload.user.id,
        };
    }

    static getRequesterFromTokenOrDefault(authorizationHeaderValue: string): {userId: number} {
        try {
            return this.getRequesterFromToken(authorizationHeaderValue);
        } catch (e) {
            return {
                userId: -1, // GUEST
            };
        }
    }
}
