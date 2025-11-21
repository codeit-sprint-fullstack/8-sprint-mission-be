"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductDomain = void 0;
class ProductDomain {
    constructor(param) {
        var _a;
        this._id = param.id;
        this._ownerId = param.ownerId;
        this._name = param.name;
        this._description = param.description;
        this._price = param.price;
        this._tags = Array.from(param.tags); // 깊은 복사를 통해, 외부의 배열을 통해 내부 배열을 변경할 수 없도록 합니다.
        this._images = Array.from(param.images);
        this._createdAt = param.createdAt;
        this._updatedAt = param.updatedAt;
        this._likes = (_a = param.likes) !== null && _a !== void 0 ? _a : [];
    }
    getId() {
        return this._id;
    }
    getOwnerId() {
        return this._ownerId;
    }
    getName() {
        return this._name;
    }
    getDescription() {
        return this._description;
    }
    getPrice() {
        return this._price;
    }
    getTags() {
        return Array.from(this._tags); // 깊은 복사를 통해, 반환된 배열을 통해 내부 배열을 변경할 수 없도록 합니다.
    }
    getImages() {
        return Array.from(this._images);
    }
    getCreatedAt() {
        return this._createdAt;
    }
    getUpdatedAt() {
        return this._updatedAt;
    }
    getIsFavorite(userId) {
        if (!userId)
            return false;
        return this._likes.some((like) => like.userId === userId);
    }
    getFavoriteCount() {
        return this._likes.length;
    }
}
exports.ProductDomain = ProductDomain;
