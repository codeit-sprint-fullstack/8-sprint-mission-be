import * as commentRepository from "../repositories/commentRepository.js";

/**
 * 게시글 댓글 목록 조회
 */
export const getArticleComments = async (articleId) => {
  const comments = await commentRepository.findArticleComments(articleId);
  return comments;
};

/**
 * 게시글 댓글 생성
 */
export const createArticleComment = async ({ articleId, content, userId }) => {
  const newComment = await commentRepository.createComment({
    articleId,
    content,
    userId,
  });
  return newComment;
};

/**
 * 게시글 댓글 수정
 */
export const updateArticleComment = async ({
  commentId,
  articleId,
  content,
}) => {
  // 댓글 존재 여부 및 게시글 일치 확인
  const existingComment = await commentRepository.findCommentById(commentId);
  if (!existingComment) {
    throw new Error("댓글을 찾을 수 없습니다.");
  }
  if (existingComment.articleId !== articleId) {
    throw new Error("해당 게시글의 댓글이 아닙니다.");
  }

  const updatedComment = await commentRepository.updateComment(commentId, {
    content,
  });
  return updatedComment;
};

/**
 * 게시글 댓글 삭제
 */
export const deleteArticleComment = async ({ commentId, articleId }) => {
  // 댓글 존재 여부 및 게시글 일치 확인
  const existingComment = await commentRepository.findCommentById(commentId);
  if (!existingComment) {
    throw new Error("댓글을 찾을 수 없습니다.");
  }
  if (existingComment.articleId !== articleId) {
    throw new Error("해당 게시글의 댓글이 아닙니다.");
  }

  await commentRepository.deleteComment(commentId);
};

/**
 * 상품 댓글 목록 조회
 */
export const getProductComments = async (productId) => {
  const comments = await commentRepository.findProductComments(productId);
  return comments;
};

/**
 * 상품 댓글 생성
 */
export const createProductComment = async ({ productId, content, userId }) => {
  const newComment = await commentRepository.createComment({
    productId,
    content,
    userId,
  });
  return newComment;
};

/**
 * 상품 댓글 수정
 */
export const updateProductComment = async ({
  commentId,
  productId,
  content,
}) => {
  // 댓글 존재 여부 및 상품 일치 확인
  const existingComment = await commentRepository.findCommentById(commentId);
  if (!existingComment) {
    throw new Error("댓글을 찾을 수 없습니다.");
  }
  if (existingComment.productId !== productId) {
    throw new Error("해당 상품의 댓글이 아닙니다.");
  }

  const updatedComment = await commentRepository.updateComment(commentId, {
    content,
  });
  return updatedComment;
};

/**
 * 상품 댓글 삭제
 */
export const deleteProductComment = async ({ commentId, productId }) => {
  // 댓글 존재 여부 및 상품 일치 확인
  const existingComment = await commentRepository.findCommentById(commentId);
  if (!existingComment) {
    throw new Error("댓글을 찾을 수 없습니다.");
  }
  if (existingComment.productId !== productId) {
    throw new Error("해당 상품의 댓글이 아닙니다.");
  }

  await commentRepository.deleteComment(commentId);
};
