import { Request, Response } from "express";
import prisma from "../../config/db";
import authRepo from "../auth/auth.repository";
import {
  ERROR_UNATHORIZED,
  ERROR_USER_NOTFOUND,
} from "../../config/errorTemplate";

/* === 상품 댓글 api  === (조회, 생성) */
interface CommentParams {
  id?: string;
}
interface CommentQuery {
  pageSize?: string;
  lastId?: string;
  orderBy?: string;
  keyword?: string;
}

export async function getProductCommentList(
  req: Request<CommentParams, {}, {}, CommentQuery>,
  res: Response
) {
  const productId = req.params.id;
  const {
    pageSize = "10",
    lastId = "",
    orderBy = "recent",
    keyword = "",
  } = req.query;

  const limit = parseInt(pageSize);

  //cursor 방식 페이지네이션
  const comments = await prisma.comment.findMany({
    where: { productId },
    skip: lastId ? 1 : 0, //cursor 항목 제외
    take: limit,
    ...(lastId && { cursor: { id: lastId } }), //lastId를 쿼리로 받으면 커서 사용.
    orderBy: { createdAt: "desc" },
  });
  res.json(comments);
}

export async function getProductComment(req: Request, res: Response) {
  const { productId, id } = req.params;
  const comments = await prisma.comment.findMany({
    where: {
      productId,
      id,
    },
    orderBy: { createdAt: "desc" },
  });
  res.json(comments);
}

export async function createProductComment(req: Request, res: Response) {
  const userId = req.auth?.userId;
  if (userId) {
    const user = await authRepo.findById(userId);

    const productId = req.params.id;
    const { content } = req.body;

    if (user) {
      const comment = await prisma.comment.create({
        data: {
          content,
          userName: user.name,
          user: { connect: { id: user.id } },
          product: {
            connect: { id: productId },
          },
        },
      });
      return res.status(201).json(comment);
    } else {
      throw ERROR_USER_NOTFOUND;
    }
  } else {
    throw ERROR_UNATHORIZED;
  }
}

/* === 게시글 댓글 api === (조회, 생성) */
export async function getArticleCommentList(
  req: Request<CommentParams, {}, {}, CommentQuery>,
  res: Response
) {
  const articleId = req.params.id;
  const {
    pageSize = "10",
    lastId = "",
    orderBy = "recent",
    keyword = "",
  } = req.query;

  const limit = parseInt(pageSize);

  //cursor 방식 페이지네이션
  const comments = await prisma.comment.findMany({
    where: { articleId },
    skip: lastId ? 1 : 0, //cursor 항목 제외
    take: limit,
    ...(lastId && { cursor: { id: lastId } }), //lastId를 쿼리로 받으면 커서 사용.
    orderBy: { createdAt: "desc" },
  });
  res.json(comments);
}

export async function getArticleComment(req: Request, res: Response) {
  const { articleId, id } = req.params;
  const comments = await prisma.comment.findMany({
    where: {
      articleId,
      id,
    },
    orderBy: { createdAt: "desc" },
  });
  res.json(comments);
}

export async function createArticleComment(req: Request, res: Response) {
  const userId = req.auth?.userId;
  if (userId) {
    const user = await authRepo.findById(userId);

    const articleId = req.params.id;
    const { content } = req.body;

    if (user) {
      const comment = await prisma.comment.create({
        data: {
          content,
          userName: user.name,
          user: { connect: { id: user.id } },
          article: {
            connect: { id: articleId },
          },
        },
      });
      res.status(201).json(comment);
    } else {
      throw ERROR_USER_NOTFOUND;
    }
  } else {
    throw ERROR_UNATHORIZED;
  }
}

/* === 공통 댓글 api (삭제, 수정)=== */
export async function updateComment(req: Request, res: Response) {
  const id = req.params.id;
  const { content } = req.body;

  const updated = await prisma.comment.update({
    where: { id },
    data: { content },
  });
  res.json(updated);
}

export async function deleteComment(req: Request, res: Response) {
  const { id } = req.params;
  await prisma.comment.delete({
    where: { id },
  });
  res.sendStatus(204);
}
