import prisma from '../middlewares/prisma.js';

export const createCommentByProduct = async (productId, content, ownerId) => {
  return await prisma.productComment.create({
    data: { productId, content, ownerId },
  });
};

export const createCommentByArticle = async (articleId, content, ownerId) => {
  return await prisma.articleComment.create({
    data: { articleId, content, ownerId },
  });
};

export const updateCommentByProduct = async (commentId, content, ownerId) => {
  return await prisma.productComment.update({
    where: { id: commentId },
    data: { content, ownerId },
  });
};

export const updateCommentByArticle = async (commentId, content, ownerId) => {
  return await prisma.articleComment.update({
    where: { id: commentId },
    data: { content, ownerId },
  });
};

export const deleteCommentByProduct = async (commentId) => {
  return await prisma.productComment.delete({
    where: { id: commentId },
  });
};

export const deleteCommentByArticle = async (commentId) => {
  return await prisma.articleComment.delete({
    where: { id: commentId },
  });
};

export const findProductByIdForOwner = async (commentId) => {
  return await prisma.productComment.findUnique({
    where: { id: commentId },
    select: { id: true, ownerId: true },
  });
};

export const findArticleByIdForOwner = async (commentId) => {
  return await prisma.articleComment.findUnique({
    where: { id: commentId },
    select: { id: true, ownerId: true },
  });
};
