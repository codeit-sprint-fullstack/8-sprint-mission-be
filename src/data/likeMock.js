const articleLikeMockData = [
  // Article 좋아요 데이터 (ArticleLike 테이블용)
  // Article 1 (2024년 IT 트렌드 전망) - 245 likes
  { userId: "2", articleId: "1", createdAt: "2024-01-24T09:30:00.000Z" },
  { userId: 3, articleId: 1, createdAt: "2024-01-24T10:15:00.000Z" },
  { userId: 4, articleId: 1, createdAt: "2024-01-24T11:00:00.000Z" },
  { userId: 5, articleId: 1, createdAt: "2024-01-24T11:45:00.000Z" },
  { userId: 6, articleId: 1, createdAt: "2024-01-24T12:30:00.000Z" },
  { userId: 7, articleId: 1, createdAt: "2024-01-24T13:15:00.000Z" },
  { userId: 8, articleId: 1, createdAt: "2024-01-24T14:00:00.000Z" },
  { userId: 9, articleId: 1, createdAt: "2024-01-24T14:45:00.000Z" },
  { userId: 10, articleId: 1, createdAt: "2024-01-24T15:30:00.000Z" },
  { userId: 11, articleId: 1, createdAt: "2024-01-24T16:15:00.000Z" },

  // Article 2 (프로그래밍 입문자를 위한 로드맵) - 189 likes
  { userId: 1, articleId: 2, createdAt: "2024-01-23T09:00:00.000Z" },
  { userId: 3, articleId: 2, createdAt: "2024-01-23T10:30:00.000Z" },
  { userId: 4, articleId: 2, createdAt: "2024-01-23T11:15:00.000Z" },
  { userId: 5, articleId: 2, createdAt: "2024-01-23T12:00:00.000Z" },
  { userId: 6, articleId: 2, createdAt: "2024-01-23T13:30:00.000Z" },
  { userId: 7, articleId: 2, createdAt: "2024-01-23T14:15:00.000Z" },
  { userId: 8, articleId: 2, createdAt: "2024-01-23T15:00:00.000Z" },
  { userId: 9, articleId: 2, createdAt: "2024-01-23T16:30:00.000Z" },

  // Article 3 (클라우드 컴퓨팅의 미래) - 156 likes
  { userId: 1, articleId: 3, createdAt: "2024-01-22T08:30:00.000Z" },
  { userId: 2, articleId: 3, createdAt: "2024-01-22T09:45:00.000Z" },
  { userId: 4, articleId: 3, createdAt: "2024-01-22T10:30:00.000Z" },
  { userId: 5, articleId: 3, createdAt: "2024-01-22T11:15:00.000Z" },
  { userId: 6, articleId: 3, createdAt: "2024-01-22T12:00:00.000Z" },
  { userId: 7, articleId: 3, createdAt: "2024-01-22T13:30:00.000Z" },

  // Article 4 (데이터 분석가의 하루) - 134 likes
  { userId: 1, articleId: 4, createdAt: "2024-01-21T08:45:00.000Z" },
  { userId: 2, articleId: 4, createdAt: "2024-01-21T09:30:00.000Z" },
  { userId: 3, articleId: 4, createdAt: "2024-01-21T10:15:00.000Z" },
  { userId: 5, articleId: 4, createdAt: "2024-01-21T11:00:00.000Z" },
  { userId: 6, articleId: 4, createdAt: "2024-01-21T12:30:00.000Z" },

  // Article 5 (블록체인 기술 동향) - 298 likes
  { userId: 1, articleId: 5, createdAt: "2024-01-20T08:30:00.000Z" },
  { userId: 2, articleId: 5, createdAt: "2024-01-20T09:15:00.000Z" },
  { userId: 3, articleId: 5, createdAt: "2024-01-20T10:00:00.000Z" },
  { userId: 4, articleId: 5, createdAt: "2024-01-20T10:45:00.000Z" },
  { userId: 6, articleId: 5, createdAt: "2024-01-20T11:30:00.000Z" },
  { userId: 7, articleId: 5, createdAt: "2024-01-20T12:15:00.000Z" },
  { userId: 8, articleId: 5, createdAt: "2024-01-20T13:00:00.000Z" },
  { userId: 9, articleId: 5, createdAt: "2024-01-20T13:45:00.000Z" },
  { userId: 10, articleId: 5, createdAt: "2024-01-20T14:30:00.000Z" },
  { userId: 11, articleId: 5, createdAt: "2024-01-20T15:15:00.000Z" },
  { userId: 12, articleId: 5, createdAt: "2024-01-20T16:00:00.000Z" },
  { userId: 13, articleId: 5, createdAt: "2024-01-20T16:45:00.000Z" },

  // Article 6 (UI/UX 디자인 원칙) - 167 likes
  { userId: 1, articleId: 6, createdAt: "2024-01-19T08:15:00.000Z" },
  { userId: 2, articleId: 6, createdAt: "2024-01-19T09:00:00.000Z" },
  { userId: 3, articleId: 6, createdAt: "2024-01-19T09:45:00.000Z" },
  { userId: 4, articleId: 6, createdAt: "2024-01-19T10:30:00.000Z" },
  { userId: 5, articleId: 6, createdAt: "2024-01-19T11:15:00.000Z" },
  { userId: 7, articleId: 6, createdAt: "2024-01-19T12:00:00.000Z" },
  { userId: 8, articleId: 6, createdAt: "2024-01-19T13:30:00.000Z" },

  // Article 7 (사이버 보안 위협과 대응) - 223 likes
  { userId: 1, articleId: 7, createdAt: "2024-01-18T08:00:00.000Z" },
  { userId: 2, articleId: 7, createdAt: "2024-01-18T08:45:00.000Z" },
  { userId: 3, articleId: 7, createdAt: "2024-01-18T09:30:00.000Z" },
  { userId: 4, articleId: 7, createdAt: "2024-01-18T10:15:00.000Z" },
  { userId: 5, articleId: 7, createdAt: "2024-01-18T11:00:00.000Z" },
  { userId: 6, articleId: 7, createdAt: "2024-01-18T11:45:00.000Z" },
  { userId: 8, articleId: 7, createdAt: "2024-01-18T12:30:00.000Z" },
  { userId: 9, articleId: 7, createdAt: "2024-01-18T13:15:00.000Z" },
  { userId: 10, articleId: 7, createdAt: "2024-01-18T14:00:00.000Z" },

  // Article 8 (애자일 방법론의 실제) - 178 likes
  { userId: 1, articleId: 8, createdAt: "2024-01-17T07:45:00.000Z" },
  { userId: 2, articleId: 8, createdAt: "2024-01-17T08:30:00.000Z" },
  { userId: 3, articleId: 8, createdAt: "2024-01-17T09:15:00.000Z" },
  { userId: 4, articleId: 8, createdAt: "2024-01-17T10:00:00.000Z" },
  { userId: 5, articleId: 8, createdAt: "2024-01-17T10:45:00.000Z" },
  { userId: 6, articleId: 8, createdAt: "2024-01-17T11:30:00.000Z" },
  { userId: 7, articleId: 8, createdAt: "2024-01-17T12:15:00.000Z" },

  // Article 9 (머신러닝 프로젝트 시작하기) - 256 likes
  { userId: 2, articleId: 9, createdAt: "2024-01-16T07:30:00.000Z" },
  { userId: 3, articleId: 9, createdAt: "2024-01-16T08:15:00.000Z" },
  { userId: 4, articleId: 9, createdAt: "2024-01-16T09:00:00.000Z" },
  { userId: 5, articleId: 9, createdAt: "2024-01-16T09:45:00.000Z" },
  { userId: 6, articleId: 9, createdAt: "2024-01-16T10:30:00.000Z" },
  { userId: 7, articleId: 9, createdAt: "2024-01-16T11:15:00.000Z" },
  { userId: 8, articleId: 9, createdAt: "2024-01-16T12:00:00.000Z" },
  { userId: 10, articleId: 9, createdAt: "2024-01-16T12:45:00.000Z" },
  { userId: 11, articleId: 9, createdAt: "2024-01-16T13:30:00.000Z" },
  { userId: 12, articleId: 9, createdAt: "2024-01-16T14:15:00.000Z" },

  // Article 10 (개발자의 성장 전략) - 312 likes
  { userId: 1, articleId: 10, createdAt: "2024-01-15T07:15:00.000Z" },
  { userId: 2, articleId: 10, createdAt: "2024-01-15T08:00:00.000Z" },
  { userId: 3, articleId: 10, createdAt: "2024-01-15T08:45:00.000Z" },
  { userId: 4, articleId: 10, createdAt: "2024-01-15T09:30:00.000Z" },
  { userId: 5, articleId: 10, createdAt: "2024-01-15T10:15:00.000Z" },
  { userId: 6, articleId: 10, createdAt: "2024-01-15T11:00:00.000Z" },
  { userId: 7, articleId: 10, createdAt: "2024-01-15T11:45:00.000Z" },
  { userId: 8, articleId: 10, createdAt: "2024-01-15T12:30:00.000Z" },
  { userId: 9, articleId: 10, createdAt: "2024-01-15T13:15:00.000Z" },
  { userId: 11, articleId: 10, createdAt: "2024-01-15T14:00:00.000Z" },
  { userId: 12, articleId: 10, createdAt: "2024-01-15T14:45:00.000Z" },
  { userId: 13, articleId: 10, createdAt: "2024-01-15T15:30:00.000Z" },
  { userId: 14, articleId: 10, createdAt: "2024-01-15T16:15:00.000Z" },

  // 나머지 Article들에 대한 좋아요 데이터 (간소화)
  { userId: 1, articleId: 11, createdAt: "2024-01-14T07:30:00.000Z" },
  { userId: 2, articleId: 11, createdAt: "2024-01-14T08:15:00.000Z" },
  { userId: 3, articleId: 11, createdAt: "2024-01-14T09:00:00.000Z" },
  { userId: 4, articleId: 11, createdAt: "2024-01-14T09:45:00.000Z" },
  { userId: 5, articleId: 11, createdAt: "2024-01-14T10:30:00.000Z" },

  { userId: 1, articleId: 12, createdAt: "2024-01-13T07:15:00.000Z" },
  { userId: 3, articleId: 12, createdAt: "2024-01-13T08:00:00.000Z" },
  { userId: 4, articleId: 12, createdAt: "2024-01-13T08:45:00.000Z" },
  { userId: 5, articleId: 12, createdAt: "2024-01-13T09:30:00.000Z" },
  { userId: 6, articleId: 12, createdAt: "2024-01-13T10:15:00.000Z" },
  { userId: 7, articleId: 12, createdAt: "2024-01-13T11:00:00.000Z" },

  { userId: 2, articleId: 13, createdAt: "2024-01-12T07:00:00.000Z" },
  { userId: 3, articleId: 13, createdAt: "2024-01-12T07:45:00.000Z" },
  { userId: 4, articleId: 13, createdAt: "2024-01-12T08:30:00.000Z" },
  { userId: 5, articleId: 13, createdAt: "2024-01-12T09:15:00.000Z" },
  { userId: 6, articleId: 13, createdAt: "2024-01-12T10:00:00.000Z" },
  { userId: 7, articleId: 13, createdAt: "2024-01-12T10:45:00.000Z" },
  { userId: 8, articleId: 13, createdAt: "2024-01-12T11:30:00.000Z" },
  { userId: 9, articleId: 13, createdAt: "2024-01-12T12:15:00.000Z" },

  { userId: 1, articleId: 14, createdAt: "2024-01-11T06:45:00.000Z" },
  { userId: 2, articleId: 14, createdAt: "2024-01-11T07:30:00.000Z" },
  { userId: 3, articleId: 14, createdAt: "2024-01-11T08:15:00.000Z" },
  { userId: 4, articleId: 14, createdAt: "2024-01-11T09:00:00.000Z" },
  { userId: 5, articleId: 14, createdAt: "2024-01-11T09:45:00.000Z" },
  { userId: 6, articleId: 14, createdAt: "2024-01-11T10:30:00.000Z" },
  { userId: 7, articleId: 14, createdAt: "2024-01-11T11:15:00.000Z" },

  { userId: 1, articleId: 15, createdAt: "2024-01-10T06:30:00.000Z" },
  { userId: 2, articleId: 15, createdAt: "2024-01-10T07:15:00.000Z" },
  { userId: 3, articleId: 15, createdAt: "2024-01-10T08:00:00.000Z" },
  { userId: 4, articleId: 15, createdAt: "2024-01-10T08:45:00.000Z" },
  { userId: 5, articleId: 15, createdAt: "2024-01-10T09:30:00.000Z" },
  { userId: 6, articleId: 15, createdAt: "2024-01-10T10:15:00.000Z" },
  { userId: 7, articleId: 15, createdAt: "2024-01-10T11:00:00.000Z" },
  { userId: 8, articleId: 15, createdAt: "2024-01-10T11:45:00.000Z" },
  { userId: 9, articleId: 15, createdAt: "2024-01-10T12:30:00.000Z" },
];

export default likeMockData;
