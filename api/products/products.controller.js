import prisma from '../../config/db.js';
import authRepo from '../auth/auth.repository.js';

export async function getProductList(req, res) {
  const { page = 1, pageSize = 10, orderBy = 'newest', keyword = '' } = req.query;

  const limit = parseInt(pageSize);
  const offset = (parseInt(page) - 1) * limit;

  const products = await prisma.product.findMany({
    where: {
      // 검색 쿼리
      OR: [{ name: { contains: keyword } }, { description: { contains: keyword } }],
    },
    orderBy: orderBy == 'recent' ? { createdAt: 'desc' } : { favoriteCount: 'desc' },
    skip: parseInt(offset),
    take: parseInt(limit),
  });
  res.json(products);
}

export async function getProduct(req, res) {
  const { id } = req.params;
  const product = await prisma.product.findUnique({
    where: { id },
  });
  res.json(product);
}

//새로 등록 할 때만 유저 정보가 필요합니다.
export async function createProduct(req, res) {
  const userId = req.auth?.userId;
  const user = await authRepo.findById(userId);

  const product = await prisma.product.create({
    data: {
      ...req.body,
      user: { connect: { id: userId } },
      userName: user.name,
    },
  });

  res.status(201).json(product);
}

export async function updateProduct(req, res) {
  const { id } = req.params;

  const product = await prisma.product.update({
    where: { id },
    data: {
      ...req.body,
    },
  });

  res.json(product);
}

export async function deleteProduct(req, res) {
  const { id } = req.params;
  await prisma.product.delete({
    where: { id },
  });
  res.sendStatus(204);
}

//소유권 검사 미들웨어
export async function checkOwner(req, res, next) {
  try {
    const { id } = req.params;
    const userId = req.auth?.userId;
    const product = await prisma.product.findUnique({
      where: { id },
    });
    if (product.userId !== userId) {
      const error = new Error('user is not owner');
      error.code = 403;
      throw error;
    }
  } catch (err) {
    next(err);
  } finally {
    next();
  }
}

export async function addFavorite(req, res) {
  const { id } = req.params;
  const product = await prisma.product.update({
    where: { id },
    data: { favoriteCount: { increment: 1 } },
  });

  res.json({ favoriteCount: product.favoriteCount });
}
