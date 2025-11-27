import prisma from '../config/prisma';
import { ArticleOrderByWithRelationInput, ArticleWhereInput } from '../generated/models';

export const getAllArticlesRepository = async (
  cursor: string | undefined,
  limit: number,
  whereCondition: ArticleWhereInput,
  orderBy: ArticleOrderByWithRelationInput,
) => {
  const cursorCondition = cursor
    ? {
        id: cursor,
      }
    : undefined;

  return prisma.article.findMany({
    where: whereCondition,
    orderBy,
    take: limit + 1, // hasNextPage 확인을 위해 1개 더 가져옴
    ...(cursorCondition && {
      cursor: cursorCondition,
      skip: 1, // cursor 자체는 제외
    }),
    select: {
      id: true,
      title: true,
      content: true,
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
      owner: {
        select: {
          id: true,
          nickname: true,
        },
      },
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
