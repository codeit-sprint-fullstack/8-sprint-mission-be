"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentModel = void 0;
class CommentModel {
    constructor(param) {
        this._id = param.id;
        this._articleId = param.articleId;
        this._productId = param.productId;
        this._content = param.content;
        this._createdAt = param.createdAt;
        this._updatedAt = param.updatedAt;
    }
    getId() {
        return this._id;
    }
    getArticleId() {
        return this._articleId;
    }
    getProductId() {
        return this._productId;
    }
    getContent() {
        return this._content;
    }
    getCreatedAt() {
        return this._createdAt;
    }
    getUpdatedAt() {
        return this._updatedAt;
    }
}
exports.CommentModel = CommentModel;
