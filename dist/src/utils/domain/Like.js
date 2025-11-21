"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikeDomain = void 0;
class LikeDomain {
    constructor(param) {
        this._id = param.id;
        this._userId = param.userId;
        this._productId = param.productId;
        this._articleId = param.articleId;
        this._createdAt = param.createdAt;
    }
    getId() {
        return this._id;
    }
    getUserId() {
        return this._userId;
    }
    getProductId() {
        return this._productId;
    }
    getArticleId() {
        return this._articleId;
    }
    getCreatedAt() {
        return this._createdAt;
    }
}
exports.LikeDomain = LikeDomain;
