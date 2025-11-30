// 라이브러리 로드
import express, {Request, Response} from 'express';
import { create } from 'superstruct';

// 유틸리티 로드
import { asyncErrorHandler } from './utils/asyncErrorHandler.js';

// 인증 미들웨어 로드
import { AuthN } from '../utils/auth/AuthN';
import { AuthTokenManager } from '../utils/auth/AuthTokenManager';

// Structs 로드
import { UpdateProfileRequestStruct } from '../utils/structs/user/UpdateProfileRequestStruct';
import { UpdatePasswordRequestStruct } from '../utils/structs/user/UpdatePasswordRequestStruct';
import { GetMyProductListRequestStruct } from '../utils/structs/user/GetMyProductListRequestStruct';
import { GetMyFavoritesProductListRequestStruct } from '../utils/structs/user/GetMyFavoritesProductListRequestStruct';

// 핸들러 로드
import { GetUserProfileHandler } from '../service/user/GetUserProfileHandler';
import { UpdateUserProfileHandler } from '../service/user/UpdateUserProfileHandler';
import { UpdateUserPasswordHandler } from '../service/user/UpdateUserPasswordHandler';
import { GetUserProductListHandler } from '../service/user/GetUserProductListHandler';
import { GetUserFavoriteListHandler } from '../service/user/GetUserFavoriteListHandler';

export const UserRouter = express.Router();

// 내 정보 조회하기 api
UserRouter.get(
    '/me',
    AuthN(),
    asyncErrorHandler(async (req: Request, res: Response): Promise<void> => {
        const requester = AuthTokenManager.getRequesterFromToken(req.headers.authorization as string);

        const userView = await GetUserProfileHandler.handle(requester);

        res.send(userView);
    }),
);

// 내 정보 수정하기 api
UserRouter.patch(
    '/me',
    AuthN(),
    asyncErrorHandler(async (req: Request, res: Response): Promise<void> => {
        const requester = AuthTokenManager.getRequesterFromToken(req.headers.authorization as string);

        const { image } = create(req.body, UpdateProfileRequestStruct);

        if(!image) {
            throw new Error('Image is required');
        }

        const userView = await UpdateUserProfileHandler.handle(requester, {
            image,
        });

        res.send(userView);
    }),
);

// 내 패스워드 수정하기 api
UserRouter.patch(
    '/me/password',
    AuthN(),
    asyncErrorHandler(async (req: Request, res: Response): Promise<void> => {
        const requester = AuthTokenManager.getRequesterFromToken(req.headers.authorization as string);

        const { password, passwordConfirmation, currentPassword } = create(
            req.body,
            UpdatePasswordRequestStruct,
        );

        const userView = await UpdateUserPasswordHandler.handle(requester, {
            password,
            passwordConfirmation,
            currentPassword,
        });

        res.send(userView);
    }),
);

// 내가 등록한 상품 조회하기 api
UserRouter.get(
    '/me/products',
    AuthN(),
    asyncErrorHandler(async (req: Request, res: Response): Promise<void> => {
        const requester = AuthTokenManager.getRequesterFromToken(req.headers.authorization as string);

        const { page, pageSize, keyword } = create(req.query, GetMyProductListRequestStruct);

        const productListView = await GetUserProductListHandler.handle(requester, {
            page,
            pageSize,
            keyword,
        });

        res.send(productListView);
    }),
);

// 내가 좋아요한 상품 조회하기 api
UserRouter.get(
    '/me/favorites',
    AuthN(),
    asyncErrorHandler(async (req: Request, res: Response): Promise<void> => {
        const requester = AuthTokenManager.getRequesterFromToken(req.headers.authorization as string);

        const { page, pageSize, keyword } = create(
            req.query,
            GetMyFavoritesProductListRequestStruct,
        );

        const favoriteListView = await GetUserFavoriteListHandler.handle(requester, {
            page,
            pageSize,
            keyword,
        });

        res.send(favoriteListView);
    }),
);
