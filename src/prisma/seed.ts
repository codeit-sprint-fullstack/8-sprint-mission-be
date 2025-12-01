import prisma from "../config/prisma";
import bcrypt from "bcrypt";
import mockUsers from "./mockUser";
import mockArticles from "./mockArticles";
import mockProducts from "./mockProduct";
import mockComments from "./mockComments";
import mockFavorite from "./mockFavorite";
import mockLike from "./mockLike";
import {
  User,
  Product,
  Article,
  Comment,
  Favorite,
  Like,
} from "@prisma/client";

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
    mockUsers.map(async (user) => ({
      ...user,
      encryptedPassword: await bcrypt.hash(user.encryptedPassword, SALT_ROUNDS),
    }))
  );

  await prisma.user.createMany({
    data: hashedUsers,
    skipDuplicates: true,
  });

  const productsData: Product[] = [];
  const articlesData: Article[] = [];
  const commentsData: Comment[] = [];
  const favoritesData: Favorite[] = [];
  const likesData: Like[] = [];

  for (const user of hashedUsers) {
    const userProducts = mockProducts(user.id, 20);
    const userArticles = mockArticles(user.id, 20);
    const userComments = mockComments(user, userArticles, userProducts, 10);

    productsData.push(...userProducts);
    articlesData.push(...userArticles);
    commentsData.push(...userComments);

    favoritesData.push(...mockFavorite(hashedUsers, productsData));
    likesData.push(...mockLike(hashedUsers, articlesData));
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
