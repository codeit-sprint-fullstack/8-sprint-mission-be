import * as likeRepository from "../repositories/likeRepository.js";

/**
 * 게시글 좋아요 토글
 * 좋아요가 있으면 삭제, 없으면 생성
 */
export const toggleArticleLike = async (userId, articleId) => {
  // 기존 좋아요 확인
  const existingLike = await likeRepository.findArticleLike(userId, articleId);

  if (existingLike) {
    // 좋아요 취소
    await likeRepository.deleteArticleLike(userId, articleId);
    return {
      isLiked: false,
      message: "좋아요가 취소되었습니다.",
    };
  } else {
    // 좋아요 추가
    await likeRepository.createArticleLike(userId, articleId);
    return {
      isLiked: true,
      message: "좋아요가 추가되었습니다.",
    };
  }
};

/**
 * 상품 좋아요 토글
 * 좋아요가 있으면 삭제, 없으면 생성
 */
export const toggleProductLike = async (userId, productId) => {
  // 기존 좋아요 확인
  const existingLike = await likeRepository.findProductLike(userId, productId);

  if (existingLike) {
    // 좋아요 취소
    await likeRepository.deleteProductLike(userId, productId);
    return {
      isLiked: false,
      message: "좋아요가 취소되었습니다.",
    };
  } else {
    // 좋아요 추가
    await likeRepository.createProductLike(userId, productId);
    return {
      isLiked: true,
      message: "좋아요가 추가되었습니다.",
    };
  }
};
