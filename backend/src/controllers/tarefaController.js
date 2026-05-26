import * as model from "../models/tarefaModel.js";

function validarId(req, res) {
  const { id } = req.params;
  const n = Number(id);
  if (!id || Number.isNaN(n) || !Number.isInteger(n) || n <= 0) {
    res.status(400).json({ erro: "ID inválido" });
    return null;
  }
  return n;
}

async function listar(req, res) {
  try {
    const itens = await model.listar();
    res.json(itens);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao listar tarefas" });
  }
}

async function buscarPorId(req, res) {
  const id = validarId(req, res);
  if (!id) return;

  try {
    const item = await model.buscarPorId(id);
    if (!item) return res.status(404).json({ erro: "Tarefa não encontrada" });
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao buscar tarefa" });
  }
}

async function criar(req, res) {
  try {
    const { titulo, concluida } = req.body;
    if (!titulo || String(titulo).trim() === "") {
      return res.status(400).json({ erro: "Título é obrigatório" });
    }

    const novo = await model.criar({ titulo, concluida });
    if (!novo) return res.status(400).json({ erro: "Não foi possível criar a tarefa" });
    res.status(201).json(novo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao criar tarefa" });
  }
}

async function atualizar(req, res) {
  const id = validarId(req, res);
  if (!id) return;

  const dados = {};
  if (req.body.titulo !== undefined) dados.titulo = req.body.titulo;
  if (req.body.concluida !== undefined) dados.concluida = req.body.concluida;

  if (Object.keys(dados).length === 0) {
    return res.status(400).json({ erro: "Nenhum campo para atualizar" });
  }

  try {
    const atualizado = await model.atualizar(id, dados);
    if (!atualizado) return res.status(404).json({ erro: "Tarefa não encontrada" });
    res.json(atualizado);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao atualizar tarefa" });
  }
}

async function excluir(req, res) {
  const id = validarId(req, res);
  if (!id) return;

  try {
    const excl = await model.excluir(id);
    if (!excl) return res.status(404).json({ erro: "Tarefa não encontrada" });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao excluir tarefa" });
  }
}

export { listar, buscarPorId, criar, atualizar, excluir };
