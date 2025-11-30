import {Article, Like} from "@prisma/client";

interface articleType {
    id: Article['id'];
    writerId: Article['writerId'];
    title: Article['title'];
    content: Article['content'];
    image: Article['image'];
    createdAt: Article['createdAt'];
    updatedAt: Article['updatedAt'];
    likes: { userId: Like['userId'] }[];
}

export class ArticleDomain {
    /** ID */
    _id;

    /** 작성자 ID */
    _writerId;

    /** 제목 */
    _title;

    /** 내용 */
    _content;

    /** 이미지 */
    _image;

    /** 작성시각 */
    _createdAt;

    /** 마지막 수정시각 */
    _updatedAt;

    /** 좋아요 목록 */
    _likes;

    constructor(param: articleType) {
        this._id = param.id;
        this._writerId = param.writerId;
        this._title = param.title;
        this._content = param.content;
        this._image = param.image;
        this._createdAt = param.createdAt;
        this._updatedAt = param.updatedAt;
        this._likes = param.likes;
    }

    getId() {
        return this._id;
    }

    getWriterId() {
        return this._writerId;
    }

    getTitle() {
        return this._title;
    }

    getContent() {
        return this._content;
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

    getIsFavorite(userId: Like['userId']) {
        if (!userId) return false;

        return this._likes.some((like: {userId: Like['userId']}): boolean => like.userId === userId);
    }

    getFavoriteCount() {
        return this._likes.length;
    }
}
