import mockData from "./mock.js";
import prisma from "../config/database.js";
import articleMockData from "./articleMock.js";
import userMockData from "./userMock.js";
import commentMockData from "./commentMock.js";

const seedDB = async () => {
  try {
    // 기존 데이터 삭제 (외래키 제약조건 때문에 순서 중요)
    await prisma.articleLike.deleteMany();
    await prisma.productLike.deleteMany();
    await prisma.comment.deleteMany();
    await prisma.article.deleteMany();
    await prisma.product.deleteMany();
    await prisma.user.deleteMany();

    console.log("기존 데이터 삭제 완료");

    // 사용자 데이터 삽입 (다른 테이블에서 참조하므로 먼저 삽입)
    const createdUsers = [];
    for (const userData of userMockData) {
      const user = await prisma.user.create({
        data: userData,
      });
      createdUsers.push(user);
    }
    console.log(`사용자 데이터 삽입 완료: ${createdUsers.length}명`);

    // 제품 데이터 삽입 (userId 필요)
    const createdProducts = [];
    for (let i = 0; i < mockData.length; i++) {
      const productData = mockData[i];
      const randomUser =
        createdUsers[Math.floor(Math.random() * createdUsers.length)];

      const product = await prisma.product.create({
        data: {
          name: productData.name,
          description: productData.description,
          price: productData.price,
          likeCount: productData.likes || 0,
          userId: randomUser.id,
          createdAt: productData.createdAt,
        },
      });
      createdProducts.push(product);
    }
    console.log(`제품 데이터 삽입 완료: ${createdProducts.length}개`);

    // 게시글 데이터 삽입 (userId 필요)
    const createdArticles = [];
    for (let i = 0; i < articleMockData.length; i++) {
      const articleData = articleMockData[i];
      const randomUser =
        createdUsers[Math.floor(Math.random() * createdUsers.length)];

      const article = await prisma.article.create({
        data: {
          title: articleData.title,
          content: articleData.content,
          likeCount: articleData.likes || 0,
          userId: randomUser.id,
          createdAt: articleData.createdAt,
        },
      });
      createdArticles.push(article);
    }
    console.log(`게시글 데이터 삽입 완료: ${createdArticles.length}개`);

    // 댓글 데이터 삽입 (실제 userId와 articleId 사용)
    const createdComments = [];
    for (const commentData of commentMockData) {
      const randomUser =
        createdUsers[Math.floor(Math.random() * createdUsers.length)];
      const randomArticle =
        createdArticles[Math.floor(Math.random() * createdArticles.length)];

      const comment = await prisma.comment.create({
        data: {
          content: commentData.content,
          userId: randomUser.id,
          articleId: randomArticle.id,
          createdAt: commentData.createdAt,
        },
      });
      createdComments.push(comment);
    }
    console.log(`댓글 데이터 삽입 완료: ${createdComments.length}개`);

    // Article 좋아요 데이터 삽입 (실제 userId와 articleId 사용)
    const createdArticleLikes = [];
    for (let i = 0; i < 50; i++) {
      // 50개의 좋아요 생성
      const randomUser =
        createdUsers[Math.floor(Math.random() * createdUsers.length)];
      const randomArticle =
        createdArticles[Math.floor(Math.random() * createdArticles.length)];

      try {
        const articleLike = await prisma.articleLike.create({
          data: {
            userId: randomUser.id,
            articleId: randomArticle.id,
            createdAt: new Date(
              Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)
            ), // 지난 30일 내 랜덤
          },
        });
        createdArticleLikes.push(articleLike);
      } catch (error) {
        // 중복 좋아요는 무시 (unique constraint)
        continue;
      }
    }
    console.log(
      `게시글 좋아요 데이터 삽입 완료: ${createdArticleLikes.length}개`
    );

    // Product 좋아요 데이터 삽입 (실제 userId와 productId 사용)
    const createdProductLikes = [];
    for (let i = 0; i < 50; i++) {
      // 50개의 좋아요 생성
      const randomUser =
        createdUsers[Math.floor(Math.random() * createdUsers.length)];
      const randomProduct =
        createdProducts[Math.floor(Math.random() * createdProducts.length)];

      try {
        const productLike = await prisma.productLike.create({
          data: {
            userId: randomUser.id,
            productId: randomProduct.id,
            createdAt: new Date(
              Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)
            ), // 지난 30일 내 랜덤
          },
        });
        createdProductLikes.push(productLike);
      } catch (error) {
        // 중복 좋아요는 무시 (unique constraint)
        continue;
      }
    }
    console.log(
      `제품 좋아요 데이터 삽입 완료: ${createdProductLikes.length}개`
    );

    console.log("모든 데이터베이스 시딩 완료");
    console.log(`총 생성된 데이터:
    - 사용자: ${createdUsers.length}명
    - 제품: ${createdProducts.length}개
    - 게시글: ${createdArticles.length}개
    - 댓글: ${createdComments.length}개
    - 게시글 좋아요: ${createdArticleLikes.length}개
    - 제품 좋아요: ${createdProductLikes.length}개`);
  } catch (error) {
    console.error("데이터베이스 시딩 실패", error);
  } finally {
    await prisma.$disconnect();
  }
};

seedDB();
