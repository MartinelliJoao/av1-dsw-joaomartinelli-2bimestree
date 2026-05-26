import express from "express";
import * as controller from "../controllers/tarefaController.js";

const router = express.Router();

router.get("/tarefas", controller.listar);
router.get("/tarefas/:id", controller.buscarPorId);
router.post("/tarefas", controller.criar);
router.put("/tarefas/:id", controller.atualizar);
router.delete("/tarefas/:id", controller.excluir);

export default router;
