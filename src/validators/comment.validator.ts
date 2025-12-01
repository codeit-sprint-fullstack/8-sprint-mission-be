import { z } from 'zod';

export const getCommentCursorQuerySchema = z.object({
  cursor: z.string().uuid('올바르지 않은 커서 형식입니다.').optional(),
  limit: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 10))
    .refine((value) => value >= 1, {
      message: 'limit은 1 이상이어야 합니다.',
      path: ['limit'],
    }),
});

export const commentBodySchema = z.object({
  content: z
    .string()
    .min(1, '댓글 내용은 필수 입력 필드입니다.')
    .max(1000, '댓글 내용은 최대 1000자 이하여야 합니다.'),
});

export type GetCommentCursorQuerySchema = z.infer<typeof getCommentCursorQuerySchema>;
export type CommentBodySchema = z.infer<typeof commentBodySchema>;
