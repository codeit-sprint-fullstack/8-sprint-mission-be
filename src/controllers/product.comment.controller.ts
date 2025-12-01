import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { getCommentCursorQuerySchema } from '../validators/comment.validator';
import {
  createProductCommentService,
  deleteProductCommentService,
  getProductCommentService,
  updateProductCommentService,
} from '../services/product.comment.service';
import HTTP_STATUS from '../constants/http.constant';

export const getProductCommentController = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { cursor = '', limit = 10 } = getCommentCursorQuerySchema.parse(req.query);

  const { comments, nextCursor, hasNextPage } = await getProductCommentService({
    cursor,
    limit,
    productId: id,
  });

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: '상품 댓글 조회 성공',
    data: {
      comments,
    },
    pagination: {
      nextCursor,
      hasNextPage,
    },
  });
});

export const createProductCommentController = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { content } = req.body;
  const ownerId = req.auth?.userId;

  if (!ownerId) {
    res.status(HTTP_STATUS.UNAUTHORIZED).json({
      success: false,
      message: '인증되지 않은 접근입니다.',
    });
    return;
  }

  const comment = await createProductCommentService({ content, productId: id, ownerId });

  res.status(HTTP_STATUS.CREATED).json({
    success: true,
    message: '상품 댓글 생성 성공',
    data: {
      comment,
    },
  });
});

export const updateProductCommentController = asyncHandler(async (req: Request, res: Response) => {
  const { commentId } = req.params;
  const { content } = req.body;

  const comment = await updateProductCommentService({ content, commentId });

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: '상품 댓글 수정 성공',
    data: {
      comment,
    },
  });
});

export const deleteProductCommentController = asyncHandler(async (req: Request, res: Response) => {
  const { commentId } = req.params;

  const comment = await deleteProductCommentService({ commentId });

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: '상품 댓글 삭제 성공',
    data: {
      comment,
    },
  });
});
