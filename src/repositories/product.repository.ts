import prisma from '../config/prisma';
import { ProductOrderByWithRelationInput, ProductWhereInput } from '../generated/models';

export const getAllProductsRepository = async (
  page: number,
  limit: number,
  whereCondition: ProductWhereInput,
  orderBy: ProductOrderByWithRelationInput,
) => {
  return prisma.product.findMany({
    where: whereCondition,
    orderBy,
    skip: (page - 1) * limit,
    take: limit,
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      tags: true,
      image: true,
      likeCount: true,
      createdAt: true,
      owner: {
        select: {
          id: true,
          nickname: true,
        },
      },
    },
  });
};

export const getProductsCountRepository = async (whereCondition: ProductWhereInput) => {
  return prisma.product.count({
    where: whereCondition,
  });
};

export const createProductRepository = async (
  name: string,
  description: string,
  price: number,
  tags: string[],
  ownerId: string,
) => {
  return prisma.product.create({
    data: {
      name,
      description,
      price,
      tags,
      ownerId,
    },
  });
};
