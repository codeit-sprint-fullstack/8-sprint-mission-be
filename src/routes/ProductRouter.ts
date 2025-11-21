// 라이브러리 로드
import express, {Request, Response} from 'express';
import { create } from 'superstruct';

// 유틸리티 로드
import { asyncErrorHandler } from './utils/asyncErrorHandler.js';

// 인증 로드
import { AuthTokenManager } from '../utils/auth/AuthTokenManager';
import { AuthN } from '../utils/auth/AuthN';

// Structs 로드
import { CreateProductRequestStruct } from '../utils/structs/product/CreateProductRequestStruct';
import { UpdateProductRequestStruct } from '../utils/structs/product/UpdateProductRequestStruct';
import { GetProductListRequestStruct } from '../utils/structs/product/GetProductListRequestStruct';
import { CreateCommentRequestStruct } from '../utils/structs/comment/CreateCommentRequestStruct';
import { GetCommentListRequestStruct } from '../utils/structs/comment/GetCommentListRequestStruct';

// 핸들러 로드
import { CreateProductHandler } from '../service/product/CreateProductHandler';
import { GetProductHandler } from '../service/product/GetProductHandler';
import { UpdateProductHandler } from '../service/product/UpdateProductHandler';
import { DeleteProductHandler } from '../service/product/DeleteProductHandler';
import { GetProductListHandler } from '../service/product/GetProductListHandler';
import { CreateProductCommentHandler } from '../service/product/CreateProductCommentHandler';
import { GetProductCommentListHandler } from '../service/product/GetProductCommentListHandler';
import { CreateProductLikeHandler } from '../service/product/CreateProductLikeHandler';
import { DeleteProductLikeHandler } from '../service/product/DeleteProductLikeHandler';

export const ProductRouter = express.Router();

// 상품 등록 api
ProductRouter.post(
    '/',
    AuthN(),
    asyncErrorHandler(async (req: Request, res: Response): Promise<void> => {
        const requester = AuthTokenManager.getRequesterFromToken(req.headers.authorization as string);

        const { name, description, price, tags, images } = create(
            req.body,
            CreateProductRequestStruct,
        );

        const productView = await CreateProductHandler.handle(requester, {
            name,
            description,
            price,
            tags,
            images,
        });

        res.status(201).send(productView);
    }),
);

// 상품 조회 api
ProductRouter.get(
    '/:productId',
    asyncErrorHandler(async (req: Request, res: Response): Promise<void> => {
        const requester = AuthTokenManager.getRequesterFromTokenOrDefault(
            req.headers.authorization as string,
        );

        const { productId } = req.params;

        const productView = await GetProductHandler.handle(requester, {
            productId: Number(productId),
        });

        res.send(productView);
    }),
);

// 상품 수정 api
ProductRouter.patch(
    '/:productId',
    AuthN(),
    asyncErrorHandler(async (req: Request, res: Response): Promise<void> => {
        const requester = AuthTokenManager.getRequesterFromToken(req.headers.authorization as string);

        const { productId } = req.params;
        const { name, description, price, tags, images } = create(
            req.body,
            UpdateProductRequestStruct,
        );

        if(!name || !description || price === undefined || !tags || !images) {
            throw new Error('Invalid input data');
        }

        const productView = await UpdateProductHandler.handle(requester, {
            productId: Number(productId),
            name,
            description,
            price,
            tags,
            images,
        });

        res.send(productView);
    }),
);

// 상품 삭제 api
ProductRouter.delete(
    '/:productId',
    AuthN(),
    asyncErrorHandler(async (req: Request, res: Response): Promise<void> => {
        const requester = AuthTokenManager.getRequesterFromToken(req.headers.authorization as string);

        const { productId } = req.params;

        await DeleteProductHandler.handle(requester, {
            productId: Number(productId),
        });

        res.status(204).send();
    }),
);

// 상품 목록 조회 api
ProductRouter.get(
    '/',
    asyncErrorHandler(async (req: Request, res: Response): Promise<void> => {
        const requester = AuthTokenManager.getRequesterFromTokenOrDefault(
            req.headers.authorization as string,
        );

        const { page, pageSize, orderBy, keyword } = create(req.query, GetProductListRequestStruct);

        const productListView = await GetProductListHandler.handle(requester, {
            page,
            pageSize,
            orderBy,
            keyword,
        });

        res.send(productListView);
    }),
);

// 상품 댓글 등록 api
ProductRouter.post(
    '/:productId/comments',
    AuthN(),
    asyncErrorHandler(async (req: Request, res: Response): Promise<void> => {
        const requester = AuthTokenManager.getRequesterFromToken(req.headers.authorization as string);

        const { productId } = req.params;
        const { content } = create(req.body, CreateCommentRequestStruct);

        const productCommentView = await CreateProductCommentHandler.handle(requester, {
            productId: Number(productId),
            content,
        });

        res.status(201).send(productCommentView);
    }),
);

// 상품 댓글 목록 조회 api
ProductRouter.get(
    '/:productId/comments',
    asyncErrorHandler(async (req: Request, res: Response): Promise<void> => {
        const { productId } = req.params;
        const { cursor, take } = create(req.query, GetCommentListRequestStruct);

        const productCommentListView = await GetProductCommentListHandler.handle({
            productId: Number(productId),
            cursor,
            limit: take,
        });

        res.send(productCommentListView);
    }),
);

// 상품 좋아요 API
ProductRouter.post(
    '/:productId/favorite',
    AuthN(),
    asyncErrorHandler(async (req: Request, res: Response): Promise<void> => {
        const requester = AuthTokenManager.getRequesterFromToken(req.headers.authorization as string);

        const productId = Number(req.params.productId);

        const productView = await CreateProductLikeHandler.handle(requester, {
            productId,
        });

        res.status(201).send(productView);
    }),
);

// 상품 좋아요 취소 API
ProductRouter.delete(
    '/:productId/favorite',
    AuthN(),
    asyncErrorHandler(async (req: Request, res: Response): Promise<void> => {
        const requester = AuthTokenManager.getRequesterFromToken(req.headers.authorization as string);

        const productId = Number(req.params.productId);

        const productView = await DeleteProductLikeHandler.handle(requester, {
            productId,
        });

        res.status(201).send(productView);
    }),
);
