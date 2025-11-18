import {User} from "@prisma/client";

interface userType {
    id: User['id'];
    email: User['email'];
    password: User['password'];
    nickname: User['nickname'];
    image: User['image'];
    createdAt: User['createdAt'];
    updatedAt: User['updatedAt'];
}

export class UserDomain {
    /** ID */
    _id;

    /** 이메일 */
    _email;

    /** 비밀번호 */
    _password;

    /** 닉네임 */
    _nickname;

    /** 이미지 */
    _image;

    /** 생성시각 */
    _createdAt;

    /** 마지막 수정시각 */
    _updatedAt;

    constructor(param: userType) {
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

    setImage(image: User['image']) {
        this._image = image;
    }

    setPassword(password: User['password']) {
        this._password = password;
    }

    checkPassword(password: User['password']) {
        return this._password === password;
    }
}
