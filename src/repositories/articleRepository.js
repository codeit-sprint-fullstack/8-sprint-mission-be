import prisma from '../middlewares/prisma.js';

export const createArticle = async (title, content) => {
  return await prisma.article.create({
    data: { title, content },
    select: { id: true, title: true, content: true, like: true, createdAt: true },
  });
};

export const getArticles = async (whereCondition, orderBy, skip, take) => {
  return await prisma.article.findMany({
    where: whereCondition,
    select: { id: true, title: true, content: true, like: true, createdAt: true },
    skip,
    take,
    orderBy,
  });
};

export const getArticleCount = async (whereCondition) => {
  return await prisma.article.count({
    where: whereCondition,
  });
};

export const getArticleById = async (id) => {
  return await prisma.article.findUnique({
    where: { id },
    select: { id: true, title: true, content: true, like: true, createdAt: true },
  });
};

export const getMyLike = async (userId, articleId) => {
  return await prisma.articleLike.findUnique({
    where: { userId_articleId: { userId, articleId } },
  });
};

export const updateArticle = async (id, title, content) => {
  return await prisma.article.update({
    where: { id },
    data: { title, content },
    select: { id: true, title: true, content: true, like: true, createdAt: true },
  });
};

export const deleteArticle = async (id) => {
  return await prisma.article.delete({ where: { id } });
};
