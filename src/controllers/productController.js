import prisma from "../config/prisma.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";

// 상품 목록 조회
export const getProducts = asyncHandler(async (req, res) => {
  const products = await prisma.product.findMany({
    include: {
      user: { select: { id: true } },
      favorites: true,
    },
  });
  res.json({ products });
});

// 상품 상세 조회
export const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user?.id;

  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      user: { select: { id: true, nickname: true, image: true } },
      favorites: true,
      comments: true,
    },
  });

  if (!product)
    return res.status(404).json({ message: "상품을 찾을 수 없습니다" });

  const isFavorite = userId
    ? !!(await prisma.favorite.findFirst({
        where: { productId: id, userId },
      }))
    : false;

  res.json({ ...product, isFavorite });
});

// 상품 등록
export const createProduct = asyncHandler(async (req, res) => {
  const { title, content, price, images, tags } = req.body;

  const product = await prisma.product.create({
    data: {
      title,
      content,
      price: parseInt(price),
      images,
      tags,
      userId: req.user.id, // 로그인된 사용자 ID
    },
  });
  res.status(201).json({ message: "상품이 등록되었습니다", product });
});

// 상품 수정
export const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, content, price, images, tags } = req.body;

  const exist = await prisma.product.findUnique({ where: { id } });
  if (!exist)
    return res.status(404).json({ message: "존재하지 않는 상품입니다." });

  const updated = await prisma.product.update({
    where: { id },
    data: { title, content, price, images, tags },
  });

  res.json({ message: "상품 정보가 수정되었습니다", product: updated });
});

// 상품 삭제
export const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const exist = await prisma.product.findUnique({ where: { id } });
  if (!exist)
    return res.status(404).json({ message: "존재하지 않는 상품입니다." });

  await prisma.product.delete({ where: { id } });
  res.json({ message: "상품이 삭제되었습니다" });
});
