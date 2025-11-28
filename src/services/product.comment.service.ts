import {
  createProductCommentRepository,
  deleteProductCommentRepository,
  getProductCommentRepository,
  updateProductCommentRepository,
} from '../repositories/product.comment.repository';
import AppError from '../utils/AppError';
import HTTP_STATUS from '../constants/http.constant';

export const getProductCommentService = async ({
  cursor,
  limit,
  productId,
}: {
  cursor: string;
  limit: number;
  productId: string;
}) => {
  const take = limit + 1;

  const comments = await getProductCommentRepository({ take, cursor, productId });

  if (!comments) {
    throw new AppError('존재하지 않는 상품입니다.', HTTP_STATUS.NOT_FOUND);
  }

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

export const createProductCommentService = async ({
  content,
  productId,
  ownerId,
}: {
  content: string;
  productId: string;
  ownerId: string;
}) => {
  return await createProductCommentRepository({ content, productId, ownerId });
};

export const updateProductCommentService = async ({
  content,
  commentId,
}: {
  content: string;
  commentId: string;
}) => {
  return await updateProductCommentRepository({ content, commentId });
};

export const deleteProductCommentService = async ({ commentId }: { commentId: string }) => {
  return await deleteProductCommentRepository({ commentId });
};
