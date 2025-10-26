import prisma from "../config/prisma.js";
import bcrypt from "bcrypt";
import User from "./mockUser.js";
import mockArticles from "./mockArticles.js";
import mockProducts from "./mockProduct.js";
import mockComments from "./mockComments.js";
import mockFavorite from "./mockFavorite.js";
import mockLike from "./mockLike.js";

async function main() {
  // 기존 데이터 삭제
  await prisma.comment.deleteMany();
  await prisma.favorite.deleteMany();
  await prisma.like.deleteMany();
  await prisma.product.deleteMany();
  await prisma.article.deleteMany();
  await prisma.user.deleteMany();

  // 목 데이터 삽입
  const SALT_ROUNDS = 10;
  const hashedUsers = await Promise.all(
    User.map(async (user) => ({
      ...user,
      encryptedPassword: await bcrypt.hash(user.encryptedPassword, SALT_ROUNDS),
    }))
  );

  await prisma.user.createMany({
    data: hashedUsers,
    skipDuplicates: true,
  });

  const productsData = [];
  const articlesData = [];
  const commentsData = [];
  const favoritesData = [];
  const likesData = [];

  for (const user of User) {
    const userProducts = mockProducts(user.id, 20);
    const userArticles = mockArticles(user.id, 20);
    const userComments = mockComments(user.id, userArticles, userProducts, 10);

    productsData.push(...userProducts);
    articlesData.push(...userArticles);
    commentsData.push(...userComments);
    favoritesData.push(...mockFavorite(User, productsData));
    likesData.push(...mockLike(User, articlesData));
  }

  await prisma.product.createMany({ data: productsData, skipDuplicates: true });
  await prisma.article.createMany({ data: articlesData, skipDuplicates: true });
  await prisma.comment.createMany({ data: commentsData, skipDuplicates: true });
  await prisma.favorite.createMany({
    data: favoritesData,
    skipDuplicates: true,
  });
  await prisma.like.createMany({ data: likesData, skipDuplicates: true });

  console.log("Seeding completed.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
