import { verifyToken } from "../utils/jwt.js";

/**
 * JWT 토큰 인증 미들웨어
 * @params req, res, next
 * @returns {Promise<void>}
 * @throws {Error} 유효하지 않은 토큰인 경우 401 상태 코드와 함께 에러 메시지 반환
 */
export const authenticate = async (req, res, next) => {
  try {
    // Authorization 헤더 확인
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "인증 토큰이 제공되지 않았습니다.",
      });
    }

    // Bearer 토큰 형식 확인
    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return res.status(401).json({
        success: false,
        message: "잘못된 토큰 형식입니다. 'Bearer {token}' 형식이어야 합니다.",
      });
    }

    const token = parts[1];

    // 토큰 검증
    const decoded = verifyToken(token);

    // 검증된 사용자 정보를 req.user에 저장
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message || "유효하지 않은 토큰입니다.",
    });
  }
};

/**
 * 선택적 JWT 토큰 인증 미들웨어
 * 토큰이 있으면 검증하고, 없으면 그냥 통과시킴
 * @params req, res, next
 * @returns {Promise<void>}
 */
export const optionalAuthenticate = async (req, res, next) => {
  try {
    // Authorization 헤더 확인
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      // 토큰이 없으면 그냥 통과
      return next();
    }

    // Bearer 토큰 형식 확인
    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
      // 잘못된 형식이면 그냥 통과
      return next();
    }

    const token = parts[1];

    // 토큰 검증
    try {
      const decoded = verifyToken(token);
      // 검증된 사용자 정보를 req.user에 저장
      req.user = decoded;
    } catch (error) {
      // 토큰이 유효하지 않으면 그냥 통과 (req.user는 undefined로 유지)
    }

    next();
  } catch (error) {
    // 예외가 발생해도 그냥 통과
    next();
  }
};
