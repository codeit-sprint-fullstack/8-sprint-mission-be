import prisma from "../config/prisma.js";
import bcrypt from "bcrypt";
import User from "./mockUser.js";
import mockArticles from "./mockArticles.js";
import mockProducts from "./mockProduct.js";
import mockComments from "./mockComments.js";

async function main() {
  // 기존 데이터 삭제
  await prisma.comment.deleteMany();
  // await prisma.favorite.deleteMany();
  // await prisma.like.deleteMany();
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

  for (const user of User) {
    productsData.push(...mockProducts(user.id, 10));
    articlesData.push(...mockArticles(user.id, 5));
    commentsData.push(
      ...mockComments(
        user.id,
        mockArticles(user.id, 5),
        mockProducts(user.id, 10),
        20
      )
    );
  }

  await prisma.product.createMany({ data: productsData, skipDuplicates: true });
  await prisma.article.createMany({ data: articlesData, skipDuplicates: true });
  await prisma.comment.createMany({ data: commentsData, skipDuplicates: true });

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
