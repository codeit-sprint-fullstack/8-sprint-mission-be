const articleLikeMockData = [
  // Article 좋아요 데이터 (ArticleLike 테이블용)
  // 사용자 ID와 게시글 ID는 실제 생성될 UUID를 참조해야 하므로,
  // 시딩 시에 동적으로 할당하거나 임시 ID를 사용합니다.

  // Article 1에 대한 좋아요들
  {
    userId: "user1",
    articleId: "article1",
    createdAt: "2024-01-24T09:30:00.000Z",
  },
  {
    userId: "user2",
    articleId: "article1",
    createdAt: "2024-01-24T10:15:00.000Z",
  },
  {
    userId: "user3",
    articleId: "article1",
    createdAt: "2024-01-24T11:00:00.000Z",
  },
  {
    userId: "user4",
    articleId: "article1",
    createdAt: "2024-01-24T11:45:00.000Z",
  },
  {
    userId: "user5",
    articleId: "article1",
    createdAt: "2024-01-24T12:30:00.000Z",
  },

  // Article 2에 대한 좋아요들
  {
    userId: "user1",
    articleId: "article2",
    createdAt: "2024-01-23T09:00:00.000Z",
  },
  {
    userId: "user3",
    articleId: "article2",
    createdAt: "2024-01-23T10:30:00.000Z",
  },
  {
    userId: "user4",
    articleId: "article2",
    createdAt: "2024-01-23T11:15:00.000Z",
  },
  {
    userId: "user6",
    articleId: "article2",
    createdAt: "2024-01-23T12:00:00.000Z",
  },

  // Article 3에 대한 좋아요들
  {
    userId: "user2",
    articleId: "article3",
    createdAt: "2024-01-22T08:30:00.000Z",
  },
  {
    userId: "user5",
    articleId: "article3",
    createdAt: "2024-01-22T09:45:00.000Z",
  },
  {
    userId: "user7",
    articleId: "article3",
    createdAt: "2024-01-22T10:30:00.000Z",
  },

  // Article 4에 대한 좋아요들
  {
    userId: "user1",
    articleId: "article4",
    createdAt: "2024-01-21T08:45:00.000Z",
  },
  {
    userId: "user8",
    articleId: "article4",
    createdAt: "2024-01-21T09:30:00.000Z",
  },
  {
    userId: "user9",
    articleId: "article4",
    createdAt: "2024-01-21T10:15:00.000Z",
  },

  // Article 5에 대한 좋아요들
  {
    userId: "user2",
    articleId: "article5",
    createdAt: "2024-01-20T08:30:00.000Z",
  },
  {
    userId: "user3",
    articleId: "article5",
    createdAt: "2024-01-20T09:15:00.000Z",
  },
  {
    userId: "user4",
    articleId: "article5",
    createdAt: "2024-01-20T10:00:00.000Z",
  },
  {
    userId: "user6",
    articleId: "article5",
    createdAt: "2024-01-20T10:45:00.000Z",
  },
  {
    userId: "user10",
    articleId: "article5",
    createdAt: "2024-01-20T11:30:00.000Z",
  },

  // 추가 좋아요 데이터들...
  {
    userId: "user1",
    articleId: "article6",
    createdAt: "2024-01-19T08:15:00.000Z",
  },
  {
    userId: "user5",
    articleId: "article6",
    createdAt: "2024-01-19T09:00:00.000Z",
  },
  {
    userId: "user7",
    articleId: "article6",
    createdAt: "2024-01-19T09:45:00.000Z",
  },

  {
    userId: "user2",
    articleId: "article7",
    createdAt: "2024-01-18T08:00:00.000Z",
  },
  {
    userId: "user4",
    articleId: "article7",
    createdAt: "2024-01-18T08:45:00.000Z",
  },
  {
    userId: "user8",
    articleId: "article7",
    createdAt: "2024-01-18T09:30:00.000Z",
  },

  {
    userId: "user3",
    articleId: "article8",
    createdAt: "2024-01-17T07:45:00.000Z",
  },
  {
    userId: "user6",
    articleId: "article8",
    createdAt: "2024-01-17T08:30:00.000Z",
  },
  {
    userId: "user9",
    articleId: "article8",
    createdAt: "2024-01-17T09:15:00.000Z",
  },

  {
    userId: "user1",
    articleId: "article9",
    createdAt: "2024-01-16T07:30:00.000Z",
  },
  {
    userId: "user4",
    articleId: "article9",
    createdAt: "2024-01-16T08:15:00.000Z",
  },
  {
    userId: "user7",
    articleId: "article9",
    createdAt: "2024-01-16T09:00:00.000Z",
  },
  {
    userId: "user10",
    articleId: "article9",
    createdAt: "2024-01-16T09:45:00.000Z",
  },

  {
    userId: "user2",
    articleId: "article10",
    createdAt: "2024-01-15T07:15:00.000Z",
  },
  {
    userId: "user5",
    articleId: "article10",
    createdAt: "2024-01-15T08:00:00.000Z",
  },
  {
    userId: "user8",
    articleId: "article10",
    createdAt: "2024-01-15T08:45:00.000Z",
  },
  {
    userId: "user9",
    articleId: "article10",
    createdAt: "2024-01-15T09:30:00.000Z",
  },
];

export default articleLikeMockData;
