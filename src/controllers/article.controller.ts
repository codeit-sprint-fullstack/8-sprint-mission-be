import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import { getAllArticlesService } from '../services/article.service';
import HTTP_STATUS from '../constants/http.constant';
import { articleSchema, getArticlesQuerySchema } from '../validators/article.validator';
import { createArticleRepository } from '../repositories/article.repository';
import {
  getArticleByIdService,
  updateArticleService,
  deleteArticleService,
} from '../services/article.service';

export const getAllArticlesController = asyncHandler(async (req: Request, res: Response) => {
  const {
    cursor,
    limit = 10,
    searchQuery = '',
    sort = 'recent',
  } = getArticlesQuerySchema.parse(req.query);

  const { articles, nextCursor, hasNextPage } = await getAllArticlesService(
    cursor,
    limit,
    searchQuery,
    sort,
  );

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: '게시글 목록 조회 성공',
    data: {
      articles,
    },
    pagination: {
      nextCursor,
      hasNextPage,
    },
  });
});

export const createArticleController = asyncHandler(async (req: Request, res: Response) => {
  const { title, content } = articleSchema.parse(req.body);
  const ownerId = req.auth?.userId;

  if (!ownerId) {
    res.status(HTTP_STATUS.UNAUTHORIZED).json({
      success: false,
      message: '인증되지 않은 접근입니다.',
    });
    return;
  }

  const article = await createArticleRepository(title, content, ownerId);

  res.status(HTTP_STATUS.CREATED).json({
    success: true,
    message: '게시글 생성 성공',
    data: {
      article,
    },
  });
});

export const getArticleByIdController = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const ownerId = req.auth?.userId || '';

  const article = await getArticleByIdService(id, ownerId);

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: '게시글 상세 조회 성공',
    data: {
      article,
    },
  });
});

export const updateArticleController = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content } = articleSchema.parse(req.body);

  const article = await updateArticleService({ id, title, content });

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: '게시글 수정 성공',
    data: {
      article,
    },
  });
});

export const deleteArticleController = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const article = await deleteArticleService(id);

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: '게시글 삭제 성공',
    data: {
      article,
    },
  });
});
