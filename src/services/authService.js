import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
const JWT_EXPIRES_IN = "1h";

// 회원가입
export const registerUser = async ({ email, nickname, password }) => {
  const exist = await prisma.user.findUnique({ where: { email } });
  if (exist) throw new Error("이미 등록된 이메일입니다.");

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      nickname,
      encryptedPassword: hashedPassword,
    },
  });

  return user;
};

// 로그인
export const loginUser = async ({ email, password }) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("존재하지 않는 사용자입니다.");

  const isMatch = await bcrypt.compare(password, user.encryptedPassword);
  if (!isMatch) throw new Error("비밀번호가 일치하지 않습니다.");

  const token = jwt.sign({ id: user.id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });

  return { user, token };
};
