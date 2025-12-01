import { Response } from 'express';
import { articleRepository } from '../repositories/articleRepository.js';
import { AuthenticatedRequest } from '../types/express.js';
import { 
  CreateArticleInput, 
  UpdateArticleInput, 
  ArticleQuery 
} from '../schemas/index.js';

export const articleController = {
  // 게시글 등록
  async createArticle(req: AuthenticatedRequest<CreateArticleInput>, res: Response): Promise<void> {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ message: 'Authentication required' });
      return;
    }

    const { title, content } = req.body;
    const article = await articleRepository.create({ writerId: userId, title, content });
    res.status(201).json(article);
  },

  // 게시글 단건 조회 (댓글, 좋아요 상태 포함)
  async getArticleById(req: AuthenticatedRequest<unknown, unknown, { id: string }>, res: Response): Promise<void> {
    const { id } = req.params;
    const userId = req.user?.userId;

    const article = await articleRepository.findByIdWithDetails(id, userId);

    if (!article) {
      res.status(404).json({ message: 'Not found' });
      return;
    }

    res.json(article);
  },

  // 게시글 수정
  async updateArticle(req: AuthenticatedRequest<UpdateArticleInput, unknown, { id: string }>, res: Response): Promise<void> {
    const { id } = req.params;
    const { title, content } = req.body;

    const article = await articleRepository.update(id, { title, content });
    res.json(article);
  },

  // 게시글 삭제
  async deleteArticle(req: AuthenticatedRequest<unknown, unknown, { id: string }>, res: Response): Promise<void> {
    const { id } = req.params;
    await articleRepository.delete(id);
    res.sendStatus(204);
  },

  // 게시글 목록 조회 (좋아요 상태 포함)
  async getArticles(req: AuthenticatedRequest<unknown, ArticleQuery, unknown>, res: Response): Promise<void> {
    const { page = 1, limit = 10, search = '', orderBy = 'recent' } = req.query;
    const userId = req.user?.userId;
    
    // 쿼리 파라미터를 숫자로 변환
    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;

    let order;
    if (orderBy === 'favorite') {
      order = { favoriteCount: 'desc' as const };
    } else {
      order = { createdAt: 'desc' as const };
    }

    const where = search
      ? {
          OR: [
            { title: { contains: search, mode: 'insensitive' as const } },
            { content: { contains: search, mode: 'insensitive' as const } },
          ],
        }
      : {};

    const [total, articles] = await Promise.all([
      articleRepository.count(where),
      articleRepository.findManyWithLikes({
        where,
        orderBy: order,
        skip,
        take: limitNum,
        userId,
      }),
    ]);

    res.json({ total, articles });
  },
};
