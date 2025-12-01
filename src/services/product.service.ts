import {
  createProductRepository,
  getAllProductsRepository,
  getProductByIdRepository,
  getProductsCountRepository,
  updateProductRepository,
  deleteProductRepository,
} from '../repositories/product.repository';
import { ProductOrderByWithRelationInput, ProductWhereInput } from '../generated/models';
import { ProductSchema } from '../validators/product.validator';
import AppError from '../utils/AppError';
import HTTP_STATUS from '../constants/http.constant';
import { getMyLikeProductRepository } from '../repositories/like.repository';

export const getAllProductsService = async (
  page: number,
  limit: number,
  searchQuery: string,
  sort: string,
) => {
  const currentPage = Math.max(1, page);

  const whereCondition: ProductWhereInput = searchQuery
    ? {
        OR: [
          {
            name: {
              contains: searchQuery,
              mode: 'insensitive',
            },
          },
          {
            description: {
              contains: searchQuery,
              mode: 'insensitive',
            },
          },
          {
            tags: {
              hasSome: searchQuery.split(' '),
            },
          },
        ],
      }
    : {};

  // likeCount로 정렬할 때는 secondary sort로 createdAt을 추가하여 일관된 순서 보장
  // 같은 likeCount를 가진 상품들도 일관된 순서로 정렬되어 중복 방지
  const orderBy: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[] =
    sort === 'recent' ? { createdAt: 'desc' } : [{ likeCount: 'desc' }, { createdAt: 'desc' }];

  const products = await getAllProductsRepository(page, limit, whereCondition, orderBy);
  const totalCount = await getProductsCountRepository(whereCondition);
  const totalPages = Math.ceil(totalCount / limit);
  const hasNextPage = currentPage < totalPages;
  const hasPreviousPage = currentPage > 1;

  return {
    products,
    currentPage,
    currentLimit: limit,
    totalCount,
    totalPages,
    hasNextPage,
    hasPreviousPage,
  };
};

interface CreateProductServiceParams extends ProductSchema {
  ownerId: string;
}

export const createProductService = async ({
  name,
  description,
  price,
  tags = [],
  ownerId,
}: CreateProductServiceParams) => {
  return await createProductRepository(name, description, price, tags, ownerId);
};

export const getProductByIdService = async (id: string, ownerId: string) => {
  const product = await getProductByIdRepository(id);
  if (!product) {
    throw new AppError('존재하지 않는 상품입니다.', HTTP_STATUS.NOT_FOUND);
  }

  const getMyLikeProduct = await getMyLikeProductRepository(ownerId, id);
  const isLiked = !!getMyLikeProduct;

  return {
    ...product,
    isLiked,
  };
};

type UpdateProductServiceParams = Partial<ProductSchema> & { id: string };

export const updateProductService = async ({
  name = '',
  description = '',
  price = 0,
  tags = [],
  id,
}: UpdateProductServiceParams) => {
  return await updateProductRepository(id, name, description, price, tags);
};

export const deleteProductService = async (id: string) => {
  return await deleteProductRepository(id);
};
