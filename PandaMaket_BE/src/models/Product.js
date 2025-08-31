export class Product {
    /** ID */
    _id;

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

    constructor(param) {
        this._id = param.id;
        this._name = param.name;
        this._description = param.description;
        this._price = param.price;
        this._tags = Array.from(param.tags); // 깊은 복사를 통해, 외부의 배열을 통해 내부 배열을 변경할 수 없도록 합니다.
        this._images = Array.from(param.images);
        this._createdAt = param.createdAt;
        this._updatedAt = param.updatedAt;
    }

    getId() {
        return this._id;
    }

    getName() {
        return this._name;
    }

    setName(name) {
        this._name = name;

        this._updatedAt = new Date();
    }

    getDescription() {
        return this._description;
    }

    setDescription(description) {
        this._description = description;

        this._updatedAt = new Date();
    }

    getPrice() {
        return this._price;
    }

    setPrice(price) {
        this._price = price;

        this._updatedAt = new Date();
    }

    getTags() {
        return Array.from(this._tags); // 깊은 복사를 통해, 반환된 배열을 통해 내부 배열을 변경할 수 없도록 합니다.
    }

    setTags(tags) {
        this._tags = Array.from(tags);

        this._updatedAt = new Date();
    }

    getImages() {
        return Array.from(this._images);

        this._updatedAt = new Date();
    }

    setImages(images) {
        this._images = Array.from(images);

        this._updatedAt = new Date();
    }

    getCreatedAt() {
        return this._createdAt;
    }

    getUpdatedAt() {
        return this._updatedAt;
    }
}
