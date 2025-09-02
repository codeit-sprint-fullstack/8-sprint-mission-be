import prisma from '../prisma/prismaClient.js';
import express from 'express';
import isUUID from 'is-uuid';

const router = express.Router();

// 게시글 등록
router.post('/', async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) return res.status(400).json({ message: 'title, content required' });
  const article = await prisma.article.create({ data: { title, content } });
  res.status(201).json(article);
});

// 게시글 단건 조회
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  if (!isUUID.v4(id)) return res.status(400).json({ message: 'Invalid id format.' });
  const article = await prisma.article.findUnique({
    where: { id },
    select: { id: true, title: true, content: true, createdAt: true },
  });
  if (!article) return res.status(404).json({ message: 'Not found' });
  res.json(article);
});

// 게시글 수정
router.patch('/:id', async (req, res) => {
  const id = req.params.id;
  if (!isUUID.v4(id)) return res.status(400).json({ message: 'Invalid id format.' });
  const { title, content } = req.body;
  try {
    const article = await prisma.article.update({
      where: { id },
      data: { title, content },
    });
    res.json(article);
  } catch {
    res.status(404).json({ message: 'Not found' });
  }
});

// 게시글 삭제
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  if (!isUUID.v4(id)) return res.status(400).json({ message: 'Invalid id format.' });
  try {
    await prisma.article.delete({ where: { id } });
    res.sendStatus(204);
  } catch {
    res.status(404).json({ message: 'Not found' });
  }
});

// 게시글 목록 조회 (검색, 최신순, offset 페이지네이션)
router.get('/', async (req, res) => {
  const { page = 1, limit = 10, search = '', sort = 'recent' } = req.query;
  const skip = (Number(page) - 1) * Number(limit);
  const orderBy = sort === 'recent' ? { createdAt: 'desc' } : { id: 'asc' };
  const where = search
    ? {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { content: { contains: search, mode: 'insensitive' } },
        ],
      }
    : {};
  const [total, articles] = await Promise.all([
    prisma.article.count({ where }),
    prisma.article.findMany({
      where,
      orderBy,
      skip,
      take: Number(limit),
      select: { id: true, title: true, content: true, createdAt: true },
    }),
  ]);
  res.json({ total, articles });
});

export default router;
