import { articleFavoriteRepository } from '../repositories/articleFavoriteRepository.js';
import { articleRepository } from '../repositories/articleRepository.js';

export const articleFavoriteController = {
  // 좋아요 토글 (favoriteState 기반)
  async toggleFavorite(req, res) {
    const { id: articleId } = req.params;
    const userId = req.user.id;

    // 게시글 존재 확인
    const article = await articleRepository.findById(articleId);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    // upsert로 favoriteState 토글
    const { isLiked } = await articleFavoriteRepository.toggle({
      userId,
      articleId,
    });

    // 업데이트된 게시글 정보 조회
    const updatedArticle = await articleRepository.findById(articleId);

    res.status(200).json({
      message: isLiked
        ? 'Article liked successfully'
        : 'Article unliked successfully',
      isLiked,
      favoriteCount: updatedArticle.favoriteCount,
    });
  },
};
