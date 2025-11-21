"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthTokenManager = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthTokenManager {
    /**
     * 현재 시각으로부터 1시간동안 유효한 액세스 토큰을 생성합니다.
     */
    static buildAccessToken(payload) {
        return jsonwebtoken_1.default.sign({
            user: {
                id: payload.userId,
            },
        }, process.env.JWT_ACCESS_TOKEN_SECRET, {
            expiresIn: '1h',
        });
    }
    /**
     * 주어진 액세스 토큰이 유효한지 검증합니다.
     */
    static isValidAccessToken(accessToken) {
        try {
            jsonwebtoken_1.default.verify(accessToken, process.env.JWT_ACCESS_TOKEN_SECRET);
            return true;
        }
        catch (e) {
            return false;
        }
    }
    /**
     * 현재 시각으로부터 14일동안 유효한 리프레시 토큰을 생성합니다.
     */
    static buildRefreshToken(payload) {
        return jsonwebtoken_1.default.sign({
            user: {
                id: payload.userId,
            },
        }, process.env.JWT_REFRESH_TOKEN_SECRET, {
            expiresIn: '14d',
        });
    }
    static isValidRefreshToken(refreshToken) {
        try {
            jsonwebtoken_1.default.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET);
            return true;
        }
        catch (e) {
            return false;
        }
    }
    /**
     * 액세스 토큰 또는 리프래시 토큰으로부터 요청자 정보를 추출합니다.
     */
    static getRequesterFromToken(authorizationHeaderValue) {
        var _a;
        const jwtToken = authorizationHeaderValue.split(' ')[1]; // "bearer JWT_TOKEN" 형태로 전달받음
        const jwtPayload = jsonwebtoken_1.default.decode(jwtToken);
        if (!jwtPayload || typeof jwtPayload === 'string' || !((_a = jwtPayload.user) === null || _a === void 0 ? void 0 : _a.id)) {
            throw new Error('Invalid token payload');
        }
        return {
            userId: jwtPayload.user.id,
        };
    }
    static getRequesterFromTokenOrDefault(authorizationHeaderValue) {
        try {
            return this.getRequesterFromToken(authorizationHeaderValue);
        }
        catch (e) {
            return {
                userId: -1, // GUEST
            };
        }
    }
}
exports.AuthTokenManager = AuthTokenManager;
