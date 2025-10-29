import * as commentService from "../services/commentService.js";

// 자유게시판 댓글 목록 조회
const getArticleComments = async (req, res, next) => {
  try {
    const { articleId } = req.params;
    const comments = await commentService.getArticleComments(articleId);
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};

// 자유게시판 댓글 등록
const createArticleComment = async (req, res, next) => {
  try {
    const { articleId } = req.params;
    const { content } = req.body;
    const userId = req.user.userId;

    const newComment = await commentService.createArticleComment({
      articleId,
      content,
      userId,
    });
    res.status(201).json(newComment);
  } catch (error) {
    next(error);
  }
};

// 자유게시판 댓글 수정
const updateArticleComment = async (req, res, next) => {
  try {
    const { articleId, commentId } = req.params;
    const { content } = req.body;

    const updatedComment = await commentService.updateArticleComment({
      commentId,
      articleId,
      content,
    });
    res.status(200).json(updatedComment);
  } catch (error) {
    next(error);
  }
};

// 자유게시판 댓글 삭제
const deleteArticleComment = async (req, res, next) => {
  try {
    const { articleId, commentId } = req.params;

    await commentService.deleteArticleComment({
      commentId,
      articleId,
    });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

// 중고마켓 댓글 목록 조회
const getProductComments = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const comments = await commentService.getProductComments(productId);
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
    const userId = req.user.userId;

    const newComment = await commentService.createProductComment({
      productId,
      content,
      userId,
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
    const userId = req.user.userId;

    const updatedComment = await commentService.updateProductComment({
      commentId,
      productId,
      content,
      userId,
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

    await commentService.deleteProductComment({
      commentId,
      productId,
    });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

const commentController = {
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
