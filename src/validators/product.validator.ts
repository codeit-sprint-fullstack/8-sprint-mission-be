import { z } from 'zod';

export const getProductsQuerySchema = z.object({
  page: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 1))
    .refine((value) => value >= 1, {
      message: '페이지는 1 이상이어야 합니다.',
      path: ['page'],
    }),
  limit: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 10))
    .refine((value) => value >= 1, {
      message: 'limit은 1 이상이어야 합니다.',
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

export const productSchema = z.object({
  name: z.string().min(1, '상품 이름은 필수 입력 필드입니다.'),
  description: z.string().min(1, '상품 설명은 필수 입력 필드입니다.'),
  price: z.number().min(0, '상품 가격은 필수 입력 필드입니다.'),
  tags: z.array(z.string()).optional(),
});

export type GetProductsQuerySchema = z.infer<typeof getProductsQuerySchema>;
export type ProductSchema = z.infer<typeof productSchema>;
