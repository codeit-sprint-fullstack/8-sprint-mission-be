import prisma from '../../prisma/prismaClient.js';

export const articleRepository = {
  // 게시글 생성
  async create({ userId, title, content }) {
    return await prisma.article.create({
      data: { userId, title, content },
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

  // 게시글 단건 조회
  async findById(id) {
    return await prisma.article.findUnique({
      where: { id, deleted: false },
      select: {
        id: true,
        title: true,
        content: true,
        favoriteCount: true,
        createdAt: true,
        updatedAt: true,
        user: {
          select: {
            id: true,
            nickname: true,
          },
        },
      },
    });
  },

  // 게시글 단건 조회 (댓글, 좋아요 상태 포함)
  async findByIdWithDetails(id, userId = null) {
    const article = await prisma.article.findUnique({
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
        articleFavorites: userId
          ? {
              where: { userId, favoriteState: true },
              select: { id: true },
            }
          : false,
      },
    });

    if (!article) return null;

    // isLiked 필드 추가
    return {
      ...article,
      isLiked: userId ? article.articleFavorites.length > 0 : false,
      articleFavorites: undefined, // 제거
    };
  },

  // 게시글 수정
  async update(id, { title, content }) {
    return await prisma.article.update({
      where: { id },
      data: { title, content },
    });
  },

  // 게시글 삭제 (soft delete)
  async delete(id) {
    return await prisma.article.update({
      where: { id },
      data: { deleted: true },
    });
  },

  // 게시글 개수 조회
  async count(where = {}) {
    return await prisma.article.count({
      where: { ...where, deleted: false },
    });
  },

  // 게시글 목록 조회
  async findMany({ where, orderBy, skip, take }) {
    return await prisma.article.findMany({
      where: { ...where, deleted: false },
      orderBy,
      skip,
      take,
      select: {
        id: true,
        title: true,
        content: true,
        favoriteCount: true,
        createdAt: true,
        updatedAt: true,
        user: {
          select: {
            id: true,
            nickname: true,
          },
        },
      },
    });
  },

  // 게시글 목록 조회 (좋아요 상태 포함)
  async findManyWithLikes({ where, orderBy, skip, take, userId }) {
    const articles = await prisma.article.findMany({
      where: { ...where, deleted: false },
      orderBy,
      skip,
      take,
      include: {
        user: {
          select: {
            id: true,
            nickname: true,
          },
        },
        articleFavorites: userId
          ? {
              where: { userId, favoriteState: true },
              select: { id: true },
            }
          : false,
      },
    });

    // isLiked 필드 추가
    return articles.map(article => ({
      ...article,
      isLiked: userId ? article.articleFavorites.length > 0 : false,
      articleFavorites: undefined, // 제거
    }));
  },
};
