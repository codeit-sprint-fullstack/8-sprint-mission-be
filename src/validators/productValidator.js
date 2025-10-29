import { z } from "zod";

// 상품 목록 조회 쿼리 스키마
export const getProductsSchema = z.object({
  page: z
    .string()
    .regex(/^\d+$/, "페이지는 숫자여야 합니다.")
    .transform(Number)
    .refine((val) => val >= 1, "페이지는 1 이상이어야 합니다.")
    .optional()
    .default("1"),
  pageSize: z
    .string()
    .regex(/^\d+$/, "페이지 크기는 숫자여야 합니다.")
    .transform(Number)
    .refine(
      (val) => val >= 1 && val <= 100,
      "페이지 크기는 1~100 사이여야 합니다."
    )
    .optional()
    .default("10"),
  orderBy: z
    .enum(["recent", "like"], {
      errorMap: () => ({
        message: "정렬 기준은 'recent' 또는 'like'만 가능합니다.",
      }),
    })
    .optional()
    .default("recent"),
  keyword: z
    .string()
    .max(100, "검색어는 최대 100자까지 입력 가능합니다.")
    .optional()
    .default(""),
});

// ID 파라미터 스키마
export const productIdSchema = z.object({
  id: z
    .string({
      required_error: "상품 ID는 필수입니다.",
    })
    .uuid("올바른 UUID 형식이 아닙니다."),
});

// 이미지 스키마
const imageSchema = z
  .union([
    z.string().min(1, "이미지 URL은 빈 문자열일 수 없습니다."),
    z.object({
      url: z.string().min(1, "이미지 URL은 빈 문자열일 수 없습니다."),
    }),
  ])
  .transform((val) => {
    // 문자열이면 객체로 변환
    if (typeof val === "string") {
      return { url: val };
    }
    return val;
  });

// 상품 생성 스키마
export const createProductSchema = z.object({
  name: z
    .string({
      required_error: "상품명은 필수 입력 항목입니다.",
    })
    .min(1, "상품명은 최소 1자 이상이어야 합니다.")
    .max(100, "상품명은 최대 100자까지 입력 가능합니다.")
    .trim(),
  description: z
    .string({
      required_error: "상품 설명은 필수 입력 항목입니다.",
    })
    .min(1, "상품 설명은 최소 1자 이상이어야 합니다.")
    .max(5000, "상품 설명은 최대 5000자까지 입력 가능합니다.")
    .trim(),
  price: z
    .number({
      required_error: "가격은 필수 입력 항목입니다.",
      invalid_type_error: "가격은 숫자여야 합니다.",
    })
    .int("가격은 정수여야 합니다.")
    .min(0, "가격은 0 이상이어야 합니다.")
    .max(999999999, "가격은 999,999,999 이하여야 합니다."),
  tags: z
    .array(z.string().trim().min(1, "태그는 빈 문자열일 수 없습니다."))
    .optional()
    .default([]),
  images: z.array(imageSchema).optional().default([]),
});

// 상품 수정 스키마 (부분 업데이트 허용)
export const updateProductSchema = z
  .object({
    name: z
      .string()
      .min(1, "상품명은 최소 1자 이상이어야 합니다.")
      .max(100, "상품명은 최대 100자까지 입력 가능합니다.")
      .trim()
      .optional(),
    description: z
      .string()
      .min(1, "상품 설명은 최소 1자 이상이어야 합니다.")
      .max(5000, "상품 설명은 최대 5000자까지 입력 가능합니다.")
      .trim()
      .optional(),
    price: z
      .number({
        invalid_type_error: "가격은 숫자여야 합니다.",
      })
      .int("가격은 정수여야 합니다.")
      .min(0, "가격은 0 이상이어야 합니다.")
      .max(999999999, "가격은 999,999,999 이하여야 합니다.")
      .optional(),
    tags: z
      .array(z.string().trim().min(1, "태그는 빈 문자열일 수 없습니다."))
      .optional(),
    images: z.array(imageSchema).optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "최소 하나 이상의 필드를 입력해야 합니다.",
  });
