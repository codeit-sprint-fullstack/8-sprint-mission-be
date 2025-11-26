import { Request, RequestHandler, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { SigninSchemaType, SignupSchemaType } from '../validators/auth.validator';
import { signinService, signupService } from '../services/auth.service';
import HTTP_STATUS from '../constants/http.constant';
import COOKIE_OPTIONS from '../config/cookie';
import { findUserById } from '../repositories/auth.repository';
import { filterSensitiveData } from '../utils/filter';

export const signupController = asyncHandler(
  async (req: Request<{}, {}, Omit<SignupSchemaType, 'passwordConfirm'>>, res: Response) => {
    const { email, nickname, password } = req.body;
    const { user, accessToken, refreshToken } = await signupService(email, nickname, password);

    res.cookie('refreshToken', refreshToken, COOKIE_OPTIONS);

    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: '회원가입이 완료되었습니다.',
      data: {
        user,
        accessToken,
        refreshToken,
      },
    });
  },
);

export const signinController = asyncHandler(
  async (req: Request<{}, {}, SigninSchemaType>, res: Response) => {
    const { email, password } = req.body;

    const { user, accessToken, refreshToken } = await signinService(email, password);

    res.cookie('refreshToken', refreshToken, COOKIE_OPTIONS);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: '로그인이 완료되었습니다.',
      data: {
        user,
        accessToken,
        refreshToken,
      },
    });
  },
);

export const getMyInfoController = asyncHandler(async (req: Request, res: Response) => {
  if (!req.auth || !req.auth.userId) {
    res.status(HTTP_STATUS.UNAUTHORIZED).json({
      success: false,
      message: '인증되지 않은 접근입니다.',
    });
    return;
  }

  const { userId } = req.auth;

  const user = await findUserById(userId);

  if (!user) {
    res.status(HTTP_STATUS.NOT_FOUND).json({
      success: false,
      message: '존재하지 않는 사용자입니다.',
    });
    return;
  }

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: '사용자 정보를 조회했습니다.',
    data: {
      user: filterSensitiveData(user),
    },
  });
});
