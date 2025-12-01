import {
  createUser,
  findUserByEmail,
  findUserByRefreshToken,
  updateRefreshToken,
} from '../repositories/auth.repository';
import AppError from '../utils/AppError';
import argon2 from 'argon2';
import { generateTokens } from '../utils/token';
import { filterSensitiveData } from '../utils/filter';
import HTTP_STATUS from '../constants/http.constant';

export const signupService = async (email: string, nickname: string, password: string) => {
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw new AppError('이미 존재하는 이메일입니다.', HTTP_STATUS.CONFLICT);
  }

  const hashedPassword = await argon2.hash(password);

  const user = await createUser(email, nickname, hashedPassword);

  const { accessToken, refreshToken } = await generateTokens({ userId: user.id });

  return {
    user: filterSensitiveData(user),
    accessToken,
    refreshToken,
  };
};

export const signinService = async (email: string, password: string) => {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new AppError('존재하지 않는 이메일입니다.', HTTP_STATUS.NOT_FOUND);
  }

  const isValidPassword = await argon2.verify(user.encryptedPassword, password);

  if (!isValidPassword) {
    throw new AppError('비밀번호가 일치하지 않습니다.', HTTP_STATUS.UNAUTHORIZED);
  }

  const { accessToken, refreshToken } = await generateTokens({ userId: user.id });

  return {
    user: filterSensitiveData(user),
    accessToken,
    refreshToken,
  };
};

export const logoutService = async (refreshToken: string) => {
  const user = await findUserByRefreshToken(refreshToken);
  if (!user) {
    throw new AppError('Refresh token is invalid', HTTP_STATUS.UNAUTHORIZED);
  }

  await updateRefreshToken(user.id, refreshToken);

  return {
    message: '로그아웃이 완료되었습니다.',
  };
};
