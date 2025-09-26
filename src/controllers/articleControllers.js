import prisma from '../lib/prisma.js';

export const createArticle = async (req, res, next) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ success: false, message: 'Title and content are required' });
    }

    const article = await prisma.article.create({
      data: { title, content },
      select: { id: true, title: true, content: true, like: true, createdAt: true },
    });

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

    const articles = await prisma.article.findMany({
      where: whereCondition,
      select: { id: true, title: true, content: true, like: true, createdAt: true },
      skip: offset,
      take: limit,
      orderBy,
    });

    const totalCount = await prisma.article.count({
      where: whereCondition,
    });

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
    const article = await prisma.article.findUnique({
      where: { id },
      select: { id: true, title: true, content: true, like: true, createdAt: true },
    });

    if (!article) {
      return res.status(404).json({ success: false, message: 'Article not found' });
    }

    res.status(200).json({ success: true, data: article });
  } catch (error) {
    next(error);
  }
};

export const updateArticle = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    if (!id) {
      return res.status(400).json({ success: false, message: 'Id is required' });
    }

    const article = await prisma.article.update({
      where: { id },
      data: { title, content },
      select: { id: true, title: true, content: true, like: true, createdAt: true },
    });
    res.status(200).json({ success: true, data: article });
  } catch (error) {
    next(error);
  }
};

export const deleteArticle = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ success: false, message: 'Id is required' });
    }

    await prisma.article.delete({ where: { id } });
    res.status(200).json({ success: true, data: null });
  } catch (error) {
    next(error);
  }
};
