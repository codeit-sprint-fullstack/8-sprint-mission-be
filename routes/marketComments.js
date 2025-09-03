import { Router } from "express";
import prisma from "../lib/prisma.js";

const router = Router({ mergeParams: true });
const toInt = (v, d) => {
  const n = parseInt(v, 10);
  return Number.isFinite(n) ? n : d;
};

router.post("/", async (req, res, next) => {
  try {
    const { productId } = req.params;
    const content = String(req.body?.content || "").trim();
    if (!content)
      return res.status(400).json({ message: "content는 필수입니다." });

    const created = await prisma.marketComment.create({
      data: { content, productId },
      select: { id: true, content: true, createdAt: true },
    });
    return res.status(201).json(created);
  } catch (e) {
    if (e?.code === "P2003")
      return res.status(404).json({ message: "상품을 찾을 수 없습니다." });
    next(e);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const { productId } = req.params;
    const take = Math.max(1, Math.min(50, toInt(req.query.take, 10)));
    const cursor = req.query.cursor ? { id: String(req.query.cursor) } : null;

    const list = await prisma.marketComment.findMany({
      where: { productId },
      orderBy: [{ createdAt: "desc" }, { id: "desc" }],
      take,
      ...(cursor && { cursor, skip: 1 }),
      select: { id: true, content: true, createdAt: true },
    });

    const nextCursor = list.length === take ? list[list.length - 1].id : null;
    return res.json({ list, nextCursor });
  } catch (e) {
    next(e);
  }
});

router.patch("/:commentId", async (req, res, next) => {
  try {
    const { productId, commentId } = req.params;
    const content = String(req.body?.content || "").trim();
    if (!content)
      return res.status(400).json({ message: "content는 비울 수 없습니다." });

    const target = await prisma.marketComment.findUnique({
      where: { id: commentId },
      select: { id: true, productId: true },
    });
    if (!target || target.productId !== productId) {
      return res.status(404).json({ message: "댓글을 찾을 수 없습니다." });
    }

    const updated = await prisma.marketComment.update({
      where: { id: commentId },
      data: { content },
      select: { id: true, content: true, createdAt: true },
    });
    return res.json(updated);
  } catch (e) {
    next(e);
  }
});

router.delete("/:commentId", async (req, res, next) => {
  try {
    const { productId, commentId } = req.params;
    const result = await prisma.marketComment.deleteMany({
      where: { id: commentId, productId },
    });
    if (result.count === 0)
      return res.status(404).json({ message: "댓글을 찾을 수 없습니다." });
    return res.status(204).send();
  } catch (e) {
    next(e);
  }
});

export default router;
