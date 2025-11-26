import { Response } from 'express';
import { productRepository } from '../repositories/productRepository.js';
import { AuthenticatedRequest } from '../types/express.js';
import { 
  CreateProductInput, 
  UpdateProductInput, 
  ProductQuery 
} from '../schemas/index.js';

export const productController = {
  // 상품 목록 조회 (좋아요 상태 포함, limit 지원)
  async getProducts(req: AuthenticatedRequest<unknown, ProductQuery>, res: Response): Promise<void> {
    const { sort, limit } = req.query;
    const userId = req.user?.userId;

    let orderBy;
    if (sort === 'price') {
      orderBy = { price: 'desc' as const };
    } else if (sort === 'favorite') {
      orderBy = { favoriteCount: 'desc' as const };
    } else {
      orderBy = { createdAt: 'desc' as const };
    }

    // limit이 지정된 경우 (베스트 상품 조회)
    const take = limit ? Number(limit) : undefined;

    const products = await productRepository.findManyWithLikes({
      orderBy,
      userId,
      take,
    });
    res.json({ list: products });
  },

  // 상품 단건 조회 (댓글, 좋아요 상태 포함)
  async getProductById(req: AuthenticatedRequest<unknown, unknown, { id: string }>, res: Response): Promise<void> {
    const { id } = req.params;
    const userId = req.user?.userId;

    const product = await productRepository.findByIdWithDetails(id, userId);

    if (!product) {
      res.status(404).json({ message: 'Cannot find given id.' });
      return;
    }

    res.json(product);
  },

  // 상품 등록
  async createProduct(req: AuthenticatedRequest<CreateProductInput>, res: Response): Promise<void> {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ message: 'Authentication required' });
      return;
    }

    const { name, description, price, tags, images } = req.body;

    let imageUrls: string[] = [];
    if (images && Array.isArray(images)) {
      imageUrls = images;
    } else if (req.file) {
      imageUrls = [`/uploads/products/${req.file.filename}`];
    }

    const newProduct = await productRepository.create({
      ownerId: userId,
      name,
      description: description ?? null,
      price,
      tags,
      images: imageUrls,
    });

    res.status(201).json(newProduct);
  },

  // 상품 수정
  async updateProduct(req: AuthenticatedRequest<UpdateProductInput, unknown, { id: string }>, res: Response): Promise<void> {
    const { id } = req.params;
    const { images, ...updateData } = req.body;
    const updatePayload: UpdateProductInput & { images?: string[] } = { ...updateData };

    if (images && Array.isArray(images)) {
      updatePayload.images = images;
    } else if (req.file) {
      updatePayload.images = [`/uploads/products/${req.file.filename}`];
    }

    const product = await productRepository.update(id, updatePayload);
    res.json(product);
  },

  // 상품 삭제
  async deleteProduct(req: AuthenticatedRequest<unknown, unknown, { id: string }>, res: Response): Promise<void> {
    const { id } = req.params;
    await productRepository.delete(id);
    res.sendStatus(204);
  },
};
