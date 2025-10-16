import prisma from '../middlewares/prisma.js';

export const getAllProducts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const searchQuery = req.query.q;

    const validPage = Math.max(1, page);

    const offset = (validPage - 1) * limit;

    // 검색 조건 구성
    const whereCondition = searchQuery
      ? {
          OR: [
            {
              name: {
                contains: searchQuery,
                mode: 'insensitive',
              },
            },
            {
              description: {
                contains: searchQuery,
                mode: 'insensitive',
              },
            },
          ],
        }
      : {};

    const totalCount = await prisma.product.count({
      where: whereCondition,
    });

    const products = await prisma.product.findMany({
      where: whereCondition,
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        tags: true,
        createdAt: true,
      },
      skip: offset,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    });

    // 페이지네이션 메타데이터 계산
    const totalPages = Math.ceil(totalCount / limit);
    const hasNextPage = validPage < totalPages;
    const hasPrevPage = validPage > 1;

    res.status(200).json({
      success: true,
      data: products,
      pagination: {
        currentPage: validPage,
        totalPages,
        totalCount,
        limit,
        hasNextPage,
        hasPrevPage,
      },
      search: {
        query: searchQuery || null,
        hasSearch: !!searchQuery,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const { name, description, price, tags } = req.body;

    if (!name || !description || !price) {
      return res
        .status(400)
        .json({ success: false, message: 'Name, description, and price are required' });
    }

    const product = await prisma.product.create({
      data: { name: name.trim(), description: description.trim(), price, tags },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        tags: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    res.status(201).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ success: false, message: 'Id is required' });
    }

    const product = await prisma.product.findUnique({
      where: { id },
      select: { id: true, name: true, description: true, price: true, tags: true, createdAt: true },
    });
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, price, tags } = req.body;

    if (!id) {
      return res.status(400).json({ success: false, message: 'Id is required' });
    }

    // 업데이트할 데이터 구성 (undefined인 필드는 제외)
    const updateData = {};
    if (name !== undefined) updateData.name = name.trim();
    if (description !== undefined) updateData.description = description.trim();
    if (price !== undefined) updateData.price = price;
    if (tags !== undefined) updateData.tags = tags;

    // 업데이트할 데이터가 없는 경우
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'At least one field (name, description, price, tags) must be provided',
      });
    }

    const product = await prisma.product.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        tags: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    // Prisma 에러 처리
    if (error.code === 'P2025') {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ success: false, message: 'Id is required' });
    }

    await prisma.product.delete({ where: { id } });
    res.status(200).json({ success: true, data: null });
  } catch (error) {
    next(error);
  }
};
