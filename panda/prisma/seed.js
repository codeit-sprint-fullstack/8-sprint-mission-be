const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

async function main() {
  const [a1, a2] = await prisma.$transaction([
    prisma.article.create({ data: { title: '첫 글', content: '내용 A' } }),
    prisma.article.create({ data: { title: '두 번째 글', content: '내용 B' } }),
  ]);

  const [p1, p2] = await prisma.$transaction([
    prisma.product.create({ data: { title: '중고 노트북' } }),
    prisma.product.create({ data: { title: '중고 모니터' } }),
  ]);

  await prisma.$transaction([
    prisma.comment.create({ data: { content: '글1-댓글1', articleId: a1.id } }),
    prisma.comment.create({ data: { content: '글1-댓글2', articleId: a1.id } }),
    prisma.comment.create({ data: { content: '상품1-댓글1', productId: p1.id } }),
  ]);
}

main()
  .then(() => console.log('Seeded'))
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });