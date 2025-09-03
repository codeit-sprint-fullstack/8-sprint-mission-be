import prisma from "../config/database.js";

// 댓글 등록
const createComment = async (req, res, next) => {
  try {
    const { content } = req.body;

    const newComment = await prisma.comment.create({
      data: { content },
    });
    res.status(201).json(newComment);
  } catch (error) {
    next(error);
  }
};

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

// 댓글 수정
const updateComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    const updatedComment = await prisma.comment.update({
      where: { id },
      data: { content },
    });
    res.status(200).json(updatedComment);
  } catch (error) {
    next(error);
  }
};

// 댓글 삭제
const deleteComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.comment.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

// 댓글 목록 조회
const getComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { cursor, limit = 10 } = req.query;
    const take = Number(limit) + 1;

    const comments = await prisma.comment.findMany({
      where: { id },
      take,
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        content: true,
        createdAt: true,
      },
    });

    const hasNext = comments.length > limit;
    if (hasNext) comments.pop();
    const nextCursor = hasNext ? comments[comments.length - 1]?.id : null;

    res.status(200).json({
      comments,
      nextCursor,
    });
  } catch (error) {
    next(error);
  }
};

// 자유게시판 댓글 목록 조회
const getArticleComments = async (req, res, next) => {
  try {
    const { articleId } = req.params;
    const { cursor, limit = 10 } = req.query;
    const take = Number(limit) + 1;

    const comments = await prisma.comment.findMany({
      where: { articleId },
      take,
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        content: true,
        createdAt: true,
      },
    });

    const hasNext = comments.length > limit;
    if (hasNext) comments.pop();
    const nextCursor = hasNext ? comments[comments.length - 1]?.id : null;

    res.status(200).json({
      comments,
      nextCursor,
    });
  } catch (error) {
    next(error);
  }
};

// 중고마켓 댓글 목록 조회
const getProductComments = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { cursor, limit = 10 } = req.query;
    const take = Number(limit) + 1;

    const comments = await prisma.comment.findMany({
      where: { productId },
      take,
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        content: true,
        createdAt: true,
      },
    });

    const hasNext = comments.length > limit;
    if (hasNext) comments.pop();
    const nextCursor = hasNext ? comments[comments.length - 1]?.id : null;

    res.status(200).json({
      comments,
      nextCursor,
    });
  } catch (error) {
    next(error);
  }
};

const commentController = {
  createComment,
  getComment,
  createArticleComment,
  createProductComment,
  updateComment,
  deleteComment,
  getArticleComments,
  getProductComments,
};

export default commentController;
