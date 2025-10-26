import { z } from "zod";

// 게시글 ID 파라미터 스키마
export const articleIdParamSchema = z.object({
  articleId: z
    .string({
      required_error: "게시글 ID는 필수입니다.",
    })
    .uuid("올바른 UUID 형식이 아닙니다."),
});

// 상품 ID 파라미터 스키마
export const productIdParamSchema = z.object({
  productId: z
    .string({
      required_error: "상품 ID는 필수입니다.",
    })
    .uuid("올바른 UUID 형식이 아닙니다."),
});

// 댓글 ID 파라미터 스키마
export const commentIdParamSchema = z.object({
  commentId: z
    .string({
      required_error: "댓글 ID는 필수입니다.",
    })
    .uuid("올바른 UUID 형식이 아닙니다."),
});

// 게시글 댓글 ID 파라미터 스키마 (articleId + commentId)
export const articleCommentParamSchema = z.object({
  articleId: z
    .string({
      required_error: "게시글 ID는 필수입니다.",
    })
    .uuid("올바른 UUID 형식이 아닙니다."),
  commentId: z
    .string({
      required_error: "댓글 ID는 필수입니다.",
    })
    .uuid("올바른 UUID 형식이 아닙니다."),
});

// 상품 댓글 ID 파라미터 스키마 (productId + commentId)
export const productCommentParamSchema = z.object({
  productId: z
    .string({
      required_error: "상품 ID는 필수입니다.",
    })
    .uuid("올바른 UUID 형식이 아닙니다."),
  commentId: z
    .string({
      required_error: "댓글 ID는 필수입니다.",
    })
    .uuid("올바른 UUID 형식이 아닙니다."),
});

// 댓글 생성 스키마
export const createCommentSchema = z.object({
  content: z
    .string({
      required_error: "댓글 내용은 필수 입력 항목입니다.",
    })
    .min(1, "댓글 내용은 최소 1자 이상이어야 합니다.")
    .max(1000, "댓글 내용은 최대 1000자까지 입력 가능합니다.")
    .trim(),
});

// 댓글 수정 스키마
export const updateCommentSchema = z.object({
  content: z
    .string({
      required_error: "댓글 내용은 필수 입력 항목입니다.",
    })
    .min(1, "댓글 내용은 최소 1자 이상이어야 합니다.")
    .max(1000, "댓글 내용은 최대 1000자까지 입력 가능합니다.")
    .trim(),
});
