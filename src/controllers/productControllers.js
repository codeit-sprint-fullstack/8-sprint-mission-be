import * as productRepository from '../repositories/productRepository.js';

export const getAllProducts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const searchQuery = req.query.q;

    const result = await productRepository.getAllProducts(page, limit, searchQuery);

    res.status(200).json({
      success: true,
      data: result.products,
      pagination: {
        currentPage: result.currentPage,
        totalPages: result.totalPages,
        totalCount: result.totalCount,
        limit,
        hasNextPage: result.hasNextPage,
        hasPrevPage: result.hasPrevPage,
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
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const ownerId = req.user.id;
    const product = await productRepository.createProduct(
      name,
      description,
      price,
      tags,
      imageUrl,
      ownerId,
    );

    res.status(201).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const me = req.user;

    const product = await productRepository.getProductById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const myLike = await productRepository.getMyLike(me.id, id);
    const isLiked = Boolean(myLike);
    const likeCount = product.likeCount;

    const response = {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      tags: product.tags,
      image: product.image,
      owner: product.owner,
      comments: product.comments,
      isLiked,
      likeCount,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };

    res.status(200).json({ success: true, data: response });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, price, tags } = req.body;

    // 업데이트할 데이터 구성 (undefined인 필드는 제외)
    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (price !== undefined) updateData.price = price;
    if (tags !== undefined) updateData.tags = tags;

    // 업데이트할 데이터가 없는 경우
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'At least one field (name, description, price, tags) must be provided',
      });
    }

    const product = await productRepository.updateProduct(id, updateData);

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

    await productRepository.deleteProduct(id);
    res.status(200).json({ success: true, data: null });
  } catch (error) {
    next(error);
  }
};
