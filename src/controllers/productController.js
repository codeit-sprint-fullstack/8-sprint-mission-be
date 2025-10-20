import { productRepository } from '../repositories/productRepository.js';

export const productController = {
  // 상품 목록 조회
  async getProducts(req, res) {
    const { sort } = req.query;
    const orderBy =
      sort === 'price' ? { price: 'desc' } : { createdAt: 'desc' };

    const products = await productRepository.findMany({ orderBy });
    res.send(products);
  },

  // 상품 단건 조회
  async getProductById(req, res) {
    const { id } = req.params;
    const product = await productRepository.findById(id);

    if (!product) {
      return res.status(404).send({ message: 'Cannot find given id.' });
    }

    res.send(product);
  },

  // 상품 등록
  async createProduct(req, res) {
    const { userId, name, description, price, tags } = req.body;

    // 이미지 파일이 업로드되었다면 URL 생성
    const imageUrl = req.file ? `/uploads/products/${req.file.filename}` : null;

    const newProduct = await productRepository.create({
      userId,
      name,
      description,
      price,
      tags,
      imageUrl,
    });

    res.status(201).send(newProduct);
  },

  // 상품 수정
  async updateProduct(req, res) {
    const { id } = req.params;
    const updateData = { ...req.body };

    // 이미지 파일이 업로드되었다면 URL 추가
    if (req.file) {
      updateData.imageUrl = `/uploads/products/${req.file.filename}`;
    }

    const product = await productRepository.update(id, updateData);
    res.send(product);
  },

  // 상품 삭제
  async deleteProduct(req, res) {
    const { id } = req.params;
    await productRepository.delete(id);
    res.sendStatus(204);
  },
};
