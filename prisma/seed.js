// prisma/seed.js
import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log(" Seeding…");

  // ----- 상품 기본 데이터 -----
  const productsData = [
    {
      name: "테스트 티셔츠",
      description: "면 100% 반팔 티셔츠",
      price: 19900,
      tags: ["의류", "티셔츠"],
    },
    {
      name: "게이밍 마우스",
      description: "FPS에 최적화된 경량 마우스",
      price: 34900,
      tags: ["전자", "마우스"],
    },
    {
      name: "노트북 스탠드",
      description: "알루미늄 접이식 스탠드",
      price: 25900,
      tags: ["액세서리"],
    },
  ];

  // ----- 자유게시판 기본 데이터 -----
  const articlesData = [
    {
      title: "판다마켓 이용 꿀팁",
      content:
        "검색 키워드를 좁혀서 입력하면 원하는 상품을 더 빨리 찾을 수 있어요!",
    },
    {
      title: "첫 거래 후기",
      content:
        "안전거래로 첫 거래 성공했습니다. 판매자/구매자 매너 최고였어요 :)",
    },
  ];

  // 이미 있으면 중복 삽입 방지 (테이블이 비었을 때만 넣기)
  const pCount = await prisma.product.count();
  if (pCount === 0) {
    const createdProducts = [];
    for (const p of productsData) {
      const created = await prisma.product.create({ data: p });
      createdProducts.push(created);
    }
    console.log(` Products inserted: ${createdProducts.length}`);

    // 각 상품에 댓글 2개씩 (중고마켓 댓글)
    for (const prod of createdProducts) {
      await prisma.marketComment.createMany({
        data: [
          { content: `${prod.name} 좋아요!`, productId: prod.id },
          { content: `${prod.name} 상태 어떤가요?`, productId: prod.id },
        ],
      });
    }
  } else {
    console.log(`ℹ Products already exist: ${pCount} rows, skip seeding`);
  }

  const aCount = await prisma.article.count();
  if (aCount === 0) {
    const createdArticles = [];
    for (const a of articlesData) {
      const created = await prisma.article.create({ data: a });
      createdArticles.push(created);
    }
    console.log(` Articles inserted: ${createdArticles.length}`);

    // 각 게시글에 댓글 2개씩 (자유게시판 댓글)
    for (const art of createdArticles) {
      await prisma.articleComment.createMany({
        data: [
          { content: "첫 댓글!", articleId: art.id },
          { content: "좋은 글 감사합니다.", articleId: art.id },
        ],
      });
    }
  } else {
    console.log(`ℹ Articles already exist: ${aCount} rows, skip seeding`);
  }

  console.log(" Seed completed");
}

main()
  .catch((e) => {
    console.error(" Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
