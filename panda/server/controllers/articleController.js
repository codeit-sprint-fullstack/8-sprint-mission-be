const prisma = require('../db/prisma');

exports.create = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) return res.status(400).json({ message: 'title and content are required' });
    const article = await prisma.article.create({ data: { title, content } });
    return res.status(201).json({ id: article.id });
  } catch (e) { next(e); }
};

exports.getById = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const article = await prisma.article.findUnique({
      where: { id },
      select: { id: true, title: true, content: true, createdAt: true },
    });
    if (!article) return res.status(404).json({ message: 'Article not found' });
    return res.json(article);
  } catch (e) { next(e); }
};

exports.update = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const { title, content } = req.body;
    const exists = await prisma.article.findUnique({ where: { id } });
    if (!exists) return res.status(404).json({ message: 'Article not found' });

    const updated = await prisma.article.update({
      where: { id },
      data: {
        ...(title !== undefined ? { title } : {}),
        ...(content !== undefined ? { content } : {}),
      },
      select: { id: true, title: true, content: true, createdAt: true, updatedAt: true },
    });
    return res.json(updated);
  } catch (e) { next(e); }
};

exports.remove = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const exists = await prisma.article.findUnique({ where: { id } });
    if (!exists) return res.status(404).json({ message: 'Article not found' });

    await prisma.article.delete({ where: { id } });
    return res.status(204).send();
  } catch (e) { next(e); }
};

exports.list = async (req, res, next) => {
  try {
    const offset = Math.max(Number(req.query.offset ?? 0), 0);
    const limit = Math.min(Math.max(Number(req.query.limit ?? 10), 1), 50);
    const sort = String(req.query.sort ?? 'recent').toLowerCase();
    const q = String(req.query.q ?? '').trim();

    const where = q
      ? {
          OR: [
            { title: { contains: q, mode: 'insensitive' } },
            { content: { contains: q, mode: 'insensitive' } },
          ],
        }
      : {};

    const orderBy = sort === 'recent' ? { createdAt: 'desc' } : { createdAt: 'asc' };

    const [items, total] = await Promise.all([
      prisma.article.findMany({
        where,
        skip: offset,
        take: limit,
        orderBy,
        select: { id: true, title: true, content: true, createdAt: true },
      }),
      prisma.article.count({ where }),
    ]);

    return res.json({
      items, total, offset, limit,
      hasMore: offset + limit < total,
    });
  } catch (e) { next(e); }
};