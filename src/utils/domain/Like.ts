import {Like} from "@prisma/client";

interface likeType {
    id: Like['id'];
    userId: Like['userId'];
    productId: Like['productId'];
    articleId: Like['articleId'];
    createdAt: Like['createdAt'];
}

export class LikeDomain {
    /** ID */
    _id;

    /** 사용자 ID */
    _userId;

    /** 상품 ID */
    _productId;

    /** 게시글 ID */
    _articleId;

    /** 생성시각 */
    _createdAt;

    constructor(param: likeType) {
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
