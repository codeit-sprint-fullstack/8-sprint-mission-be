import mockData from "./mock.js";
import prisma from "../config/database.js";
import articleMockData from "./articleMock.js";

const seedDB = async () => {
  try {
    // 기존 데이터 삭제
    await prisma.article.deleteMany();
    // await prisma.product.deleteMany();

    // mock 데이터 삽입
    // await prisma.product.createMany({
    //   data: mockData,
    // });

    await prisma.article.createMany({
      data: articleMockData,
    });

    console.log("데이터베이스 시딩 완료");
  } catch (error) {
    console.error("데이터베이스 시딩 실패", error);
  } finally {
    await prisma.$disconnect();
  }
};

seedDB();
