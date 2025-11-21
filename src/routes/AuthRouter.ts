// 라이브러리 로드
import { create } from 'superstruct';
import express, { Request, Response } from 'express';

// 유틸리티 로드
import { asyncErrorHandler } from './utils/asyncErrorHandler.js';

// Structs 로드
import { SignUpRequestStruct } from '../utils/structs/auth/SignUpRequestStruct';
import { SignInRequestStruct } from '../utils/structs/auth/SignInRequestStruct';
import { RefreshTokenRequestStruct } from '../utils/structs/auth/RefreshTokenRequestStruct';

// 핸들러 로드
import { SignUpLocalUserHandler } from '../service/auth/SignUpLocalUserHandler';
import { SignInLocalUserHandler } from '../service/auth/SignInLocalUserHandler.js';
import { RefreshTokenHandler } from '../service/auth/RefreshTokenHandler.js';
import { AuthByGoogleHandler } from '../service/auth/AuthByGoogleHandler.js';
import { googleOAuthHelper } from '../utils/auth/GoogleOAuthAdapter';

export const AuthRouter = express.Router();

// 회원가입 api
AuthRouter.post(
    '/signUp',
    asyncErrorHandler(async (req: Request, res: Response): Promise<void> => {
        const { email, nickname, password, passwordConfirmation } = create(
            req.body,
            SignUpRequestStruct,
        );

        const userView = await SignUpLocalUserHandler.handle({
            email,
            nickname,
            password,
            passwordConfirmation,
        });

        res.status(201).send(userView);
    }),
);

// 로그인 api
AuthRouter.post(
    '/signIn',
    asyncErrorHandler(async (req: Request, res: Response): Promise<void> => {
        const { email, password } = create(req.body, SignInRequestStruct);

        const userView = await SignInLocalUserHandler.handle({
            email,
            password,
        });

        res.send(userView);
    }),
);

// 토큰 갱신 api
AuthRouter.post(
    '/refresh-token',
    asyncErrorHandler(async (req: Request, res: Response): Promise<void> => {
        const { refreshToken } = create(req.body, RefreshTokenRequestStruct);

        const accessTokenView = await RefreshTokenHandler.handle({
            refreshToken,
        });

        res.send(accessTokenView);
    }),
);

/** 
 * 구글 로그인 또는 회원가입을 시작하는 API
 * 
 * 워크 플로:
 * 웹 브라우저가 이 API로 GET 메서드와 함께 접속하면,
 * 1. 구글 consent screen (구글 로그인 페이지) 주소로 리다이렉트 시켜줍니다.
 * 2. 사용자가 구글에서 로그인을 마치면 아래의 `/google/callback`으로 리다이렉트되어 돌아옵니다.
 */
AuthRouter.get('/google', asyncErrorHandler(async (req: Request, res: Response): Promise<void> => {
    const redirectURI = googleOAuthHelper.generateAuthURI();
    res.status(302).redirect(redirectURI);
}));

/**
 * 구글 로그인 또는 회원가입
 * 
 * 워크 플로:
 * 1. 구글 consent screen에서 로그인을 완료하면 구글에서는 code 값을 쿼리 스트링으로 붙여 이 API로 리다이렉트 시켜준다.
 * 2. 사용자의 웹 브라우저는 code 값과 함께 이 API로 GET 요청을 보낸다.
 * 3. 백엔드 서버에서는 받은 code를 사용해 구글에서 사용자 데이터를 가져온다.
 * 4. 로그인 또는 회원가입 처리를 하고나서 Access Token 및 Refresh Token을 발급해서 쿼리 스트링으로 붙인 다음,
 * 5. 클라이언트 페이지로 다시 리다이렉트 시켜준다.
 * 6. Access Token과 Refresh Token을 받은 클라이언트 사이트에서는 이것을 사용해 로그인한다.
 */
AuthRouter.get(
    '/google/callback',
    asyncErrorHandler(async (req: Request, res: Response): Promise<void> => {
        const { code } = req.query;

        const { accessToken, refreshToken } = await AuthByGoogleHandler.handle({
            code,
        });

        const searchParams = new URLSearchParams({
            at: accessToken,
            rt: refreshToken,
        });

        res.status(302).redirect(`${process.env.CLIENT_REDIRECT_URI}/?${searchParams.toString()}`);
    }),
);
