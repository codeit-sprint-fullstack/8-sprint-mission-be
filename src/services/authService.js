import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";
import dotenv from "dotenv";
dotenv.config();

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

export const refreshAccessTokenService = async (refreshToken) => {
  if (!refreshToken) throw new Error("리프레시 토큰이 제공되지 않았습니다.");

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user || user.refreshToken !== refreshToken) {
      throw new Error("유효하지 않은 리프레시 토큰입니다.");
    }

    const newAccessToken = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    return { accessToken: newAccessToken };
  } catch (error) {
    throw new Error("토큰 갱신 실패: " + error.message);
  }
};
