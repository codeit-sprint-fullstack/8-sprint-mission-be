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
exports.SignUpLocalUserHandler = void 0;
// Prisma 로드
const prismaClient_1 = require("../../utils/auth/prismaClient");
// 유틸리티 로드
const AuthTokenManager_1 = require("../../utils/auth/AuthTokenManager");
const UserPasswordBuilder_1 = require("../../utils/auth/UserPasswordBuilder");
// 예외 로드
const ExceptionMessage_1 = require("../../utils/exceptions/ExceptionMessage");
const UnprocessableEntityException_1 = require("../../utils/exceptions/UnprocessableEntityException");
// 도메인 로드
const User_1 = require("../../utils/domain/User");
class SignUpLocalUserHandler {
    static handle(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email, nickname, password, passwordConfirmation }) {
            // 패스워드 및 패스워드 확인 일치 여부 확인
            if (password !== passwordConfirmation) {
                throw new UnprocessableEntityException_1.UnprocessableEntityException('Unprocessable Entity', ExceptionMessage_1.ExceptionMessage.PASSWORD_CONFIRMATION_NOT_MATCH);
            }
            // 이미 존재하는 이메일인지 확인
            const existingUser = yield prismaClient_1.prismaClient.user.findUnique({
                where: {
                    email,
                },
            });
            if (existingUser) {
                throw new UnprocessableEntityException_1.UnprocessableEntityException('Unprocessable Entity', ExceptionMessage_1.ExceptionMessage.ALREADY_REGISTERED_EMAIL);
            }
            const userEntity = yield prismaClient_1.prismaClient.user.create({
                data: {
                    email,
                    nickname,
                    password: UserPasswordBuilder_1.UserPasswordBuilder.hashPassword(password),
                },
            });
            const user = new User_1.UserDomain(userEntity);
            // 액세스 토큰 및 리프레시 토큰 발급
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
        });
    }
}
exports.SignUpLocalUserHandler = SignUpLocalUserHandler;
