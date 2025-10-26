const commentMockData = [
  // Article 댓글 데이터
  {
    content: "정말 유익한 정보네요! AI 트렌드에 대해 더 자세히 알고 싶습니다.",
    userId: "user2",
    articleId: "article1",
    createdAt: "2024-01-24T10:30:00.000Z",
  },
  {
    content:
      "메타버스 분야도 흥미롭네요. 관련 기술 스택을 공유해주실 수 있나요?",
    userId: "user3",
    articleId: "article1",
    createdAt: "2024-01-24T11:15:00.000Z",
  },
  {
    content: "2024년 트렌드 예측이 정확한 것 같습니다. 감사합니다!",
    userId: "user4",
    articleId: "article1",
    createdAt: "2024-01-24T12:00:00.000Z",
  },

  // Article 2에 대한 댓글들
  {
    content: "프로그래밍 입문자에게 정말 도움이 되는 글이네요!",
    userId: "user1",
    articleId: "article2",
    createdAt: "2024-01-23T09:30:00.000Z",
  },
  {
    content: "로드맵이 체계적으로 잘 정리되어 있어요. 저장해둘게요.",
    userId: "user5",
    articleId: "article2",
    createdAt: "2024-01-23T10:45:00.000Z",
  },

  // Article 3에 대한 댓글들
  {
    content: "클라우드 컴퓨팅의 미래가 정말 밝아 보이네요.",
    userId: "user6",
    articleId: "article3",
    createdAt: "2024-01-22T09:20:00.000Z",
  },
  {
    content: "기업의 대응 전략 부분이 특히 인상적이었습니다.",
    userId: "user7",
    articleId: "article3",
    createdAt: "2024-01-22T10:10:00.000Z",
  },
  {
    content: "실무에서 바로 적용할 수 있는 내용들이 많네요.",
    userId: "user8",
    articleId: "article3",
    createdAt: "2024-01-22T11:30:00.000Z",
  },

  // Article 4에 대한 댓글들
  {
    content: "데이터 분석가의 실제 업무를 알 수 있어서 좋았습니다.",
    userId: "user9",
    articleId: "article4",
    createdAt: "2024-01-21T09:45:00.000Z",
  },
  {
    content: "필요한 역량 부분이 특히 도움이 되었어요.",
    userId: "user10",
    articleId: "article4",
    createdAt: "2024-01-21T10:20:00.000Z",
  },

  // Article 5에 대한 댓글들
  {
    content: "블록체인 기술의 최신 동향을 잘 정리해주셨네요!",
    userId: "user11",
    articleId: "article5",
    createdAt: "2024-01-20T09:15:00.000Z",
  },
  {
    content: "활용 사례들이 매우 흥미롭습니다. 더 많은 사례를 알고 싶어요.",
    userId: "user12",
    articleId: "article5",
    createdAt: "2024-01-20T10:30:00.000Z",
  },
  {
    content: "블록체인 개발에 관심이 있는데 좋은 참고자료가 되었습니다.",
    userId: "user13",
    articleId: "article5",
    createdAt: "2024-01-20T11:45:00.000Z",
  },

  // Article 6에 대한 댓글들
  {
    content: "UI/UX 디자인 원칙을 명확하게 설명해주셨네요.",
    userId: "user14",
    articleId: "article6",
    createdAt: "2024-01-19T09:00:00.000Z",
  },
  {
    content: "실무에서 바로 적용해볼 수 있는 원칙들이에요.",
    userId: "user15",
    articleId: "article6",
    createdAt: "2024-01-19T10:15:00.000Z",
  },

  // Article 7에 대한 댓글들
  {
    content: "사이버 보안의 중요성을 다시 한번 느끼게 되네요.",
    userId: "user16",
    articleId: "article7",
    createdAt: "2024-01-18T09:30:00.000Z",
  },
  {
    content: "기업의 대응 방안이 매우 실용적입니다.",
    userId: "user17",
    articleId: "article7",
    createdAt: "2024-01-18T10:45:00.000Z",
  },
  {
    content: "보안 위협에 대한 인식을 높일 수 있는 좋은 글이에요.",
    userId: "user18",
    articleId: "article7",
    createdAt: "2024-01-18T11:20:00.000Z",
  },

  // Article 8에 대한 댓글들
  {
    content: "애자일 방법론의 실제 적용 사례가 도움이 되었습니다.",
    userId: "user19",
    articleId: "article8",
    createdAt: "2024-01-17T08:30:00.000Z",
  },
  {
    content: "주의점들을 미리 알 수 있어서 좋네요.",
    userId: "user20",
    articleId: "article8",
    createdAt: "2024-01-17T09:15:00.000Z",
  },

  // Article 9에 대한 댓글들
  {
    content: "머신러닝 프로젝트 시작하는데 큰 도움이 될 것 같아요!",
    userId: "user1",
    articleId: "article9",
    createdAt: "2024-01-16T08:45:00.000Z",
  },
  {
    content: "준비사항들이 체계적으로 정리되어 있네요.",
    userId: "user2",
    articleId: "article9",
    createdAt: "2024-01-16T09:30:00.000Z",
  },
  {
    content: "초보자도 따라할 수 있을 것 같습니다. 감사합니다!",
    userId: "user3",
    articleId: "article9",
    createdAt: "2024-01-16T10:20:00.000Z",
  },

  // Article 10에 대한 댓글들
  {
    content: "개발자의 성장 전략에 대해 깊이 생각해볼 수 있었습니다.",
    userId: "user4",
    articleId: "article10",
    createdAt: "2024-01-15T08:15:00.000Z",
  },
  {
    content: "경력 관리 방법이 특히 유용했어요.",
    userId: "user5",
    articleId: "article10",
    createdAt: "2024-01-15T09:00:00.000Z",
  },
  {
    content: "지속적인 학습의 중요성을 다시 한번 깨달았습니다.",
    userId: "user6",
    articleId: "article10",
    createdAt: "2024-01-15T10:30:00.000Z",
  },
];

export default commentMockData;
