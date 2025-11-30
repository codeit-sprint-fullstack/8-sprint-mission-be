"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPasswordBuilder = void 0;
const crypto_1 = __importDefault(require("crypto"));
class UserPasswordBuilder {
    /**
     * 보안상의 이유로 사용자 비밀번호를 해싱합니다.
     */
    static hashPassword(password) {
        return crypto_1.default.createHash('sha512').update(password).digest('base64');
    }
}
exports.UserPasswordBuilder = UserPasswordBuilder;
