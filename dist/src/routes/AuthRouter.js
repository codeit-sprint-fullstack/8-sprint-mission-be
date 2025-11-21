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
exports.AuthRouter = void 0;
// 라이브러리 로드
const superstruct_1 = require("superstruct");
const express_1 = __importDefault(require("express"));
// 유틸리티 로드
const asyncErrorHandler_js_1 = require("./utils/asyncErrorHandler.js");
// Structs 로드
const SignUpRequestStruct_1 = require("../utils/structs/auth/SignUpRequestStruct");
const SignInRequestStruct_1 = require("../utils/structs/auth/SignInRequestStruct");
const RefreshTokenRequestStruct_1 = require("../utils/structs/auth/RefreshTokenRequestStruct");
// 핸들러 로드
const SignUpLocalUserHandler_1 = require("../service/auth/SignUpLocalUserHandler");
const SignInLocalUserHandler_js_1 = require("../service/auth/SignInLocalUserHandler.js");
const RefreshTokenHandler_js_1 = require("../service/auth/RefreshTokenHandler.js");
const AuthByGoogleHandler_js_1 = require("../service/auth/AuthByGoogleHandler.js");
const GoogleOAuthAdapter_1 = require("../utils/auth/GoogleOAuthAdapter");
exports.AuthRouter = express_1.default.Router();
// 회원가입 api
exports.AuthRouter.post('/signUp', (0, asyncErrorHandler_js_1.asyncErrorHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, nickname, password, passwordConfirmation } = (0, superstruct_1.create)(req.body, SignUpRequestStruct_1.SignUpRequestStruct);
    const userView = yield SignUpLocalUserHandler_1.SignUpLocalUserHandler.handle({
        email,
        nickname,
        password,
        passwordConfirmation,
    });
    res.status(201).send(userView);
})));
// 로그인 api
exports.AuthRouter.post('/signIn', (0, asyncErrorHandler_js_1.asyncErrorHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = (0, superstruct_1.create)(req.body, SignInRequestStruct_1.SignInRequestStruct);
    const userView = yield SignInLocalUserHandler_js_1.SignInLocalUserHandler.handle({
        email,
        password,
    });
    res.send(userView);
})));
// 토큰 갱신 api
exports.AuthRouter.post('/refresh-token', (0, asyncErrorHandler_js_1.asyncErrorHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = (0, superstruct_1.create)(req.body, RefreshTokenRequestStruct_1.RefreshTokenRequestStruct);
    const accessTokenView = yield RefreshTokenHandler_js_1.RefreshTokenHandler.handle({
        refreshToken,
    });
    res.send(accessTokenView);
})));
/**
 * 구글 로그인 또는 회원가입을 시작하는 API
 *
 * 워크 플로:
 * 웹 브라우저가 이 API로 GET 메서드와 함께 접속하면,
 * 1. 구글 consent screen (구글 로그인 페이지) 주소로 리다이렉트 시켜줍니다.
 * 2. 사용자가 구글에서 로그인을 마치면 아래의 `/google/callback`으로 리다이렉트되어 돌아옵니다.
 */
exports.AuthRouter.get('/google', (0, asyncErrorHandler_js_1.asyncErrorHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const redirectURI = GoogleOAuthAdapter_1.googleOAuthHelper.generateAuthURI();
    res.status(302).redirect(redirectURI);
})));
/**
 * 구글 로그인 또는 회원가입
 *
 * 워크 플로:
 * 1. 구글 consent screen에서 로그인을 완료하면 구글에서는 code 값을 쿼리 스트링으로 붙여 이 API로 리다이렉트 시켜준다.
 * 2. 사용자의 웹 브라우저는 code 값과 함께 이 API로 GET 요청을 보낸다.
 * 3. 백엔드 서버에서는 받은 code를 사용해 구글에서 사용자 데이터를 가져온다.
 * 4. 로그인 또는 회원가입 처리를 하고나서 Access Token 및 Refresh Token을 발급해서 쿼리 스트링으로 붙인 다음,
 * 5. 클라이언트 페이지로 다시 리다이렉트 시켜준다.
 * 6. Access Token과 Refresh Token을 받은 클라이언트 사이트에서는 이것을 사용해 로그인한다.
 */
exports.AuthRouter.get('/google/callback', (0, asyncErrorHandler_js_1.asyncErrorHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.query;
    if (typeof code !== 'string') {
        throw new Error('Authorization code not provided');
    }
    const { accessToken, refreshToken } = yield AuthByGoogleHandler_js_1.AuthByGoogleHandler.handle({
        code,
    });
    const searchParams = new URLSearchParams({
        at: accessToken,
        rt: refreshToken,
    });
    res.status(302).redirect(`${process.env.CLIENT_REDIRECT_URI}/?${searchParams.toString()}`);
})));
