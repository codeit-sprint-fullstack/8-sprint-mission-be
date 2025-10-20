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
