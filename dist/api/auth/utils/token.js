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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = createToken;
exports.refreshAccessToken = refreshAccessToken;
exports.isValidEmail = isValidEmail;
exports.isValidToken = isValidToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_repository_1 = __importDefault(require("../auth.repository"));
const config_1 = require("../../../config/config");
const errorTemplate_1 = require("../../../config/errorTemplate");
const { JWT_SECRET, JWT_ACCESS_EXPIRES_IN, JWT_REFRESH_EXPIRES_IN } = config_1.envConstants;
// Access, Referresh token 발급
function createToken(userId, type = "access") {
    const payload = { userId };
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined");
    }
    const JWT_SECRET = process.env.JWT_SECRET;
    const expiresTime = type === "refresh" ? JWT_REFRESH_EXPIRES_IN : JWT_ACCESS_EXPIRES_IN;
    const token = jsonwebtoken_1.default.sign(payload, JWT_SECRET, {
        expiresIn: expiresTime,
    });
    return token;
}
function refreshAccessToken(userId, refreshToken) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield auth_repository_1.default.findById(userId);
        //리프레쉬 토큰이 유효하지 않으면 업데이트 불가
        if (!user || user.refreshToken !== refreshToken) {
            throw errorTemplate_1.ERROR_INVALID_REFRESHTOKEN;
        }
        const newAccessToken = createToken(user.id);
        return newAccessToken;
    });
}
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
function isValidToken(token) {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        return !!decoded; // 유효하면 true
    }
    catch (err) {
        return false; // 만료되었거나 위조된 경우
    }
}
/*
해설

jwt.sign()의 payload에는
토큰의 주체를 구별하는 id로 사용될 정보가 들어갑니다.
보통 JS객체 형식으로 들어갑니다.
user 정보를 객체로 넣어줘도 되겠지만, 어디서든 복호화 가능한 탓에
민감한 정보는 넣지 않습니다.

여기서는 서버에서 관리하는 유저 id(uuid)를 단순히 넣어주겠습니다.

유효기간은
{ expriresIn: '1h' } 의 형태로 넣습니다.
 => 1시간 동안 토큰 유효.
*/
//기존 createToken
/*
export function createToken(payload, options = {}) {
    const expiresIn = JWT_ACCESS_EXPIRES_IN;
    return jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn });
}
*/
//# sourceMappingURL=token.js.map