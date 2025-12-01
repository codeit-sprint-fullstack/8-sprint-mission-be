import jwt from 'jsonwebtoken';
import 'dotenv/config';
import AppError from './AppError';
import { saveRefreshToken } from '../repositories/token.repository';

const JWT_SECRET = process.env.JWT_SECRET;

export const generateTokens = async (payload: { userId: string }) => {
  if (!JWT_SECRET) {
    throw new AppError('JWT_SECRET is not set', 500);
  }

  const accessToken = jwt.sign(
    {
      userId: payload.userId,
    },
    JWT_SECRET,
    {
      expiresIn: '1d',
    },
  );

  const refreshToken = jwt.sign(
    {
      userId: payload.userId,
    },
    JWT_SECRET,
    {
      expiresIn: '7d',
    },
  );

  await saveRefreshToken(payload.userId, refreshToken);

  return { accessToken, refreshToken };
};
