import { Comment } from '@prisma/client';

interface commentMock extends Omit<Comment, 'id' | 'createdAt' | 'updatedAt' | 'articleId' | 'productId'> {}
interface articleCommentMock extends commentMock {
    articleId: number;
    productId?: never;
}
interface productCommentMock extends commentMock {
    productId: number;
    articleId?: never;
}
export const CommentMocks: ( articleCommentMock | productCommentMock )[] = [
    {
        writerId: 1,
        content: 'Article 1 Comment 1',
        articleId: 1,
    },
    {
        writerId: 1,
        content: 'Article 1 Comment 2',
        articleId: 1,
    },
    {
        writerId: 1,
        content: 'Article 2 Comment 1',
        articleId: 2,
    },
    {
        writerId: 1,
        content: 'Article 3 Comment 1',
        articleId: 3,
    },
    {
        writerId: 1,
        content: 'Article 4 Comment 1',
        articleId: 4,
    },
    {
        writerId: 1,
        content: 'Article 5 Comment 1',
        articleId: 5,
    },
    {
        writerId: 1,
        content: 'Product 1 Comment 1',
        productId: 1,
    },
    {
        writerId: 1,
        content: 'Product 1 Comment 2',
        productId: 1,
    },
    {
        writerId: 1,
        content: 'Product 2 Comment 1',
        productId: 2,
    },
    {
        writerId: 1,
        content: 'Product 3 Comment 1',
        productId: 3,
    },
    {
        writerId: 1,
        content: 'Product 4 Comment 1',
        productId: 4,
    },
    {
        writerId: 1,
        content: 'Product 5 Comment 1',
        productId: 5,
    },
];
