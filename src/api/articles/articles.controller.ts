import { NextFunction, Request, Response } from "express";
import prisma from "../../config/db";
import authRepo from "../auth/auth.repository";
import {
  ERROR_NOT_OWNER,
  ERROR_USER_NOTFOUND,
} from "../../config/errorTemplate";

interface articleQuery {
  page?: string;
  pageSize?: string;
  orderBy?: string;
  keyword?: string;
}

export async function getArticleList(
  req: Request<{}, {}, {}, articleQuery>,
  res: Response
) {
  const {
    page = "1",
    pageSize = "10",
    orderBy = "recent",
    keyword = "",
  } = req.query;

  const limit = parseInt(pageSize);
  const offset = (parseInt(page) - 1) * limit;

  const articles = await prisma.article.findMany({
    where: {
      // 검색 쿼리
      OR: [
        { title: { contains: keyword } },
        { content: { contains: keyword } },
      ],
    },
    orderBy:
      orderBy == "recent" ? { createdAt: "desc" } : { favoriteCount: "desc" },
    skip: offset,
    take: limit,
  });
  res.json(articles);
}

export async function getArticle(req: Request, res: Response) {
  const { id } = req.params;
  const article = await prisma.article.findUnique({
    where: { id },
  });
  return res.json(article);
}

//새로 등록 할 때만 유저 정보가 필요합니다.
export async function createArticle(req: Request, res: Response) {
  const userId = req.auth?.userId;
  if (userId) {
    const user = await authRepo.findById(userId);
    if (user) {
      const article = await prisma.article.create({
        data: {
          ...req.body,
          userName: user.name,
          user: { connect: { id: user.id } },
        },
      });
      return res.status(201).send(article);
    }
  }
  throw ERROR_USER_NOTFOUND;
}

export async function updateArticle(req: Request, res: Response) {
  const { id } = req.params;
  const article = await prisma.article.update({
    where: { id },
    data: req.body,
  });

  res.json(article);
}

export async function deleteArticle(req: Request, res: Response) {
  const { id } = req.params;
  await prisma.article.delete({
    where: { id },
  });
  res.sendStatus(204);
}

//소유권 검사 미들웨어
export async function checkOwner(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const userId = req.auth?.userId;
    const product = await prisma.article.findUnique({
      where: { id },
    });
    if (product) {
      if (product.userId !== userId) {
        throw ERROR_NOT_OWNER;
      }
    }
    return res.status(200).json({ owner: true });
  } catch (err) {
    next(err);
  } finally {
    next();
  }
}
