import prisma from '../middlewares/prisma.js';

// 모든 상품 조회 (페이지네이션 및 검색 포함)
export const getAllProducts = async (page, limit, searchQuery) => {
  const validPage = Math.max(1, page);
  const offset = (validPage - 1) * limit;

  // 검색 조건 구성
  const whereCondition = searchQuery
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
        ],
      }
    : {};

  const totalCount = await prisma.product.count({
    where: whereCondition,
  });

  const products = await prisma.product.findMany({
    where: whereCondition,
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      tags: true,
      createdAt: true,
    },
    skip: offset,
    take: limit,
    orderBy: {
      createdAt: 'desc',
    },
  });

  return {
    products,
    totalCount,
    currentPage: validPage,
    totalPages: Math.ceil(totalCount / limit),
    hasNextPage: validPage < Math.ceil(totalCount / limit),
    hasPrevPage: validPage > 1,
  };
};

// 상품 생성
export const createProduct = async (name, description, price, tags, imageUrl, ownerId) => {
  const product = await prisma.product.create({
    data: {
      name: name.trim(),
      description: description.trim(),
      price,
      tags,
      image: imageUrl,
      ownerId,
    },
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      tags: true,
      image: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return product;
};

// ID로 상품 조회
export const getProductById = async (id) => {
  const product = await prisma.product.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      tags: true,
      image: true,
      likeCount: true,
      createdAt: true,
      updatedAt: true,
      owner: { select: { id: true, nickname: true, image: true } },
      ProductComment: {
        select: {
          id: true,
          content: true,
          owner: { select: { id: true, nickname: true, image: true } },
          createdAt: true,
          updatedAt: true,
        },
      },
    },
  });

  return product;
};

export const getMyLike = async (userId, productId) => {
  return await prisma.productLike.findUnique({
    where: { userId_productId: { userId, productId } },
  });
};

// 상품 수정
export const updateProduct = async (id, updateData) => {
  const product = await prisma.product.update({
    where: { id },
    data: updateData,
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      tags: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return product;
};

// 상품 삭제
export const deleteProduct = async (id) => {
  await prisma.product.delete({ where: { id } });
  return true;
};

export const findByIdForOwner = async (id) => {
  return await prisma.product.findUnique({
    where: { id },
    select: {
      id: true,
      ownerId: true,
    },
  });
};
