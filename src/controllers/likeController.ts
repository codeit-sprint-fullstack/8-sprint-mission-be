import { Request, Response } from "express";
import prisma from "../config/prisma";
import { asyncHandler } from "../middlewares/asyncHandler";

// 게시글 좋아요 등록
export const likeArticle = asyncHandler(
  async (req: Request, res: Response): Promise<Response> => {
    if (!req.user) {
      return res.status(401).json({ message: "로그인이 필요합니다." });
    }

    const { id } = req.params; // articleId
    const userId = req.user.id;

    await prisma.$transaction([
      prisma.like.create({
        data: { articleId: id, userId },
      }),
      prisma.article.update({
        where: { id },
        data: { likeCount: { increment: 1 } },
      }),
    ]);

    return res.status(201).json({ message: "게시글 좋아요 등록" });
  }
);

// 게시글 좋아요 취소
export const unlikeArticle = asyncHandler(
  async (req: Request, res: Response): Promise<Response> => {
    if (!req.user) {
      return res.status(401).json({ message: "로그인이 필요합니다." });
    }

    const { id } = req.params; // articleId
    const userId = req.user.id;

    await prisma.$transaction([
      prisma.like.deleteMany({
        where: { articleId: id, userId },
      }),
      prisma.article.update({
        where: { id },
        data: { likeCount: { decrement: 1 } },
      }),
    ]);

    return res.json({ message: "게시글 좋아요 취소" });
  }
);

// 상품 좋아요 등록
export const favoriteProduct = asyncHandler(
  async (req: Request, res: Response): Promise<Response> => {
    if (!req.user) {
      return res.status(401).json({ message: "로그인이 필요합니다." });
    }

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

    return res.status(201).json({ message: "상품 좋아요 등록" });
  }
);

// 상품 좋아요 취소
export const unfavoriteProduct = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(401).json({ message: "로그인이 필요합니다." });
    }

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

    return res.json({ message: "상품 좋아요 취소" });
  }
);
