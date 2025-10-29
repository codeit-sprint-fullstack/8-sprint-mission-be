import prisma from "../config/prisma.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";

// 게시글 좋아요 등록
export const likeArticle = asyncHandler(async (req, res) => {
  const { id } = req.params; // articleId
  const userId = req.user.id;

  await prisma.$transaction([
    prisma.articleLike.create({
      data: { articleId: id, userId },
    }),
    prisma.article.update({
      where: { id },
      data: { likeCount: { increment: 1 } },
    }),
  ]);

  res.status(201).json({ message: "게시글 좋아요 등록" });
});

// 게시글 좋아요 취소
export const unlikeArticle = asyncHandler(async (req, res) => {
  const { id } = req.params; // articleId
  const userId = req.user.id;

  await prisma.$transaction([
    prisma.articleLike.deleteMany({
      where: { articleId: id, userId },
    }),
    prisma.article.update({
      where: { id },
      data: { likeCount: { decrement: 1 } },
    }),
  ]);

  res.json({ message: "게시글 좋아요 취소" });
});

// 상품 좋아요 등록
export const favoriteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  await prisma.$transaction([
    prisma.favorite.create({
      data: { productId: id, userId },
    }),
    prisma.product.update({
      where: { id },
      data: { favoriteCount: { increment: 1 } },
    }),
  ]);

  res.status(201).json({ message: "상품 좋아요 등록" });
});

// 상품 좋아요 취소
export const unfavoriteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  await prisma.$transaction([
    prisma.favorite.deleteMany({
      where: { productId: id, userId },
    }),
    prisma.product.update({
      where: { id },
      data: { favoriteCount: { decrement: 1 } },
    }),
  ]);

  res.json({ message: "상품 좋아요 취소" });
});
