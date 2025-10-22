import { prisma } from "../utils/prisma.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";

// 댓글 목록 조회
export const getComments = asyncHandler(async (req, res) => {
  const { articleId, productId } = req.params;

  const where = articleId ? { articleId } : { productId };

  const comments = await prisma.comment.findMany({
    where,
    include: {
      user: { select: { id: true, nickname: true, image: true } },
    },
    orderBy: { createdAt: "desc" },
  });
  res.json({ comments });
});

// 댓글 작성
export const createComment = asyncHandler(async (req, res) => {
  const { content } = req.body;
  const { articleId, productId } = req.params;

  const comment = await prisma.comment.create({
    data: {
      content,
      userId: req.user.id,
      articleId: articleId ?? null,
      productId: productId ?? null,
    },
    include: {
      user: { select: { id: true, nickname: true, image: true } },
    },
  });
  res.status(201).json({ message: "댓글 작성 완료", comment });
});

// 댓글 수정
export const updateComment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  const exist = await prisma.comment.findUnique({ where: { id } });
  if (!exist)
    return res.status(404).json({ message: "존재하지 않는 댓글입니다." });

  const updated = await prisma.comment.update({
    where: { id },
    data: { content },
    include: {
      user: { select: { id: true, nickname: true, image: true } },
    },
  });

  res.json({ message: "댓글 수정 완료", comment: updated });
});

// 댓글 삭제
export const deleteComment = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const exist = await prisma.comment.findUnique({ where: { id } });
  if (!exist)
    return res.status(404).json({ message: "존재하지 않는 댓글입니다." });

  await prisma.comment.delete({ where: { id } });
  res.json({ message: "댓글이 삭제되었습니다" });
});
