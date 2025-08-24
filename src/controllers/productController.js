import Product from "../models/Product.js";

const getProducts = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, sort, search } = req.query;
    const skip = (page - 1) * limit;
    const sortOption = { createdAt: sort === "recent" ? -1 : 1 };
    const searchQuery = search
      ? {
          $or: [{ name: { $regex: search, $options: "i" } }, { description: { $regex: search, $options: "i" } }],
        }
      : {};

    const sortedProducts = await Product.find(searchQuery)
      .sort(sortOption)
      .limit(limit)
      .skip(skip)
      .select("_id name price createdAt");

    res.status(200).json(sortedProducts);
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id).select("_id name description price tags createdAt");
    res.status(200).json(product);
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
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, price, tags } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        description,
        price,
        tags,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
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
