import prisma from "../config/database.js";

const getProducts = async (req, res, next) => {
  try {
    const {
      page = 1,
      pageSize = 10,
      orderBy = "recent",
      keyword = "",
    } = req.query;
    const skip = (page - 1) * pageSize;
    const take = Number(pageSize);
    // Prisma 정렬 옵션 설정
    const sortOption =
      orderBy === "recent" ? { createdAt: "desc" } : { createdAt: "asc" };
    const searchQuery = keyword
      ? {
          $or: [
            { name: { $regex: keyword, $options: "i" } },
            { description: { $regex: keyword, $options: "i" } },
          ],
        }
      : {};

    const totalCount = await prisma.product.count({ where: searchQuery });
    const sortedProducts = await prisma.product.findMany({
      where: searchQuery,
      skip,
      take,
      orderBy: sortOption,
      select: {
        id: true,
        name: true,
        price: true,
        createdAt: true,
      },
    });

    res.status(200).json({
      products: sortedProducts,
      totalCount,
    });
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        tags: true,
        createdAt: true,
      },
    });
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const { name, description, price, tags } = req.body;
    const newProduct = await prisma.product.create({
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
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        price,
        tags,
      },
    });
    res.status(200).json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.product.delete({ where: { id } });
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
