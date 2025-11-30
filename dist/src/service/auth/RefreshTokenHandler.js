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
exports.RefreshTokenHandler = void 0;
// Prisma 로드
const prismaClient_1 = require("../../utils/auth/prismaClient");
// 유틸리티 로드
const AuthTokenManager_1 = require("../../utils/auth/AuthTokenManager");
// 예외 로드
const ExceptionMessage_1 = require("../../utils/exceptions/ExceptionMessage");
const NotFoundException_1 = require("../../utils/exceptions/NotFoundException");
const UnprocessableEntityException_js_1 = require("../../utils/exceptions/UnprocessableEntityException.js");
// 도메인 로드
const User_1 = require("../../utils/domain/User");
class RefreshTokenHandler {
    static handle(_a) {
        return __awaiter(this, arguments, void 0, function* ({ refreshToken }) {
            if (!AuthTokenManager_1.AuthTokenManager.isValidRefreshToken(refreshToken)) {
                throw new UnprocessableEntityException_js_1.UnprocessableEntityException('Unprocessable Entity', ExceptionMessage_1.ExceptionMessage.INVALID_REFRESH_TOKEN);
            }
            const requester = AuthTokenManager_1.AuthTokenManager.getRequesterFromToken(`bearer ${refreshToken}`);
            const userEntity = yield prismaClient_1.prismaClient.user.findUnique({
                where: {
                    id: requester.userId,
                },
            });
            if (!userEntity) {
                throw new NotFoundException_1.NotFoundException('Not Found', ExceptionMessage_1.ExceptionMessage.USER_NOT_FOUND);
            }
            const refreshTokenEntity = yield prismaClient_1.prismaClient.refreshToken.findFirst({
                where: {
                    userId: requester.userId,
                    token: refreshToken,
                },
            });
            if (!refreshTokenEntity) {
                throw new UnprocessableEntityException_js_1.UnprocessableEntityException('Unprocessable Entity', ExceptionMessage_1.ExceptionMessage.INVALID_REFRESH_TOKEN);
            }
            const user = new User_1.UserDomain(userEntity);
            return {
                accessToken: AuthTokenManager_1.AuthTokenManager.buildAccessToken({
                    userId: user.getId(),
                }),
            };
        });
    }
}
exports.RefreshTokenHandler = RefreshTokenHandler;
