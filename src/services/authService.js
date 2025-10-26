import * as authRepository from "../repositories/authRepository.js";
import { hashPassword, comparePassword } from "../utils/password.js";
import {
  generateToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt.js";

/**
 * 회원가입
 */
export const signup = async ({ email, password, nickname }) => {
  // 이메일 중복 확인
  const existingUserByEmail = await authRepository.findUserByEmail(email);
  if (existingUserByEmail) {
    throw new Error("이미 사용 중인 이메일입니다.");
  }

  // 닉네임 중복 확인
  const existingUserByNickname = await authRepository.findUserByNickname(
    nickname
  );
  if (existingUserByNickname) {
    throw new Error("이미 사용 중인 닉네임입니다.");
  }

  // 비밀번호 해시화
  const hashedPassword = await hashPassword(password);

  // 사용자 생성
  const newUser = await authRepository.createUser({
    email,
    password: hashedPassword,
    nickname,
  });

  // JWT 토큰 생성
  const accessToken = generateToken({
    userId: newUser.id,
    email: newUser.email,
  });

  // Refresh 토큰 생성
  const refreshToken = generateRefreshToken({
    userId: newUser.id,
  });

  return {
    user: newUser,
    accessToken,
    refreshToken,
  };
};

/**
 * 로그인
 */
export const login = async ({ email, password }) => {
  // 사용자 찾기
  const user = await authRepository.findUserByEmail(email);
  if (!user) {
    throw new Error("이메일 또는 비밀번호가 일치하지 않습니다.");
  }

  // 비밀번호 확인
  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) {
    throw new Error("이메일 또는 비밀번호가 일치하지 않습니다.");
  }

  // JWT 토큰 생성
  const accessToken = generateToken({
    userId: user.id,
    email: user.email,
  });

  // Refresh 토큰 생성
  const refreshToken = generateRefreshToken({
    userId: user.id,
  });

  // password 제외한 사용자 정보 반환
  const { password: _, ...userWithoutPassword } = user;

  return {
    user: userWithoutPassword,
    accessToken,
    refreshToken,
  };
};

/**
 * 사용자 정보 조회
 */
export const getUserById = async (id) => {
  const user = await authRepository.findUserById(id);
  if (!user) {
    throw new Error("사용자를 찾을 수 없습니다.");
  }
  return user;
};

/**
 * Refresh 토큰으로 새로운 Access 토큰 발급
 */
export const refreshAccessToken = async (refreshToken) => {
  // Refresh 토큰 검증
  const decoded = verifyRefreshToken(refreshToken);

  // 사용자 존재 여부 확인
  const user = await authRepository.findUserById(decoded.userId);
  if (!user) {
    throw new Error("사용자를 찾을 수 없습니다.");
  }

  // 새로운 Access 토큰 생성
  const accessToken = generateToken({
    userId: user.id,
    email: user.email,
  });

  return {
    accessToken,
  };
};
