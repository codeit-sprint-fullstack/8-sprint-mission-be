import prisma from '../../prisma/prismaClient.js';

export const userRepository = {
  // 사용자 생성
  async create({ email, nickname, password }) {
    return await prisma.user.create({
      data: { email, nickname, password },
      select: {
        id: true,
        email: true,
        nickname: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  },

  // 사용자 단건 조회
  async findById(id) {
    return await prisma.user.findUnique({
      where: { id, deleted: false },
      select: {
        id: true,
        email: true,
        nickname: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  },

  // 이메일로 사용자 조회 (로그인 등에 사용)
  async findByEmail(email) {
    return await prisma.user.findUnique({
      where: { email, deleted: false },
    });
  },

  // 사용자 수정
  async update(id, data) {
    return await prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        email: true,
        nickname: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  },

  // 사용자 삭제 (soft delete)
  async delete(id) {
    return await prisma.user.update({
      where: { id },
      data: { deleted: true },
    });
  },

  // 사용자 개수 조회
  async count(where = {}) {
    return await prisma.user.count({
      where: { ...where, deleted: false },
    });
  },

  // 사용자 목록 조회
  async findMany({ where, orderBy, skip, take }) {
    return await prisma.user.findMany({
      where: { ...where, deleted: false },
      orderBy,
      skip,
      take,
      select: {
        id: true,
        email: true,
        nickname: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  },
};
