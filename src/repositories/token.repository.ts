import prisma from '../config/prisma';
import AppError from '../utils/AppError';
import HTTP_STATUS from '../constants/http.constant';

export const saveRefreshToken = async (userId: string, refreshToken: string) => {
  return await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      refreshToken,
    },
    select: {
      id: true,
      refreshToken: true,
    },
  });
};

export const findUserByRefreshToken = async (refreshToken: string) => {
  if (!refreshToken || refreshToken.trimEnd() === '') {
    throw new AppError('Refresh token is required', HTTP_STATUS.UNAUTHORIZED);
  }

  return await prisma.user.findFirst({
    where: { refreshToken },
    select: {
      id: true,
      email: true,
      nickname: true,
      refreshToken: true,
    },
  });
};
