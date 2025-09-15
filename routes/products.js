const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const Product = require("../models/product");

/**
 * @swagger
 * /products:
 *   get:
 *     summary: 상품 목록 조회
 *     description: 페이지네이션, 검색, 정렬 기능을 포함한 상품 목록을 조회합니다.
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: 페이지 번호
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           default: 10
 *         description: 페이지당 상품 수
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *           default: ""
 *         description: 검색 키워드 (상품명, 설명)
 *       - in: query
 *         name: orderBy
 *         schema:
 *           type: string
 *           enum: [recent, favorite]
 *           default: recent
 *         description: 정렬 기준
 *     responses:
 *       200:
 *         description: 상품 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 list:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *                 totalCount:
 *                   type: integer
 *                 page:
 *                   type: integer
 *                 pageSize:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/", async (req, res) => {
  try {
    const {
      page = 1,
      pageSize = 10,
      keyword = "",
      orderBy = "recent",
    } = req.query;

    // 검색 조건
    let whereCondition = {};
    if (keyword) {
      whereCondition = {
        [Op.or]: [
          { name: { [Op.iLike]: `%${keyword}%` } },
          { description: { [Op.iLike]: `%${keyword}%` } },
        ],
      };
    }

    // 정렬 조건
    let orderCondition = [];
    if (orderBy === "recent") {
      orderCondition = [["createdAt", "DESC"]];
    } else if (orderBy === "favorite") {
      orderCondition = [["favoriteCount", "DESC"]];
    }

    // 페이지네이션 계산
    const limit = parseInt(pageSize);
    const offset = (parseInt(page) - 1) * limit;

    // 상품 조회
    const products = await Product.findAndCountAll({
      where: whereCondition,
      order: orderCondition,
      limit: limit,
      offset: offset,
      attributes: ["id", "name", "price", "createdAt"],
    });

    res.json({
      list: products.rows,
      totalCount: products.count,
      page: parseInt(page),
      pageSize: limit,
      totalPages: Math.ceil(products.count / limit),
    });
  } catch (error) {
    console.error("상품 목록 조회 실패:", error);
    res.status(500).json({ error: "서버 오류가 발생했습니다." });
  }
});

// 상품 상세 조회
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByPk(id, {
      attributes: [
        "id",
        "name",
        "description",
        "price",
        "tags",
        "createdAt",
        "images",
      ],
    });

    if (!product) {
      return res.status(404).json({ error: "상품을 찾을 수 없습니다." });
    }

    res.json(product);
  } catch (error) {
    console.error("상품 상세 조회 실패:", error);
    res.status(500).json({ error: "서버 오류가 발생했습니다." });
  }
});

// 상품 등록
router.post("/", async (req, res) => {
  try {
    const { name, description, price, tags, images = [] } = req.body;

    // 필수 필드 검증
    if (!name || !description || !price || !tags) {
      return res.status(400).json({ error: "필수 필드가 누락되었습니다." });
    }

    const product = await Product.create({
      name,
      description,
      price: parseInt(price),
      tags,
      images,
    });

    res.status(201).json({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      tags: product.tags,
      createdAt: product.createdAt,
      images: product.images,
    });
  } catch (error) {
    console.error("상품 등록 실패:", error);
    if (error.name === "SequelizeValidationError") {
      return res
        .status(400)
        .json({ error: "입력 데이터가 올바르지 않습니다." });
    }
    res.status(500).json({ error: "서버 오류가 발생했습니다." });
  }
});

// 상품 수정
router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, tags, images } = req.body;

    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ error: "상품을 찾을 수 없습니다." });
    }

    // 수정할 필드만 업데이트
    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (price !== undefined) updateData.price = parseInt(price);
    if (tags !== undefined) updateData.tags = tags;
    if (images !== undefined) updateData.images = images;

    await product.update(updateData);

    res.json({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      tags: product.tags,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
      images: product.images,
    });
  } catch (error) {
    console.error("상품 수정 실패:", error);
    if (error.name === "SequelizeValidationError") {
      return res
        .status(400)
        .json({ error: "입력 데이터가 올바르지 않습니다." });
    }
    res.status(500).json({ error: "서버 오류가 발생했습니다." });
  }
});

// 상품 삭제
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ error: "상품을 찾을 수 없습니다." });
    }

    await product.destroy();

    res.status(204).send(); // No Content
  } catch (error) {
    console.error("상품 삭제 실패:", error);
    res.status(500).json({ error: "서버 오류가 발생했습니다." });
  }
});

module.exports = router;
