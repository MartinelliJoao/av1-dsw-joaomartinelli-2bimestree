import { prisma } from "../config/prisma.js";
import { Prisma } from "@prisma/client";

async function listar() {
  return prisma.tarefa.findMany();
}

async function buscarPorId(id) {
  try {
    return await prisma.tarefa.findUnique({ where: { id: Number(id) } });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2025") {
      return null;
    }
    throw err;
  }
}

async function criar(data) {
  try {
    const { titulo, concluida = false } = data;
    return await prisma.tarefa.create({ data: { titulo, concluida } });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2025") {
      return null;
    }
    throw err;
  }
}

async function atualizar(id, data) {
  try {
    return await prisma.tarefa.update({
      where: { id: Number(id) },
      data
    });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2025") {
      return null;
    }
    throw err;
  }
}

async function excluir(id) {
  try {
    return await prisma.tarefa.delete({ where: { id: Number(id) } });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2025") {
      return null;
    }
    throw err;
  }
}

export { listar, buscarPorId, criar, atualizar, excluir };
