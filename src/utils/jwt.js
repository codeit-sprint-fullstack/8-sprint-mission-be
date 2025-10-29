import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "jwt-secret";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";
const REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET || "refresh-secret";
const REFRESH_TOKEN_EXPIRES_IN = process.env.REFRESH_TOKEN_EXPIRES_IN || "30d";

/**
 * JWT 토큰 생성
 * @param {Object} payload - 토큰에 담을 데이터 (userId, email 등)
 * @returns {string} JWT 토큰
 */
export const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
};

/**
 * JWT 토큰 검증
 * @param {string} token - 검증할 JWT 토큰
 * @returns {Object} 디코딩된 페이로드
 * @throws {Error} 유효하지 않은 토큰인 경우
 */
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new Error("토큰이 만료되었습니다.");
    }
    if (error.name === "JsonWebTokenError") {
      throw new Error("유효하지 않은 토큰입니다.");
    }
    throw error;
  }
};

/**
 * JWT 토큰 디코딩 (검증 없이)
 * @param {string} token - 디코딩할 JWT 토큰
 * @returns {Object} 디코딩된 페이로드
 */
export const decodeToken = (token) => {
  return jwt.decode(token);
};

/**
 * Refresh 토큰 생성
 * @param {Object} payload - 토큰에 담을 데이터 (userId 등)
 * @returns {string} Refresh 토큰
 */
export const generateRefreshToken = (payload) => {
  return jwt.sign(payload, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRES_IN,
  });
};

/**
 * Refresh 토큰 검증
 * @param {string} token - 검증할 Refresh 토큰
 * @returns {Object} 디코딩된 페이로드
 * @throws {Error} 유효하지 않은 토큰인 경우
 */
export const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, REFRESH_TOKEN_SECRET);
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new Error("리프레시 토큰이 만료되었습니다.");
    }
    if (error.name === "JsonWebTokenError") {
      throw new Error("유효하지 않은 리프레시 토큰입니다.");
    }
    throw error;
  }
};
