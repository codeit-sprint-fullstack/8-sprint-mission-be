import {
  createArticleCommentRepository,
  deleteArticleCommentRepository,
  getArticleCommentRepository,
  updateArticleCommentRepository,
} from '../repositories/article.comment.repository';

export const getArticleCommentService = async ({
  cursor,
  limit,
  articleId,
}: {
  cursor: string;
  limit: number;
  articleId: string;
}) => {
  const take = limit + 1;

  const comments = await getArticleCommentRepository({ take, cursor, articleId });

  let nextCursor: string | null = null;

  if (comments.length > limit) {
    const lastComment = comments[limit - 1];
    nextCursor = lastComment.id;
    comments.pop();
  }

  return {
    comments,
    nextCursor,
    hasNextPage: nextCursor !== null,
  };
};

export const createArticleCommentService = async ({
  content,
  articleId,
  ownerId,
}: {
  content: string;
  articleId: string;
  ownerId: string;
}) => {
  return await createArticleCommentRepository({ content, articleId, ownerId });
};

export const updateArticleCommentService = async ({
  content,
  commentId,
}: {
  content: string;
  commentId: string;
}) => {
  return await updateArticleCommentRepository({ content, commentId });
};

export const deleteArticleCommentService = async ({ commentId }: { commentId: string }) => {
  return await deleteArticleCommentRepository({ commentId });
};
