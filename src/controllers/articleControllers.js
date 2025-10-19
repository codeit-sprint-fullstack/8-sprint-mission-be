import * as articleRepository from '../repositories/articleRepository.js';

export const createArticle = async (req, res, next) => {
  try {
    const { title, content } = req.body;

    const article = await articleRepository.createArticle(title, content);

    res.status(201).json({ success: true, data: article });
  } catch (error) {
    next(error);
  }
};

export const getArticle = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const searchQuery = req.query.q;
    const sort = req.query.sort;

    const validPage = Math.max(1, page);

    const offset = (validPage - 1) * limit;

    // 검색 조건 구성
    const whereCondition = searchQuery
      ? {
          OR: [
            {
              title: {
                contains: searchQuery,
                mode: 'insensitive',
              },
            },
            {
              content: {
                contains: searchQuery,
                mode: 'insensitive',
              },
            },
          ],
        }
      : {};

    let orderBy = { createdAt: 'desc' };

    if (sort === 'recent') orderBy = { createdAt: 'desc' };
    if (sort === 'like') orderBy = { like: 'desc' };

    const articles = await articleRepository.getArticles(whereCondition, orderBy, offset, limit);

    const totalCount = await articleRepository.getArticleCount(whereCondition);

    const totalPages = Math.ceil(totalCount / limit);
    const hasNextPage = validPage < totalPages;
    const hasPrevPage = validPage > 1;

    res.status(200).json({
      success: true,
      data: articles,
      orderBy,
      pagination: {
        currentPage: validPage,
        totalPages,
        totalCount,
        limit,
        hasNextPage,
        hasPrevPage,
      },
      search: {
        query: searchQuery || null,
        hasSearch: !!searchQuery,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getArticleById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const me = req.user;

    const article = await articleRepository.getArticleById(id);
    if (!article) {
      return res.status(404).json({ success: false, message: 'Article not found' });
    }

    const myLike = await articleRepository.getMyLike(me.id, id);
    const isLiked = Boolean(myLike);
    const likeCount = article.likeCount;

    const response = {
      id: article.id,
      title: article.title,
      content: article.content,
      isLiked,
      likeCount,
      createdAt: article.createdAt,
      updatedAt: article.updatedAt,
    };

    res.status(200).json({ success: true, data: response });
  } catch (error) {
    next(error);
  }
};

export const updateArticle = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const article = await articleRepository.updateArticle(id, title, content);
    res.status(200).json({ success: true, data: article });
  } catch (error) {
    next(error);
  }
};

export const deleteArticle = async (req, res, next) => {
  try {
    const { id } = req.params;

    await articleRepository.deleteArticle(id);
    res.status(200).json({ success: true, data: null });
  } catch (error) {
    next(error);
  }
};
