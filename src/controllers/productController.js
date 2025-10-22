import { prisma } from "../utils/prisma.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";

// 상품 목록 조회
export const getProducts = asyncHandler(async (req, res) => {
  const products = await prisma.product.findMany({
    include: { user: true, favorites: true },
  });
  res.json({ products });
});

// 상품 상세 조회
export const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await prisma.product.findUnique({
    where: { id: parseInt(id) },
    include: { user: true, favorites: true, comments: true },
  });
  if (!product)
    return res.status(404).json({ message: "상품을 찾을 수 없습니다" });
  res.json({ product });
});

// 상품 등록
export const createProduct = asyncHandler(async (req, res) => {
  const { title, content, price } = req.body;
  const imageUrls = req.files?.map((f) => `/uploads/${f.filename}`) || [];

  const product = await prisma.product.create({
    data: {
      title,
      content,
      price: parseInt(price),
      images: imageUrls,
      userId: req.user.id, // 로그인된 사용자 ID
    },
  });
  res.status(201).json({ message: "상품 등록 완료", product });
});

// 상품 삭제
export const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await prisma.product.delete({ where: { id: parseInt(id) } });
  res.json({ message: "상품이 삭제되었습니다" });
});

// favorite 토글
export const toggleFavorite = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  const existing = await prisma.favorite.findFirst({
    where: { userId, productId: parseInt(id) },
  });

  if (existing) {
    await prisma.favorite.delete({ where: { id: existing.id } });
    res.json({ message: "좋아요 취소" });
  } else {
    await prisma.favorite.create({
      data: { userId, productId: parseInt(id) },
    });
    res.json({ message: "좋아요 등록" });
  }
});
