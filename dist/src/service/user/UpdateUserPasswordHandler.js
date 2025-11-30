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
exports.UpdateUserPasswordHandler = void 0;
// Prisma 로드
const prismaClient_1 = require("../../utils/auth/prismaClient");
// 유틸리티 로드
const UserPasswordBuilder_1 = require("../../utils/auth/UserPasswordBuilder");
// 예외 로드
const UnprocessableEntityException_1 = require("../../utils/exceptions/UnprocessableEntityException");
const NotFoundException_1 = require("../../utils/exceptions/NotFoundException");
const ExceptionMessage_1 = require("../../utils/exceptions/ExceptionMessage");
// 도메인 로드
const User_1 = require("../../utils/domain/User");
class UpdateUserPasswordHandler {
    static handle(requester_1, _a) {
        return __awaiter(this, arguments, void 0, function* (requester, { password, passwordConfirmation, currentPassword }) {
            // 패스워드와 패스워드 확인이 일치하는지 검증
            if (password !== passwordConfirmation) {
                throw new UnprocessableEntityException_1.UnprocessableEntityException('Unprocessable Entity', ExceptionMessage_1.ExceptionMessage.PASSWORD_CONFIRMATION_NOT_MATCH);
            }
            const userEntity = yield prismaClient_1.prismaClient.user.findUnique({
                where: {
                    id: requester.userId,
                },
            });
            if (!userEntity) {
                throw new NotFoundException_1.NotFoundException('Not Found', ExceptionMessage_1.ExceptionMessage.USER_NOT_FOUND);
            }
            const user = new User_1.UserDomain(userEntity);
            // 현재 패스워드가 일치하는지 검증
            if (!user.checkPassword(UserPasswordBuilder_1.UserPasswordBuilder.hashPassword(currentPassword))) {
                throw new UnprocessableEntityException_1.UnprocessableEntityException('Unprocessable Entity', ExceptionMessage_1.ExceptionMessage.CURRENT_PASSWORD_NOT_MATCH);
            }
            // 비밀번호 변경 진행
            const hashedPassword = UserPasswordBuilder_1.UserPasswordBuilder.hashPassword(password);
            user.setPassword(hashedPassword);
            yield prismaClient_1.prismaClient.user.update({
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
        });
    }
}
exports.UpdateUserPasswordHandler = UpdateUserPasswordHandler;
