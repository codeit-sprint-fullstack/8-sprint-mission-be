import { z } from "zod";

// 게시글 ID 파라미터 스키마
export const articleLikeSchema = z.object({
  articleId: z
    .string({
      required_error: "게시글 ID는 필수입니다.",
    })
    .uuid("올바른 UUID 형식이 아닙니다."),
});

// 상품 ID 파라미터 스키마
export const productLikeSchema = z.object({
  productId: z
    .string({
      required_error: "상품 ID는 필수입니다.",
    })
    .uuid("올바른 UUID 형식이 아닙니다."),
});
