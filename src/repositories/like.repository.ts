import prisma from '../config/prisma';

export const getMyLikeProductRepository = async (userId: string, productId: string) => {
  return prisma.productLike.findUnique({
    where: {
      userId_productId: {
        userId,
        productId,
      },
    },
  });
};

export const getMyLikeArticleRepository = async (userId: string, articleId: string) => {
  return prisma.articleLike.findUnique({
    where: {
      userId_articleId: {
        userId,
        articleId,
      },
    },
  });
};

export const productLikeRepository = async (userId: string, productId: string) => {
  return prisma.$transaction(async (tx) => {
    await tx.productLike.create({
      data: {
        userId,
        productId,
      },
    });
    await tx.product.update({
      where: {
        id: productId,
      },
      data: {
        likeCount: { increment: 1 },
      },
    });
  });
};

export const productUnlikeRepository = async (userId: string, productId: string) => {
  return prisma.$transaction(async (tx) => {
    await tx.productLike.delete({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    });
    await tx.product.update({
      where: {
        id: productId,
      },
      data: {
        likeCount: { decrement: 1 },
      },
    });
  });
};

export const articleLikeRepository = async (userId: string, articleId: string) => {
  return prisma.$transaction(async (tx) => {
    await tx.articleLike.create({
      data: {
        userId,
        articleId,
      },
    });
    await tx.article.update({
      where: {
        id: articleId,
      },
      data: {
        likeCount: { increment: 1 },
      },
    });
  });
};

export const articleUnlikeRepository = async (userId: string, articleId: string) => {
  return prisma.$transaction(async (tx) => {
    await tx.articleLike.delete({
      where: {
        userId_articleId: {
          userId,
          articleId,
        },
      },
    });
    await tx.article.update({
      where: {
        id: articleId,
      },
      data: {
        likeCount: { decrement: 1 },
      },
    });
  });
};
