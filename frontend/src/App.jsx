import { useEffect, useState } from "react"
import TarefaForm from "./components/TarefaForm.jsx"
import TarefaList from "./components/TarefaList.jsx"
import {
  criarTarefa,
  excluirTarefa,
  listarTarefas,
  atualizarTarefa,
} from "./services/tarefaService.js"

function App() {
  const [tarefas, setTarefas] = useState([])
  const [status, setStatus] = useState("idle")
  const [erro, setErro] = useState("")

  async function carregarTarefas() {
    setStatus("loading")
    setErro("")
    try {
      const dados = await listarTarefas()
      setTarefas(dados)
      setStatus("success")
    } catch (err) {
      setErro(err.message)
      setStatus("error")
    }
  }

  useEffect(() => {
    carregarTarefas()
  }, [])

  async function handleCriar(titulo) {
    setStatus("loading")
    setErro("")
    try {
      const novaTarefa = await criarTarefa(titulo)
      setTarefas((current) => [novaTarefa, ...current])
      setStatus("success")
    } catch (err) {
      setErro(err.message)
      setStatus("error")
    }
  }

  async function handleToggle(tarefa) {
    setStatus("loading")
    setErro("")
    try {
      const atualizado = await atualizarTarefa(tarefa.id, {
        titulo: tarefa.titulo,
        concluida: !tarefa.concluida,
      })
      setTarefas((current) =>
        current.map((item) => (item.id === atualizado.id ? atualizado : item)),
      )
      setStatus("success")
    } catch (err) {
      setErro(err.message)
      setStatus("error")
    }
  }

  async function handleExcluir(id) {
    setStatus("loading")
    setErro("")
    try {
      await excluirTarefa(id)
      setTarefas((current) => current.filter((item) => item.id !== id))
      setStatus("success")
    } catch (err) {
      setErro(err.message)
      setStatus("error")
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <header className="mb-8 rounded-3xl bg-white/90 p-8 shadow-lg shadow-slate-200/80 backdrop-blur-sm">
          <p className="mb-2 text-sm uppercase tracking-[0.28em] text-slate-500">
            Projeto AV1 DSW
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Lista de Tarefas
          </h1>
          <p className="mt-4 max-w-2xl text-slate-600">
            Consuma a API Node.js + Prisma para criar, listar, atualizar e excluir tarefas.
          </p>
        </header>

        <main className="grid gap-6 lg:grid-cols-[360px_1fr]">
          <section className="space-y-6 rounded-3xl bg-white p-6 shadow-lg shadow-slate-200/70">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">Nova tarefa</h2>
              <p className="mt-2 text-sm text-slate-600">
                Crie uma tarefa para adicionar ao seu backlog.
              </p>
            </div>
            <TarefaForm onCreate={handleCriar} disabled={status === "loading"} />
            <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-700">
              <p className="font-medium">Status</p>
              <p>{status === "idle" ? "Aguardando ação" : status}</p>
            </div>
          </section>

          <section className="space-y-6">
            <div className="rounded-3xl bg-white p-6 shadow-lg shadow-slate-200/70">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-slate-900">Tarefas</h2>
                  <p className="mt-2 text-sm text-slate-600">
                    {tarefas.length} item{tarefas.length !== 1 ? "s" : ""} encontrado{tarefas.length !== 1 ? "s" : ""}.
                  </p>
                </div>
                <div className="rounded-3xl bg-slate-100 px-4 py-2 text-sm text-slate-700">
                  {tarefas.filter((tarefa) => tarefa.concluida).length} concluída{tarefas.filter((tarefa) => tarefa.concluida).length !== 1 ? "s" : ""}
                </div>
              </div>

              {erro ? (
                <div className="mt-6 rounded-3xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                  Erro: {erro}
                </div>
              ) : null}

              <div className="mt-6">
                <TarefaList tarefas={tarefas} onToggle={handleToggle} onDelete={handleExcluir} />
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

export default App
