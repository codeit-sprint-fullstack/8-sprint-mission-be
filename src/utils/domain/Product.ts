import {Like, Product} from "@prisma/client";

interface productType {
    id: Product['id'];
    ownerId: Product['ownerId'];
    name: Product['name'];
    description: Product['description'];
    price: Product['price'];
    tags: Product['tags'];
    images: Product['images'];
    createdAt: Product['createdAt'];
    updatedAt: Product['updatedAt'];
    likes?: { userId: Like['userId'] }[];
}

export class ProductDomain {
    /** ID */
    _id;

    /** 작성자 ID */
    _ownerId;

    /** 상품명  */
    _name;

    /** 상품 설명 */
    _description;

    /** 판매 가격 */
    _price;

    /** 해시 태그 목록 */
    _tags;

    /** 이미지 목록 */
    _images;

    /** 생성시각 */
    _createdAt;

    /** 마지막 수정시각 */
    _updatedAt;

    /** 좋아요 목록 */
    _likes;

    constructor(param: productType) {
        this._id = param.id;
        this._ownerId = param.ownerId;
        this._name = param.name;
        this._description = param.description;
        this._price = param.price;
        this._tags = Array.from(param.tags); // 깊은 복사를 통해, 외부의 배열을 통해 내부 배열을 변경할 수 없도록 합니다.
        this._images = Array.from(param.images);
        this._createdAt = param.createdAt;
        this._updatedAt = param.updatedAt;
        this._likes = param.likes ?? [];
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

    getIsFavorite(userId: Like['userId']): boolean {
        if (!userId) return false;

        return this._likes.some((like: {userId: Like['userId']}): boolean => like.userId === userId);
    }

    getFavoriteCount() {
        return this._likes.length;
    }
}
