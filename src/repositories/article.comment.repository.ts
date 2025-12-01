import prisma from '../config/prisma';
import {
  createCommentHelper,
  deleteCommentHelper,
  updateCommentHelper,
  getCommentHelper,
} from '../helpers/comment.helper';

export const getArticleCommentRepository = async ({
  take,
  cursor,
  articleId,
}: {
  take: number;
  cursor: string;
  articleId: string;
}) => {
  return await getCommentHelper({ take, cursor, articleId });
};

export const createArticleCommentRepository = async ({
  content,
  articleId,
  ownerId,
}: {
  content: string;
  articleId: string;
  ownerId: string;
}) => {
  return await createCommentHelper({ content, articleId, ownerId });
};

export const updateArticleCommentRepository = async ({
  commentId,
  content,
}: {
  commentId: string;
  content: string;
}) => {
  return await updateCommentHelper({ content, commentId, type: 'article' });
};

export const deleteArticleCommentRepository = async ({ commentId }: { commentId: string }) => {
  return await deleteCommentHelper({ type: 'article', commentId });
};
