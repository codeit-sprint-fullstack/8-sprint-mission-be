import prisma from "../config/database.js";

/**
 * 댓글 목록 조회
 */
export const findComments = async (where) => {
  return await prisma.comment.findMany({
    where,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      content: true,
      createdAt: true,
      updatedAt: true,
      user: {
        select: {
          id: true,
          nickname: true,
          image: true,
        },
      },
    },
  });
};

/**
 * ID로 댓글 조회
 */
export const findCommentById = async (id) => {
  return await prisma.comment.findUnique({
    where: { id },
    select: {
      id: true,
      content: true,
      createdAt: true,
      updatedAt: true,
      userId: true,
      articleId: true,
      productId: true,
      user: {
        select: {
          id: true,
          nickname: true,
          image: true,
        },
      },
    },
  });
};

/**
 * 게시글 댓글 목록 조회
 * @params articleId
 * @returns {Promise<Comment[]>}
 */
export const findArticleComments = async (articleId) => {
  return await findComments({ articleId });
};

/**
 * 상품 댓글 목록 조회
 * @params productId
 * @returns {Promise<Comment[]>}
 */
export const findProductComments = async (productId) => {
  return await findComments({ productId });
};

/**
 * 댓글 생성
 * @params data
 * @returns {Promise<Comment>}
 */
export const createComment = async (data) => {
  return await prisma.comment.create({
    data,
    select: {
      id: true,
      content: true,
      createdAt: true,
      user: {
        select: {
          id: true,
          nickname: true,
          image: true,
        },
      },
    },
  });
};

/**
 * 댓글 업데이트
 * @params id
 * @params data
 * @returns {Promise<Comment>}
 */
export const updateComment = async (id, data) => {
  return await prisma.comment.update({
    where: { id },
    data,
    select: {
      id: true,
      content: true,
      createdAt: true,
      updatedAt: true,
      user: {
        select: {
          id: true,
          nickname: true,
          image: true,
        },
      },
    },
  });
};

/**
 * 댓글 삭제
 */
export const deleteComment = async (id) => {
  return await prisma.comment.delete({
    where: { id },
  });
};

/**
 * 댓글 소유자 ID 조회
 * @params id - 댓글 ID
 * @returns {Promise<string>} 댓글 작성자의 userId
 */
export const getCommentOwnerId = async (id) => {
  const comment = await prisma.comment.findUnique({
    where: { id },
    select: { userId: true },
  });

  if (!comment) {
    throw new Error("댓글을 찾을 수 없습니다.");
  }

  return comment.userId;
};
