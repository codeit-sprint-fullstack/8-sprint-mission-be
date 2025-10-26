import * as likeService from "../services/likeService.js";

/**
 * 게시글 좋아요 토글
 */
const toggleArticleLike = async (req, res, next) => {
  try {
    const { articleId } = req.params;
    const userId = req.user.userId; // authenticate 미들웨어에서 설정

    const result = await likeService.toggleArticleLike(userId, articleId);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * 상품 좋아요 토글
 */
const toggleProductLike = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const userId = req.user.userId; // authenticate 미들웨어에서 설정

    const result = await likeService.toggleProductLike(userId, productId);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const likeController = {
  toggleArticleLike,
  toggleProductLike,
};

export default likeController;
