# Projeto AV1 – React + API + Banco de Dados

Sistema de gerenciamento de tarefas com front-end em React e back-end em Node.js + Prisma.

## Tecnologias

- **Backend**: Node.js, Express, Prisma ORM, MySQL
- **Frontend**: React 19, Tailwind CSS, Vite
- **Banco**: MySQL / MariaDB

## Como executar

### Backend

1. Entre na pasta `backend`:
   ```bash
   cd backend
   ```

2. Crie o arquivo `.env` (copie de `.env.example`):
   ```bash
   copy .env.example .env
   ```

3. Configure a `DATABASE_URL` com suas credenciais MySQL

4. Instale dependências:
   ```bash
   npm install
   ```

5. Gere o Prisma client:
   ```bash
   npx prisma generate
   ```

6. Aplique as migrações:
   ```bash
   npx prisma migrate deploy
   ```

7. Inicie o servidor:
   ```bash
   npm run dev
   ```

O servidor estará disponível em `http://localhost:3000`  
API de tarefas em `http://localhost:3000/api/tarefas`

### Frontend

1. Em outro terminal, entre na pasta `frontend`:
   ```bash
   cd frontend
   ```

2. Instale dependências:
   ```bash
   npm install
   ```

3. Inicie o dev server:
   ```bash
   npm run dev
   ```

O app estará disponível em `http://localhost:5173`

## Funcionalidades

- ✅ Listar tarefas
- ✅ Criar nova tarefa
- ✅ Marcar tarefa como concluída/pendente
- ✅ Excluir tarefa
- ✅ Interface responsiva com Tailwind CSS
- ✅ Tratamento de erros e loading states

## Estrutura

```
av1-dsw-joaomartinelli-2bimestree/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── config/
│   │   └── server.js
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   ├── package.json
│   ├── .env.example
│   └── README.md
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── README.md
└── README.md (este arquivo)
```

## Autor

João Martinelli - Projeto AV1 DSW (2º Bimestre)
