import prisma from '../config/prisma';

export const findUserById = async (id: string) => {
  return await prisma.user.findUnique({
    where: {
      id,
    },
  });
};

export const findUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
};

export const createUser = async (email: string, nickname: string, hashedPassword: string) => {
  return await prisma.user.create({
    data: {
      email,
      nickname,
      encryptedPassword: hashedPassword,
    },
  });
};

export const findUserByRefreshToken = async (refreshToken: string) => {
  return prisma.user.findFirst({
    where: { refreshToken },
    select: {
      id: true,
      nickname: true,
      refreshToken: true,
    },
  });
};

export const updateRefreshToken = async (userId: string, refreshToken: string) => {
  return prisma.user.update({
    where: { id: userId },
    data: { refreshToken },
    select: {
      id: true,
      nickname: true,
      refreshToken: true,
    },
  });
};
