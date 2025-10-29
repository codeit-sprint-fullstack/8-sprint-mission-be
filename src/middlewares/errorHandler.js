/**
 * 커스텀 에러 클래스
 */
export class AppError extends Error {
  constructor(message, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true; // 예상 가능한 에러인지 구분
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Prisma 에러 처리
 */
const handlePrismaError = (err) => {
  const errorMap = {
    // 고유 제약 조건 위반
    P2002: {
      statusCode: 409,
      message: "이미 존재하는 데이터입니다.",
    },
    // 레코드를 찾을 수 없음
    P2025: {
      statusCode: 404,
      message: "요청한 데이터를 찾을 수 없습니다.",
    },
    // 외래 키 제약 조건 위반
    P2003: {
      statusCode: 400,
      message: "잘못된 참조 데이터입니다.",
    },
    // 필수 필드 누락
    P2011: {
      statusCode: 400,
      message: "필수 필드가 누락되었습니다.",
    },
    // 필수 관련 레코드 누락
    P2014: {
      statusCode: 400,
      message: "관련된 필수 데이터가 누락되었습니다.",
    },
    // 레코드 삭제 실패 (참조 관계)
    P2023: {
      statusCode: 400,
      message: "유효하지 않은 ID 형식입니다.",
    },
    // 연결 시간 초과
    P1001: {
      statusCode: 503,
      message: "데이터베이스에 연결할 수 없습니다.",
    },
    // 연결 실패
    P1002: {
      statusCode: 503,
      message: "데이터베이스 서버 연결에 실패했습니다.",
    },
  };

  const errorInfo = errorMap[err.code];

  if (errorInfo) {
    return new AppError(errorInfo.message, errorInfo.statusCode);
  }

  // 알 수 없는 Prisma 에러
  return new AppError("데이터베이스 작업 중 오류가 발생했습니다.", 500);
};

/**
 * JWT 에러 처리
 */
const handleJWTError = (err) => {
  const errorMap = {
    JsonWebTokenError: "유효하지 않은 토큰입니다.",
    TokenExpiredError: "만료된 토큰입니다.",
    NotBeforeError: "아직 유효하지 않은 토큰입니다.",
  };

  const message = errorMap[err.name] || "토큰 인증에 실패했습니다.";
  return new AppError(message, 401);
};

/**
 * Validation 에러 처리 (Zod 등)
 */
const handleValidationError = (err) => {
  // Zod 에러인 경우
  if (err.issues && Array.isArray(err.issues)) {
    const messages = err.issues.map((issue) => issue.message).join(", ");
    return new AppError(`유효성 검사 실패: ${messages}`, 400);
  }

  return new AppError("입력 데이터가 유효하지 않습니다.", 400);
};

/**
 * 개발 환경 에러 응답
 */
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
    error: err,
    stack: err.stack,
    code: err.code,
  });
};

/**
 * 프로덕션 환경 에러 응답
 */
const sendErrorProd = (err, res) => {
  // 예상된 에러 (Operational Error)
  if (err.isOperational) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }
  // 예상치 못한 에러 (Programming Error)
  else {
    // 콘솔에 에러 로그 출력
    console.error("예상치 못한 에러:", err);

    // 클라이언트에게는 일반적인 메시지만 전송
    res.status(500).json({
      success: false,
      message: "서버 내부 오류가 발생했습니다.",
    });
  }
};

/**
 * 전역 에러 핸들러 미들웨어
 */
export const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  error.statusCode = err.statusCode || 500;
  error.isOperational = err.isOperational || false;

  // 에러 타입별 처리
  if (err.code && err.code.startsWith("P")) {
    // Prisma 에러
    error = handlePrismaError(err);
  } else if (
    err.name === "JsonWebTokenError" ||
    err.name === "TokenExpiredError" ||
    err.name === "NotBeforeError"
  ) {
    // JWT 에러
    error = handleJWTError(err);
  } else if (err.name === "ZodError") {
    // Zod Validation 에러
    error = handleValidationError(err);
  } else if (err.name === "ValidationError") {
    // 일반 Validation 에러
    error = handleValidationError(err);
  } else if (err.name === "CastError") {
    // MongoDB CastError (필요 시)
    error = new AppError("잘못된 ID 형식입니다.", 400);
  } else if (err.name === "SyntaxError" && err.statusCode === 400) {
    // JSON 파싱 에러
    error = new AppError("잘못된 JSON 형식입니다.", 400);
  }

  // 환경별 에러 응답
  if (process.env.NODE_ENV === "development") {
    sendErrorDev(error, res);
  } else {
    sendErrorProd(error, res);
  }
};

/**
 * 비동기 함수 에러 캐치 래퍼
 * 컨트롤러에서 try-catch 없이 사용 가능
 */
export const catchAsync = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

/**
 * 404 Not Found 핸들러
 */
export const notFoundHandler = (req, res, next) => {
  const error = new AppError(
    `요청한 경로 ${req.originalUrl}를 찾을 수 없습니다.`,
    404
  );
  next(error);
};
