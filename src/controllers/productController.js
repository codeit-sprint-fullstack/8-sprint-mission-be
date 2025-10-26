import { productRepository } from '../repositories/productRepository.js';

export const productController = {
  // 상품 목록 조회 (좋아요 상태 포함, limit 지원)
  async getProducts(req, res) {
    const { sort, limit } = req.query;
    const userId = req.user?.id;

    let orderBy;
    if (sort === 'price') {
      orderBy = { price: 'desc' };
    } else if (sort === 'favorite') {
      orderBy = { favoriteCount: 'desc' };
    } else {
      orderBy = { createdAt: 'desc' };
    }

    // limit이 지정된 경우 (베스트 상품 조회)
    const take = limit ? parseInt(limit) : undefined;

    const products = await productRepository.findManyWithLikes({
      orderBy,
      userId,
      take,
    });
    res.json(products);
  },

  // 상품 단건 조회 (댓글, 좋아요 상태 포함)
  async getProductById(req, res) {
    const { id } = req.params;
    const userId = req.user?.id;

    const product = await productRepository.findByIdWithDetails(id, userId);

    if (!product) {
      return res.status(404).json({ message: 'Cannot find given id.' });
    }

    res.json(product);
  },

  // 상품 등록
  async createProduct(req, res) {
    const userId = req.user.id;
    const { name, description, price, tags, images } = req.body;

    let imageUrls = [];
    if (images && Array.isArray(images)) {
      imageUrls = images;
    } else if (req.file) {
      imageUrls = [`/uploads/products/${req.file.filename}`];
    }

    const newProduct = await productRepository.create({
      userId,
      name,
      description,
      price,
      tags,
      images: imageUrls,
    });

    res.status(201).json(newProduct);
  },

  // 상품 수정
  async updateProduct(req, res) {
    const { id } = req.params;
    const { images, ...updateData } = req.body;

    if (images && Array.isArray(images)) {
      updateData.images = images;
    } else if (req.file) {
      updateData.images = [`/uploads/products/${req.file.filename}`];
    }

    const product = await productRepository.update(id, updateData);
    res.json(product);
  },

  // 상품 삭제
  async deleteProduct(req, res) {
    const { id } = req.params;
    await productRepository.delete(id);
    res.sendStatus(204);
  },
};
