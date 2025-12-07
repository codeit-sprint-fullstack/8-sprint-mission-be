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
exports.getProductList = getProductList;
exports.getProduct = getProduct;
exports.createProduct = createProduct;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;
exports.checkOwner = checkOwner;
exports.addFavorite = addFavorite;
const db_1 = __importDefault(require("../../config/db"));
const auth_repository_1 = __importDefault(require("../auth/auth.repository"));
const errorTemplate_1 = require("../../config/errorTemplate");
function getProductList(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { page = "1", pageSize = "10", orderBy = "newest", keyword = "", } = req.query;
        const limit = parseInt(pageSize);
        const offset = (parseInt(page) - 1) * limit;
        const products = yield db_1.default.product.findMany({
            where: {
                // 검색 쿼리
                OR: [
                    { name: { contains: keyword } },
                    { description: { contains: keyword } },
                ],
            },
            orderBy: orderBy == "recent" ? { createdAt: "desc" } : { favoriteCount: "desc" },
            skip: offset,
            take: limit,
        });
        res.json(products);
    });
}
function getProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const product = yield db_1.default.product.findUnique({
            where: { id },
        });
        res.json(product);
    });
}
//새로 등록 할 때만 유저 정보가 필요합니다.
function createProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const userId = (_a = req.auth) === null || _a === void 0 ? void 0 : _a.userId;
        if (userId) {
            const user = yield auth_repository_1.default.findById(userId);
            if (user) {
                const product = yield db_1.default.product.create({
                    data: Object.assign(Object.assign({}, req.body), { user: { connect: { id: userId } }, userName: user.name }),
                });
                return res.status(201).json(product);
            }
        }
        throw errorTemplate_1.ERROR_USER_NOTFOUND;
    });
}
function updateProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const product = yield db_1.default.product.update({
            where: { id },
            data: Object.assign({}, req.body),
        });
        res.json(product);
    });
}
function deleteProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        yield db_1.default.product.delete({
            where: { id },
        });
        res.sendStatus(204);
    });
}
//소유권 검사 미들웨어
function checkOwner(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const { id } = req.params;
            const userId = (_a = req.auth) === null || _a === void 0 ? void 0 : _a.userId;
            const product = yield db_1.default.product.findUnique({
                where: { id },
            });
            if (product && product.userId !== userId) {
                throw errorTemplate_1.ERROR_NOT_OWNER;
            }
        }
        catch (err) {
            next(err);
        }
        finally {
            next();
        }
    });
}
function addFavorite(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const product = yield db_1.default.product.update({
            where: { id },
            data: { favoriteCount: { increment: 1 } },
        });
        res.json({ favoriteCount: product.favoriteCount });
    });
}
//# sourceMappingURL=products.controller.js.map