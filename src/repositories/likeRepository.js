import prisma from '../middlewares/prisma.js';

export const addProductLike = async (userId, productId) => {
  return prisma.$transaction(async (tx) => {
    await tx.productLike.create({
      data: { userId, productId },
    });
    await tx.product.update({
      where: { id: productId },
      data: { likeCount: { increment: 1 } },
    });
    return { success: true };
  });
};

export const removeProductLike = async (userId, productId) => {
  return prisma.$transaction(async (tx) => {
    await tx.productLike.delete({
      where: { userId_productId: { userId, productId } },
    });
    await tx.product.update({
      where: { id: productId },
      data: { likeCount: { decrement: 1 } },
    });
    return { success: true };
  });
};

export const getMyProductLike = async (userId, productId) => {
  return await prisma.productLike.findUnique({
    where: { userId_productId: { userId, productId } },
  });
};

export const addArticleLike = async (userId, articleId) => {
  return prisma.$transaction(async (tx) => {
    await tx.articleLike.create({
      data: { userId, articleId },
    });
    await tx.article.update({
      where: { id: articleId },
      data: { likeCount: { increment: 1 } },
    });
  });
};

export const removeArticleLike = async (userId, articleId) => {
  return prisma.$transaction(async (tx) => {
    await tx.articleLike.delete({
      where: { userId_articleId: { userId, articleId } },
    });
    await tx.article.update({
      where: { id: articleId },
      data: { likeCount: { decrement: 1 } },
    });
  });
};

export const getMyArticleLike = async (userId, articleId) => {
  return await prisma.articleLike.findUnique({
    where: { userId_articleId: { userId, articleId } },
  });
};
