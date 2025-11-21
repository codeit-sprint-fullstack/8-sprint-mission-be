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
exports.UserRouter = void 0;
// 라이브러리 로드
const express_1 = __importDefault(require("express"));
const superstruct_1 = require("superstruct");
// 유틸리티 로드
const asyncErrorHandler_js_1 = require("./utils/asyncErrorHandler.js");
// 인증 미들웨어 로드
const AuthN_1 = require("../utils/auth/AuthN");
const AuthTokenManager_1 = require("../utils/auth/AuthTokenManager");
// Structs 로드
const UpdateProfileRequestStruct_1 = require("../utils/structs/user/UpdateProfileRequestStruct");
const UpdatePasswordRequestStruct_1 = require("../utils/structs/user/UpdatePasswordRequestStruct");
const GetMyProductListRequestStruct_1 = require("../utils/structs/user/GetMyProductListRequestStruct");
const GetMyFavoritesProductListRequestStruct_1 = require("../utils/structs/user/GetMyFavoritesProductListRequestStruct");
// 핸들러 로드
const GetUserProfileHandler_1 = require("../service/user/GetUserProfileHandler");
const UpdateUserProfileHandler_1 = require("../service/user/UpdateUserProfileHandler");
const UpdateUserPasswordHandler_1 = require("../service/user/UpdateUserPasswordHandler");
const GetUserProductListHandler_1 = require("../service/user/GetUserProductListHandler");
const GetUserFavoriteListHandler_1 = require("../service/user/GetUserFavoriteListHandler");
exports.UserRouter = express_1.default.Router();
// 내 정보 조회하기 api
exports.UserRouter.get('/me', (0, AuthN_1.AuthN)(), (0, asyncErrorHandler_js_1.asyncErrorHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const requester = AuthTokenManager_1.AuthTokenManager.getRequesterFromToken(req.headers.authorization);
    const userView = yield GetUserProfileHandler_1.GetUserProfileHandler.handle(requester);
    res.send(userView);
})));
// 내 정보 수정하기 api
exports.UserRouter.patch('/me', (0, AuthN_1.AuthN)(), (0, asyncErrorHandler_js_1.asyncErrorHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const requester = AuthTokenManager_1.AuthTokenManager.getRequesterFromToken(req.headers.authorization);
    const { image } = (0, superstruct_1.create)(req.body, UpdateProfileRequestStruct_1.UpdateProfileRequestStruct);
    if (!image) {
        throw new Error('Image is required');
    }
    const userView = yield UpdateUserProfileHandler_1.UpdateUserProfileHandler.handle(requester, {
        image,
    });
    res.send(userView);
})));
// 내 패스워드 수정하기 api
exports.UserRouter.patch('/me/password', (0, AuthN_1.AuthN)(), (0, asyncErrorHandler_js_1.asyncErrorHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const requester = AuthTokenManager_1.AuthTokenManager.getRequesterFromToken(req.headers.authorization);
    const { password, passwordConfirmation, currentPassword } = (0, superstruct_1.create)(req.body, UpdatePasswordRequestStruct_1.UpdatePasswordRequestStruct);
    const userView = yield UpdateUserPasswordHandler_1.UpdateUserPasswordHandler.handle(requester, {
        password,
        passwordConfirmation,
        currentPassword,
    });
    res.send(userView);
})));
// 내가 등록한 상품 조회하기 api
exports.UserRouter.get('/me/products', (0, AuthN_1.AuthN)(), (0, asyncErrorHandler_js_1.asyncErrorHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const requester = AuthTokenManager_1.AuthTokenManager.getRequesterFromToken(req.headers.authorization);
    const { page, pageSize, keyword } = (0, superstruct_1.create)(req.query, GetMyProductListRequestStruct_1.GetMyProductListRequestStruct);
    const productListView = yield GetUserProductListHandler_1.GetUserProductListHandler.handle(requester, {
        page,
        pageSize,
        keyword,
    });
    res.send(productListView);
})));
// 내가 좋아요한 상품 조회하기 api
exports.UserRouter.get('/me/favorites', (0, AuthN_1.AuthN)(), (0, asyncErrorHandler_js_1.asyncErrorHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const requester = AuthTokenManager_1.AuthTokenManager.getRequesterFromToken(req.headers.authorization);
    const { page, pageSize, keyword } = (0, superstruct_1.create)(req.query, GetMyFavoritesProductListRequestStruct_1.GetMyFavoritesProductListRequestStruct);
    const favoriteListView = yield GetUserFavoriteListHandler_1.GetUserFavoriteListHandler.handle(requester, {
        page,
        pageSize,
        keyword,
    });
    res.send(favoriteListView);
})));
