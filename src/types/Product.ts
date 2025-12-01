interface ProductWhereCondition {
  name?: string;
  description?: string;
  tags?: string[];
}

interface ProductOrderByWithRelationInput {
  createdAt?: 'asc' | 'desc';
  likeCount?: 'asc' | 'desc';
}

export type { ProductWhereCondition, ProductOrderByWithRelationInput };
