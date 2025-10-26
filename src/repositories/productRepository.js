import prisma from '../../prisma/prismaClient.js';

export const productRepository = {
  // 상품 목록 조회 (좋아요 상태 포함)
  async findManyWithLikes({ where, orderBy, skip, take, userId }) {
    const products = await prisma.product.findMany({
      where: { ...where, deleted: false },
      skip,
      take,
      orderBy,
      include: {
        user: {
          select: {
            id: true,
            nickname: true,
          },
        },
        productFavorites: userId
          ? {
              where: { userId, favoriteState: true },
              select: { id: true },
            }
          : false,
      },
    });

    return products.map(product => ({
      ...product,
      isLiked: userId ? product.productFavorites.length > 0 : false,
      productFavorites: undefined,
    }));
  },

  // 상품 단건 조회
  async findById(id) {
    return await prisma.product.findUnique({
      where: { id, deleted: false },
      include: {
        user: {
          select: {
            id: true,
            nickname: true,
          },
        },
      },
    });
  },

  // 상품 단건 조회 (댓글, 좋아요 상태 포함)
  async findByIdWithDetails(id, userId = null) {
    const product = await prisma.product.findUnique({
      where: { id, deleted: false },
      include: {
        user: {
          select: {
            id: true,
            nickname: true,
          },
        },
        comments: {
          where: { deleted: false },
          include: {
            user: {
              select: {
                id: true,
                nickname: true,
              },
            },
          },
          orderBy: { createdAt: 'desc' },
        },
        productFavorites: userId
          ? {
              where: { userId, favoriteState: true },
              select: { id: true },
            }
          : false,
      },
    });

    if (!product) return null;

    return {
      ...product,
      isLiked: userId ? product.productFavorites.length > 0 : false,
      productFavorites: undefined,
    };
  },

  async create({ userId, name, description, price, tags, images }) {
    return await prisma.product.create({
      data: { userId, name, description, price, tags, images },
      include: {
        user: {
          select: {
            id: true,
            nickname: true,
          },
        },
      },
    });
  },

  // 상품 수정
  async update(id, data) {
    return await prisma.product.update({
      where: { id },
      data,
    });
  },

  // 상품 삭제 (soft delete)
  async delete(id) {
    return await prisma.product.update({
      where: { id },
      data: { deleted: true },
    });
  },
};
