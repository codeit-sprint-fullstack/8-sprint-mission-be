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
exports.ProductRouter = void 0;
// 라이브러리 로드
const express_1 = __importDefault(require("express"));
const superstruct_1 = require("superstruct");
// 유틸리티 로드
const asyncErrorHandler_js_1 = require("./utils/asyncErrorHandler.js");
// 인증 로드
const AuthTokenManager_1 = require("../utils/auth/AuthTokenManager");
const AuthN_1 = require("../utils/auth/AuthN");
// Structs 로드
const CreateProductRequestStruct_1 = require("../utils/structs/product/CreateProductRequestStruct");
const UpdateProductRequestStruct_1 = require("../utils/structs/product/UpdateProductRequestStruct");
const GetProductListRequestStruct_1 = require("../utils/structs/product/GetProductListRequestStruct");
const CreateCommentRequestStruct_1 = require("../utils/structs/comment/CreateCommentRequestStruct");
const GetCommentListRequestStruct_1 = require("../utils/structs/comment/GetCommentListRequestStruct");
// 핸들러 로드
const CreateProductHandler_1 = require("../service/product/CreateProductHandler");
const GetProductHandler_1 = require("../service/product/GetProductHandler");
const UpdateProductHandler_1 = require("../service/product/UpdateProductHandler");
const DeleteProductHandler_1 = require("../service/product/DeleteProductHandler");
const GetProductListHandler_1 = require("../service/product/GetProductListHandler");
const CreateProductCommentHandler_1 = require("../service/product/CreateProductCommentHandler");
const GetProductCommentListHandler_1 = require("../service/product/GetProductCommentListHandler");
const CreateProductLikeHandler_1 = require("../service/product/CreateProductLikeHandler");
const DeleteProductLikeHandler_1 = require("../service/product/DeleteProductLikeHandler");
exports.ProductRouter = express_1.default.Router();
// 상품 등록 api
exports.ProductRouter.post('/', (0, AuthN_1.AuthN)(), (0, asyncErrorHandler_js_1.asyncErrorHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const requester = AuthTokenManager_1.AuthTokenManager.getRequesterFromToken(req.headers.authorization);
    const { name, description, price, tags, images } = (0, superstruct_1.create)(req.body, CreateProductRequestStruct_1.CreateProductRequestStruct);
    const productView = yield CreateProductHandler_1.CreateProductHandler.handle(requester, {
        name,
        description,
        price,
        tags,
        images,
    });
    res.status(201).send(productView);
})));
// 상품 조회 api
exports.ProductRouter.get('/:productId', (0, asyncErrorHandler_js_1.asyncErrorHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const requester = AuthTokenManager_1.AuthTokenManager.getRequesterFromTokenOrDefault(req.headers.authorization);
    const { productId } = req.params;
    const productView = yield GetProductHandler_1.GetProductHandler.handle(requester, {
        productId: Number(productId),
    });
    res.send(productView);
})));
// 상품 수정 api
exports.ProductRouter.patch('/:productId', (0, AuthN_1.AuthN)(), (0, asyncErrorHandler_js_1.asyncErrorHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const requester = AuthTokenManager_1.AuthTokenManager.getRequesterFromToken(req.headers.authorization);
    const { productId } = req.params;
    const { name, description, price, tags, images } = (0, superstruct_1.create)(req.body, UpdateProductRequestStruct_1.UpdateProductRequestStruct);
    if (!name || !description || price === undefined || !tags || !images) {
        throw new Error('Invalid input data');
    }
    const productView = yield UpdateProductHandler_1.UpdateProductHandler.handle(requester, {
        productId: Number(productId),
        name,
        description,
        price,
        tags,
        images,
    });
    res.send(productView);
})));
// 상품 삭제 api
exports.ProductRouter.delete('/:productId', (0, AuthN_1.AuthN)(), (0, asyncErrorHandler_js_1.asyncErrorHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const requester = AuthTokenManager_1.AuthTokenManager.getRequesterFromToken(req.headers.authorization);
    const { productId } = req.params;
    yield DeleteProductHandler_1.DeleteProductHandler.handle(requester, {
        productId: Number(productId),
    });
    res.status(204).send();
})));
// 상품 목록 조회 api
exports.ProductRouter.get('/', (0, asyncErrorHandler_js_1.asyncErrorHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const requester = AuthTokenManager_1.AuthTokenManager.getRequesterFromTokenOrDefault(req.headers.authorization);
    const { page, pageSize, orderBy, keyword } = (0, superstruct_1.create)(req.query, GetProductListRequestStruct_1.GetProductListRequestStruct);
    const productListView = yield GetProductListHandler_1.GetProductListHandler.handle(requester, {
        page,
        pageSize,
        orderBy,
        keyword,
    });
    res.send(productListView);
})));
// 상품 댓글 등록 api
exports.ProductRouter.post('/:productId/comments', (0, AuthN_1.AuthN)(), (0, asyncErrorHandler_js_1.asyncErrorHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const requester = AuthTokenManager_1.AuthTokenManager.getRequesterFromToken(req.headers.authorization);
    const { productId } = req.params;
    const { content } = (0, superstruct_1.create)(req.body, CreateCommentRequestStruct_1.CreateCommentRequestStruct);
    const productCommentView = yield CreateProductCommentHandler_1.CreateProductCommentHandler.handle(requester, {
        productId: Number(productId),
        content,
    });
    res.status(201).send(productCommentView);
})));
// 상품 댓글 목록 조회 api
exports.ProductRouter.get('/:productId/comments', (0, asyncErrorHandler_js_1.asyncErrorHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    const { cursor, take } = (0, superstruct_1.create)(req.query, GetCommentListRequestStruct_1.GetCommentListRequestStruct);
    const productCommentListView = yield GetProductCommentListHandler_1.GetProductCommentListHandler.handle({
        productId: Number(productId),
        cursor,
        limit: take,
    });
    res.send(productCommentListView);
})));
// 상품 좋아요 API
exports.ProductRouter.post('/:productId/favorite', (0, AuthN_1.AuthN)(), (0, asyncErrorHandler_js_1.asyncErrorHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const requester = AuthTokenManager_1.AuthTokenManager.getRequesterFromToken(req.headers.authorization);
    const productId = Number(req.params.productId);
    const productView = yield CreateProductLikeHandler_1.CreateProductLikeHandler.handle(requester, {
        productId,
    });
    res.status(201).send(productView);
})));
// 상품 좋아요 취소 API
exports.ProductRouter.delete('/:productId/favorite', (0, AuthN_1.AuthN)(), (0, asyncErrorHandler_js_1.asyncErrorHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const requester = AuthTokenManager_1.AuthTokenManager.getRequesterFromToken(req.headers.authorization);
    const productId = Number(req.params.productId);
    const productView = yield DeleteProductLikeHandler_1.DeleteProductLikeHandler.handle(requester, {
        productId,
    });
    res.status(201).send(productView);
})));
