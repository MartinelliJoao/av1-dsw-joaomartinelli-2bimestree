import { prisma } from "../config/prisma.js";

async function testConnection() {
  try {
    await prisma.$connect();
    console.log("Prisma: conexão com o banco bem-sucedida ✅");
  } catch (err) {
    console.error("Prisma: falha na conexão ❌", err);
  } finally {
    await prisma.$disconnect();
  }
}

if (import.meta.url === `file://${process.argv[1]}` || process.env.RUN_PRISMA_TEST === "1") {
  testConnection();
}
