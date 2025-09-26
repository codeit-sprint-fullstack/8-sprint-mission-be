import prisma from '../src/lib/prisma.js';

const mockProducts = [
  {
    name: 'MacBook Pro 16-inch',
    description: 'Apple의 최고 성능 노트북으로 M3 Pro/M3 Max 칩셋을 탑재했습니다.',
    price: 2990000,
    tags: ['노트북', '애플', '프리미엄', '개발용'],
  },
  {
    name: 'iPhone 15 Pro',
    description: '최신 A17 Pro 칩셋과 티타늄 디자인이 적용된 애플의 플래그십 스마트폰입니다.',
    price: 1350000,
    tags: ['스마트폰', '애플', '프리미엄', '카메라'],
  },
  {
    name: 'Samsung Galaxy S24 Ultra',
    description: 'S펜과 200MP 카메라를 탑재한 삼성의 최고급 스마트폰입니다.',
    price: 1450000,
    tags: ['스마트폰', '삼성', 'S펜', '카메라'],
  },
  {
    name: 'AirPods Pro 2세대',
    description: '적응형 노이즈 캔슬링과 공간 음향을 지원하는 무선 이어폰입니다.',
    price: 329000,
    tags: ['이어폰', '애플', '무선', '노이즈캔슬링'],
  },
  {
    name: 'iPad Air 5세대',
    description: 'M1 칩셋을 탑재한 태블릿으로 크리에이티브 작업에 최적화되어 있습니다.',
    price: 799000,
    tags: ['태블릿', '애플', 'M1', '크리에이티브'],
  },
  {
    name: 'Dell XPS 13',
    description: '인피니티엣지 디스플레이와 13세대 인텔 프로세서를 탑재한 울트라북입니다.',
    price: 1890000,
    tags: ['노트북', '델', '울트라북', '인텔'],
  },
  {
    name: 'Sony WH-1000XM5',
    description: '업계 최고 수준의 노이즈 캔슬링 헤드폰입니다.',
    price: 499000,
    tags: ['헤드폰', '소니', '노이즈캔슬링', '무선'],
  },
  {
    name: 'Nintendo Switch OLED',
    description: '7인치 OLED 디스플레이와 향상된 스피커를 탑재한 게임 콘솔입니다.',
    price: 449000,
    tags: ['게임콘솔', '닌텐도', 'OLED', '휴대용'],
  },
];

const mockArticles = [
  {
    title: '2024년 최고의 노트북 추천',
    content:
      '2024년 시장에서 주목받는 노트북들을 소개합니다. 성능, 가격, 디자인을 종합적으로 고려한 추천 리스트입니다.',
    like: 3,
  },
  {
    title: '스마트폰 카메라 기술의 발전',
    content:
      '최근 스마트폰 카메라 기술이 급속도로 발전하고 있습니다. AI 기반 이미지 처리부터 다중 카메라 시스템까지 살펴보겠습니다.',
    like: 10,
  },
  {
    title: '무선 이어폰의 노이즈 캔슬링 기술',
    content:
      '무선 이어폰의 노이즈 캔슬링 기술이 어떻게 발전해왔는지, 그리고 각 브랜드별 특징을 분석해보겠습니다.',
    like: 30,
  },
  {
    title: '태블릿으로 할 수 있는 크리에이티브 작업',
    content:
      'iPad와 안드로이드 태블릿을 활용한 디자인, 일러스트레이션, 영상 편집 등 다양한 크리에이티브 작업을 소개합니다.',
    like: 29,
  },
  {
    title: '게임 콘솔의 미래',
    content:
      'Nintendo Switch, PlayStation, Xbox 등 각 플랫폼의 특징과 게임 콘솔 시장의 미래 전망을 살펴보겠습니다.',
    like: 12,
  },
];

async function createMockData() {
  try {
    console.log('Mock 데이터 생성을 시작합니다...');

    // 기존 데이터 삭제 (순서 중요: 외래키 관계 고려)
    await prisma.comment.deleteMany();
    await prisma.article.deleteMany();
    await prisma.product.deleteMany();

    // Product 데이터 생성
    console.log('Product 데이터를 생성합니다...');
    for (const product of mockProducts) {
      console.log('생성 중인 제품:', product.name, '가격:', product.price);
      const createdProduct = await prisma.product.create({
        data: product,
      });
      console.log('생성된 제품:', createdProduct.name, '가격:', createdProduct.price);
    }

    // Article 데이터 생성
    console.log('Article 데이터를 생성합니다...');
    for (const article of mockArticles) {
      await prisma.article.create({
        data: article,
      });
    }

    console.log('✅ Mock 데이터 생성이 완료되었습니다!');
    console.log(`- Products: ${mockProducts.length}개`);
    console.log(`- Articles: ${mockArticles.length}개`);
  } catch (error) {
    console.error('❌ Mock 데이터 생성 중 오류가 발생했습니다:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// 스크립트가 직접 실행될 때만 함수 호출
if (import.meta.url === `file://${process.argv[1]}`) {
  console.log('🌱 데이터베이스 시딩을 시작합니다...');

  try {
    await createMockData();
    console.log('🎉 시딩이 성공적으로 완료되었습니다!');
    process.exit(0);
  } catch (error) {
    console.error('💥 시딩 중 오류가 발생했습니다:', error);
    process.exit(1);
  }
}

export { mockProducts, mockArticles, createMockData };
