import prisma from '../../prisma/prismaClient.js';

export const productRepository = {
  // 상품 목록 조회
  async findMany({ orderBy }) {
    return await prisma.product.findMany({
      where: { deleted: false },
      orderBy,
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

  // 상품 생성
  async create({ userId, name, description, price, tags }) {
    return await prisma.product.create({
      data: { userId, name, description, price, tags },
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
