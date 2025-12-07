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
exports.signup = signup;
exports.login = login;
exports.logout = logout;
exports.refresh = refresh;
exports.check = check;
exports.oauthLogin = oauthLogin;
const token_1 = require("./utils/token");
const auth_service_1 = require("./auth.service");
const config_1 = require("../../config/config");
const errorTemplate_1 = require("../../config/errorTemplate");
//signup - 회원가입 email/pw/name -> 새로운 유저 생성.
function signup(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, email, password } = req.body;
            if (!name || !email || !password) {
                throw errorTemplate_1.ERROR_INVALID_SIGNUP_FORM;
            }
            if (!(0, token_1.isValidEmail)(email)) {
                throw errorTemplate_1.ERROR_INVALID_EMAIL_FORM;
            }
            const user = {
                name: name,
                email: email,
                password: password,
            };
            //createUesr()는 user를 파라미터로 받으므로 {}로 넘겨준다.
            const result = yield (0, auth_service_1.createUser)(user);
            return res.status(201).json(result);
        }
        catch (error) {
            next(error);
        }
    });
}
//login - email/pw를 이용해 엑세스 토큰 생성, 리프레시 토큰 세션/쿠키 포함.
function login(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        try {
            if (!email || !password) {
                throw errorTemplate_1.ERROR_INVALID_LOGIN_FORM;
            }
            if (!(0, token_1.isValidEmail)(email)) {
                throw errorTemplate_1.ERROR_INVALID_EMAIL_FORM;
            }
            const user = yield (0, auth_service_1.getUser)(email, password); //실패 시 함수 안에서 에러 throw
            if (user === null || user === void 0 ? void 0 : user.id) {
                const accessToken = (0, token_1.createToken)(user.id);
                const refreshToken = (0, token_1.createToken)(user.id, "refresh");
                yield (0, auth_service_1.updateUser)(user.id, { refreshToken });
                res.cookie("refreshToken", refreshToken, config_1.CookieOptions);
                res.status(200).json(Object.assign(Object.assign({}, user), { accessToken }));
            }
            else {
                throw errorTemplate_1.ERROR_USER_NOTFOUND;
            }
        }
        catch (error) {
            next(error);
        }
    });
}
//logout - 리프레쉬 토큰을 쿠키에서 지웁니다. (액세스 토큰 지우는 건 프론트에서 처리)
function logout(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            res.clearCookie("refreshToken", config_1.CookieOptions);
            res.status(200).json({ ok: true });
        }
        catch (error) {
            next(error);
        }
    });
}
//refresh - 리프레쉬 토큰이 있을 경우, 액세스/리프레쉬 토큰 재발급
function refresh(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const refreshToken = req.cookies.refreshToken;
            const userId = (_a = req.auth) === null || _a === void 0 ? void 0 : _a.userId;
            if (userId) {
                const newAccessToken = yield (0, token_1.refreshAccessToken)(userId, refreshToken);
                const newRefreshToken = (0, token_1.createToken)(userId, "refresh"); //액세스 토큰 갱신과 함께 리프레쉬 토큰도 갱신. 무한로그인 유지
                yield (0, auth_service_1.updateUser)(userId, { refreshToken: newRefreshToken });
                res.cookie("refreshToken", newRefreshToken, config_1.CookieOptions);
                return res.status(200).json({
                    ok: true,
                    accessToken: newAccessToken,
                });
            }
            else {
                const error = new Error("유저 인증 오류");
                error.code = 400;
                throw error;
            }
        }
        catch (error) {
            next(error);
        }
    });
}
function check(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const authHeader = req.headers.authorization;
            if (authHeader) {
                if (!authHeader.startsWith("Bearer ")) {
                    throw errorTemplate_1.ERROR_INVALID_ACCESSTOKEN_FORM;
                }
                const accessToken = authHeader.split(" ")[1];
                if (!(0, token_1.isValidToken)(accessToken)) {
                    throw errorTemplate_1.ERROR_UNATHORIZED;
                }
            }
            else {
                throw errorTemplate_1.ERROR_INVALID_ACCESSTOKEN_FORM;
            }
            return res.status(200).json({ authenticated: true });
        }
        catch (error) {
            const e = error;
            return res.status(e.code || 500).json({ authenticated: false });
        }
    });
}
function oauthLogin(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.id)) {
                throw errorTemplate_1.ERROR_OAUTH_USERID;
            }
            const { id: userId } = req.user;
            const accessToken = (0, token_1.createToken)(userId);
            const refreshToken = (0, token_1.createToken)(userId, "refresh");
            res.cookie("refreshToken", refreshToken, config_1.CookieOptions);
            res.redirect(`http://localhost:3000/oauth?accessToken=${accessToken}`);
        }
        catch (err) {
            next(err);
        }
    });
}
//# sourceMappingURL=auth.controller.js.map