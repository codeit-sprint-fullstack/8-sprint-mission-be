import Product from "../models/product.js";

const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const { name, description, price, tags } = req.body;
    const newProduct = await Product.create({
      name,
      description,
      price,
      tags,
    });
    console.log(newProduct);
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};

const productController = {
  getProducts,
  createProduct,
};

export default productController;
