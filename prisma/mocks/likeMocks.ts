import {Like} from "@prisma/client";

export const LikeMocks: (
    | {userId: Like['userId'], productId: Like['productId']}
    | {userId: Like['userId'], articleId: Like['articleId']})[] = [
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
