import prisma from "../config/database.js";

/**
 * 이메일로 사용자 찾기
 */
export const findUserByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

/**
 * 닉네임으로 사용자 찾기
 */
export const findUserByNickname = async (nickname) => {
  return await prisma.user.findUnique({
    where: { nickname },
  });
};

/**
 * ID로 사용자 찾기
 */
export const findUserById = async (id) => {
  return await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      nickname: true,
      image: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

/**
 * 새로운 사용자 생성
 */
export const createUser = async (data) => {
  return await prisma.user.create({
    data,
    select: {
      id: true,
      email: true,
      nickname: true,
      image: true,
      createdAt: true,
    },
  });
};
