import prisma from '../src/middlewares/prisma.js';
import bcrypt from 'bcrypt';

const seedDB = async () => {
  try {
    console.log('🌱 시드 데이터 생성 시작...');

    // 1. 사용자 데이터 생성
    const hashedPassword = await bcrypt.hash('password123', 10);

    const users = await prisma.user.createMany({
      data: [
        {
          email: 'user1@example.com',
          nickname: '사용자1',
          encryptedPassword: hashedPassword,
          image: 'https://example.com/user1.jpg',
        },
        {
          email: 'user2@example.com',
          nickname: '사용자2',
          encryptedPassword: hashedPassword,
          image: 'https://example.com/user2.jpg',
        },
        {
          email: 'user3@example.com',
          nickname: '사용자3',
          encryptedPassword: hashedPassword,
          image: 'https://example.com/user3.jpg',
        },
      ],
    });
    console.log('✅ 사용자 데이터 생성 완료');

    // 생성된 사용자들 조회
    const createdUsers = await prisma.user.findMany();
    const user1 = createdUsers[0];
    const user2 = createdUsers[1];
    const user3 = createdUsers[2];

    // 2. 상품 데이터 생성
    const products = await prisma.product.createMany({
      data: [
        {
          name: '맥북 프로 16인치',
          description: '최신 M3 칩이 탑재된 맥북 프로입니다.',
          image: 'https://example.com/macbook.jpg',
          price: 2500000,
          tags: ['노트북', '애플', '프리미엄'],
          ownerId: user1.id,
        },
        {
          name: '아이폰 15 프로',
          description: '최신 아이폰 15 프로 모델입니다.',
          image: 'https://example.com/iphone.jpg',
          price: 1500000,
          tags: ['스마트폰', '애플', '프리미엄'],
          ownerId: user1.id,
        },
        {
          name: '에어팟 프로',
          description: '노이즈 캔슬링이 적용된 에어팟 프로입니다.',
          image: 'https://example.com/airpods.jpg',
          price: 350000,
          tags: ['이어폰', '애플', '무선'],
          ownerId: user2.id,
        },
        {
          name: '갤럭시 S24 울트라',
          description: '삼성의 최신 플래그십 스마트폰입니다.',
          image: 'https://example.com/galaxy.jpg',
          price: 1400000,
          tags: ['스마트폰', '삼성', '안드로이드'],
          ownerId: user2.id,
        },
        {
          name: '소니 WH-1000XM5',
          description: '업계 최고 수준의 노이즈 캔슬링 헤드폰입니다.',
          image: 'https://example.com/sony.jpg',
          price: 450000,
          tags: ['헤드폰', '소니', '노이즈캔슬링'],
          ownerId: user3.id,
        },
      ],
    });
    console.log('✅ 상품 데이터 생성 완료');

    // 생성된 상품들 조회
    const createdProducts = await prisma.product.findMany();

    // 3. 게시글 데이터 생성
    const articles = await prisma.article.createMany({
      data: [
        {
          title: '맥북 프로 사용 후기',
          content:
            '맥북 프로를 3개월간 사용해본 솔직한 후기를 공유합니다. 성능은 정말 뛰어나지만 가격이 부담스럽네요.',
          ownerId: user1.id,
        },
        {
          title: '아이폰 vs 갤럭시 비교',
          content:
            '아이폰과 갤럭시의 장단점을 객관적으로 비교해보았습니다. 각각의 장점이 명확하네요.',
          ownerId: user2.id,
        },
        {
          title: '무선 이어폰 추천',
          content:
            '다양한 무선 이어폰을 사용해본 경험을 바탕으로 추천드립니다. 가성비와 성능을 모두 고려했습니다.',
          ownerId: user3.id,
        },
        {
          title: '노이즈 캔슬링 헤드폰 리뷰',
          content: '소니 WH-1000XM5와 에어팟 프로의 노이즈 캔슬링 성능을 비교해보았습니다.',
          ownerId: user1.id,
        },
        {
          title: '스마트폰 카메라 비교',
          content: '최신 스마트폰들의 카메라 성능을 직접 테스트해본 결과를 공유합니다.',
          ownerId: user2.id,
        },
      ],
    });
    console.log('✅ 게시글 데이터 생성 완료');

    // 생성된 게시글들 조회
    const createdArticles = await prisma.article.findMany();

    // 4. 상품 좋아요 데이터 생성
    const productLikes = await prisma.productLike.createMany({
      data: [
        { userId: user2.id, productId: createdProducts[0].id }, // user2가 맥북에 좋아요
        { userId: user3.id, productId: createdProducts[0].id }, // user3가 맥북에 좋아요
        { userId: user1.id, productId: createdProducts[2].id }, // user1이 에어팟에 좋아요
        { userId: user3.id, productId: createdProducts[2].id }, // user3이 에어팟에 좋아요
        { userId: user1.id, productId: createdProducts[3].id }, // user1이 갤럭시에 좋아요
        { userId: user2.id, productId: createdProducts[4].id }, // user2가 소니 헤드폰에 좋아요
      ],
    });
    console.log('✅ 상품 좋아요 데이터 생성 완료');

    // 5. 게시글 좋아요 데이터 생성
    const articleLikes = await prisma.articleLike.createMany({
      data: [
        { userId: user2.id, articleId: createdArticles[0].id }, // user2가 맥북 후기에 좋아요
        { userId: user3.id, articleId: createdArticles[0].id }, // user3이 맥북 후기에 좋아요
        { userId: user1.id, articleId: createdArticles[1].id }, // user1이 아이폰 vs 갤럭시에 좋아요
        { userId: user3.id, articleId: createdArticles[1].id }, // user3이 아이폰 vs 갤럭시에 좋아요
        { userId: user1.id, articleId: createdArticles[2].id }, // user1이 무선 이어폰 추천에 좋아요
        { userId: user2.id, articleId: createdArticles[2].id }, // user2가 무선 이어폰 추천에 좋아요
      ],
    });
    console.log('✅ 게시글 좋아요 데이터 생성 완료');

    // 6. 상품 댓글 데이터 생성
    const productComments = await prisma.productComment.createMany({
      data: [
        {
          content: '정말 좋은 상품이네요! 구매를 고려해보겠습니다.',
          ownerId: user2.id,
          productId: createdProducts[0].id,
        },
        {
          content: '가격이 좀 부담스럽지만 성능은 확실하네요.',
          ownerId: user3.id,
          productId: createdProducts[0].id,
        },
        {
          content: '에어팟 프로 정말 추천합니다!',
          ownerId: user1.id,
          productId: createdProducts[2].id,
        },
        {
          content: '갤럭시도 좋은 선택이네요.',
          ownerId: user3.id,
          productId: createdProducts[3].id,
        },
      ],
    });
    console.log('✅ 상품 댓글 데이터 생성 완료');

    // 7. 게시글 댓글 데이터 생성
    const articleComments = await prisma.articleComment.createMany({
      data: [
        {
          content: '맥북 후기 정말 도움이 되었습니다!',
          ownerId: user2.id,
          articleId: createdArticles[0].id,
        },
        {
          content: '저도 맥북 사용 중인데 동감합니다.',
          ownerId: user3.id,
          articleId: createdArticles[0].id,
        },
        {
          content: '아이폰과 갤럭시 비교 정말 유용하네요.',
          ownerId: user1.id,
          articleId: createdArticles[1].id,
        },
        {
          content: '무선 이어폰 추천 감사합니다!',
          ownerId: user2.id,
          articleId: createdArticles[2].id,
        },
      ],
    });
    console.log('✅ 게시글 댓글 데이터 생성 완료');

    // 8. 상품과 게시글의 좋아요 수 업데이트
    for (const product of createdProducts) {
      const likeCount = await prisma.productLike.count({
        where: { productId: product.id },
      });
      await prisma.product.update({
        where: { id: product.id },
        data: { likeCount },
      });
    }

    for (const article of createdArticles) {
      const likeCount = await prisma.articleLike.count({
        where: { articleId: article.id },
      });
      await prisma.article.update({
        where: { id: article.id },
        data: { likeCount },
      });
    }

    console.log('✅ 좋아요 수 업데이트 완료');
    console.log('🎉 시드 데이터 생성 완료!');
  } catch (error) {
    console.error('❌ 시드 데이터 생성 실패:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

// 스크립트로 직접 실행될 때만 seedDB 실행
if (import.meta.url === `file://${process.argv[1]}`) {
  seedDB()
    .then(() => {
      console.log('✅ 시드 스크립트 완료');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ 시드 스크립트 실패:', error);
      process.exit(1);
    });
}

export default seedDB;
