import 'dotenv/config';
import { PrismaClient } from '../src/generated/client';
import { PrismaPg } from '@prisma/adapter-pg';

/**
 * 데이터베이스 리셋 스크립트
 * 모든 테이블의 데이터를 삭제합니다.
 *
 * 사용법:
 *   npx tsx prisma/reset.ts
 *   또는
 *   npm run reset (package.json에 스크립트 추가 필요)
 */

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('DATABASE_URL is not set');
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function resetDatabase() {
  try {
    console.log('🔄 데이터베이스 리셋을 시작합니다...');

    // 외래 키 제약 조건을 고려하여 순서대로 삭제
    // 자식 테이블부터 삭제
    console.log('📝 댓글 데이터 삭제 중...');
    await prisma.articleComment.deleteMany();
    await prisma.productComment.deleteMany();

    console.log('❤️  좋아요 데이터 삭제 중...');
    await prisma.articleLike.deleteMany();
    await prisma.productLike.deleteMany();

    console.log('📄 게시글 및 상품 데이터 삭제 중...');
    await prisma.article.deleteMany();
    await prisma.product.deleteMany();

    console.log('👤 사용자 데이터 삭제 중...');
    await prisma.user.deleteMany();

    console.log('✅ 데이터베이스 리셋이 완료되었습니다!');
  } catch (error) {
    console.error('❌ 데이터베이스 리셋 중 오류가 발생했습니다:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// 스크립트 직접 실행 시
if (require.main === module) {
  resetDatabase()
    .then(() => {
      console.log('✨ 모든 작업이 완료되었습니다.');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 오류 발생:', error);
      process.exit(1);
    });
}

export default resetDatabase;
