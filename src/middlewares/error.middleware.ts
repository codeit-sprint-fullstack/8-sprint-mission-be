import { ErrorRequestHandler } from 'express';
import AppError from '../utils/AppError';
import HTTP_STATUS from '../constants/http.constant';

export const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  // Prisma 에러 처리
  if (err.code === 'P2002') {
    return res.status(409).json({
      success: false,
      message: '이미 존재하는 데이터입니다.',
    });
  }

  if (err.code === 'P2025') {
    return res.status(404).json({
      success: false,
      message: '존재하지 않는 데이터입니다.',
    });
  }

  // AppError 처리
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  // 기타 에러는 로그를 남기고 500 에러 반환
  console.error('Error:', err);
  return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: '서버 오류가 발생했습니다.',
    ...(process.env.NODE_ENV === 'development' && { error: err.message, stack: err.stack }),
  });
};
