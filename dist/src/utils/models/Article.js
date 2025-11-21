"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleModel = void 0;
class ArticleModel {
    constructor(param) {
        this._id = param.id;
        this._title = param.title;
        this._content = param.content;
        this._createdAt = param.createdAt;
        this._updatedAt = param.updatedAt;
    }
    getId() {
        return this._id;
    }
    getTitle() {
        return this._title;
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
exports.ArticleModel = ArticleModel;
