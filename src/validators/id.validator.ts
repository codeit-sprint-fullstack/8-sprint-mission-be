import { z } from 'zod';

export const idSchema = z.object({
  id: z.string().uuid('올바르지 않은 ID 형식입니다.').optional(),
  commentId: z.string().uuid('올바르지 않은 댓글 ID 형식입니다.').optional(),
});

export type IdSchema = z.infer<typeof idSchema>;
