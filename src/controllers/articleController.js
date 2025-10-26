import * as articleService from "../services/articleService.js";

const getArticles = async (req, res, next) => {
  try {
    const {
      page = 1,
      pageSize = 10,
      orderBy = "recent",
      keyword = "",
      isBest = false,
    } = req.query;
    const { articles, totalCount } = await articleService.getArticles({
      page,
      pageSize,
      orderBy,
      keyword,
      isBest,
    });
    res.status(200).json({
      articles,
      totalCount,
    });
  } catch (error) {
    next(error);
  }
};

const getArticleById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user?.userId; // 인증된 사용자가 있으면 userId 전달
    const article = await articleService.getArticleById(id, userId);
    res.status(200).json(article);
  } catch (error) {
    next(error);
  }
};

const createArticle = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const userId = req.user.userId;
    const newArticle = await articleService.createArticle({
      title,
      content,
      userId,
    });
    res.status(201).json(newArticle);
  } catch (error) {
    next(error);
  }
};

const updateArticle = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const updatedArticle = await articleService.updateArticle(id, {
      title,
      content,
    });
    res.status(200).json(updatedArticle);
  } catch (error) {
    next(error);
  }
};

const deleteArticle = async (req, res, next) => {
  try {
    const { id } = req.params;
    await articleService.deleteArticle(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

const articleController = {
  getArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
};

export default articleController;
