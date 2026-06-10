const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

async function handleResponse(response) {
  const data = await response.json().catch(() => null);
  if (!response.ok) {
    const errorMessage = data?.erro || data?.message || `Erro ${response.status}`;
    throw new Error(errorMessage);
  }
  return data;
}

export async function listarTarefas() {
  try {
    console.log("Conectando em:", `${BASE_URL}/tarefas`);
    const response = await fetch(`${BASE_URL}/tarefas`);
    console.log("Status:", response.status);
    return handleResponse(response);
  } catch (error) {
    console.error("Erro ao listar tarefas:", error.message);
    throw error;
  }
}

export async function criarTarefa(titulo) {
  try {
    console.log("Criando tarefa:", titulo);
    const response = await fetch(`${BASE_URL}/tarefas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ titulo }),
    });
    console.log("Status:", response.status);
    const result = await handleResponse(response);
    console.log("Tarefa criada:", result);
    return result;
  } catch (error) {
    console.error("Erro ao criar tarefa:", error.message);
    throw error;
  }
}

export async function atualizarTarefa(id, data) {
  const response = await fetch(`${BASE_URL}/tarefas/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
}

export async function excluirTarefa(id) {
  const response = await fetch(`${BASE_URL}/tarefas/${id}`, {
    method: "DELETE",
  });
  if (response.status === 204) {
    return null;
  }
  return handleResponse(response);
}
