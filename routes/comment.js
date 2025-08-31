import prisma from '../prisma/prismaClient.js';
import express from 'express';
import isUUID from 'is-uuid';

const router = express.Router();

// 자유게시판 댓글 등록
router.post('/article/:articleId', async (req, res) => {
  const { content } = req.body;
  const articleId = req.params.articleId;
  if (!content) return res.status(400).json({ message: 'content required' });
  if (!isUUID.v4(articleId)) return res.status(400).json({ message: 'Invalid id format.' });
  try {
    const comment = await prisma.comment.create({
      data: { content, articleId },
    });
    res.status(201).json(comment);
  } catch {
    res.status(404).json({ message: 'Article not found' });
  }
});

// 중고마켓 댓글 등록
router.post('/product/:productId', async (req, res) => {
  const { content } = req.body;
  const productId = req.params.productId;
  if (!content) return res.status(400).json({ message: 'content required' });
  if (!isUUID.v4(productId)) return res.status(400).json({ message: 'Invalid id format.' });
  try {
    const comment = await prisma.comment.create({
      data: { content, productId },
    });
    res.status(201).json(comment);
  } catch {
    res.status(404).json({ message: 'Product not found' });
  }
});

// 댓글 수정 (PATCH)
router.patch('/:id', async (req, res) => {
  const id = req.params.id;
  if (!isUUID.v4(id)) return res.status(400).json({ message: 'Invalid id format.' });
  const { content } = req.body;
  try {
    const comment = await prisma.comment.update({
      where: { id },
      data: { content },
    });
    res.json(comment);
  } catch {
    res.status(404).json({ message: 'Not found' });
  }
});

// 댓글 삭제
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  if (!isUUID.v4(id)) return res.status(400).json({ message: 'Invalid id format.' });
  try {
    await prisma.comment.delete({ where: { id } });
    res.sendStatus(204);
  } catch {
    res.status(404).json({ message: 'Not found' });
  }
});

// 자유게시판 댓글 목록 (cursor 방식)
router.get('/article/:articleId', async (req, res) => {
  const articleId = req.params.articleId;
  if (!isUUID.v4(articleId)) return res.status(400).json({ message: 'Invalid id format.' });
  const { cursor, limit = 10 } = req.query;
  const take = Number(limit);
  const where = { articleId };
  const comments = await prisma.comment.findMany({
    where,
    orderBy: { id: 'asc' },
    ...(cursor ? { skip: 1, cursor: { id: String(cursor) } } : {}),
    take,
    select: { id: true, content: true, createdAt: true },
  });
  res.json(comments);
});

// 중고마켓 댓글 목록 (cursor 방식)
router.get('/product/:productId', async (req, res) => {
  const productId = req.params.productId;
  if (!isUUID.v4(productId)) return res.status(400).json({ message: 'Invalid id format.' });
  const { cursor, limit = 10 } = req.query;
  const take = Number(limit);
  const where = { productId };
  const comments = await prisma.comment.findMany({
    where,
    orderBy: { id: 'asc' },
    ...(cursor ? { skip: 1, cursor: { id: String(cursor) } } : {}),
    take,
    select: { id: true, content: true, createdAt: true },
  });
  res.json(comments);
});

export default router;
