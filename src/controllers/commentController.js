import prisma from "../config/database.js";

// 댓글 목록 조회
// const getComment = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const { cursor, limit = 10 } = req.query;
//     const take = Number(limit) + 1;

//     const comments = await prisma.comment.findMany({
//       where: { id },
//       take,
//       skip: cursor ? 1 : 0,
//       cursor: cursor ? { id: cursor } : undefined,
//       orderBy: { createdAt: "desc" },
//       select: {
//         id: true,
//         content: true,
//         createdAt: true,
//       },
//     });

//     const hasNext = comments.length > limit;
//     if (hasNext) comments.pop();
//     const nextCursor = hasNext ? comments[comments.length - 1]?.id : null;

//     res.status(200).json({
//       comments,
//       nextCursor,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // 댓글 등록
// const createComment = async (req, res, next) => {
//   try {
//     const { content } = req.body;

//     const newComment = await prisma.comment.create({
//       data: { content },
//     });
//     res.status(201).json(newComment);
//   } catch (error) {
//     next(error);
//   }
// };

// // 댓글 수정
// const updateComment = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const { content } = req.body;

//     const updatedComment = await prisma.comment.update({
//       where: { id },
//       data: { content },
//     });
//     res.status(200).json(updatedComment);
//   } catch (error) {
//     next(error);
//   }
// };

// // 댓글 삭제
// const deleteComment = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     await prisma.comment.delete({ where: { id } });
//     res.status(204).send();
//   } catch (error) {
//     next(error);
//   }
// };

// 자유게시판 댓글 등록
const createArticleComment = async (req, res, next) => {
  try {
    const { articleId } = req.params;
    const { content } = req.body;

    const newComment = await prisma.comment.create({
      data: {
        articleId,
        content,
      },
    });
    res.status(201).json(newComment);
  } catch (error) {
    next(error);
  }
};

// 자유게시판 댓글 목록 조회
const getArticleComments = async (req, res, next) => {
  try {
    const { articleId } = req.params;

    const comments = await prisma.comment.findMany({
      where: { articleId },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        content: true,
        createdAt: true,
      },
    });

    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};

// 댓글 수정
const updateArticleComment = async (req, res, next) => {
  try {
    const { articleId, commentId } = req.params;
    const { content } = req.body;

    const updatedComment = await prisma.comment.update({
      where: { id: commentId },
      data: { articleId, content },
    });
    res.status(200).json(updatedComment);
  } catch (error) {
    next(error);
  }
};

// 댓글 삭제
const deleteArticleComment = async (req, res, next) => {
  try {
    const { articleId, commentId } = req.params;
    await prisma.comment.delete({ where: { id: commentId } });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

// 중고마켓 댓글 목록 조회
const getProductComments = async (req, res, next) => {
  try {
    const { productId } = req.params;

    const comments = await prisma.comment.findMany({
      where: { productId },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        content: true,
        createdAt: true,
      },
    });

    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};

// 중고마켓 댓글 등록
const createProductComment = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { content } = req.body;

    const newComment = await prisma.comment.create({
      data: {
        productId,
        content,
      },
    });
    res.status(201).json(newComment);
  } catch (error) {
    next(error);
  }
};

// 중고마켓 댓글 수정
const updateProductComment = async (req, res, next) => {
  try {
    const { productId, commentId } = req.params;
    const { content } = req.body;

    // 댓글 존재 여부 확인
    const existingComment = await prisma.comment.findUnique({
      where: { id: commentId },
      select: { id: true, productId: true },
    });

    if (!existingComment || existingComment.productId !== productId) {
      return res.status(404).json({ message: "댓글을 찾을 수 없습니다." });
    }

    const updatedComment = await prisma.comment.update({
      where: { id: commentId },
      data: { content },
      select: {
        id: true,
        content: true,
        createdAt: true,
      },
    });

    res.status(200).json(updatedComment);
  } catch (error) {
    next(error);
  }
};

// 중고마켓 댓글 삭제
const deleteProductComment = async (req, res, next) => {
  try {
    const { productId, commentId } = req.params;

    // 댓글 존재 여부 확인
    const existingComment = await prisma.comment.findUnique({
      where: { id: commentId },
      select: { id: true, productId: true },
    });

    if (!existingComment || existingComment.productId !== productId) {
      return res.status(404).json({ message: "댓글을 찾을 수 없습니다." });
    }

    await prisma.comment.delete({ where: { id: commentId } });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

const commentController = {
  // createComment,
  // getComment,
  // updateComment,
  // deleteComment,

  getArticleComments,
  createArticleComment,
  updateArticleComment,
  deleteArticleComment,

  getProductComments,
  createProductComment,
  updateProductComment,
  deleteProductComment,
};

export default commentController;
