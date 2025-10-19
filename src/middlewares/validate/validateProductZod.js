import { z } from 'zod';

// 상품 생성 스키마
export const createProductSchema = z.object({
  name: z.string().min(1, '상품명은 필수입니다').max(100, '상품명은 100자 이하여야 합니다').trim(),
  description: z
    .string()
    .min(1, '상품 설명은 필수입니다')
    .max(1000, '상품 설명은 1000자 이하여야 합니다')
    .trim(),
  price: z.number().positive('가격은 양수여야 합니다').max(999999999, '가격이 너무 큽니다'),
  tags: z
    .array(z.string().min(1, '태그는 빈 문자열일 수 없습니다'))
    .max(10, '태그는 최대 10개까지 가능합니다')
    .optional()
    .default([]),
});

// 상품 업데이트 스키마 (모든 필드가 선택적)
export const updateProductSchema = z.object({
  name: z
    .string()
    .min(1, '상품명은 1자 이상이어야 합니다')
    .max(100, '상품명은 100자 이하여야 합니다')
    .trim()
    .optional(),
  description: z
    .string()
    .min(1, '상품 설명은 1자 이상이어야 합니다')
    .max(1000, '상품 설명은 1000자 이하여야 합니다')
    .trim()
    .optional(),
  price: z
    .number()
    .positive('가격은 양수여야 합니다')
    .max(999999999, '가격이 너무 큽니다')
    .optional(),
  tags: z
    .array(z.string().min(1, '태그는 빈 문자열일 수 없습니다'))
    .max(10, '태그는 최대 10개까지 가능합니다')
    .optional(),
});

// 상품 ID 파라미터 스키마
export const productIdSchema = z.object({
  id: z.string().uuid('유효하지 않은 상품 ID입니다'),
});

// 페이지네이션 쿼리 스키마
export const paginationSchema = z.object({
  page: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 1))
    .refine((val) => val > 0, '페이지는 1 이상이어야 합니다'),
  limit: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 10))
    .refine((val) => val > 0 && val <= 100, 'limit은 1-100 사이여야 합니다'),
  q: z.string().optional(),
});

// 유효성 검사 미들웨어 생성 함수
export const validateRequest = (schema, dataType = 'body') => {
  return (req, res, next) => {
    try {
      // 데이터 타입에 따라 검증할 데이터 선택
      let dataToValidate;
      switch (dataType) {
        case 'params':
          dataToValidate = req.params;
          break;
        case 'query':
          dataToValidate = req.query;
          break;
        case 'body':
        default:
          dataToValidate = req.body;
          break;
      }

      const validatedData = schema.parse(dataToValidate);

      // 검증된 데이터를 원래 위치에 다시 할당
      switch (dataType) {
        case 'params':
          req.params = validatedData;
          break;
        case 'query':
          req.query = validatedData;
          break;
        case 'body':
        default:
          req.body = validatedData;
          break;
      }

      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessages = error.issues.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
          code: err.code,
        }));

        return res.status(400).json({
          success: false,
          message: '유효성 검사 실패',
          errors: errorMessages,
        });
      }

      next(error);
    }
  };
};

// 특정 스키마별 미들웨어들
export const validateCreateProduct = validateRequest(createProductSchema, 'body');
export const validateUpdateProduct = validateRequest(updateProductSchema, 'body');
export const validateProductId = validateRequest(productIdSchema, 'params');
export const validatePagination = validateRequest(paginationSchema, 'query');
