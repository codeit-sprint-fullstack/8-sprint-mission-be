import { NextFunction, Request, Response } from "express";
import prisma from "../../config/db";
import authRepo from "../auth/auth.repository";
import {
  ERROR_NOT_OWNER,
  ERROR_USER_NOTFOUND,
} from "../../config/errorTemplate";

interface productseQuery {
  page?: string;
  pageSize?: string;
  orderBy?: string;
  keyword?: string;
}

export async function getProductList(
  req: Request<{}, {}, {}, productseQuery>,
  res: Response
) {
  const {
    page = "1",
    pageSize = "10",
    orderBy = "newest",
    keyword = "",
  } = req.query;

  const limit = parseInt(pageSize);
  const offset = (parseInt(page) - 1) * limit;

  const products = await prisma.product.findMany({
    where: {
      // 검색 쿼리
      OR: [
        { name: { contains: keyword } },
        { description: { contains: keyword } },
      ],
    },
    orderBy:
      orderBy == "recent" ? { createdAt: "desc" } : { favoriteCount: "desc" },
    skip: offset,
    take: limit,
  });
  res.json(products);
}

export async function getProduct(req: Request, res: Response) {
  const { id } = req.params;
  const product = await prisma.product.findUnique({
    where: { id },
  });
  res.json(product);
}

//새로 등록 할 때만 유저 정보가 필요합니다.
export async function createProduct(req: Request, res: Response) {
  const userId = req.auth?.userId;
  if (userId) {
    const user = await authRepo.findById(userId);
    if (user) {
      const product = await prisma.product.create({
        data: {
          ...req.body,
          user: { connect: { id: userId } },
          userName: user.name,
        },
      });
      return res.status(201).json(product);
    }
  }
  throw ERROR_USER_NOTFOUND;
}

export async function updateProduct(req: Request, res: Response) {
  const { id } = req.params;

  const product = await prisma.product.update({
    where: { id },
    data: {
      ...req.body,
    },
  });

  res.json(product);
}

export async function deleteProduct(req: Request, res: Response) {
  const { id } = req.params;
  await prisma.product.delete({
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
    const product = await prisma.product.findUnique({
      where: { id },
    });
    if (product && product.userId !== userId) {
      throw ERROR_NOT_OWNER;
    }
  } catch (err) {
    next(err);
  } finally {
    next();
  }
}

export async function addFavorite(req: Request, res: Response) {
  const { id } = req.params;
  const product = await prisma.product.update({
    where: { id },
    data: { favoriteCount: { increment: 1 } },
  });

  res.json({ favoriteCount: product.favoriteCount });
}
