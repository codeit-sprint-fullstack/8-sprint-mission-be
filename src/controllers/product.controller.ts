import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import { getProductsQuerySchema } from '../validators/product.validator';
import { getAllProductsService } from '../services/product.service';
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
