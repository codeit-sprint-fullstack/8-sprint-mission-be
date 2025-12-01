import 'dotenv/config';
import prisma from '../src/config/prisma';
import argon2 from 'argon2';

// 더미 데이터 생성용 배열
const productNames = [
  '맥북 프로',
  '아이폰 15',
  '에어팟 프로',
  '갤럭시 워치',
  '아이패드',
  '게이밍 마우스',
  '기계식 키보드',
  '모니터 스탠드',
  'USB-C 케이블',
  '무선 충전기',
  '노트북 가방',
  '블루투스 스피커',
  '웹캠',
  '마이크',
  '헤드셋',
  '스마트워치',
  '태블릿',
  '무선 이어폰',
  '충전 보조배터리',
  'USB 허브',
  '외장 하드',
  'SSD',
  '램',
  '그래픽 카드',
  'CPU',
  '메인보드',
  '파워 서플라이',
  '케이스',
  '쿨러',
  '마우스패드',
  '책상',
  '의자',
  '램프',
  '스탠드',
  '스티커',
  '케이스',
  '필름',
  '보호 케이스',
  '거치대',
  '홀더',
];

const productDescriptions = [
  '최신 모델입니다. 상태 좋습니다.',
  '거의 새것입니다. 박스 포함입니다.',
  '사용감 있지만 기능 정상입니다.',
  '중고품입니다. 급처합니다.',
  'A급 중고입니다. 깨끗합니다.',
  'B급 중고입니다. 사용 가능합니다.',
  '완벽한 상태입니다. 직거래 가능합니다.',
  '택배 거래 가능합니다. 상태 확인했습니다.',
  '구매 후 사용 안 했습니다. 새것입니다.',
  '1년 사용했습니다. 잘 관리했습니다.',
];

const articleTitles = [
  '맥북 사용 후기',
  '아이폰 15 리뷰',
  '게이밍 장비 추천',
  '코딩 환경 설정 가이드',
  '개발자 필수 도구',
  '프로그래밍 학습 방법',
  '웹 개발 시작하기',
  '앱 개발 경험담',
  '디자인 시스템 구축',
  '데이터베이스 최적화',
  'API 설계 팁',
  '보안 가이드',
  '성능 개선 방법',
  '코드 리뷰 문화',
  '협업 도구 추천',
  '원격 근무 팁',
  '프로젝트 관리',
  '버전 관리 전략',
  '테스트 작성 가이드',
  '배포 자동화',
  '서버 관리 경험',
  '클라우드 서비스 비교',
  '모니터링 도구',
  '로깅 시스템',
  '에러 처리 방법',
  '인증 시스템 구현',
  '결제 시스템 연동',
  '이미지 최적화',
  'SEO 최적화',
  '접근성 개선',
  '반응형 디자인',
  '모바일 최적화',
  '크로스 브라우징',
  '성능 측정',
  '사용자 경험 개선',
  'UI/UX 디자인',
  '프로토타이핑',
  '사용자 테스트',
  '마케팅 전략',
  '컨텐츠 기획',
];

const articleContents = [
  '이번에 맥북을 구매하고 사용해본 후기를 공유합니다. 전반적으로 만족스럽습니다.',
  '아이폰 15의 새로운 기능들을 체험해봤습니다. 카메라 성능이 특히 좋습니다.',
  '게이밍을 위한 장비들을 추천합니다. 가성비 좋은 제품들 위주로 정리했습니다.',
  '코딩 환경을 설정하는 방법을 단계별로 설명합니다. 초보자도 따라할 수 있습니다.',
  '개발자라면 반드시 알아야 할 도구들을 소개합니다. 생산성을 크게 향상시킬 수 있습니다.',
  '프로그래밍을 배우는 가장 효과적인 방법을 공유합니다. 제 경험을 바탕으로 작성했습니다.',
  '웹 개발을 시작하는 분들을 위한 가이드입니다. 기초부터 차근차근 설명합니다.',
  '앱 개발을 하면서 겪은 경험들을 공유합니다. 실수와 해결 방법을 포함했습니다.',
  '디자인 시스템을 구축하는 방법을 설명합니다. 일관성 있는 UI를 만들 수 있습니다.',
  '데이터베이스 성능을 최적화하는 방법을 공유합니다. 쿼리 최적화 팁이 포함되어 있습니다.',
];

