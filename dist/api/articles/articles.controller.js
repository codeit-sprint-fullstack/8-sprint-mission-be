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
exports.getArticleList = getArticleList;
exports.getArticle = getArticle;
exports.createArticle = createArticle;
exports.updateArticle = updateArticle;
exports.deleteArticle = deleteArticle;
exports.checkOwner = checkOwner;
const db_1 = __importDefault(require("../../config/db"));
const auth_repository_1 = __importDefault(require("../auth/auth.repository"));
const errorTemplate_1 = require("../../config/errorTemplate");
function getArticleList(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { page = "1", pageSize = "10", orderBy = "recent", keyword = "", } = req.query;
        const limit = parseInt(pageSize);
        const offset = (parseInt(page) - 1) * limit;
        const articles = yield db_1.default.article.findMany({
            where: {
                // 검색 쿼리
                OR: [
                    { title: { contains: keyword } },
                    { content: { contains: keyword } },
                ],
            },
            orderBy: orderBy == "recent" ? { createdAt: "desc" } : { favoriteCount: "desc" },
            skip: offset,
            take: limit,
        });
        res.json(articles);
    });
}
function getArticle(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const article = yield db_1.default.article.findUnique({
            where: { id },
        });
        return res.json(article);
    });
}
//새로 등록 할 때만 유저 정보가 필요합니다.
function createArticle(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const userId = (_a = req.auth) === null || _a === void 0 ? void 0 : _a.userId;
        if (userId) {
            const user = yield auth_repository_1.default.findById(userId);
            if (user) {
                const article = yield db_1.default.article.create({
                    data: Object.assign(Object.assign({}, req.body), { userName: user.name, user: { connect: { id: user.id } } }),
                });
                return res.status(201).send(article);
            }
        }
        throw errorTemplate_1.ERROR_USER_NOTFOUND;
    });
}
function updateArticle(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const article = yield db_1.default.article.update({
            where: { id },
            data: req.body,
        });
        res.json(article);
    });
}
function deleteArticle(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        yield db_1.default.article.delete({
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
            const product = yield db_1.default.article.findUnique({
                where: { id },
            });
            if (product) {
                if (product.userId !== userId) {
                    throw errorTemplate_1.ERROR_NOT_OWNER;
                }
            }
            return res.status(200).json({ owner: true });
        }
        catch (err) {
            next(err);
        }
        finally {
            next();
        }
    });
}
//# sourceMappingURL=articles.controller.js.map