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
      if (error instanceof z.ZodError) {
        const errorMessages = error.errors.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));

        return res.status(400).json({
          success: false,
          message: "유효성 검사 실패",
          errors: errorMessages,
        });
      }
      next(error);
    }
  };
};
