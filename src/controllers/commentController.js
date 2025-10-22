import { prisma } from "../utils/prisma.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";

// 댓글 작성
export const createComment = asyncHandler(async (req, res) => {
  const { content } = req.body;
  const { productId } = req.params;

  const comment = await prisma.comment.create({
    data: {
      content,
      productId: parseInt(productId),
      userId: req.user.id,
    },
  });
  res.status(201).json({ message: "댓글 작성 완료", comment });
});

// 댓글 목록 조회
export const getComments = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const comments = await prisma.comment.findMany({
    where: { productId: parseInt(productId) },
    include: { user: true },
  });
  res.json({ comments });
});

// 댓글 삭제
export const deleteComment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await prisma.comment.delete({ where: { id: parseInt(id) } });
  res.json({ message: "댓글이 삭제되었습니다" });
});
