import { prisma } from "../config/prisma.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";

// 게시글 목록 조회
export const getArticles = asyncHandler(async (req, res) => {
  const { order = "newest", cursor, limit = 10 } = req.query;
  const orderBy =
    order === "oldest" ? { createdAt: "asc" } : { createdAt: "desc" };

  const articles = await prisma.article.findMany({
    orderBy,
    take: parseInt(limit),
    ...(cursor ? { skip: 1, cursor: { id: cursor } } : {}),
    include: {
      user: { select: { id: true, nickname: true, image: true } },
      likes: true,
    },
  });

  res.json(articles);
});

// 게시글 상세 조회
export const getArticleById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user?.id;

  const article = await prisma.article.findUnique({
    where: { id },
    include: {
      user: { select: { id: true, nickname: true, image: true } },
      comments: true,
      likes: true,
    },
  });

  if (!article)
    return res.status(404).json({ message: "게시글을 찾을 수 없습니다" });

  const isLiked = userId
    ? !!(await prisma.articleLike.findFirst({
        where: { articleId: id, userId },
      }))
    : false;

  res.json({ ...article, isLiked });
});

// 게시글 등록
export const createArticle = asyncHandler(async (req, res) => {
  const { title, content, image } = req.body;

  const article = await prisma.article.create({
    data: {
      title,
      content,
      image,
      userId: req.user.id,
      isDeleted: false,
    },
  });

  res.status(201).json({ message: "게시글 등록 완료", article });
});

// 게시글 수정
export const updateArticle = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, content, image } = req.body;

  const exist = await prisma.article.findUnique({ where: { id } });
  if (!exist)
    return res.status(404).json({ message: "존재하지 않는 게시글입니다." });

  const updated = await prisma.article.update({
    where: { id },
    data: { title, content, image },
  });

  res.json({ message: "게시글 수정 완료", article: updated });
});

// 게시글 삭제
export const deleteArticle = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const exist = await prisma.article.findUnique({ where: { id } });
  if (!exist)
    return res.status(404).json({ message: "존재하지 않는 게시글입니다." });

  await prisma.article.delete({ where: { id } });
  res.status(204).end();
});
