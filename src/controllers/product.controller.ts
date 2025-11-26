import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import { getProductsQuerySchema } from '../validators/product.validator';
import {
  getAllProductsService,
  createProductService,
  getProductByIdService,
  updateProductService,
} from '../services/product.service';
import HTTP_STATUS from '../constants/http.constant';

export const getAllProductsController = asyncHandler(async (req: Request, res: Response) => {
  const {
    page = 1,
    limit = 10,
    searchQuery = '',
    sort = 'recent',
  } = getProductsQuerySchema.parse(req.query);

  const {
    products,
    currentPage,
    currentLimit,
    totalCount,
    totalPages,
    hasNextPage,
    hasPreviousPage,
  } = await getAllProductsService(page, limit, searchQuery, sort);

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: '상품 목록 조회 성공',
    data: {
      products,
    },
    pagination: {
      currentPage: currentPage,
      limit: currentLimit,
      totalCount,
      totalPages,
      hasNextPage,
      hasPreviousPage,
    },
  });
});

export const createProductController = asyncHandler(async (req: Request, res: Response) => {
  const { name, description, price, tags } = req.body;
  const ownerId = req.auth?.userId;

  if (!ownerId) {
    res.status(HTTP_STATUS.UNAUTHORIZED).json({
      success: false,
      message: '인증되지 않은 접근입니다.',
    });
    return;
  }

  const product = await createProductService({ name, description, price, tags, ownerId });

  res.status(HTTP_STATUS.CREATED).json({
    success: true,
    message: '상품 생성 성공',
    data: {
      product,
    },
  });
});

export const getProductByIdController = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const ownerId = req.auth?.userId || '';

  const product = await getProductByIdService(id, ownerId);

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: '상품 상세 조회 성공',
    data: {
      product,
    },
  });
});

export const updateProductController = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, price, tags } = req.body;

  const product = await updateProductService({ id, name, description, price, tags });

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: '상품 수정 성공',
    data: {
      product,
    },
  });
});
