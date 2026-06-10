import express from "express";
import cors from "cors";
import tarefaRoutes from "./routes/tarefaRoutes.js";

const app = express();
const PORTA = 3000;

app.use(cors());
app.use(express.json());

app.use("/api", tarefaRoutes);

app.use((req, res) => {
  res.status(404).json({ erro: "Rota não encontrada" });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ erro: "Erro interno no servidor" });
});

app.listen(PORTA, () => {
  console.log(`Servidor rodando em http://localhost:${PORTA}`);
});
