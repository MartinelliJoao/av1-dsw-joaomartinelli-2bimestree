import TarefaItem from "./TarefaItem.jsx";

export default function TarefaList({ tarefas, onToggle, onDelete }) {
  if (!tarefas.length) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-500">
        Nenhuma tarefa cadastrada ainda.
      </div>
    );
  }

  return (
    <ul className="space-y-4">
      {tarefas.map((tarefa) => (
        <TarefaItem key={tarefa.id} tarefa={tarefa} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </ul>
  );
}
