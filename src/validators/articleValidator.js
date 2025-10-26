import { z } from "zod";

// 게시글 목록 조회 쿼리 스키마
export const getArticlesSchema = z.object({
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
  isBest: z
    .string()
    .transform((val) => val === "true")
    .optional()
    .default("false"),
});

// ID 파라미터 스키마
export const articleIdSchema = z.object({
  id: z
    .string({
      required_error: "게시글 ID는 필수입니다.",
    })
    .uuid("올바른 UUID 형식이 아닙니다."),
});

// 게시글 생성 스키마
export const createArticleSchema = z.object({
  title: z
    .string({
      required_error: "제목은 필수 입력 항목입니다.",
    })
    .min(1, "제목은 최소 1자 이상이어야 합니다.")
    .max(100, "제목은 최대 100자까지 입력 가능합니다.")
    .trim(),
  content: z
    .string({
      required_error: "내용은 필수 입력 항목입니다.",
    })
    .min(1, "내용은 최소 1자 이상이어야 합니다.")
    .max(5000, "내용은 최대 5000자까지 입력 가능합니다.")
    .trim(),
});

// 게시글 수정 스키마 (부분 업데이트 허용)
export const updateArticleSchema = z
  .object({
    title: z
      .string()
      .min(1, "제목은 최소 1자 이상이어야 합니다.")
      .max(100, "제목은 최대 100자까지 입력 가능합니다.")
      .trim()
      .optional(),
    content: z
      .string()
      .min(1, "내용은 최소 1자 이상이어야 합니다.")
      .max(5000, "내용은 최대 5000자까지 입력 가능합니다.")
      .trim()
      .optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "최소 하나 이상의 필드를 입력해야 합니다.",
  });
