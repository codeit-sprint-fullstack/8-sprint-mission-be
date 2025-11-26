import {
  createProductRepository,
  getAllProductsRepository,
  getProductsCountRepository,
} from '../repositories/product.repository';
import { ProductOrderByWithRelationInput, ProductWhereInput } from '../generated/models';
import { CreateProductSchema } from '../validators/product.validator';

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

  const orderBy: ProductOrderByWithRelationInput =
    sort === 'recent' ? { createdAt: 'desc' } : { likeCount: 'desc' };

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

interface CreateProductServiceParams extends CreateProductSchema {
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
