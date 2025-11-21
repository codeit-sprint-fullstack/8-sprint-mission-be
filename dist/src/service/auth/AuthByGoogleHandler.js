"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthByGoogleHandler = void 0;
// Prisma 로드
const prismaClient_1 = require("../../utils/auth/prismaClient");
// 유틸리티 로드
const AuthTokenManager_1 = require("../../utils/auth/AuthTokenManager");
const GoogleOAuthAdapter_1 = require("../../utils/auth/GoogleOAuthAdapter");
// 예외 로드
const ExceptionMessage_1 = require("../../utils/exceptions/ExceptionMessage");
const InternalServerErrorException_1 = require("../../utils/exceptions/InternalServerErrorException");
// 도메인 로드
const User_1 = require("../../utils/domain/User");
class AuthByGoogleHandler {
    static handle(_a) {
        return __awaiter(this, arguments, void 0, function* ({ code }) {
            const googleAccessToken = yield GoogleOAuthAdapter_1.googleOAuthHelper.getAccessToken(code);
            const googleProfile = yield GoogleOAuthAdapter_1.googleOAuthHelper.getProfile(googleAccessToken);
            // 이미 존재하는 이메일인지 확인
            const existingUserEntity = yield prismaClient_1.prismaClient.user.findUnique({
                where: {
                    email: googleProfile.email,
                },
            });
            // 이미 존재하는 경우, 로그인 처리
            if (existingUserEntity) {
                const user = new User_1.UserDomain(existingUserEntity);
                const accessToken = AuthTokenManager_1.AuthTokenManager.buildAccessToken({ userId: user.getId() });
                const refreshToken = AuthTokenManager_1.AuthTokenManager.buildRefreshToken({ userId: user.getId() });
                yield prismaClient_1.prismaClient.refreshToken.create({
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
                const createdUserEntity = yield prismaClient_1.prismaClient.user.create({
                    data: {
                        email: googleProfile.email,
                        nickname: googleProfile.nickname,
                        password: '', // 써드파티 유저의 경우 패스워드가 필요하지 않습니다.
                        image: googleProfile.image,
                    },
                });
                const user = new User_1.UserDomain(createdUserEntity);
                const accessToken = AuthTokenManager_1.AuthTokenManager.buildAccessToken({ userId: user.getId() });
                const refreshToken = AuthTokenManager_1.AuthTokenManager.buildRefreshToken({ userId: user.getId() });
                yield prismaClient_1.prismaClient.refreshToken.create({
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
            throw new InternalServerErrorException_1.InternalServerErrorException('Internal Server Error', ExceptionMessage_1.ExceptionMessage.GOOGLE_LOGIN_FAILED);
        });
    }
}
exports.AuthByGoogleHandler = AuthByGoogleHandler;
