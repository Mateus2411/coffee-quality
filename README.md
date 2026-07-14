# ☕ Coffee Quality Challenge

**Aluno:** Mateus Henrique da Silva  
**Turma:** 2INFO1  
**Disciplina:** Desenvolvimento Web II - IFC 2026

---

Sistema para avaliação sensorial de cafés especiais, inspirado na metodologia **Specialty Coffee Association (SCA)**.  
Desenvolvido com **Vue 3 + Vite** como parte da AT - Coffee Quality Challenge.

## Funcionalidades

- 📊 **Dashboard** — Indicadores do campeonato (cafés avaliados, melhor nota, última avaliação)
- 📝 **Avaliações** — Cadastro e listagem de avaliações sensoriais com cálculo automático da média
- 🏆 **Ranking** — Classificação geral com destaque para o Top 3
- ☕ **Detalhes do Café** — Visualização completa de cada avaliação
- ❌ **Página 404** — Tratamento amigável para rotas inexistentes

## Rotas

| Rota | Descrição |
|------|-----------|
| `/` | Home / Dashboard |
| `/cafes` | Lista de Cafés Avaliados |
| `/avaliar` | Formulário de Avaliação |
| `/ranking` | Ranking Geral |
| `/cafe/:id` | Detalhes do Café |

## Tecnologias

- **Vue 3** (Composition API)
- **Vue Router** (SPA Navigation)
- **Pinia** (State Management)
- **Vite** (Build Tool)
- **Tailwind CSS** (Styling)
- **JavaScript** (ES6+)

## Como Executar

```bash
npm install
npm run dev
```

Build de produção:

```bash
npm run build
npm run preview
```

## Estrutura do Projeto

```
coffee-quality/
├── src/
│   ├── components/       # Componentes reutilizáveis
│   │   ├── CoffeeCard.vue
│   │   ├── RatingForm.vue
│   │   └── LeaderboardTable.vue
│   ├── views/            # Páginas da aplicação
│   │   ├── HomeApp.vue
│   │   ├── CafesView.vue
│   │   ├── AvaliarView.vue
│   │   ├── RankingView.vue
│   │   ├── CafeDetail.vue
│   │   └── NotFound.vue
│   ├── stores/           # Estado global (Pinia)
│   │   └── coffeeStore.js
│   ├── router/
│   │   └── index.js
│   ├── layout/
│   │   └── AppLayout.vue
│   ├── App.vue
│   ├── main.js
│   └── style.css
├── public/
├── package.json
└── README.md
```

## Conceitos Vue.js Utilizados

| Conceito | Onde foi utilizado |
|----------|-------------------|
| `v-for` | Listagem de cafés na página Avaliações |
| `v-if` / `v-else` | Mensagens condicionais (erro, vazio) |
| `v-bind` | Ligação dinâmica de props e atributos |
| `v-on` / `@` | Eventos do formulário e botões |
| `v-model` | Two-way binding no formulário |
| `Props` | Componentes CoffeeCard, RatingForm, LeaderboardTable |
| `Computed` | Cálculo da média, getters do ranking |
| `ref()` / `reactive()` | Reatividade nos componentes |
| `Vue Router` | Navegação entre páginas, parâmetros de rota |
| `Pinia` | Gerenciamento global do estado das avaliações |

## Critérios de Avaliação

| Critério | Peso |
|----------|------|
| Funcionalidade | 40% |
| Conceitos Vue.js | 30% |
| Organização do Projeto | 15% |
| Interface e Experiência | 10% |
| README e Documentação | 5% |

## Prints das Telas

*(Adicionar prints após desenvolver)*

- [ ] Home Dashboard
- [ ] Página Avaliações
- [ ] Página Ranking
- [ ] Detalhes do Café

---

## 📦 Backlog do Projeto

O backlog completo está disponível no [GitHub Projects](https://github.com/Mateus2411/coffee-quality/issues) como Issues organizadas por Epics:

| Epic | Issues | Status |
|------|--------|--------|
| Estrutura Inicial | #1, #2 | ⬜ |
| Layout | #3 | ⬜ |
| Componentes | #4, #5, #6 | ⬜ |
| Home (Dashboard) | #7 | ⬜ |
| Avaliações | #8 | ⬜ |
| Ranking | #9 | ⬜ |
| Detalhes do Café | #10 | ⬜ |
| Página 404 | #11 | ⬜ |
| Pinia Store | #12 | ⬜ |
| Deploy e Docs | #13 | ⬜ |

> ☕ **Squad Colmeia** — Coffee Quality Challenge 2026
