import {Comment} from "@prisma/client";

interface commentType {
    id: Comment['id'];
    writerId: Comment['writerId'];
    articleId: Comment['articleId'];
    productId: Comment['productId'];
    content: Comment['content'];
    createdAt: Comment['createdAt'];
    updatedAt: Comment['updatedAt'];
}

export class CommentDomain {
    /** ID */
    _id;

    /** 작성자 ID */
    _writerId;

    /** 게시글 ID */
    _articleId;

    /** 상품 ID */
    _productId;

    /** 내용 */
    _content;

    /** 작성시각 */
    _createdAt;

    /** 마지막 수정시각 */
    _updatedAt;

    constructor(param: commentType) {
        this._id = param.id;
        this._writerId = param.writerId;
        this._articleId = param.articleId;
        this._productId = param.productId;
        this._content = param.content;
        this._createdAt = param.createdAt;
        this._updatedAt = param.updatedAt;
    }

    getId() {
        return this._id;
    }

    getWriterId() {
        return this._writerId;
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
