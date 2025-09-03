import prisma from "../config/database.js";

const getArticles = async (req, res, next) => {
  try {
    const { page = 1, pageSize = 10, orderBy = "recent", keyword = "" } = req.query;
    const skip = (page - 1) * pageSize;
    const take = Number(pageSize);

    // Prisma 정렬 옵션 설정
    const sortOption = orderBy === "recent" ? { createdAt: "desc" } : { createdAt: "asc" };

    // 검색 조건 설정
    const searchQuery = keyword
      ? {
          OR: [{ title: { contains: keyword } }, { content: { contains: keyword } }],
        }
      : {};

    const totalCount = await prisma.article.count({ where: searchQuery });
    const articles = await prisma.article.findMany({
      where: searchQuery,
      skip,
      take,
      orderBy: sortOption,
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
      },
    });

    res.status(200).json({
      articles,
      totalCount,
    });
  } catch (error) {
    next(error);
  }
};

// 특정 게시글 조회
const getArticleById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const article = await prisma.article.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
      },
    });

    if (!article) {
      return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
    }

    res.status(200).json(article);
  } catch (error) {
    next(error);
  }
};

// 게시글 생성
const createArticle = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const newArticle = await prisma.article.create({
      data: {
        title,
        content,
      },
    });
    res.status(201).json(newArticle);
  } catch (error) {
    next(error);
  }
};

// 게시글 수정
const updateArticle = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const updatedArticle = await prisma.article.update({
      where: { id },
      data: {
        title,
        content,
      },
    });
    res.status(200).json(updatedArticle);
  } catch (error) {
    next(error);
  }
};

// 게시글 삭제
const deleteArticle = async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.article.delete({ where: { id } });
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