const commentContents = [
  '좋은 정보 감사합니다!',
  '도움이 많이 되었어요.',
  '추가로 궁금한 점이 있습니다.',
  '저도 비슷한 경험이 있어요.',
  '다른 방법도 시도해볼게요.',
  '정말 유용한 정보네요.',
  '추천합니다!',
  '좋은 글 감사합니다.',
  '다음 글도 기대합니다.',
  '궁금했던 점이 해결되었어요.',
  '실제로 적용해봤는데 좋아요!',
  '더 자세한 설명 부탁드립니다.',
  '관련 자료도 있으면 공유해주세요.',
  '이 방법으로 해결했습니다.',
  '다른 접근 방법도 있을까요?',
];

const tags = [
  '전자제품',
  '컴퓨터',
  '스마트폰',
  '액세서리',
  '게이밍',
  '오디오',
  '카메라',
  '가전제품',
  '생활용품',
  '의류',
  '도서',
  '스포츠',
  '자동차',
  '부동산',
  '기타',
];

async function seed() {
  try {
    console.log('🌱 데이터베이스 시딩을 시작합니다...');

    // 기존 데이터 삭제
    console.log('🗑️  기존 데이터 삭제 중...');
    await prisma.articleComment.deleteMany();
    await prisma.productComment.deleteMany();
    await prisma.articleLike.deleteMany();
    await prisma.productLike.deleteMany();
    await prisma.article.deleteMany();
    await prisma.product.deleteMany();
    await prisma.user.deleteMany();

    // 사용자 생성 (40명)
    console.log('👤 사용자 생성 중...');
    const users: Array<{ id: string; email: string; nickname: string }> = [];
    const userNicknames = [
      'master',
      'alice',
      'bob',
      'charlie',
      'david',
      'eve',
      'frank',
      'grace',
      'henry',
      'ivy',
      'jack',
      'kate',
      'liam',
      'mia',
      'noah',
      'olivia',
      'paul',
      'quinn',
      'ryan',
      'sarah',
      'tom',
      'una',
      'victor',
      'wendy',
      'xavier',
      'yuna',
      'zoe',
      'adam',
      'bella',
      'carlos',
      'diana',
      'ethan',
      'fiona',
      'george',
      'hannah',
      'isaac',
      'julia',
      'kevin',
      'luna',
      'mike',
    ];

    for (const nickname of userNicknames) {
      const password = `${nickname}1234`;
      const hashedPassword = await argon2.hash(password);
      const user = await prisma.user.create({
        data: {
          email: `${nickname}@test.com`,
          nickname,
          encryptedPassword: hashedPassword,
        },
      });
      users.push(user);
    }

    const masterUser = users[0]; // master@test.com

    console.log('✅ 사용자 생성 완료:', users.length, '명');

    // 상품 생성 (40개)
    console.log('🛍️  상품 생성 중...');
    const products: Array<{ id: string; ownerId: string }> = [];
    for (let i = 0; i < 40; i++) {
      const owner = users[Math.floor(Math.random() * users.length)];
      const product = await prisma.product.create({
        data: {
          name: productNames[i % productNames.length] + ` ${i + 1}`,
          description: productDescriptions[i % productDescriptions.length],
          price: Math.floor(Math.random() * 1000000) + 10000,
          tags: [
            tags[Math.floor(Math.random() * tags.length)],
            tags[Math.floor(Math.random() * tags.length)],
          ],
          ownerId: owner.id,
        },
      });
      products.push(product);
    }

    // master 사용자의 상품 추가 생성 (10개)
    for (let i = 0; i < 10; i++) {
      const product = await prisma.product.create({
        data: {
          name: `Master 상품 ${i + 1}`,
          description: 'Master 사용자가 판매하는 상품입니다.',
          price: Math.floor(Math.random() * 500000) + 50000,
          tags: ['전자제품', '컴퓨터'],
          ownerId: masterUser.id,
        },
      });
      products.push(product);
    }

    console.log('✅ 상품 생성 완료:', products.length, '개');

    // 게시글 생성 (40개)
    console.log('📝 게시글 생성 중...');
    const articles: Array<{ id: string; ownerId: string }> = [];
    for (let i = 0; i < 40; i++) {
      const owner = users[Math.floor(Math.random() * users.length)];
      const article = await prisma.article.create({
        data: {
          title: articleTitles[i % articleTitles.length] + ` ${i + 1}`,
          content: articleContents[i % articleContents.length],
          ownerId: owner.id,
        },
      });
      articles.push(article);
    }

    // master 사용자의 게시글 추가 생성 (10개)
    for (let i = 0; i < 10; i++) {
      const article = await prisma.article.create({
        data: {
          title: `Master 게시글 ${i + 1}`,
          content: 'Master 사용자가 작성한 게시글입니다. 다양한 내용을 포함하고 있습니다.',
          ownerId: masterUser.id,
        },
      });
      articles.push(article);
    }

    console.log('✅ 게시글 생성 완료:', articles.length, '개');

    // 상품 좋아요 생성 (50개)
    console.log('❤️  상품 좋아요 생성 중...');
    const productLikes: Array<{ userId: string; productId: string }> = [];
    for (let i = 0; i < 50; i++) {
      const user = users[Math.floor(Math.random() * users.length)];
      const product = products[Math.floor(Math.random() * products.length)];

      // 중복 체크
      const existing = productLikes.find(
        (like) => like.userId === user.id && like.productId === product.id,
      );
      if (existing) continue;

      try {
        await prisma.productLike.create({
          data: {
            userId: user.id,
            productId: product.id,
          },
        });
        productLikes.push({ userId: user.id, productId: product.id });

        // 상품의 likeCount 업데이트
        await prisma.product.update({
          where: { id: product.id },
          data: { likeCount: { increment: 1 } },
        });
      } catch (error) {
        // 중복 키 에러 무시
      }
    }

    // master 사용자가 다른 사용자들의 상품에 좋아요 (10개)
    for (let i = 0; i < 10; i++) {
      const product = products.find((p) => p.ownerId !== masterUser.id);
      if (!product) break;

      try {
        await prisma.productLike.create({
          data: {
            userId: masterUser.id,
            productId: product.id,
          },
        });

        await prisma.product.update({
          where: { id: product.id },
          data: { likeCount: { increment: 1 } },
        });
      } catch (error) {
        // 중복 키 에러 무시
      }
    }

    console.log('✅ 상품 좋아요 생성 완료');

    // 게시글 좋아요 생성 (50개)
    console.log('❤️  게시글 좋아요 생성 중...');
    const articleLikes: Array<{ userId: string; articleId: string }> = [];
    for (let i = 0; i < 50; i++) {
      const user = users[Math.floor(Math.random() * users.length)];
      const article = articles[Math.floor(Math.random() * articles.length)];

      // 중복 체크
      const existing = articleLikes.find(
        (like) => like.userId === user.id && like.articleId === article.id,
      );
      if (existing) continue;

      try {
        await prisma.articleLike.create({
          data: {
            userId: user.id,
            articleId: article.id,
          },
        });
        articleLikes.push({ userId: user.id, articleId: article.id });

        // 게시글의 likeCount 업데이트
        await prisma.article.update({
          where: { id: article.id },
          data: { likeCount: { increment: 1 } },
        });
      } catch (error) {
        // 중복 키 에러 무시
      }
    }

    // master 사용자가 다른 사용자들의 게시글에 좋아요 (10개)
    for (let i = 0; i < 10; i++) {
      const article = articles.find((a) => a.ownerId !== masterUser.id);
      if (!article) break;

      try {
        await prisma.articleLike.create({
          data: {
            userId: masterUser.id,
            articleId: article.id,
          },
        });

        await prisma.article.update({
          where: { id: article.id },
          data: { likeCount: { increment: 1 } },
        });
      } catch (error) {
        // 중복 키 에러 무시
      }
    }

    console.log('✅ 게시글 좋아요 생성 완료');

    // 상품 댓글 생성 (40개)
    console.log('💬 상품 댓글 생성 중...');
    for (let i = 0; i < 40; i++) {
      const user = users[Math.floor(Math.random() * users.length)];
      const product = products[Math.floor(Math.random() * products.length)];

      await prisma.productComment.create({
        data: {
          content: commentContents[i % commentContents.length],
          ownerId: user.id,
          productId: product.id,
        },
      });
    }

    // master 사용자가 다른 사용자들의 상품에 댓글 (10개)
    for (let i = 0; i < 10; i++) {
      const product = products.find((p) => p.ownerId !== masterUser.id);
      if (!product) break;

      await prisma.productComment.create({
        data: {
          content: `Master 사용자의 댓글 ${i + 1}: 좋은 상품이네요!`,
          ownerId: masterUser.id,
          productId: product.id,
        },
      });
    }

    // 다른 사용자들이 master 사용자의 상품에 댓글 (10개)
    const masterProducts = products.filter((p) => p.ownerId === masterUser.id);
    for (let i = 0; i < Math.min(10, masterProducts.length); i++) {
      const user = users[Math.floor(Math.random() * (users.length - 1)) + 1]; // master 제외
      await prisma.productComment.create({
        data: {
          content: commentContents[i % commentContents.length],
          ownerId: user.id,
          productId: masterProducts[i].id,
        },
      });
    }

    console.log('✅ 상품 댓글 생성 완료');

    // 게시글 댓글 생성 (40개)
    console.log('💬 게시글 댓글 생성 중...');
    for (let i = 0; i < 40; i++) {
      const user = users[Math.floor(Math.random() * users.length)];
      const article = articles[Math.floor(Math.random() * articles.length)];

      await prisma.articleComment.create({
        data: {
          content: commentContents[i % commentContents.length],
          ownerId: user.id,
          articleId: article.id,
        },
      });
    }

    // master 사용자가 다른 사용자들의 게시글에 댓글 (10개)
    for (let i = 0; i < 10; i++) {
      const article = articles.find((a) => a.ownerId !== masterUser.id);
      if (!article) break;

      await prisma.articleComment.create({
        data: {
          content: `Master 사용자의 댓글 ${i + 1}: 유용한 정보 감사합니다!`,
          ownerId: masterUser.id,
          articleId: article.id,
        },
      });
    }

    // 다른 사용자들이 master 사용자의 게시글에 댓글 (10개)
    const masterArticles = articles.filter((a) => a.ownerId === masterUser.id);
    for (let i = 0; i < Math.min(10, masterArticles.length); i++) {
      const user = users[Math.floor(Math.random() * (users.length - 1)) + 1]; // master 제외
      await prisma.articleComment.create({
        data: {
          content: commentContents[i % commentContents.length],
          ownerId: user.id,
          articleId: masterArticles[i].id,
        },
      });
    }

    console.log('✅ 게시글 댓글 생성 완료');

    console.log('\n✨ 시딩이 완료되었습니다!');
    console.log('\n📊 생성된 데이터 요약:');
    console.log(`   - 사용자: ${users.length}명`);
    console.log(`   - 상품: ${products.length}개`);
    console.log(`   - 게시글: ${articles.length}개`);
    console.log(`   - 상품 좋아요: ${productLikes.length}개 이상`);
    console.log(`   - 게시글 좋아요: ${articleLikes.length}개 이상`);
    console.log('\n🔑 Master 계정 정보:');
    console.log(`   - 이메일: master@test.com`);
    console.log(`   - 비밀번호: master1234`);
    console.log(`   - Master 계정은 모든 관계형 데이터가 포함되어 있습니다.`);
  } catch (error) {
    console.error('❌ 시딩 중 오류가 발생했습니다:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// 스크립트 직접 실행 시
if (require.main === module) {
  seed()
    .then(() => {
      console.log('✅ 모든 작업이 완료되었습니다.');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 오류 발생:', error);
      process.exit(1);
    });
}

export default seed;
