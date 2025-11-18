// 라이브러리 로드
import { create } from 'superstruct';
import express, { Request, Response } from 'express';

// 유틸리티 로드
import { AuthN } from '../utils/auth/AuthN';
import { AuthTokenManager } from '../utils/auth/AuthTokenManager';
import { asyncErrorHandler } from './utils/asyncErrorHandler';

// Structs 로드
import { CreateArticleRequestStruct } from '../utils/structs/article/CreateArticleRequestStruct';
import { UpdateArticleRequestStruct } from '../utils/structs/article/UpdateArticleRequestStruct';
import { GetArticleListRequestStruct } from '../utils/structs/article/GetArticleListRequestStruct';
import { CreateCommentRequestStruct } from '../utils/structs/comment/CreateCommentRequestStruct';
import { GetCommentListRequestStruct } from '../utils/structs/comment/GetCommentListRequestStruct';

// 핸들러 로드
import { CreateArticleHandler } from '../service/article/CreateArticleHandler';
import { GetArticleHandler } from '../service/article/GetArticleHandler';
import { UpdateArticleHandler } from '../service/article/UpdateArticleHandler';
import { DeleteArticleHandler } from '../service/article/DeleteArticleHandler';
import { GetArticleListHandler } from '../service/article/GetArticleListHandler';
import { CreateArticleCommentHandler } from '../service/article/CreateArticleCommentHandler';
import { GetArticleCommentListHandler } from '../service/article/GetArticleCommentListHandler';
import { CreateArticleLikeHandler } from '../service/article/CreateArticleLikeHandler';
import { DeleteArticleLikeHandler } from '../service/article/DeleteArticleLikeHandler';

export const ArticleRouter = express.Router();

// 게시글 등록 api
ArticleRouter.post(
    '/',
    AuthN(),
    asyncErrorHandler(async (req: Request, res: Response): Promise<void> => {
        const requester = AuthTokenManager.getRequesterFromToken(req.headers.authorization as string);

        /**
         * [API 요청 유효성 검사]
         *
         * assert 메서드는 유효성 검사만 시도하는데 비해,
         * create 메서드는 데이터를 전처리하고, 유효성 검사를 같이 시도합니다.
         *
         * 전처리를 하는 이유는 아래와 같이 다양합니다.
         * - 기본값을 설정하기 위해              @see GetArticleListRequestStruct
         * - 데이터를 변환하기 위해
         *     1. 문자열 앞뒤에 있는 공백 제거    @see CreateArticleRequestStruct
         *     2. 문자열로 이루어진 숫자 -> 숫자  @see GetArticleListRequestStruct
         *     ...
         */
        const { title, content, image } = create(req.body, CreateArticleRequestStruct);

        const articleView = await CreateArticleHandler.handle(requester, {
            title,
            content,
            image,
        });

        res.status(201).send(articleView);
    }),
);

// 게시글 조회 api
ArticleRouter.get(
    '/:articleId',
    asyncErrorHandler(async (req: Request, res: Response): Promise<void> => {
        const requester = AuthTokenManager.getRequesterFromTokenOrDefault(
            req.headers.authorization as string,
        );

        const articleId = Number(req.params.articleId);

        const articleView = await GetArticleHandler.handle(requester, {
            articleId,
        });

        res.status(201).send(articleView);
    }),
);

// 게시글 수정 api
ArticleRouter.patch(
    '/:articleId',
    AuthN(),
    asyncErrorHandler(async (req: Request, res: Response): Promise<void> => {
        const requester = AuthTokenManager.getRequesterFromToken(req.headers.authorization as string);

        const { articleId } = req.params;
        const { title, content, image } = create(req.body, UpdateArticleRequestStruct);

        const articleView = await UpdateArticleHandler.handle(requester, {
            articleId: Number(articleId),
            title,
            content,
            image,
        });

        res.status(201).send(articleView);
    }),
);

// 게시글 삭제 api
ArticleRouter.delete(
    '/:articleId',
    AuthN(),
    asyncErrorHandler(async (req: Request, res: Response): Promise<void> => {
        const requester = AuthTokenManager.getRequesterFromToken(req.headers.authorization as string);

        const { articleId } = req.params;

        await DeleteArticleHandler.handle(requester, {
            articleId: Number(articleId),
        });

        res.status(204).send();
    }),
);

// 게시글 목록 조회 api
ArticleRouter.get(
    '/',
    asyncErrorHandler(async (req: Request, res: Response): Promise<void> => {
        const requester = AuthTokenManager.getRequesterFromTokenOrDefault(
            req.headers.authorization as string,
        );

        const { cursor, limit, orderBy, keyword } = create(req.query, GetArticleListRequestStruct);

        const articleListView = await GetArticleListHandler.handle(requester, {
            cursor,
            limit,
            orderBy,
            keyword,
        });

        res.send(articleListView);
    }),
);

// 게시글 댓글 등록 api
ArticleRouter.post(
    '/:articleId/comments',
    AuthN(),
    asyncErrorHandler(async (req: Request, res: Response): Promise<void> => {
        const requester = AuthTokenManager.getRequesterFromToken(req.headers.authorization as string);

        const { articleId } = req.params;
        const { content } = create(req.body, CreateCommentRequestStruct);

        const articleCommentView = await CreateArticleCommentHandler.handle(requester, {
            articleId: Number(articleId),
            content,
        });

        res.status(201).send(articleCommentView);
    }),
);

// 게시글 댓글 목록 조회 api
ArticleRouter.get(
    '/:articleId/comments',
    asyncErrorHandler(async (req: Request, res: Response): Promise<void> => {
        const { articleId } = req.params;
        const { cursor, take } = create(req.query, GetCommentListRequestStruct);

        const articleCommentListView = await GetArticleCommentListHandler.handle({
            articleId: Number(articleId),
            cursor,
            take,
        });

        res.send(articleCommentListView);
    }),
);

// 게시글 좋아요 API
ArticleRouter.post(
    '/:articleId/like',
    AuthN(),
    asyncErrorHandler(async (req: Request, res: Response): Promise<any> => {
        const requester = AuthTokenManager.getRequesterFromToken(req.headers.authorization as string);

        const articleId = Number(req.params.articleId);

        const articleView = await CreateArticleLikeHandler.handle(requester, {
            articleId,
        });

        res.status(201).send(articleView);
    }),
);

// 게시글 좋아요 취소 API
ArticleRouter.delete(
    '/:articleId/like',
    AuthN(),
    asyncErrorHandler(async (req: Request, res: Response): Promise<any> => {
        const requester = AuthTokenManager.getRequesterFromToken(req.headers.authorization as string);

        const articleId = Number(req.params.articleId);

        const articleView = await DeleteArticleLikeHandler.handle(requester, {
            articleId,
        });

        res.status(201).send(articleView);
    }),
);
