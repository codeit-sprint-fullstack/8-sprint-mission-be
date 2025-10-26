const mockFavorite = (users, products) => {
  const favorites = [];
  const hotProducts = products.slice(0, 5); // 상위 5개 상품을 베스트 후보로 지정

  for (const user of users) {
    // 일부 인기 상품에 집중적으로 좋아요
    hotProducts.forEach((product) => {
      favorites.push({
        id: `favorite-${user.id}-${product.id}`,
        userId: user.id,
        productId: product.id,
        createdAt: new Date(),
      });
    });

    // 나머지 상품에 소량의 랜덤 좋아요
    const randomProducts = products.sort(() => 0.5 - Math.random()).slice(0, 5);

    randomProducts.forEach((product) => {
      // 중복 방지
      if (
        favorites.some(
          (l) => l.userId === user.id && l.productId === product.id
        )
      )
        return;
      favorites.push({
        id: `favorite-${user.id}-${product.id}`,
        userId: user.id,
        productId: product.id,
        createdAt: new Date(),
      });
    });
  }

  return favorites;
};

export default mockFavorite;
