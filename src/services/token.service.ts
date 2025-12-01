import HTTP_STATUS from '../constants/http.constant';
import AppError from '../utils/AppError';
import { findUserByRefreshToken } from '../repositories/token.repository';
import jwt from 'jsonwebtoken';
import { generateTokens } from '../utils/token';

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not set');
}

export const refreshAccessTokenService = async (refreshToken: string) => {
  if (!refreshToken) {
    throw new AppError('RefreshToken이 유효하지 않습니다.', HTTP_STATUS.UNAUTHORIZED);
  }

  const user = await findUserByRefreshToken(refreshToken);
  if (!user) {
    throw new AppError('RefreshToken이 유효하지 않습니다.', HTTP_STATUS.UNAUTHORIZED);
  }

  try {
    jwt.verify(refreshToken, JWT_SECRET);
  } catch (error) {
    throw new AppError('RefreshToken이 유효하지 않습니다.', HTTP_STATUS.UNAUTHORIZED);
  }

  const { accessToken: newAccessToken, refreshToken: newRefreshToken } = await generateTokens({
    userId: user.id,
  });

  return {
    user: {
      id: user.id,
      nickname: user.nickname,
    },
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
};
