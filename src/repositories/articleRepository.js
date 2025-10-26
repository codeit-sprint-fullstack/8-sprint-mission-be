import prisma from "../config/database.js";

export const findAllArticles = async ({
  where,
  skip,
  take,
  orderBy,
  select,
}) => {
  return await prisma.article.findMany({
    where,
    skip,
    take,
    orderBy,
    select,
  });
};

export const findArticleById = async (id) => {
  return await prisma.article.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      content: true,
      likeCount: true,
      createdAt: true,
      updatedAt: true,
      user: {
        select: {
          id: true,
          nickname: true,
          image: true,
        },
      },
    },
  });
};

export const findBestArticles = async (limit = 3) => {
  return await prisma.article.findMany({
    orderBy: { likeCount: "desc" },
    take: limit,
    select: {
      id: true,
      title: true,
      content: true,
      likeCount: true,
      createdAt: true,
      updatedAt: true,
      user: {
        select: {
          id: true,
          nickname: true,
          image: true,
        },
      },
    },
  });
};

export const countArticles = async (where) => {
  return await prisma.article.count({ where });
};

export const createArticle = async (data) => {
  return await prisma.article.create({
    data,
    select: {
      id: true,
      title: true,
      content: true,
      likeCount: true,
      createdAt: true,
      user: {
        select: {
          id: true,
          nickname: true,
          image: true,
        },
      },
    },
  });
};

export const updateArticle = async (id, data) => {
  return await prisma.article.update({
    where: { id },
    data,
    select: {
      id: true,
      title: true,
      content: true,
      likeCount: true,
      createdAt: true,
      updatedAt: true,
      user: {
        select: {
          id: true,
          nickname: true,
          image: true,
        },
      },
    },
  });
};

export const deleteArticle = async (id) => {
  return await prisma.article.delete({
    where: { id },
  });
};

/**
 * 게시글 소유자 ID 조회
 * @params id - 게시글 ID
 * @returns {Promise<string>} 게시글 작성자의 userId
 */
export const getArticleOwnerId = async (id) => {
  const article = await prisma.article.findUnique({
    where: { id },
    select: { userId: true },
  });

  if (!article) {
    throw new Error("게시글을 찾을 수 없습니다.");
  }

  return article.userId;
};

/**
 * 사용자의 게시글 좋아요 여부 확인
 * @params articleId - 게시글 ID
 * @params userId - 사용자 ID
 * @returns {Promise<boolean>} 좋아요 여부
 */
export const checkArticleLike = async (articleId, userId) => {
  const like = await prisma.articleLike.findUnique({
    where: {
      userId_articleId: {
        userId,
        articleId,
      },
    },
  });

  return !!like;
};
