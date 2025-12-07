"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient({
// prisma 7부터 직접 DB 연결
//   adapter: "postgresql",
//   url: process.env.DATABASE_URL,
});
exports.default = prisma;
//# sourceMappingURL=db.js.map