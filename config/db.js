import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient({
  // prisma 7부터 직접 DB 연결
  //   adapter: "postgresql",
  //   url: process.env.DATABASE_URL,
});
export default prisma;
