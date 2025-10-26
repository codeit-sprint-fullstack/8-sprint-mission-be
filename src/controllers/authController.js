import * as authService from "../services/authService.js";
import { catchAsync, AppError } from "../middlewares/errorHandler.js";

/**
 * 회원가입
 */
const signup = catchAsync(async (req, res, next) => {
  const { email, password, nickname } = req.body;
  const result = await authService.signup({ email, password, nickname });

  // Refresh 토큰을 쿠키에 저장
  res.cookie("refreshToken", result.refreshToken, {
    httpOnly: false,
    secure: false,
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30일
    sameSite: "lax",
  });

  res.status(201).json({
    user: result.user,
    accessToken: result.accessToken,
  });
});

/**
 * 로그인
 */
const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const result = await authService.login({ email, password });

  // Refresh 토큰을 쿠키에 저장
  res.cookie("refreshToken", result.refreshToken, {
    httpOnly: false,
    secure: false,
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30일
    sameSite: "lax",
  });

  res.status(200).json({
    user: result.user,
    accessToken: result.accessToken,
  });
});

/**
 * 내 정보 조회
 */
const getMe = catchAsync(async (req, res, next) => {
  const userId = req.user.userId; // authenticate 미들웨어에서 설정
  const user = await authService.getUserById(userId);

  res.status(200).json(user);
});

/**
 * Refresh 토큰으로 새로운 Access 토큰 발급
 */
const refresh = catchAsync(async (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    throw new AppError("리프레시 토큰이 없습니다.", 401);
  }

  const result = await authService.refreshAccessToken(refreshToken);

  res.status(200).json({
    success: true,
    accessToken: result.accessToken,
  });
});

/**
 * 로그아웃 (쿠키 삭제)
 */
const logout = catchAsync(async (req, res, next) => {
  res.clearCookie("refreshToken");

  res.status(200).json({
    success: true,
    message: "로그아웃되었습니다.",
  });
});

const authController = {
  signup,
  login,
  getMe,
  refresh,
  logout,
};

export default authController;
