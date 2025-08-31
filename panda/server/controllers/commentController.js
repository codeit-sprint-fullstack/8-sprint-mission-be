const prisma = require('../db/prisma');

exports.createForArticle = async (req, res, next) => {
  try {
    const articleId = Number(req.params.articleId);
    const { content } = req.body;
    if (!content) return res.status(400).json({ message: 'content is required' });

    const article = await prisma.article.findUnique({ where: { id: articleId } });
    if (!article) return res.status(404).json({ message: 'Article not found' });

    const c = await prisma.comment.create({ data: { content, articleId } });
    return res.status(201).json({ id: c.id });
  } catch (e) { next(e); }
};

exports.listForArticle = async (req, res, next) => {
  try {
    const articleId = Number(req.params.articleId);
    const limit = Math.min(Math.max(Number(req.query.limit ?? 10), 1), 50);
    const cursor = req.query.cursor ? Number(req.query.cursor) : null;

    const exists = await prisma.article.findUnique({ where: { id: articleId }, select: { id: true } });
    if (!exists) return res.status(404).json({ message: 'Article not found' });

    const items = await prisma.comment.findMany({
      where: { articleId },
      take: limit,
      ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
      orderBy: { id: 'desc' },
      select: { id: true, content: true, createdAt: true },
    });

    const nextCursor = items.length === limit ? items[items.length - 1].id : null;
    return res.json({ items, nextCursor });
  } catch (e) { next(e); }
};

exports.createForProduct = async (req, res, next) => {
  try {
    const productId = Number(req.params.productId);
    const { content } = req.body;
    if (!content) return res.status(400).json({ message: 'content is required' });

    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const c = await prisma.comment.create({ data: { content, productId } });
    return res.status(201).json({ id: c.id });
  } catch (e) { next(e); }
};

exports.listForProduct = async (req, res, next) => {
  try {
    const productId = Number(req.params.productId);
    const limit = Math.min(Math.max(Number(req.query.limit ?? 10), 1), 50);
    const cursor = req.query.cursor ? Number(req.query.cursor) : null;

    const exists = await prisma.product.findUnique({ where: { id: productId }, select: { id: true } });
    if (!exists) return res.status(404).json({ message: 'Product not found' });

    const items = await prisma.comment.findMany({
      where: { productId },
      take: limit,
      ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
      orderBy: { id: 'desc' },
      select: { id: true, content: true, createdAt: true },
    });

    const nextCursor = items.length === limit ? items[items.length - 1].id : null;
    return res.json({ items, nextCursor });
  } catch (e) { next(e); }
};

exports.patch = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const { content } = req.body;
    if (content === undefined) return res.status(400).json({ message: 'content is required' });

    const exists = await prisma.comment.findUnique({ where: { id } });
    if (!exists) return res.status(404).json({ message: 'Comment not found' });

    const updated = await prisma.comment.update({
      where: { id },
      data: { content },
      select: { id: true, content: true, createdAt: true, updatedAt: true },
    });
    return res.json(updated);
  } catch (e) { next(e); }
};

exports.remove = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const exists = await prisma.comment.findUnique({ where: { id } });
    if (!exists) return res.status(404).json({ message: 'Comment not found' });

    await prisma.comment.delete({ where: { id } });
    return res.status(204).send();
  } catch (e) { next(e); }
};