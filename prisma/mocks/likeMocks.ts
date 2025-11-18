import {Like} from "@prisma/client";

interface productLikeMock {
    userId: Like['userId'];
    productId: Like['productId'];
}

interface articleLikeMock {
    userId: Like['userId'];
    articleId: Like['articleId'];
}

export const LikeMocks: (productLikeMock | articleLikeMock)[] = [
    {
        userId: 1,
        productId: 1,
    },
    {
        userId: 1,
        productId: 2,
    },
    {
        userId: 1,
        articleId: 1,
    },
];
