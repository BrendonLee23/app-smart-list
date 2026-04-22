# app-smart-list

Frontend da aplicação Smart List — desenvolvido por **Brendo Moreira**.

## Visão geral

Interface web para gerenciamento de tarefas, consumindo a [api-smart-list](https://github.com/BrendonLee23/api-smart-list). Permite criar, editar, deletar e acompanhar o status de até 10 tarefas, com suporte a dark/light mode, tela cheia e animações de entrada.

## Objetivo

Construir um frontend moderno com Next.js aproveitando SSR para a carga inicial de dados, garantindo boa performance e sem flash de conteúdo vazio. O objetivo foi aplicar as melhores práticas do ecossistema React/Next em um projeto realista de ponta a ponta.

## Tecnologias

| Camada             | Tecnologia                  |
| ------------------ | --------------------------- |
| Framework          | Next.js 16 (App Router)     |
| Linguagem          | TypeScript (strict)         |
| Estilização        | Tailwind CSS v4 + ShadCN UI |
| Estado de servidor | TanStack Query v5           |
| Formulários        | React Hook Form + Zod       |
| Animações          | Framer Motion               |
| HTTP Client        | Axios                       |
| Notificações       | React Hot Toast             |
| Testes             | Jest + Testing Library      |
| Linting            | ESLint + Prettier           |
| Hooks              | Husky v9                    |
| CI/CD              | GitHub Actions              |
| Deploy             | Vercel                      |

## Arquitetura

```
Server Component (page.tsx)
  → prefetch via fetch nativo (SSR)
  → HydrationBoundary (TanStack Query)
    → Client Component (TasksPageClient)
      → useTasksContext (Context API)
        → hooks (useTasks, useCreateTask, ...)
          → services (Axios)
            → api-smart-list
```

Dividi a responsabilidade entre Server e Client Components intencionalmente:

- **Server Component (`page.tsx`):** faz o prefetch das tarefas no servidor usando o `fetch` nativo do Next.js com `cache: 'no-store'`, serializa o estado com `dehydrate` e injeta via `HydrationBoundary`. Isso garante que a lista chegue renderizada no HTML inicial — sem loading state visível para o usuário.
- **Client Component (`TasksPageClient`):** gerencia interações (criar, editar, deletar), formulários e dialogs. Recebe o estado hidratado do TanStack Query e não precisa fazer novo request na montagem.

### Como o SSR foi implementado

```tsx
// app/tasks/page.tsx — Server Component
export default async function TasksPage() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['tasks'],
    queryFn: prefetchTasks, // fetch nativo → api-smart-list/tasks
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TasksPageClient />
    </HydrationBoundary>
  )
}
```

O cliente recebe o cache preenchido e o TanStack Query usa os dados hidratados diretamente, sem re-fetch desnecessário na montagem.

## Pré-requisitos

- Node.js 20+
- npm 10+
- api-smart-list rodando localmente (ou apontando para produção)

## Instalação

```bash
git clone git@github.com:BrendonLee23/app-smart-list.git
cd app-smart-list
npm install
```

## Configuração de ambiente

Crie um `.env.local` na raiz:

```env
NEXT_PUBLIC_API_URL="http://localhost:3333"
```

| Variável              | Descrição                                                       |
| --------------------- | --------------------------------------------------------------- |
| `NEXT_PUBLIC_API_URL` | URL base da API (exposta ao browser via prefixo `NEXT_PUBLIC_`) |

Em produção, a variável é configurada no painel da Vercel.

## Como rodar localmente

```bash
# Com a API rodando em :3333
npm run dev
```

Acesse `http://localhost:3000`.

## Scripts disponíveis

| Script                  | Descrição                                  |
| ----------------------- | ------------------------------------------ |
| `npm run dev`           | Inicia em modo desenvolvimento (Turbopack) |
| `npm run build`         | Gera o build de produção                   |
| `npm start`             | Serve o build de produção                  |
| `npm test`              | Roda todos os testes                       |
| `npm run test:coverage` | Testes com relatório de cobertura          |
| `npm run lint`          | Verifica erros de lint                     |
| `npm run format`        | Formata o código com Prettier              |
| `npm run type-check`    | Valida tipos sem compilar                  |

## Estrutura de pastas

```
src/
├── app/
│   ├── layout.tsx           # Layout raiz (script anti-FOUC, suppressHydrationWarning)
│   ├── page.tsx             # Redireciona para /tasks
│   ├── globals.css          # Tokens CSS (paleta light/dark)
│   └── tasks/
│       ├── page.tsx         # Server Component com prefetch SSR
│       └── TasksPageClient.tsx  # Client Component principal
├── components/
│   ├── shared/              # EmptyState, ErrorState, LoadingSpinner,
│   │                        # ThemeToggle, FullscreenToggle, Providers
│   ├── tasks/               # TaskCard, TaskList, TaskForm, DeleteConfirmDialog
│   └── ui/                  # Componentes ShadCN (Button, Card, Badge, Dialog...)
├── context/
│   ├── TasksContext.tsx     # Estado de UI (modais, formulários)
│   └── ThemeContext.tsx     # dark/light mode com localStorage
├── hooks/                   # useTasks, useCreateTask, useUpdateTask, useDeleteTask
├── schemas/                 # Validação Zod (createTaskSchema, updateTaskSchema)
├── services/                # tasks.service.ts (Axios)
├── types/                   # task.types.ts
├── utils/                   # api.ts (instância Axios configurada)
└── __tests__/               # Testes de componentes e hooks
```

## Fluxo principal de funcionamento

1. Usuário acessa `/tasks`
2. Server Component faz prefetch das tarefas na API via `fetch`
3. HTML chega ao browser com a lista renderizada
4. React hidrata o cliente — TanStack Query usa o cache do servidor
5. Interações (criar/editar/deletar) disparam mutations que invalidam `['tasks']`
6. TanStack Query refaz o fetch e atualiza a UI automaticamente

## Regras de negócio (frontend)

- Título obrigatório, mínimo **3 caracteres**, máximo **200**
- Descrição opcional, máximo **1000 caracteres**
- Status válidos: `PENDING`, `IN_PROGRESS`, `DONE`
- A API impõe limite de 10 tarefas — o frontend exibe toast de erro se atingido

## Docker

O **Dockerfile** do frontend usa um build single-stage. A URL da API é passada como `ARG` em build-time (necessário porque `NEXT_PUBLIC_*` são embutidas no bundle durante o `next build`):

```dockerfile
FROM node:20-alpine
ARG NEXT_PUBLIC_API_URL=http://localhost:3333
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
RUN npm ci && npm run build
```

**Build manual da imagem:**

```bash
docker build \
  --build-arg NEXT_PUBLIC_API_URL=https://api-smart-list.onrender.com \
  -t app-smart-list .

docker run -p 3000:3000 app-smart-list
```

> O banco de dados é levantado via `docker-compose.yml` no repositório da API — não há compose no frontend.

## Integração com a API

- **API:** [api-smart-list](https://github.com/BrendonLee23/api-smart-list)
- **URL de produção:** `https://api-smart-list.onrender.com`
- **Configuração:** `src/utils/api.ts` cria uma instância Axios com `baseURL: process.env.NEXT_PUBLIC_API_URL`

| Operação         | Método   | Endpoint     |
| ---------------- | -------- | ------------ |
| Listar tarefas   | `GET`    | `/tasks`     |
| Criar tarefa     | `POST`   | `/tasks`     |
| Atualizar tarefa | `PUT`    | `/tasks/:id` |
| Deletar tarefa   | `DELETE` | `/tasks/:id` |

## Tema dark/light

O sistema de tema usa `ThemeContext` com persistência em `localStorage`. Para evitar FOUC (flash of unstyled content), injeto um script inline síncrono no `<head>` do layout que lê o localStorage e adiciona a classe `.dark` ao `<html>` antes da hidratação:

```tsx
// app/layout.tsx
<html suppressHydrationWarning>
  <head>
    <script dangerouslySetInnerHTML={{ __html: `(function(){
      try {
        var t = localStorage.getItem('theme');
        var d = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (t === 'dark' || (t === null && d)) {
          document.documentElement.classList.add('dark')
        }
      } catch(e) {}
    })()` }} />
  </head>
```

O `suppressHydrationWarning` no `<html>` é necessário porque o servidor não tem acesso ao localStorage e sempre renderiza sem a classe `.dark`.

## Animações

Uso Framer Motion para animações de entrada no primeiro carregamento:

- **Header** — fade + slide down (`y: -16 → 0`)
- **Lista de tarefas** — stagger com `staggerChildren: 0.08`
- **Cada card** — fade + slide up + scale (`scale: 0.97 → 1`)
- **EmptyState / LoadingSpinner** — fade in simples

## Testes

```bash
npm test                  # todos os testes
npm run test:coverage     # com cobertura
npm run test:watch        # modo watch
```

**14 testes** cobrindo componentes e hooks:

```
src/__tests__/
├── health.test.tsx               # sanity check
├── components/
│   └── TaskCard.test.tsx         # renderização e interações
└── hooks/
    └── useTasks.test.tsx         # comportamento do hook com mock da API
```

Uso `jest-environment-jsdom`, mocks do Axios e do TanStack Query para isolar os testes do comportamento real da API.

## Deploy

Hospedado na **Vercel** (plano free).

- Deploy automático a cada push na `main`
- URL de produção: `https://app-smart-list.vercel.app`

**Variável de ambiente na Vercel:**

| Variável              | Valor                                 |
| --------------------- | ------------------------------------- |
| `NEXT_PUBLIC_API_URL` | `https://api-smart-list.onrender.com` |

## Padrões de código e convenções

- **Commits:** Conventional Commits (`feat:`, `fix:`, `chore:`, `style:`, etc.)
- **Lint + format** validados no pre-push via Husky
- Sem `any` — TypeScript strict ativado
- Componentes Server e Client separados com responsabilidades claras
- Validação no frontend com Zod espelha as regras da API (fail fast no cliente)

## Git flow

```
main                  ← produção, protegida
feat/<descricao>      ← desenvolvimento
fix/<descricao>       ← correções
```

Todo código chega à `main` via Pull Request. O CI valida lint, format, testes, type-check, auditoria de segurança e build antes do merge.

## Roadmap

Se tivesse mais tempo, eu:

- Implementaria **filtros por status** e busca por título diretamente na UI
- Criaria tela de **autenticação** integrada ao JWT da API
- Escreveria testes E2E com Playwright cobrindo o fluxo completo
- Adicionaria **testes de acessibilidade** (axe-core) no pipeline de CI

**Navegação & estrutura**

- Adicionaria um **header** com menu de opções globais (perfil, configurações, logout)
- Implementaria uma **sidebar** com navegação entre telas futuras, separando funcionalidades por módulo

**Usuários & autenticação**

- Introduziria a entidade **User**, permitindo listar e separar tarefas por usuário
- Implementaria **autenticação com níveis de acesso** (admin / usuário comum) integrada ao JWT da API
- Criaria fluxos de **login, cadastro e troca de senha**

---

Desenvolvido por **Brendo Moreira**
