import express from "express";
import tarefaRoutes from "./routes/tarefaRoutes.js";

const app = express();
const PORTA = 3000;

app.use(express.json());

app.use(tarefaRoutes);

app.listen(PORTA, () => {
  console.log(`Servidor rodando em http://localhost:${PORTA}`);
});
