import * as productService from "../services/productService.js";

const getProducts = async (req, res, next) => {
  try {
    const {
      page = 1,
      pageSize = 10,
      orderBy = "recent",
      keyword = "",
    } = req.query;

    const { products, totalCount } = await productService.getProducts({
      page,
      pageSize,
      orderBy,
      keyword,
    });

    res.status(200).json({
      products,
      totalCount,
    });
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user?.userId; // 인증된 사용자가 있으면 userId 전달
    const product = await productService.getProductById(id, userId);
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const { name, description, price, tags, images } = req.body;
    const userId = req.user.userId;
    const newProduct = await productService.createProduct({
      name,
      description,
      price,
      tags,
      images,
      userId,
    });
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, price, tags, images } = req.body;
    const updatedProduct = await productService.updateProduct(id, {
      name,
      description,
      price,
      tags,
      images,
    });
    res.status(200).json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    await productService.deleteProduct(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

const productController = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};

export default productController;
