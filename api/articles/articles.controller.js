import prisma from '../../config/db.js';
import authRepo from '../auth/auth.repository.js';

export async function getArticleList(req, res) {
  const { page = 1, pageSize = 10, orderBy = 'recent', keyword = '' } = req.query;

  const limit = parseInt(pageSize);
  const offset = (parseInt(page) - 1) * limit;

  const articles = await prisma.article.findMany({
    where: {
      // 검색 쿼리
      OR: [{ title: { contains: keyword } }, { content: { contains: keyword } }],
    },
    orderBy: orderBy == 'recent' ? { createdAt: 'desc' } : { favoriteCount: 'desc' },
    skip: parseInt(offset),
    take: parseInt(limit),
  });
  res.json(articles);
}

export async function getArticle(req, res) {
  const { id } = req.params;
  const article = await prisma.article.findUnique({
    where: { id },
  });
  res.json(article);
}

//새로 등록 할 때만 유저 정보가 필요합니다.
export async function createArticle(req, res) {
  const userId = req.auth?.userId;
  const user = await authRepo.findById(userId);

  const article = await prisma.article.create({
    data: {
      ...req.body,
      userName: user.name,
      user: { connect: { id: user.id } },
    },
  });

  res.status(201).send(article);
}

export async function updateArticle(req, res) {
  const { id } = req.params;
  const article = await prisma.article.update({
    where: { id },
    data: req.body,
  });

  res.json(article);
}

export async function deleteArticle(req, res) {
  const { id } = req.params;
  await prisma.article.delete({
    where: { id },
  });
  res.sendStatus(204);
}

//소유권 검사 미들웨어
export async function checkOwner(req, res, next) {
  try {
    const { id } = req.params;
    const userId = req.auth?.userId;
    const product = await prisma.article.findUnique({
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
