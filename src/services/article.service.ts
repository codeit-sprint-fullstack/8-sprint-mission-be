import { ArticleWhereInput } from '../generated/models';
import { ArticleOrderByWithRelationInput } from '../types/Article';
import {
  getArticleByIdRepository,
  updateArticleRepository,
  getAllArticlesRepository,
  getArticlesCountRepository,
  deleteArticleRepository,
} from '../repositories/article.repository';
import { getMyLikeArticleRepository } from '../repositories/like.repository';
import AppError from '../utils/AppError';
import HTTP_STATUS from '../constants/http.constant';
import { ArticleSchema } from '../validators/article.validator';

export const getAllArticlesService = async (
  page: number,
  limit: number,
  searchQuery: string,
  sort: string,
) => {
  const currentPage = Math.max(1, page);

  const whereCondition: ArticleWhereInput = searchQuery
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

  const orderBy: ArticleOrderByWithRelationInput =
    sort === 'recent' ? { createdAt: 'desc' } : { likeCount: 'desc' };

  const articles = await getAllArticlesRepository(page, limit, whereCondition, orderBy);
  const totalCount = await getArticlesCountRepository(whereCondition);
  const totalPages = Math.ceil(totalCount / limit);
  const hasNextPage = currentPage < totalPages;
  const hasPreviousPage = currentPage > 1;

  return {
    articles,
    currentPage,
    currentLimit: limit,
    totalCount,
    totalPages,
    hasNextPage,
    hasPreviousPage,
  };
};

export const getArticleByIdService = async (id: string, ownerId: string) => {
  const article = await getArticleByIdRepository(id);
  if (!article) {
    throw new AppError('존재하지 않는 게시글입니다.', HTTP_STATUS.NOT_FOUND);
  }

  const getMyLikeArticle = await getMyLikeArticleRepository(ownerId, id);
  const isLiked = !!getMyLikeArticle;

  return {
    ...article,
    isLiked,
  };
};

type UpdateArticleServiceParams = Partial<ArticleSchema> & { id: string };

export const updateArticleService = async ({
  title = '',
  content = '',
  id,
}: UpdateArticleServiceParams) => {
  return await updateArticleRepository(id, title, content);
};

export const deleteArticleService = async (id: string) => {
  return await deleteArticleRepository(id);
};
