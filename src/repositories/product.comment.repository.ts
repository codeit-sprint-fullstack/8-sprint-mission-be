import prisma from '../config/prisma';
import {
  createCommentHelper,
  deleteCommentHelper,
  getCommentHelper,
  updateCommentHelper,
} from '../helpers/comment.helper';

export const getProductCommentRepository = async ({
  take,
  cursor,
  productId,
}: {
  take: number;
  cursor: string;
  productId: string;
}) => {
  return await getCommentHelper({ take, cursor, productId });
};

export const createProductCommentRepository = async ({
  content,
  productId,
  ownerId,
}: {
  content: string;
  productId: string;
  ownerId: string;
}) => {
  return await createCommentHelper({ content, productId, ownerId });
};

export const updateProductCommentRepository = async ({
  commentId,
  content,
}: {
  commentId: string;
  content: string;
}) => {
  return await updateCommentHelper({ content, commentId, type: 'product' });
};

export const deleteProductCommentRepository = async ({ commentId }: { commentId: string }) => {
  return await deleteCommentHelper({ type: 'product', commentId });
};
