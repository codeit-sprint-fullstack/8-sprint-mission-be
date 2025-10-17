import prisma from '../middlewares/prisma.js';

export const createUser = async (user) => {
  return await prisma.user.create({ data: user });
};

export const findUserByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

export const findUserById = async (id) => {
  return await prisma.user.findUnique({
    where: { id },
  });
};

export const updateUserRefreshToken = async (userId, refreshToken) => {
  return await prisma.user.update({
    where: { id: userId },
    data: { refreshToken },
  });
};
