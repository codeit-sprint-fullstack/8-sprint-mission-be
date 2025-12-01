import HTTP_STATUS from '../constants/http.constant';
import { getCommentCursorQuerySchema } from '../validators/comment.validator';
import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import {
  createArticleCommentService,
  deleteArticleCommentService,
  getArticleCommentService,
  updateArticleCommentService,
} from '../services/article.comment.service';

export const getArticleCommentController = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { cursor = '', limit = 10 } = getCommentCursorQuerySchema.parse(req.query);

  const { comments, nextCursor, hasNextPage } = await getArticleCommentService({
    cursor,
    limit,
    articleId: id,
  });

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: '게시글 댓글 조회 성공',
    data: {
      comments,
    },
    pagination: {
      nextCursor,
      hasNextPage,
    },
  });
});

export const createArticleCommentController = asyncHandler(async (req: Request, res: Response) => {
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

  const comment = await createArticleCommentService({ content, articleId: id, ownerId });

  res.status(HTTP_STATUS.CREATED).json({
    success: true,
    message: '게시글 댓글 생성 성공',
    data: {
      comment,
    },
  });
});

export const updateArticleCommentController = asyncHandler(async (req: Request, res: Response) => {
  const { commentId } = req.params;
  const { content } = req.body;

  const comment = await updateArticleCommentService({ content, commentId });

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: '게시글 댓글 수정 성공',
    data: {
      comment,
    },
  });
});

export const deleteArticleCommentController = asyncHandler(async (req: Request, res: Response) => {
  const { commentId } = req.params;

  const comment = await deleteArticleCommentService({ commentId });

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: '게시글 댓글 삭제 성공',
    data: {
      comment,
    },
  });
});
