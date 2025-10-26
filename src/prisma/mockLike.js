const mockLike = (users, articles) => {
  const likes = [];
  const hotArticles = articles.slice(0, 5); // 상위 5개 게시글에 집중 좋아요

  for (const user of users) {
    // 인기 게시글(상위 5개)에 모두 좋아요
    hotArticles.forEach((article) => {
      likes.push({
        id: `like-${user.id}-${article.id}`,
        userId: user.id,
        articleId: article.id,
        createdAt: new Date(),
      });
    });

    // 나머지 게시글 중 일부를 랜덤하게 좋아요
    const randomArticles = articles.sort(() => 0.5 - Math.random()).slice(0, 5);

    randomArticles.forEach((article) => {
      // 중복 방지
      if (likes.some((l) => l.userId === user.id && l.articleId === article.id))
        return;
      likes.push({
        id: `like-${user.id}-${article.id}`,
        userId: user.id,
        articleId: article.id,
        createdAt: new Date(),
      });
    });
  }

  return likes;
};

export default mockLike;
