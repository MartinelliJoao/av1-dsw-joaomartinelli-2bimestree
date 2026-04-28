console.log("ARQUIVO CERTO RODANDO 🔥");

import express from "express";

const app = express();
const PORTA = 3000;

app.use(express.json());

// "Banco" em memória
let tarefas = [
  { id: 1, titulo: "Estudar Node", concluida: false },
  { id: 2, titulo: "Fazer API", concluida: false }
];

// ✅ GET - listar tarefas
app.get("/tarefas", (req, res) => {
  res.status(200).json(tarefas);
});

// ✅ GET por ID
app.get("/tarefas/:id", (req, res) => {
  const { id } = req.params;

  const tarefa = tarefas.find(t => t.id == id);

  if (!tarefa) {
    return res.status(404).json({ erro: "Tarefa não encontrada" });
  }

  res.json(tarefa);
});

// ✅ POST - criar tarefa
app.post("/tarefas", (req, res) => {
  const { titulo } = req.body;

  if (!titulo || titulo.trim() === "") {
    return res.status(400).json({ erro: "Título é obrigatório" });
  }

  const novaTarefa = {
    id: tarefas.length > 0 ? tarefas[tarefas.length - 1].id + 1 : 1,
    titulo,
    concluida: false
  };

  tarefas.push(novaTarefa);

  res.status(201).json(novaTarefa);
});

// ✅ PUT - atualizar tarefa
app.put("/tarefas/:id", (req, res) => {
  const { id } = req.params;
  const { titulo, concluida } = req.body;

  const tarefa = tarefas.find(t => t.id == id);

  if (!tarefa) {
    return res.status(404).json({ erro: "Tarefa não encontrada" });
  }

  if (titulo !== undefined) tarefa.titulo = titulo;
  if (concluida !== undefined) tarefa.concluida = concluida;

  res.json(tarefa);
});


// ✅ DELETE - remover tarefa
app.delete("/tarefas/:id", (req, res) => {
  const { id } = req.params;

  const index = tarefas.findIndex(t => t.id == id);

  if (index === -1) {
    return res.status(404).json({ erro: "Tarefa não encontrada" });
  }

  tarefas.splice(index, 1);

  res.status(204).send();
});

// 🚀 servidor
app.listen(PORTA, () => {
  console.log(`Servidor rodando em http://localhost:${PORTA}`);
});
