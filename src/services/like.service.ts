import {
  articleLikeRepository,
  articleUnlikeRepository,
  productLikeRepository,
  productUnlikeRepository,
} from '../repositories/like.repository';

export const productLikeService = async (userId: string, productId: string) => {
  return await productLikeRepository(userId, productId);
};

export const productUnlikeService = async (userId: string, productId: string) => {
  return await productUnlikeRepository(userId, productId);
};

export const articleLikeService = async (userId: string, articleId: string) => {
  return await articleLikeRepository(userId, articleId);
};

export const articleUnlikeService = async (userId: string, articleId: string) => {
  return await articleUnlikeRepository(userId, articleId);
};
