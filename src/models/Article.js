export class Article {
  /** ID */
  _id;

  /** 제목 */
  _title;

  /** 내용 */
  _content;

  /** 작성시각 */
  _createdAt;

  /** 마지막 수정시각 */
  _updatedAt;

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
