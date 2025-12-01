import asyncHandler from 'express-async-handler';
import AppError from '../utils/AppError';
import HTTP_STATUS from '../constants/http.constant';
import { refreshAccessTokenService } from '../services/token.service';
import COOKIE_OPTIONS from '../config/cookie';
import { Request, Response } from 'express';

export const refreshAccessTokenController = asyncHandler(async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    throw new AppError('Refresh token is required', HTTP_STATUS.UNAUTHORIZED);
  }

  const {
    user,
    accessToken,
    refreshToken: newRefreshToken,
  } = await refreshAccessTokenService(refreshToken);

  res.cookie('refreshToken', newRefreshToken, COOKIE_OPTIONS);

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: 'AccessToken이 갱신되었습니다.',
    data: {
      user,
      accessToken,
      refreshToken: newRefreshToken,
    },
  });
});
