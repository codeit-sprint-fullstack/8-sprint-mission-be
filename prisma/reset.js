import prisma from '../src/middlewares/prisma.js';

const resetDB = async () => {
  try {
    console.log('🗑️  데이터베이스 초기화 시작...');

    // 외래키 제약조건 때문에 순서대로 삭제
    // 1. 댓글 테이블들 먼저 삭제
    await prisma.productComment.deleteMany();
    console.log('✅ ProductComments 테이블 삭제 완료');

    await prisma.articleComment.deleteMany();
    console.log('✅ ArticleComments 테이블 삭제 완료');

    // 2. 좋아요 테이블들 삭제
    await prisma.productLike.deleteMany();
    console.log('✅ ProductLikes 테이블 삭제 완료');

    await prisma.articleLike.deleteMany();
    console.log('✅ ArticleLikes 테이블 삭제 완료');

    // 3. 메인 테이블들 삭제
    await prisma.article.deleteMany();
    console.log('✅ Articles 테이블 삭제 완료');

    await prisma.product.deleteMany();
    console.log('✅ Products 테이블 삭제 완료');

    await prisma.user.deleteMany();
    console.log('✅ Users 테이블 삭제 완료');

    console.log('🎉 데이터베이스 초기화 완료!');
  } catch (error) {
    console.error('❌ 데이터베이스 초기화 실패:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

// 스크립트로 직접 실행될 때만 resetDB 실행
if (import.meta.url === `file://${process.argv[1]}`) {
  resetDB()
    .then(() => {
      console.log('✅ 초기화 스크립트 완료');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ 초기화 스크립트 실패:', error);
      process.exit(1);
    });
}

export default resetDB;
