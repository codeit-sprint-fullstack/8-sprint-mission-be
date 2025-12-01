import prisma from '../../config/db.js';
import authRepo from '../auth/auth.repository.js';

/* === 상품 댓글 api  === (조회, 생성) */
export async function getProductCommentList(req, res) {
  const productId = req.params.id;
  const { pageSize = 10, lastId = '', orderBy = 'recent', keyword = '' } = req.query;

  const limit = parseInt(pageSize);

  //cursor 방식 페이지네이션
  const comments = await prisma.comment.findMany({
    where: { productId },
    skip: lastId ? 1 : 0, //cursor 항목 제외
    take: parseInt(limit),
    ...(lastId && { cursor: { id: lastId } }), //lastId를 쿼리로 받으면 커서 사용.

    //댓글에는 아직 favoriteCount가 없지만 일단 구현했습니다.(쿼리로 전달하지 말아주세요)
    orderBy: orderBy == 'recent' ? { createdAt: 'desc' } : { favoriteCount: 'desc' },
  });
  res.json(comments);
}

export async function getProductComment(req, res) {
  const { productId, id } = req.params;
  const comments = await prisma.comment.findMany({
    where: {
      productId,
      id,
    },
    orderBy: { createdAt: 'desc' },
  });
  res.json(comments);
}

export async function createProductComment(req, res) {
  const userId = req.auth?.userId;
  const user = await authRepo.findById(userId);

  const productId = req.params.id;
  const { content } = req.body;

  const comment = await prisma.comment.create({
    data: {
      content,
      userName: user.name,
      user: { connect: { id: user.id } },
      product: {
        connect: { id: productId },
      },
    },
  });
  res.status(201).json(comment);
}

/* === 게시글 댓글 api === (조회, 생성) */
export async function getArticleCommentList(req, res) {
  const articleId = req.params.id;
  const { pageSize = 10, lastId = '', orderBy = 'recent', keyword = '' } = req.query;

  const limit = parseInt(pageSize);

  //cursor 방식 페이지네이션
  const comments = await prisma.comment.findMany({
    where: { articleId },
    skip: lastId ? 1 : 0, //cursor 항목 제외
    take: limit,
    ...(lastId && { cursor: { id: lastId } }), //lastId를 쿼리로 받으면 커서 사용.

    orderBy: orderBy == 'recent' ? { createdAt: 'desc' } : { favoriteCount: 'desc' },
  });
  res.json(comments);
}

export async function getArticleComment(req, res) {
  const { articleId, id } = req.params;
  const comments = await prisma.comment.findMany({
    where: {
      articleId,
      id,
    },
    orderBy: { createdAt: 'desc' },
  });
  res.json(comments);
}

export async function createArticleComment(req, res) {
  const userId = req.auth?.userId;
  const user = await authRepo.findById(userId);

  const articleId = req.params.id;
  const { content } = req.body;

  const comment = await prisma.comment.create({
    data: {
      content,
      userName: user.name,
      user: { connect: { id: user.id } },
      article: {
        connect: { id: articleId },
      },
    },
  });
  res.status(201).json(comment);
}

/* === 공통 댓글 api (삭제, 수정)=== */
export async function updateComment(req, res) {
  const id = req.params.id;
  const { content } = req.body;

  const updated = await prisma.comment.update({
    where: { id },
    data: { content },
  });
  res.json(updated);
}

export async function deleteComment(req, res) {
  const { id } = req.params;
  await prisma.comment.delete({
    where: { id },
  });
  res.sendStatus(204);
}
