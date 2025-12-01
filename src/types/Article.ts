interface ArticleWhereCondition {
  title?: string;
  content?: string;
}

interface ArticleOrderByWithRelationInput {
  createdAt?: 'asc' | 'desc';
  likeCount?: 'asc' | 'desc';
}

export type { ArticleWhereCondition, ArticleOrderByWithRelationInput };
