"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDomain = void 0;
class UserDomain {
    constructor(param) {
        this._id = param.id;
        this._email = param.email;
        this._password = param.password;
        this._nickname = param.nickname;
        this._image = param.image;
        this._createdAt = param.createdAt;
        this._updatedAt = param.updatedAt;
    }
    getId() {
        return this._id;
    }
    getEmail() {
        return this._email;
    }
    getNickname() {
        return this._nickname;
    }
    getImage() {
        return this._image;
    }
    getCreatedAt() {
        return this._createdAt;
    }
    getUpdatedAt() {
        return this._updatedAt;
    }
    setImage(image) {
        this._image = image;
    }
    setPassword(password) {
        this._password = password;
    }
    checkPassword(password) {
        return this._password === password;
    }
}
exports.UserDomain = UserDomain;
