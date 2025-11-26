import prisma from "../config/prisma.js";
import { Prisma } from "@prisma/client";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import { DEFAULT_PRODUCT_IMAGE, } from "../config/constants.js";
// 상품 목록 조회
export const getProducts = asyncHandler(async (req, res) => {
    const { search, order = "newest", limit = "10", cursor } = req.query;
    let orderBy;
    switch (order) {
        case "oldest":
            orderBy = { createdAt: "asc" };
            break;
        case "like":
            orderBy = { Favorite: { _count: "desc" } };
            break;
        default:
            orderBy = { createdAt: "desc" };
    }
    const where = search
        ? {
            title: {
                contains: String(search),
                mode: Prisma.QueryMode.insensitive,
            },
        }
        : {};
    const totalCount = await prisma.product.count({ where });
    const products = await prisma.product.findMany({
        where,
        orderBy,
        take: parseInt(String(limit)),
        ...(cursor ? { skip: 1, cursor: { id: String(cursor) } } : {}),
        include: {
            user: { select: { id: true, nickname: true, image: true } },
            _count: { select: { Favorite: true } },
        },
    });
    const list = products.map((p) => ({
        id: p.id,
        name: p.title,
        description: p.description,
        price: p.price,
        images: p.images || DEFAULT_PRODUCT_IMAGE,
        tags: p.tags,
        createdAt: p.createdAt,
        userId: p.user.id,
        nickname: p.user.nickname,
        favoriteCount: p._count.Favorite,
    }));
    return res.json({ totalCount, list });
});
// 상품 상세 조회
export const getProductById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const userId = req.user?.id;
    const product = await prisma.product.findUnique({
        where: { id },
        include: {
            user: { select: { id: true, nickname: true, image: true } },
            _count: { select: { Favorite: true } },
            Favorite: true,
            Comment: true,
        },
    });
    if (!product)
        return res.status(404).json({ message: "상품을 찾을 수 없습니다" });
    const isFavorite = userId
        ? !!(await prisma.favorite.findFirst({
            where: { productId: id, userId },
        }))
        : false;
    const data = {
        id: product.id,
        name: product.title,
        description: product.description,
        price: product.price,
        images: product.images.length ? product.images : [DEFAULT_PRODUCT_IMAGE],
        tags: product.tags,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
        userId: product.user.id,
        nickname: product.user.nickname,
        favoriteCount: product._count.Favorite,
        isFavorite,
    };
    return res.json(data);
});
// 상품 등록
export const createProduct = asyncHandler(async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: "로그인이 필요합니다." });
    }
    const { title, description, price, images, tags } = req.body;
    const product = await prisma.product.create({
        data: {
            title,
            description,
            price: parseInt(price),
            images,
            tags,
            userId: req.user.id, // 로그인된 사용자 ID
        },
    });
    return res.status(201).json({ message: "상품이 등록되었습니다", product });
});
// 상품 수정
export const updateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, description, price, images, tags } = req.body;
    const exist = await prisma.product.findUnique({ where: { id } });
    if (!exist)
        return res.status(404).json({ message: "존재하지 않는 상품입니다." });
    const updated = await prisma.product.update({
        where: { id },
        data: { title, description, price, images, tags },
    });
    return res.json({
        message: "상품 정보가 수정되었습니다",
        product: updated,
    });
});
// 상품 삭제
export const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const exist = await prisma.product.findUnique({ where: { id } });
    if (!exist)
        return res.status(404).json({ message: "존재하지 않는 상품입니다." });
    await prisma.product.delete({ where: { id } });
    return res.json({ message: "상품이 삭제되었습니다" });
});
