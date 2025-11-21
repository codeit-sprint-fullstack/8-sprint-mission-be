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
exports.UpdateUserProfileHandler = void 0;
// Prisma 로드
const prismaClient_1 = require("../../utils/auth/prismaClient");
// 예외 처리
const NotFoundException_1 = require("../../utils/exceptions/NotFoundException");
const ExceptionMessage_1 = require("../../utils/exceptions/ExceptionMessage");
// 도메인 로드
const User_1 = require("../../utils/domain/User");
class UpdateUserProfileHandler {
    static handle(requester_1, _a) {
        return __awaiter(this, arguments, void 0, function* (requester, { image }) {
            const userEntity = yield prismaClient_1.prismaClient.user.findUnique({
                where: {
                    id: requester.userId,
                },
            });
            if (!userEntity) {
                throw new NotFoundException_1.NotFoundException('Not Found', ExceptionMessage_1.ExceptionMessage.USER_NOT_FOUND);
            }
            const user = new User_1.UserDomain(userEntity);
            user.setImage(image);
            yield prismaClient_1.prismaClient.user.update({
                where: {
                    id: user.getId(),
                },
                data: {
                    image: user.getImage(),
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
exports.UpdateUserProfileHandler = UpdateUserProfileHandler;
