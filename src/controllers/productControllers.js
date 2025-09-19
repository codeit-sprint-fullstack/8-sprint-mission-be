import prisma from '../lib/prisma';

export const getAllProducts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const validPage = Math.max(1, page);

    const offset = (validPage - 1) * limit;

    const totalCount = await prisma.product.count();

    const products = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        price: true,
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

    const product = await prisma.product.update({
      where: { id },
      data: { name: name.trim(), description: description.trim(), price, tags },
    });
    res.status(200).json({ success: true, data: product });
  } catch (error) {
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
