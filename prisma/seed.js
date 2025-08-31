import { PrismaClient } from "@prisma/client";
import { Articledata } from "./mockArticles.js";

const prisma = new PrismaClient();

async function main() {
  // 기존 데이터 삭제
  await prisma.article.deleteMany();

  // 목 데이터 삽입
  await prisma.article.createMany({
    data: Articledata,
    skipDuplicates: true,
  });
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
