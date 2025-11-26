import { v4 as uuidv4 } from "uuid";

interface MockArticle {
  id: string;
  userId: string;
  title: string;
  content: string;
  image: string[];
  likeCount: number;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const mockArticles = (userId: string, count = 50): MockArticle[] => {
  const titles = ["일상 기록", "오늘의 생각", "IT 트렌드", "여행 후기"];
  const contents = [
    "오늘은 새로운 프로젝트를 시작했다.",
    "요즘 인공지능 관련 뉴스가 흥미롭다.",
    "오랜만에 여행을 다녀왔다.",
    "개발자로서 성장하고 있다.",
  ];
  const images = ["article_1.jpg", "article_2.jpg", "article_3.jpg"];

  const articles: MockArticle[] = [];

  for (let i = 0; i < count; i++) {
    const title = titles[i % titles.length];
    const content = contents[i % contents.length];
    const image = [`/images/${images[i % images.length]}`];

    articles.push({
      id: uuidv4(),
      userId,
      title,
      content,
      image,
      likeCount: Math.floor(Math.random() * 501),
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  return articles;
};

export default mockArticles;
