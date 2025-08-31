const prisma = require('../db/prisma');

exports.create = async (req, res, next) => {
  try {
    const { title } = req.body;
    if (!title) return res.status(400).json({ message: 'title is required' });
    const product = await prisma.product.create({ data: { title } });
    return res.status(201).json({ id: product.id });
  } catch (e) { next(e); }
};

exports.getById = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const product = await prisma.product.findUnique({
      where: { id },
      select: { id: true, title: true, createdAt: true },
    });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    return res.json(product);
  } catch (e) { next(e); }
};

exports.list = async (req, res, next) => {
  try {
    const items = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
      select: { id: true, title: true, createdAt: true },
    });
    return res.json({ items });
  } catch (e) { next(e); }
};

exports.remove = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const exists = await prisma.product.findUnique({ where: { id } });
    if (!exists) return res.status(404).json({ message: 'Product not found' });

    await prisma.product.delete({ where: { id } });
    return res.status(204).send();
  } catch (e) { next(e); }
};