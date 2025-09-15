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
    this._createdAt = param.createdAt;
    this._updatedAt = param.updatedAt;
  }

  getId() {
    return this._id;
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

  getCreatedAt() {
    return this._createdAt;
  }

  getUpdatedAt() {
    return this._updatedAt;
  }
}
