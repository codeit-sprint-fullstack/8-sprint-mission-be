import * as articleRepository from "../repositories/articleRepository.js";

export const getArticles = async ({
  page,
  pageSize,
  orderBy,
  keyword,
  isBest = false,
}) => {
  if (isBest === true) {
    const bestArticles = await articleRepository.findBestArticles();
    return {
      articles: bestArticles,
      totalCount: bestArticles.length,
    };
  }

  const skip = (page - 1) * pageSize;
  const take = Number(pageSize);

  const sortOption =
    orderBy === "recent"
      ? { createdAt: "desc" }
      : orderBy === "like"
      ? { likeCount: "desc" }
      : { createdAt: "asc" };

  const searchQuery = keyword
    ? {
        OR: [
          { title: { contains: keyword } },
          { content: { contains: keyword } },
        ],
      }
    : {};

  const totalCount = await articleRepository.countArticles(searchQuery);
  const articles = await articleRepository.findAllArticles({
    where: searchQuery,
    skip,
    take,
    orderBy: sortOption,
    select: {
      id: true,
      title: true,
      content: true,
      likeCount: true,
      createdAt: true,
      updatedAt: true,
      user: {
        select: {
          id: true,
          nickname: true,
          image: true,
        },
      },
    },
  });

  return {
    articles,
    totalCount,
  };
};

export const getArticleById = async (id) => {
  const article = await articleRepository.findArticleById(id);
  return article;
};

export const createArticle = async (article) => {
  const newArticle = await articleRepository.createArticle(article);
  return newArticle;
};

export const updateArticle = async (id, article) => {
  const updatedArticle = await articleRepository.updateArticle(id, article);
  return updatedArticle;
};

export const deleteArticle = async (id) => {
  const deletedArticle = await articleRepository.deleteArticle(id);
  return deletedArticle;
};
