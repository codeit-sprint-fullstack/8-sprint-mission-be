import { Request, Response } from "express";
import prisma from "../config/prisma";
import { Prisma } from "@prisma/client";
import { asyncHandler } from "../middlewares/asyncHandler";
import {
  DEFAULT_ARTICLE_IMAGE,
  DEFAULT_PROFILE_IMAGE,
} from "../config/constants";

interface GetArticlesQuery {
  search?: string;
  order?: "newest" | "oldest" | "like";
  limit?: number;
  cursor?: string;
}

// 게시글 목록 조회
export const getArticles = asyncHandler(
  async (req: Request, res: Response): Promise<Response> => {
    const {
      search,
      order = "newest",
      limit = "10",
      cursor,
    } = req.query as GetArticlesQuery;

    let orderBy: any;
    switch (order) {
      case "oldest":
        orderBy = { createdAt: "asc" };
        break;
      case "like":
        orderBy = { Like: { _count: "desc" } };
        break;
      default:
        orderBy = { createdAt: "desc" };
    }

    const where = search
      ? { title: { contains: search, mode: Prisma.QueryMode.insensitive } }
      : {};

    const totalCount = await prisma.article.count({ where });

    const articles = await prisma.article.findMany({
      where,
      orderBy,
      take: parseInt(String(limit)),
      ...(cursor ? { skip: 1, cursor: { id: cursor } } : {}),
      include: {
        user: { select: { id: true, nickname: true } },
        _count: { select: { Like: true } },
      },
    });

    const list = articles.map((a) => ({
      id: a.id,
      title: a.title,
      content: a.content,
      image: a.image[0] || DEFAULT_ARTICLE_IMAGE,
      createdAt: a.createdAt,
      updatedAt: a.updatedAt,
      userId: a.user.id,
      nickname: a.user.nickname ?? "오류",
      likeCount: a._count.Like,
    }));

    return res.json({ totalCount, list });
  }
);

// 게시글 상세 조회
export const getArticleById = asyncHandler(
  async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const userId = req.user?.id;

    const article = await prisma.article.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, nickname: true, image: true } },
        _count: { select: { Like: true } },
        Comment: true,
      },
    });

    if (!article)
      return res.status(404).json({ message: "게시글을 찾을 수 없습니다" });

    const isLiked = userId
      ? !!(await prisma.like.findFirst({
          where: { articleId: id, userId },
        }))
      : false;

    const data = {
      id: article.id,
      title: article.title,
      content: article.content,
      articleImage: article.image.length
        ? article.image[0]
        : DEFAULT_ARTICLE_IMAGE,
      createdAt: article.createdAt,
      updatedAt: article.updatedAt,
      userId: article.user.id,
      nickname: article.user.nickname ?? "오류",
      profileImage: article.user.image || DEFAULT_PROFILE_IMAGE,
      likeCount: article._count.Like,
      isLiked,
    };

    return res.json(data);
  }
);

// 게시글 등록
export const createArticle = asyncHandler(
  async (req: Request, res: Response): Promise<Response> => {
    if (!req.user) {
      return res.status(401).json({ message: "로그인이 필요합니다." });
    }

    const { title, content, image } = req.body;

    const article = await prisma.article.create({
      data: {
        title,
        content,
        image,
        userId: req.user.id,
        isDeleted: false,
      },
    });

    return res.status(201).json({ message: "게시글 등록 완료", article });
  }
);

// 게시글 수정
export const updateArticle = asyncHandler(
  async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { title, content, image } = req.body;

    const exist = await prisma.article.findUnique({ where: { id } });
    if (!exist)
      return res.status(404).json({ message: "존재하지 않는 게시글입니다." });

    const updated = await prisma.article.update({
      where: { id },
      data: { title, content, image },
    });

    return res.json({ message: "게시글 수정 완료", article: updated });
  }
);

// 게시글 삭제
export const deleteArticle = asyncHandler(
  async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    const exist = await prisma.article.findUnique({ where: { id } });
    if (!exist)
      return res.status(404).json({ message: "존재하지 않는 게시글입니다." });

    await prisma.article.delete({ where: { id } });
    return res.status(204).end();
  }
);
