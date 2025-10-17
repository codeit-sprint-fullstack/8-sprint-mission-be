/* eslint-disable no-console */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding start...');

  // 1) 기존 데이터 정리 (FK 순서 유의)
  await prisma.comment.deleteMany();
  await prisma.productFavorite.deleteMany();
  await prisma.product.deleteMany();
  await prisma.article.deleteMany();
  await prisma.user.deleteMany();

  // 2) 사용자 생성
  const usersData = [
    {
      email: 'user1@example.com',
      nickname: '철수',
      password: 'hashed_password_1',
    },
    {
      email: 'user2@example.com',
      nickname: '영희',
      password: 'hashed_password_2',
    },
    {
      email: 'user3@example.com',
      nickname: '민수',
      password: 'hashed_password_3',
    },
  ];

  const createdUsers = await Promise.all(
    usersData.map(data => prisma.user.create({ data })),
  );

  // 3) 제품 더미 데이터 생성
  const productsData = [
    {
      userId: createdUsers[0].id,
      name: 'Wireless Keyboard',
      description: '저소음 무선 키보드',
      price: 49900,
      tags: ['electronics', 'peripherals', 'wireless'],
      favoriteCount: 42,
    },
    {
      userId: createdUsers[1].id,
      name: 'Noise Cancelling Headphones',
      description: '액티브 노이즈 캔슬링 헤드폰',
      price: 199000,
      tags: ['audio', 'electronics'],
      favoriteCount: 128,
    },
    {
      userId: createdUsers[0].id,
      name: 'Coffee Mug',
      description: '보온 보냉 머그컵 350ml',
      price: 14500,
      tags: ['kitchen', 'mug'],
      favoriteCount: 35,
    },
    {
      userId: createdUsers[2].id,
      name: 'Running Shoes',
      description: '가볍고 편안한 러닝화',
      price: 89900,
      tags: ['sports', 'shoes'],
      favoriteCount: 91,
    },
    {
      userId: createdUsers[1].id,
      name: 'LED Monitor 27"',
      description: '27인치 1440p IPS 모니터',
      price: 279900,
      tags: ['electronics', 'monitor', 'display'],
      favoriteCount: 203,
    },
  ];

  const createdProducts = await Promise.all(
    productsData.map(data => prisma.product.create({ data })),
  );

  // 4) 게시글 더미 데이터 생성
  const articlesData = [
    {
      userId: createdUsers[0].id,
      title: 'Prisma로 시작하는 백엔드 개발',
      content: 'Prisma 스키마 정의부터 Client 사용까지 기본기를 정리합니다.',
    },
    {
      userId: createdUsers[1].id,
      title: 'PostgreSQL 성능 튜닝 팁',
      content: '인덱스 전략과 실행계획을 통해 쿼리 성능을 개선합니다.',
    },
    {
      userId: createdUsers[2].id,
      title: 'TypeScript로 Node.js 프로젝트 구조화하기',
      content: '레이어드 구조와 타입 세이프티를 챙기는 방법을 다룹니다.',
    },
  ];

  const createdArticles = await Promise.all(
    articlesData.map(data => prisma.article.create({ data })),
  );

  // 5) 각 제품/글에 코멘트 생성
  const productComments = createdProducts.flatMap((p, i) => [
    prisma.comment.create({
      data: {
        userId: createdUsers[i % createdUsers.length].id,
        content: `이 제품 정말 좋아요! (${i + 1})`,
        productId: p.id,
      },
    }),
    prisma.comment.create({
      data: {
        userId: createdUsers[(i + 1) % createdUsers.length].id,
        content: `가격 대비 만족스럽습니다. (${i + 1})`,
        productId: p.id,
      },
    }),
  ]);

  const articleComments = createdArticles.flatMap((a, i) => [
    prisma.comment.create({
      data: {
        userId: createdUsers[i % createdUsers.length].id,
        content: `유익한 글 감사합니다. (${i + 1})`,
        articleId: a.id,
      },
    }),
    prisma.comment.create({
      data: {
        userId: createdUsers[(i + 1) % createdUsers.length].id,
        content: `추가로 예제를 더 보고 싶어요. (${i + 1})`,
        articleId: a.id,
      },
    }),
  ]);

  await Promise.all([...productComments, ...articleComments]);

  // 6) 제품 좋아요 생성
  const productFavorites = [
    prisma.productFavorite.create({
      data: {
        userId: createdUsers[0].id,
        productId: createdProducts[1].id,
        favoriteState: true,
      },
    }),
    prisma.productFavorite.create({
      data: {
        userId: createdUsers[1].id,
        productId: createdProducts[0].id,
        favoriteState: true,
      },
    }),
    prisma.productFavorite.create({
      data: {
        userId: createdUsers[2].id,
        productId: createdProducts[4].id,
        favoriteState: true,
      },
    }),
  ];

  await Promise.all(productFavorites);

  console.log(
    `Seeded: users=${createdUsers.length}, products=${createdProducts.length}, articles=${createdArticles.length}, comments=${productComments.length + articleComments.length}, favorites=${productFavorites.length}`,
  );
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log('Seeding done.');
  });
