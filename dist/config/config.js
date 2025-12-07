"use strict";
//환경변수, 각종 상수, 공용타입 선언 파일입니다.
//어디에 정리해야 될지 몰라서 모아두었습니다.
var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CookieOptions = exports.envConstants = void 0;
exports.envConstants = {
    PORT: (_a = process.env.PORT) !== null && _a !== void 0 ? _a : "",
    DATABASE_URL: (_b = process.env.DATABASE_URL) !== null && _b !== void 0 ? _b : "",
    JWT_SECRET: (_c = process.env.JWT_SECRET) !== null && _c !== void 0 ? _c : "",
    JWT_ACCESS_EXPIRES_IN: (_d = process.env.JWT_ACCESS_EXPIRES_IN) !== null && _d !== void 0 ? _d : "",
    JWT_REFRESH_EXPIRES_IN: (_e = process.env.JWT_REFRESH_EXPIRES_IN) !== null && _e !== void 0 ? _e : "",
    GOOGLE_CLIENT_ID: (_f = process.env.GOOGLE_CLIENT_ID) !== null && _f !== void 0 ? _f : "",
    GOOGLE_CLIENT_SECRET: (_g = process.env.GOOGLE_CLIENT_SECRET) !== null && _g !== void 0 ? _g : "",
};
function convertToBoolean(boolValue) {
    if (boolValue === "true")
        return true;
    if (boolValue === "false")
        return false;
    return null;
}
function checkSameSiteValue(value) {
    if (value === "lax" || value === "strict" || value === "none") {
        return value;
    }
    return undefined;
}
const { COOKIE_HTTP_ONLY, COOKIE_SECURE, COOKIE_SAME_SITE } = process.env;
exports.CookieOptions = {
    httpOnly: convertToBoolean(COOKIE_HTTP_ONLY) || true, //JS 접근 불가
    secure: convertToBoolean(COOKIE_SECURE) || false, //로컬 실험용. -> 배포 true
    sameSite: checkSameSiteValue(COOKIE_SAME_SITE) || "lax", //로컬 실험용. -> 배포 'none'
};
//# sourceMappingURL=config.js.map