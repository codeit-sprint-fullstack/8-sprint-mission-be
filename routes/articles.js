import { Router } from "express";
import prisma from "../lib/prisma.js";

const router = Router();
const toInt = (v, d) => {
  const n = parseInt(v, 10);
  return Number.isFinite(n) ? n : d;
};

router.post("/", async (req, res, next) => {
  try {
    const { title, content } = req.body || {};
    const t = String(title || "").trim();
    const c = String(content || "").trim();

    if (!t || !c) {
      return res.status(400).json({ message: "title, content는 필수입니다." });
    }
    if (t.length > 120) {
      return res
        .status(400)
        .json({ message: "title은 120자 이내여야 합니다." });
    }

    const created = await prisma.article.create({
      data: { title: t, content: c },
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return res.status(201).json(created);
  } catch (e) {
    next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const found = await prisma.article.findUnique({
      where: { id: req.params.id },
      select: { id: true, title: true, content: true, createdAt: true },
    });
    if (!found)
      return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
    return res.json(found);
  } catch (e) {
    next(e);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const data = {};
    if ("title" in req.body) {
      const t = String(req.body.title || "").trim();
      if (!t)
        return res.status(400).json({ message: "title은 비울 수 없습니다." });
      if (t.length > 120)
        return res
          .status(400)
          .json({ message: "title은 120자 이내여야 합니다." });
      data.title = t;
    }
    if ("content" in req.body) {
      const c = String(req.body.content || "").trim();
      if (!c)
        return res.status(400).json({ message: "content는 비울 수 없습니다." });
      data.content = c;
    }
    if (Object.keys(data).length === 0) {
      return res.status(400).json({ message: "수정할 필드가 없습니다." });
    }

    const updated = await prisma.article.update({
      where: { id: req.params.id },
      data,
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return res.json(updated);
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await prisma.article.delete({ where: { id: req.params.id } });
    return res.status(204).send();
  } catch (e) {
    next(e);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const page = Math.max(1, toInt(req.query.page, 1));
    const pageSize = Math.max(1, Math.min(50, toInt(req.query.pageSize, 10)));
    const keyword = String(req.query.keyword || req.query.q || "").trim();
    const orderBy = String(req.query.orderBy || "recent");

    const where = keyword
      ? {
          OR: [
            { title: { contains: keyword, mode: "insensitive" } },
            { content: { contains: keyword, mode: "insensitive" } },
          ],
        }
      : {};

    const [totalCount, rows] = await Promise.all([
      prisma.article.count({ where }),
      prisma.article.findMany({
        where,
        orderBy:
          orderBy === "recent" ? { createdAt: "desc" } : { createdAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
        select: { id: true, title: true, content: true, createdAt: true },
      }),
    ]);

    return res.json({ list: rows, totalCount, page, pageSize });
  } catch (e) {
    next(e);
  }
});

export default router;
