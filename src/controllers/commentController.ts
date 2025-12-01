import { Request, Response } from "express";
import prisma from "../config/prisma.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import { DEFAULT_PROFILE_IMAGE } from "../config/constants.js";

// 댓글 목록 조회
export const getComments = asyncHandler(
  async (req: Request, res: Response): Promise<Response> => {
    const { articleId, productId } = req.params;
    const { limit = "10", cursor } = req.query;
    const take = parseInt(String(limit));

    const where = articleId ? { articleId } : { productId };

    const comments = await prisma.comment.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: take + 1,
      ...(cursor ? { skip: 1, cursor: { id: String(cursor) } } : {}),
      include: {
        user: { select: { id: true, nickname: true, image: true } },
      },
    });

    let nextCursor: string | null = null;
    if (comments.length > take) {
      nextCursor = comments[comments.length - 1].id;
      comments.pop(); // 초과한 마지막 댓글 제거
    }

    const list = comments.map((c) => ({
      id: c.id,
      content: c.content,
      createdAt: c.createdAt,
      updatedAt: c.updatedAt,
      writer: {
        id: c.user.id,
        nickname: c.user.nickname,
        image: c.user.image || DEFAULT_PROFILE_IMAGE,
      },
    }));

    return res.json({ nextCursor, list });
  }
);

// 댓글 작성
export const createComment = asyncHandler(
  async (req: Request, res: Response): Promise<Response> => {
    const { content } = req.body;
    const { articleId, productId } = req.params;

    if (!req.user) {
      return res.status(401).json({ message: "로그인이 필요합니다." });
    }

    const comment = await prisma.comment.create({
      data: {
        content,
        userId: req.user.id,
        articleId: articleId ?? null,
        productId: productId ?? null,
      },
      include: {
        user: { select: { id: true, nickname: true, image: true } },
      },
    });
    return res.status(201).json({ message: "댓글 작성 완료", comment });
  }
);

// 댓글 수정
export const updateComment = asyncHandler(
  async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { content } = req.body;

    const exist = await prisma.comment.findUnique({ where: { id } });
    if (!exist)
      return res.status(404).json({ message: "존재하지 않는 댓글입니다." });

    const updated = await prisma.comment.update({
      where: { id },
      data: { content },
      include: {
        user: { select: { id: true, nickname: true, image: true } },
      },
    });

    return res.json({ message: "댓글 수정 완료", comment: updated });
  }
);

// 댓글 삭제
export const deleteComment = asyncHandler(
  async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    const exist = await prisma.comment.findUnique({ where: { id } });
    if (!exist)
      return res.status(404).json({ message: "존재하지 않는 댓글입니다." });

    await prisma.comment.delete({ where: { id } });
    return res.json({ message: "댓글이 삭제되었습니다" });
  }
);
