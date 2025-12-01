import { ArticleWhereInput } from '../generated/models';
import { ArticleOrderByWithRelationInput } from '../types/Article';
import {
  getArticleByIdRepository,
  updateArticleRepository,
  getAllArticlesRepository,
  deleteArticleRepository,
} from '../repositories/article.repository';
import { getMyLikeArticleRepository } from '../repositories/like.repository';
import AppError from '../utils/AppError';
import HTTP_STATUS from '../constants/http.constant';
import { ArticleSchema } from '../validators/article.validator';

export const getAllArticlesService = async (
  cursor: string | undefined,
  limit: number,
  searchQuery: string,
  sort: string,
) => {
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

  // likeCount로 정렬할 때는 secondary sort로 createdAt을 추가하여 일관된 순서 보장
  // 같은 likeCount를 가진 게시글들도 일관된 순서로 정렬되어 중복 방지
  const orderBy: ArticleOrderByWithRelationInput | ArticleOrderByWithRelationInput[] =
    sort === 'recent' ? { createdAt: 'desc' } : [{ likeCount: 'desc' }, { createdAt: 'desc' }];

  const articles = await getAllArticlesRepository(cursor, limit, whereCondition, orderBy);

  // hasNextPage 확인: limit + 1개를 가져왔으므로, 실제로 limit보다 많으면 다음 페이지가 있음
  const hasNextPage = articles.length > limit;
  const resultArticles = hasNextPage ? articles.slice(0, limit) : articles;
  const nextCursor =
    hasNextPage && resultArticles.length > 0 ? resultArticles[resultArticles.length - 1].id : null;

  return {
    articles: resultArticles,
    nextCursor,
    hasNextPage,
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
