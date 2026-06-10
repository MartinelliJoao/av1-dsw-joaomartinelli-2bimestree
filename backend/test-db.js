import { prisma } from "./src/config/prisma.js";

async function testar() {
  try {
    const resultado = await prisma.tarefa.findMany();
    console.log("✅ Banco de dados conectado!");
    console.log(`Total de tarefas no banco: ${resultado.length}`);
    console.log("Tarefas:", resultado);
    process.exit(0);
  } catch (erro) {
    console.error("❌ Erro ao conectar ao banco:", erro.message);
    process.exit(1);
  }
}

testar();
