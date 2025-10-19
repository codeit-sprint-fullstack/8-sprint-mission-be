import dayjs from 'dayjs';
import { hashPassword } from '../utils/hash.js';
import {
  createUser,
  findUserByEmail,
  findUserById,
  updateUserRefreshToken,
} from '../repositories/userRepository.js';
import { verifyUser } from '../services/authService.js';
import { createAccessToken, createRefreshToken } from '../utils/token.js';
import { filterSensitiveUserData } from '../utils/filter.js';
import { verifyToken } from '../middlewares/auth.js';

export const signup = async (req, res, next) => {
  try {
    const { email, nickname, password } = req.body;

    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      const error = new Error('Email already exists');
      error.status = 409;
      throw error;
    }

    const hashedPassword = await hashPassword(password);

    const user = await createUser({
      email,
      nickname,
      image: '',
      encryptedPassword: hashedPassword,
    });

    const payloadUser = filterSensitiveUserData(user);

    res.status(201).json({ success: true, data: payloadUser });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await verifyUser(email, password);

    const accessToken = createAccessToken(user.id);
    const refreshToken = createRefreshToken(user.id);

    await updateUserRefreshToken(user.id, refreshToken);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/auth/refresh',
    });

    const payloadUser = filterSensitiveUserData(user);

    res.status(200).json({
      success: true,
      data: { user: payloadUser, accessToken },
    });
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      const error = new Error('Unauthorized');
      error.status = 401;
      throw error;
    }

    const decoded = verifyToken(refreshToken);

    const user = await findUserById(decoded.userId);
    if (!user || user.refreshToken !== refreshToken) {
      const error = new Error('Unauthorized');
      error.status = 401;
      throw error;
    }

    const newAccessToken = createAccessToken(user.id);

    const now = dayjs();
    const expiresAt = dayjs.unix(decoded.exp);
    const remainingSeconds = expiresAt.diff(now, 'seconds');

    if (remainingSeconds <= 3) {
      const newRefreshToken = createRefreshToken(user.id);
      await updateUserRefreshToken(user.id, newRefreshToken);

      res.cookie('refreshToken', newRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        path: '/auth/refresh',
      });
    }

    res.status(200).json({
      success: true,
      data: { accessToken: newAccessToken },
    });
  } catch (error) {
    next(error);
  }
};
