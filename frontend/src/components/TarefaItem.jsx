export default function TarefaItem({ tarefa, onToggle, onDelete }) {
  return (
    <li className="flex flex-col gap-3 rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <span className={`inline-flex h-3.5 w-3.5 rounded-full ${tarefa.concluida ? "bg-emerald-500" : "bg-slate-400"}`}></span>
          <p className={`text-base font-medium ${tarefa.concluida ? "text-slate-500 line-through" : "text-slate-900"}`}>
            {tarefa.titulo}
          </p>
        </div>
        <p className="text-sm text-slate-500">
          ID: {tarefa.id} · Criado em {new Date(tarefa.createdAt).toLocaleDateString("pt-BR")}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onToggle(tarefa)}
          className="rounded-3xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:border-slate-400 hover:bg-slate-50"
        >
          {tarefa.concluida ? "Marcar como pendente" : "Marcar como concluída"}
        </button>
        <button
          type="button"
          onClick={() => onDelete(tarefa.id)}
          className="rounded-3xl bg-rose-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-600"
        >
          Excluir
        </button>
      </div>
    </li>
  );
}
