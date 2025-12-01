import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import {
  articleLikeService,
  articleUnlikeService,
  productLikeService,
  productUnlikeService,
} from '../services/like.service';
import AppError from '../utils/AppError';
import HTTP_STATUS from '../constants/http.constant';

export const productLikeController = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.auth?.userId;
  if (!userId) {
    throw new AppError('로그인 후 이용해주세요.', HTTP_STATUS.UNAUTHORIZED);
  }

  const liked = await productLikeService(userId, id);

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: '상품 좋아요 성공',
    data: {
      liked,
    },
  });
});

export const productUnlikeController = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.auth?.userId;
  if (!userId) {
    throw new AppError('로그인 후 이용해주세요.', HTTP_STATUS.UNAUTHORIZED);
  }

  const unliked = await productUnlikeService(userId, id);

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: '상품 좋아요 취소 성공',
    data: {
      unliked,
    },
  });
});

export const articleLikeController = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.auth?.userId;
  if (!userId) {
    throw new AppError('로그인 후 이용해주세요.', HTTP_STATUS.UNAUTHORIZED);
  }

  const liked = await articleLikeService(userId, id);

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: '게시글 좋아요 성공',
    data: {
      liked,
    },
  });
});

export const articleUnlikeController = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.auth?.userId;
  if (!userId) {
    throw new AppError('로그인 후 이용해주세요.', HTTP_STATUS.UNAUTHORIZED);
  }

  const unliked = await articleUnlikeService(userId, id);

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: '게시글 좋아요 취소 성공',
    data: {
      unliked,
    },
  });
});
