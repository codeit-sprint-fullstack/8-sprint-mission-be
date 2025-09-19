import { PrismaClient } from '@prisma/client';

import { PRODUCTS } from './mock.js';

const prisma = new PrismaClient();

async function main() {
    //기존 데이터 삭제
    await prisma.product.deleteMany();
    //목 데이터 삽입
    await prisma.product.createMany({
        data: PRODUCTS,
        skipDuplicates: true, //중복 데이터는 스킵하라는 뜻 (중복이 없다면 상관없음)
    });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    })