import { articleRepository } from '../repositories/articleRepository.js';

export const articleController = {
  // 게시글 등록
  async createArticle(req, res) {
    const userId = req.user.id; // 인증된 사용자 ID
    const { title, content } = req.body;
    const article = await articleRepository.create({ userId, title, content });
    res.status(201).json(article);
  },

  // 게시글 단건 조회 (댓글, 좋아요 상태 포함)
  async getArticleById(req, res) {
    const { id } = req.params;
    const userId = req.user?.id;

    const article = await articleRepository.findByIdWithDetails(id, userId);

    if (!article) {
      return res.status(404).json({ message: 'Not found' });
    }

    res.json(article);
  },

  // 게시글 수정
  async updateArticle(req, res) {
    const { id } = req.params;
    const { title, content } = req.body;

    const article = await articleRepository.update(id, { title, content });
    res.json(article);
  },

  // 게시글 삭제
  async deleteArticle(req, res) {
    const { id } = req.params;
    await articleRepository.delete(id);
    res.sendStatus(204);
  },

  // 게시글 목록 조회 (좋아요 상태 포함)
  async getArticles(req, res) {
    const { page = 1, limit = 10, search = '', sort = 'recent' } = req.query;
    const userId = req.user?.id;
    const skip = (Number(page) - 1) * Number(limit);

    let orderBy;
    if (sort === 'favorite') {
      orderBy = { favoriteCount: 'desc' };
    } else {
      orderBy = { createdAt: 'desc' };
    }

    const where = search
      ? {
          OR: [
            { title: { contains: search, mode: 'insensitive' } },
            { content: { contains: search, mode: 'insensitive' } },
          ],
        }
      : {};

    const [total, articles] = await Promise.all([
      articleRepository.count(where),
      articleRepository.findManyWithLikes({
        where,
        orderBy,
        skip,
        take: Number(limit),
        userId,
      }),
    ]);

    res.json({ total, articles });
  },
};
