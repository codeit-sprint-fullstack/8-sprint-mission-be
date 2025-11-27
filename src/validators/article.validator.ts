import { z } from 'zod';

export const getArticlesQuerySchema = z.object({
  cursor: z.string().optional(),
  limit: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 10))
    .refine((value) => value >= 1 && value <= 100, {
      message: 'limit은 1 이상 100 이하여야 합니다.',
      path: ['limit'],
    }),
  searchQuery: z.string().optional(),
  sort: z
    .enum(['recent', 'like'])
    .optional()
    .default('recent')
    .refine((value) => value === 'like' || value === 'recent', {
      message: '정렬 방식이 올바르지 않습니다.',
      path: ['sort'],
    }),
});

export const articleSchema = z.object({
  title: z.string().min(1, '제목은 필수 입력 필드입니다.'),
  content: z.string().min(1, '내용은 필수 입력 필드입니다.'),
});

export type GetArticlesQuerySchema = z.infer<typeof getArticlesQuerySchema>;
export type ArticleSchema = z.infer<typeof articleSchema>;
