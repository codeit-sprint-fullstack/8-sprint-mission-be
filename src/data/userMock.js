const userMockData = [
  {
    email: "admin@example.com",
    nickname: "관리자",
    password: "$2b$10$ba5vqNtqi.IpQJvVoRZsgOF3.DcF1MgAL82Kl5tOygy5YT7iWg32G", // password123
    createdAt: "2024-01-01T00:00:00.000Z",
  },
  {
    email: "kim.tech@example.com",
    nickname: "김기술",
    password: "$2b$10$Y5AOTLdKGQauiP6FaHtnUetPMzIgoV5x6tuveCKzFyrzeGwArv/..",
    createdAt: "2024-01-02T00:00:00.000Z",
  },
  {
    email: "lee.coding@example.com",
    nickname: "이코딩",
    password: "$2b$10$M7DIAhZcU0k539EbRIgJ7uPccJ8H8aQa1dwdPomP38C/hHqSaw.v6",
    createdAt: "2024-01-03T00:00:00.000Z",
  },
  {
    email: "park.cloud@example.com",
    nickname: "박클라우드",
    password: "$2b$10$tXgljXTgwnjd8/YNNcElx.iyRJWanzufOy9jBGPFHft7cMhJEvdjO",
    createdAt: "2024-01-04T00:00:00.000Z",
  },
  {
    email: "jung.data@example.com",
    nickname: "정데이터",
    password: "$2b$10$ySI8xHEeHVwNUQMvtHO.6.HudNI1SY6Vhw.IgpHWGASSQXf11Sya6",
    createdAt: "2024-01-05T00:00:00.000Z",
  },
  {
    email: "choi.block@example.com",
    nickname: "최블록",
    password: "$2b$10$ba5vqNtqi.IpQJvVoRZsgOF3.DcF1MgAL82Kl5tOygy5YT7iWg32G",
    createdAt: "2024-01-06T00:00:00.000Z",
  },
  {
    email: "han.design@example.com",
    nickname: "한디자인",
    password: "$2b$10$Y5AOTLdKGQauiP6FaHtnUetPMzIgoV5x6tuveCKzFyrzeGwArv/..",
    createdAt: "2024-01-07T00:00:00.000Z",
  },
  {
    email: "kang.security@example.com",
    nickname: "강보안",
    password: "$2b$10$M7DIAhZcU0k539EbRIgJ7uPccJ8H8aQa1dwdPomP38C/hHqSaw.v6",
    createdAt: "2024-01-08T00:00:00.000Z",
  },
  {
    email: "yoon.agile@example.com",
    nickname: "윤애자일",
    password: "$2b$10$tXgljXTgwnjd8/YNNcElx.iyRJWanzufOy9jBGPFHft7cMhJEvdjO",
    createdAt: "2024-01-09T00:00:00.000Z",
  },
  {
    email: "song.machine@example.com",
    nickname: "송머신",
    password: "$2b$10$ySI8xHEeHVwNUQMvtHO.6.HudNI1SY6Vhw.IgpHWGASSQXf11Sya6",
    createdAt: "2024-01-10T00:00:00.000Z",
  },
  {
    email: "jo.growth@example.com",
    nickname: "조성장",
    password: "$2b$10$ba5vqNtqi.IpQJvVoRZsgOF3.DcF1MgAL82Kl5tOygy5YT7iWg32G",
    createdAt: "2024-01-11T00:00:00.000Z",
  },
  {
    email: "baek.open@example.com",
    nickname: "백오픈",
    password: "$2b$10$Y5AOTLdKGQauiP6FaHtnUetPMzIgoV5x6tuveCKzFyrzeGwArv/..",
    createdAt: "2024-01-12T00:00:00.000Z",
  },
  {
    email: "shin.review@example.com",
    nickname: "신리뷰",
    password: "$2b$10$M7DIAhZcU0k539EbRIgJ7uPccJ8H8aQa1dwdPomP38C/hHqSaw.v6",
    createdAt: "2024-01-13T00:00:00.000Z",
  },
  {
    email: "lim.test@example.com",
    nickname: "임테스트",
    password: "$2b$10$tXgljXTgwnjd8/YNNcElx.iyRJWanzufOy9jBGPFHft7cMhJEvdjO",
    createdAt: "2024-01-14T00:00:00.000Z",
  },
  {
    email: "kwon.micro@example.com",
    nickname: "권마이크로",
    password: "$2b$10$ySI8xHEeHVwNUQMvtHO.6.HudNI1SY6Vhw.IgpHWGASSQXf11Sya6",
    createdAt: "2024-01-15T00:00:00.000Z",
  },
  {
    email: "hwang.digital@example.com",
    nickname: "황디지털",
    password: "$2b$10$ba5vqNtqi.IpQJvVoRZsgOF3.DcF1MgAL82Kl5tOygy5YT7iWg32G",
    createdAt: "2024-01-16T00:00:00.000Z",
  },
  {
    email: "kim.cheolsu@example.com",
    nickname: "김철수",
    password: "$2b$10$Y5AOTLdKGQauiP6FaHtnUetPMzIgoV5x6tuveCKzFyrzeGwArv/..",
    createdAt: "2024-01-17T00:00:00.000Z",
  },
  {
    email: "lee.younghee@example.com",
    nickname: "이영희",
    password: "$2b$10$M7DIAhZcU0k539EbRIgJ7uPccJ8H8aQa1dwdPomP38C/hHqSaw.v6",
    createdAt: "2024-01-18T00:00:00.000Z",
  },
  {
    email: "park.minsu@example.com",
    nickname: "박민수",
    password: "$2b$10$tXgljXTgwnjd8/YNNcElx.iyRJWanzufOy9jBGPFHft7cMhJEvdjO",
    createdAt: "2024-01-19T00:00:00.000Z",
  },
  {
    email: "jung.suhyun@example.com",
    nickname: "정수현",
    password: "$2b$10$ySI8xHEeHVwNUQMvtHO.6.HudNI1SY6Vhw.IgpHWGASSQXf11Sya6",
    createdAt: "2024-01-20T00:00:00.000Z",
  },
];

export default userMockData;
