import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError, ZodObject, ZodTypeAny } from 'zod';
import HTTP_STATUS from '../constants/http.constant';

/**
 * 에러 응답 형식
 */
const sendValidationError = (res: Response, error: ZodError) => {
  const formattedErrors = error.issues.map((issue) => ({
    field: issue.path.join('.'),
    message: issue.message,
  }));

  return res.status(HTTP_STATUS.BAD_REQUEST).json({
    success: false,
    message: '입력 데이터가 올바르지 않습니다.',
    errors: formattedErrors,
  });
};

/**
 * 스키마 구조를 분석하여 검증할 데이터 결정
 */
const determineValidationTarget = (schema: ZodTypeAny): 'body' | 'query' | 'params' | 'full' => {
  if (schema instanceof ZodObject) {
    const shape = schema.shape;
    const hasBody = 'body' in shape;
    const hasQuery = 'query' in shape;
    const hasParams = 'params' in shape;

    // 명시적으로 body, query, params를 포함한 스키마인 경우
    if (hasBody || hasQuery || hasParams) {
      return 'full';
    }

    // 스키마의 키가 body, query, params와 관련 없는 경우
    // 스키마 구조를 보고 자동 판단
    // 일반적으로 body 스키마는 email, password 같은 필드를 가지고
    // query 스키마는 page, limit 같은 필드를 가짐
    const commonBodyKeys = ['email', 'password', 'nickname', 'content', 'title'];
    const commonQueryKeys = ['page', 'limit', 'sort', 'search', 'orderBy', 'searchQuery'];

    const schemaKeys = Object.keys(shape);
    const hasBodyKeys = schemaKeys.some((key) => commonBodyKeys.includes(key));
    const hasQueryKeys = schemaKeys.some((key) => commonQueryKeys.includes(key));

    if (hasBodyKeys && !hasQueryKeys) {
      return 'body';
    }
    if (hasQueryKeys && !hasBodyKeys) {
      return 'query';
    }
  }

  // 기본값: body로 간주
  return 'body';
};

/**
 * 범용 검증 미들웨어 - 스키마 구조를 자동으로 판단하여 검증
 * @param schema - 검증할 Zod 스키마
 * @returns Express 미들웨어 함수
 */
export const validate = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const target = determineValidationTarget(schema);
      let data: any;

      if (target === 'full') {
        // { body, query, params } 형태의 스키마
        data = {
          body: req.body,
          query: req.query,
          params: req.params,
        };
      } else if (target === 'query') {
        // query만 검증
        data = req.query;
      } else if (target === 'params') {
        // params만 검증
        data = req.params;
      } else {
        // body만 검증 (기본값)
        data = req.body;
      }

      const result = schema.parse(data) as any;

      // 검증된 값을 원래 위치에 다시 할당 (transform된 값 반영)
      if (target === 'full') {
        if (result.body) req.body = result.body;
        if (result.query) req.query = result.query;
        if (result.params) req.params = result.params;
      } else if (target === 'query') {
        req.query = result;
      } else if (target === 'params') {
        req.params = result;
      } else {
        req.body = result;
      }

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return sendValidationError(res, error);
      }

      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: '서버 오류가 발생했습니다.',
      });
    }
  };
};

/**
 * Body만 검증하는 미들웨어
 * @param schema - 검증할 Zod 스키마
 * @returns Express 미들웨어 함수
 */
export const validateBody = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = schema.parse(req.body) as any;
      req.body = result;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return sendValidationError(res, error);
      }

      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: '서버 오류가 발생했습니다.',
      });
    }
  };
};

/**
 * Query만 검증하는 미들웨어
 * @param schema - 검증할 Zod 스키마
 * @returns Express 미들웨어 함수
 */
export const validateQuery = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = schema.parse(req.query);
      // req.query에 검증된 값을 병합 (Object.assign 사용)
      Object.assign(req.query, result);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return sendValidationError(res, error);
      }

      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: '서버 오류가 발생했습니다.',
      });
    }
  };
};

/**
 * Params만 검증하는 미들웨어
 * @param schema - 검증할 Zod 스키마
 * @returns Express 미들웨어 함수
 */
export const validateParams = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = schema.parse(req.params) as any;
      req.params = result;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return sendValidationError(res, error);
      }

      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: '서버 오류가 발생했습니다.',
      });
    }
  };
};

/**
 * Body, Query, Params를 모두 포함한 스키마로 검증하는 미들웨어
 * @param schema - { body, query, params } 형태의 Zod 스키마
 * @returns Express 미들웨어 함수
 */
export const validateAll = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      }) as any;

      if (result.body) req.body = result.body;
      if (result.query) req.query = result.query;
      if (result.params) req.params = result.params;

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return sendValidationError(res, error);
      }

      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: '서버 오류가 발생했습니다.',
      });
    }
  };
};
