import prisma from "../config/database.js";

const getArticles = async (req, res, next) => {
  try {
    const {
      page = 1,
      pageSize = 10,
      orderBy = "recent",
      keyword = "",
    } = req.query;
    const skip = (page - 1) * pageSize;
    const take = Number(pageSize);

    // Prisma 정렬 옵션 설정
    const sortOption =
      orderBy === "recent"
        ? { createdAt: "desc" }
        : orderBy === "like"
        ? { likes: "desc" }
        : { createdAt: "asc" };

    // 검색 조건 설정
    const searchQuery = keyword
      ? {
          OR: [
            { title: { contains: keyword } },
            { content: { contains: keyword } },
          ],
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
        likes: true,
        author: true,
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

const getBestArticles = async (req, res, next) => {
  try {
    const bestArticles = await prisma.article.findMany({
      orderBy: {
        likes: "desc",
      },
      take: 3,
      select: {
        id: true,
        title: true,
        content: true,
        likes: true,
        author: true,
        createdAt: true,
      },
    });
    res.status(200).json(bestArticles);
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
        likes: true,
        author: true,
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
    const { title, content, author } = req.body;

    // 필수 필드 검증
    if (!title || !content) {
      return res.status(400).json({
        message: "제목과 내용은 필수 입력 항목입니다.",
      });
    }

    const newArticle = await prisma.article.create({
      data: {
        title,
        content,
        author: author || "익명",
        likes: 0,
      },
      select: {
        id: true,
        title: true,
        content: true,
        likes: true,
        author: true,
        createdAt: true,
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
    const { title, content, author } = req.body;

    // 게시글 존재 여부 확인
    const existingArticle = await prisma.article.findUnique({
      where: { id },
    });

    if (!existingArticle) {
      return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
    }

    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (content !== undefined) updateData.content = content;
    if (author !== undefined) updateData.author = author;

    // 수정할 데이터가 없는 경우
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        message: "수정할 데이터가 없습니다.",
      });
    }

    const updatedArticle = await prisma.article.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        title: true,
        content: true,
        likes: true,
        author: true,
        createdAt: true,
        updatedAt: true,
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

    // 게시글 존재 여부 확인
    const existingArticle = await prisma.article.findUnique({
      where: { id },
    });

    if (!existingArticle) {
      return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
    }

    await prisma.article.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

const articleController = {
  getArticles,
  getBestArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
};

export default articleController;
