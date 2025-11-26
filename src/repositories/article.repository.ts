import prisma from '../config/prisma';
import { ArticleOrderByWithRelationInput, ArticleWhereInput } from '../generated/models';

export const getAllArticlesRepository = async (
  page: number,
  limit: number,
  whereCondition: ArticleWhereInput,
  orderBy: ArticleOrderByWithRelationInput,
) => {
  return prisma.article.findMany({
    where: whereCondition,
    orderBy,
    skip: (page - 1) * limit,
    take: limit,
    select: {
      id: true,
      title: true,
      content: true,
      likeCount: true,
      createdAt: true,
    },
  });
};

export const getArticlesCountRepository = async (whereCondition: ArticleWhereInput) => {
  return prisma.article.count({
    where: whereCondition,
  });
};

export const createArticleRepository = async (title: string, content: string, ownerId: string) => {
  return prisma.article.create({
    data: {
      title,
      content,
      ownerId,
    },
    select: {
      id: true,
      title: true,
      content: true,
      likeCount: true,
      createdAt: true,
    },
  });
};

export const getArticleByIdRepository = async (id: string) => {
  return prisma.article.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      content: true,
      likeCount: true,
      createdAt: true,
    },
  });
};

export const updateArticleRepository = async (id: string, title: string, content: string) => {
  return prisma.article.update({
    where: { id },
    data: {
      title,
      content,
    },
    select: {
      id: true,
      title: true,
      content: true,
      likeCount: true,
      createdAt: true,
    },
  });
};

export const deleteArticleRepository = async (id: string) => {
  return prisma.article.delete({
    where: { id },
    select: {
      id: true,
      title: true,
      content: true,
      likeCount: true,
      createdAt: true,
    },
  });
};
