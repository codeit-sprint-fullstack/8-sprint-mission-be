import { v4 as uuidv4 } from "uuid";

interface User {
  id: string;
}

interface Article {
  id: string;
}

interface Product {
  id: string;
}

interface Comment {
  id: string;
  userId: string;
  articleId: string | null;
  productId: string | null;
  content: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const mockComments = (
  user: User,
  articles: Article[] = [],
  products: Product[] = [],
  count = 50
): Comment[] => {
  const contents = [
    "좋은 글이에요!",
    "흥미로운 상품이네요.",
    "공감됩니다.",
    "가격이 괜찮네요.",
    "잘 보고 갑니다.",
  ];

  const comments: Comment[] = [];

  for (let i = 0; i < count; i++) {
    const targetType = Math.random() < 0.5 ? "article" : "product";
    const content = contents[i % contents.length];

    const articleId =
      targetType === "article" && articles.length
        ? articles[i % articles.length].id
        : null;

    const productId =
      targetType === "product" && products.length
        ? products[i % products.length].id
        : null;

    comments.push({
      id: uuidv4(),
      userId: user.id,
      articleId,
      productId,
      content,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  return comments;
};

export default mockComments;
