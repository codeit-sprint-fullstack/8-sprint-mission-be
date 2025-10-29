import prisma from "../config/database.js";

/**
 * 게시글 좋아요 찾기
 */
export const findArticleLike = async (userId, articleId) => {
  return await prisma.articleLike.findUnique({
    where: {
      userId_articleId: {
        userId,
        articleId,
      },
    },
  });
};

/**
 * 게시글 좋아요 생성
 */
export const createArticleLike = async (userId, articleId) => {
  return await prisma.$transaction(async (tx) => {
    // 좋아요 생성
    const like = await tx.articleLike.create({
      data: {
        userId,
        articleId,
      },
    });

    // 게시글의 좋아요 수 증가
    await tx.article.update({
      where: { id: articleId },
      data: {
        likeCount: {
          increment: 1,
        },
      },
    });

    return like;
  });
};

/**
 * 게시글 좋아요 삭제
 */
export const deleteArticleLike = async (userId, articleId) => {
  return await prisma.$transaction(async (tx) => {
    // 좋아요 삭제
    const like = await tx.articleLike.delete({
      where: {
        userId_articleId: {
          userId,
          articleId,
        },
      },
    });

    // 게시글의 좋아요 수 감소
    await tx.article.update({
      where: { id: articleId },
      data: {
        likeCount: {
          decrement: 1,
        },
      },
    });

    return like;
  });
};

/**
 * 상품 좋아요 찾기
 */
export const findProductLike = async (userId, productId) => {
  return await prisma.productLike.findUnique({
    where: {
      userId_productId: {
        userId,
        productId,
      },
    },
  });
};

/**
 * 상품 좋아요 생성
 */
export const createProductLike = async (userId, productId) => {
  return await prisma.$transaction(async (tx) => {
    // 좋아요 생성
    const like = await tx.productLike.create({
      data: {
        userId,
        productId,
      },
    });

    // 상품의 좋아요 수 증가
    await tx.product.update({
      where: { id: productId },
      data: {
        likeCount: {
          increment: 1,
        },
      },
    });

    return like;
  });
};

/**
 * 상품 좋아요 삭제
 */
export const deleteProductLike = async (userId, productId) => {
  return await prisma.$transaction(async (tx) => {
    // 좋아요 삭제
    const like = await tx.productLike.delete({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    });

    // 상품의 좋아요 수 감소
    await tx.product.update({
      where: { id: productId },
      data: {
        likeCount: {
          decrement: 1,
        },
      },
    });

    return like;
  });
};
