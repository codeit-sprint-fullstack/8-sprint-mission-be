import 'dotenv/config';
import { PrismaClient } from '../generated/client';
import { PrismaPg } from '@prisma/adapter-pg';

/**
 * Prisma v7 변경점으로 인한 설정
 *
 * Prisma v7에서는 기본적으로 driver adapter를 사용해야 합니다.
 * `new PrismaClient()`만으로는 "Using engine type 'client' requires either 'adapter' or 'accelerateUrl'"
 * 에러가 발생하므로, PostgreSQL의 경우 `@prisma/adapter-pg`를 사용하여 adapter를 전달해야 합니다.
 *
 * 참고: https://www.prisma.io/docs/orm/overview/databases/postgresql#using-the-node-postgres-driver
 */
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('DATABASE_URL is not set');
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

export default prisma;
