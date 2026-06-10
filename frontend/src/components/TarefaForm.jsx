import { useState } from "react";

export default function TarefaForm({ onCreate, disabled }) {
  const [titulo, setTitulo] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const trimmed = titulo.trim();
    if (trimmed.length === 0) return;

    await onCreate(trimmed);
    setTitulo("");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block text-sm font-medium text-slate-700">
        Título da tarefa
        <input
          type="text"
          value={titulo}
          onChange={(event) => setTitulo(event.target.value)}
          placeholder="Digite uma nova tarefa"
          className="mt-2 w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
          disabled={disabled}
        />
      </label>

      <button
        type="submit"
        disabled={disabled}
        className="inline-flex items-center justify-center rounded-3xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
      >
        Adicionar tarefa
      </button>
    </form>
  );
}
