"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.googleOAuthHelper = void 0;
const Axios = __importStar(require("axios"));
class GoogleOAuthAdapter {
    constructor() {
        this._httpClient = Axios.default.create({
            timeout: 5000,
        });
    }
    /**
     * Google Consent Screen (구글의 로그인 페이지)으로 가는 URI를 리턴합니다.
     * 이 URI로 클라이언트 웹 브라우저를 리다이렉트 시키는 용도입니다.
     */
    generateAuthURI() {
        const searchParams = new URLSearchParams({
            client_id: process.env.GOOGLE_CLIENT_ID || '',
            redirect_uri: process.env.GOOGLE_REDIRECT_URI || '',
            response_type: 'code',
            scope: 'email profile',
            access_type: 'offline',
        });
        const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${searchParams.toString()}`;
        return authUrl;
    }
    /**
     * 구글 OAuth AccessToken 발급을 요청합니다.
     */
    getAccessToken(code) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this._httpClient.post('https://oauth2.googleapis.com/token', {
                code,
                client_id: process.env.GOOGLE_CLIENT_ID,
                client_secret: process.env.GOOGLE_CLIENT_SECRET,
                redirect_uri: process.env.GOOGLE_REDIRECT_URI,
                grant_type: 'authorization_code',
            });
            return response.data.access_token;
        });
    }
    /**
     * 구글 OAuth AccessToken을 이용해 사용자 프로필 정보를 가져옵니다.
     */
    getProfile(accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this._httpClient.get('https://www.googleapis.com/oauth2/v2/userinfo', {
                params: { access_token: accessToken },
            });
            const { email, name, picture } = response.data;
            return {
                email: email,
                nickname: name,
                image: picture || null,
            };
        });
    }
}
exports.googleOAuthHelper = new GoogleOAuthAdapter();
