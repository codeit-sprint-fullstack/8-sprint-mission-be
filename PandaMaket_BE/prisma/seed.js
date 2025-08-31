import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    // 초기 비우기
    await prisma.comment.deleteMany();
    await prisma.article.deleteMany();
    await prisma.marketItem.deleteMany();

    const articles = await prisma.$transaction(
        Array.from({ length: 10 }).map((_, i) =>
            prisma.article.create({
                data: {
                    title: `게시글 ${i + 1}`,
                    content: `게시글 내용 ${i + 1}`,
                },
            }),
        ),
    );

    const items = await prisma.$transaction(
        Array.from({ length: 5 }).map((_, i) =>
            prisma.marketItem.create({
                data: {
                    title: `중고상품 ${i + 1}`,
                    content: `상품 설명 ${i + 1}`,
                },
            }),
        ),
    );

    // 댓글 샘플
    await prisma.$transaction([
        prisma.comment.create({
            data: { content: '게시글 댓글 1', articleId: articles[0].id },
        }),
        prisma.comment.create({
            data: { content: '게시글 댓글 2', articleId: articles[0].id },
        }),
        prisma.comment.create({
            data: { content: '상품 댓글 1', marketItemId: items[0].id },
        }),
    ]);

    console.log('✅ Seed completed');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
