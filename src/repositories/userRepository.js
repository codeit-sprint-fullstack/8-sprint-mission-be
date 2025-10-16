import prisma from '../middlewares/prisma.js';

export const createUser = async (user) => {
  return await prisma.user.create({ data: user });
};

export const findUserByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};
