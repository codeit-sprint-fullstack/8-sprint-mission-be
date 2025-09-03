// routes/products.js
import { Router } from "express";
import prisma from "../lib/prisma.js";

const router = Router();
const toInt = (v, d) => {
  const n = parseInt(v, 10);
  return Number.isFinite(n) ? n : d;
};

// CREATE
router.post("/", async (req, res, next) => {
  try {
    const { name, description, price, tags = [] } = req.body || {};
    if (!name || !description || price === undefined)
      return res
        .status(400)
        .json({ message: "name, description, price는 필수입니다." });
    const p = Number(price);
    if (!Number.isFinite(p) || p < 0)
      return res
        .status(400)
        .json({ message: "price는 0 이상의 숫자여야 합니다." });

    const created = await prisma.product.create({
      data: {
        name: String(name).trim(),
        description: String(description).trim(),
        price: p,
        tags: Array.isArray(tags) ? tags.map(String) : [],
      },
    });
    res.status(201).json(created);
  } catch (e) {
    next(e);
  }
});

// READ ONE
router.get("/:id", async (req, res, next) => {
  try {
    const found = await prisma.product.findUnique({
      where: { id: req.params.id },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        tags: true,
        createdAt: true,
      },
    });
    if (!found)
      return res.status(404).json({ message: "상품을 찾을 수 없습니다." });
    res.json(found);
  } catch (e) {
    next(e);
  }
});

// UPDATE (PATCH)
router.patch("/:id", async (req, res, next) => {
  try {
    const up = {};
    if ("name" in req.body) {
      if (!req.body.name)
        return res.status(400).json({ message: "name은 비울 수 없습니다." });
      up.name = String(req.body.name).trim();
    }
    if ("description" in req.body) {
      if (!req.body.description)
        return res
          .status(400)
          .json({ message: "description은 비울 수 없습니다." });
      up.description = String(req.body.description).trim();
    }
    if ("price" in req.body) {
      const p = Number(req.body.price);
      if (!Number.isFinite(p) || p < 0)
        return res
          .status(400)
          .json({ message: "price는 0 이상의 숫자여야 합니다." });
      up.price = p;
    }
    if ("tags" in req.body) {
      if (!Array.isArray(req.body.tags))
        return res
          .status(400)
          .json({ message: "tags는 문자열 배열이어야 합니다." });
      up.tags = req.body.tags.map(String);
    }
    if (Object.keys(up).length === 0)
      return res.status(400).json({ message: "수정할 필드가 없습니다." });

    const updated = await prisma.product.update({
      where: { id: req.params.id },
      data: up,
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
    res.json(updated);
  } catch (e) {
    next(e);
  }
});

// DELETE
router.delete("/:id", async (req, res, next) => {
  try {
    await prisma.product.delete({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (e) {
    next(e);
  }
});

// LIST (offset + 검색 + 최신순)
router.get("/", async (req, res, next) => {
  try {
    const page = Math.max(1, toInt(req.query.page, 1));
    const pageSize = Math.max(1, Math.min(50, toInt(req.query.pageSize, 10)));
    const keyword = String(req.query.keyword || req.query.q || "").trim();
    const orderBy = String(req.query.orderBy || "recent");

    const where = keyword
      ? {
          OR: [
            { name: { contains: keyword, mode: "insensitive" } },
            { description: { contains: keyword, mode: "insensitive" } },
          ],
        }
      : {};

    const [totalCount, rows] = await Promise.all([
      prisma.product.count({ where }),
      prisma.product.findMany({
        where,
        orderBy:
          orderBy === "recent" ? { createdAt: "desc" } : { createdAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
        select: { id: true, name: true, price: true, createdAt: true },
      }),
    ]);

    res.json({ list: rows, totalCount, page, pageSize });
  } catch (e) {
    next(e);
  }
});

export default router;
