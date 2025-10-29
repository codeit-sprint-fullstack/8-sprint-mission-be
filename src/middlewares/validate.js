import { z } from "zod";

// 유효성 검사 미들웨어 생성 함수
export const validate = (schema, source = "body") => {
  return async (req, res, next) => {
    try {
      const dataToValidate = req[source];
      const validatedData = await schema.parseAsync(dataToValidate);
      req[source] = validatedData; // 검증된 데이터로 대체
      next();
    } catch (error) {
      next(error);
    }
  };
};
