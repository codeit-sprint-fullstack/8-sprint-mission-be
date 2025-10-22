const mockComments = (userId, articles = [], products = [], count = 200) => {
  const contents = [
    "좋은 글이에요!",
    "흥미로운 상품이네요.",
    "공감됩니다.",
    "가격이 괜찮네요.",
    "잘 보고 갑니다.",
  ];

  const comments = [];

  for (let i = 0; i < count; i++) {
    const targetType = Math.random() < 0.5 ? "article" : "product";
    const content = contents[i % contents.length];

    comments.push({
      id: `comment-${userId}-${i + 1}`,
      userId,
      articleId:
        targetType === "article" && articles.length
          ? articles[i % articles.length].id
          : null,
      productId:
        targetType === "product" && products.length
          ? products[i % products.length].id
          : null,
      content,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  return comments;
};

export default mockComments;
