<div align="center">

#  AI OS
### Autonomous Multi-Agent Orchestration Platform

[![Python](https://img.shields.io/badge/Python-3.11+-3776AB?style=flat-square&logo=python&logoColor=white)](https://python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.110+-009688?style=flat-square&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/React-18+-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-pgvector-4169E1?style=flat-square&logo=postgresql&logoColor=white)](https://postgresql.org)
[![Redis](https://img.shields.io/badge/Redis-RQ-DC382D?style=flat-square&logo=redis&logoColor=white)](https://redis.io)
[![License](https://img.shields.io/badge/License-MIT-22C55E?style=flat-square)](LICENSE)

**A production-grade full-stack AI system that orchestrates multiple intelligent agents to plan, execute, and optimize complex tasks autonomously.**

[Features](#-features) · [Architecture](#-architecture) · [Quick Start](#-quick-start) · [Agents](#-agent-system) · [API Docs](#-api-reference) · [Roadmap](#-roadmap)

</div>

---

## 🚀 Features

### 🤖 Multi-Agent System
- **5 specialized agents** — Planner, Researcher, Coder, Critic, Evaluator
- LLM-based intelligent agent routing with structured communication
- Collaborative agent pipelines for complex task decomposition

### 🔗 DAG-Based Task Execution
- Dependency-aware task planning with a full DAG execution engine
- Parallel + ordered execution using `ThreadPoolExecutor`
- Visual task graph generation and real-time progress tracking

### 🧠 Intelligent Memory (RAG)
- **PostgreSQL + pgvector** for persistent semantic memory
- Context compression and semantic similarity search
- Long-term memory storage + short-term working context

### ⚡ High Performance
- Parallel execution with `ThreadPoolExecutor`
- Async background processing via **Redis + RQ**
- Real-time streaming responses over WebSocket

### 🛠 Tool Intelligence
- Autonomous tool selection — code execution, web search, file I/O
- Structured JSON-based tool calling with a safe execution sandbox
- Extensible tool registry for custom integrations

### 🛡 Self-Healing System
- Automatic failure detection with configurable retry policies
- Improved-context retry — agents learn from previous failures
- Fallback agent recovery to prevent stuck workflows

### 🔐 Authentication
- JWT-based authentication with refresh token rotation
- Secure multi-user architecture with role-based access
- Session management and audit logging

### 🖥 Frontend
- Streaming AI chat interface with real-time token rendering
- Task creation and DAG execution dashboard
- Modern component architecture built with React + TypeScript

---

## 🏗 Architecture

```
┌─────────────────────────────────────────────────┐
│          Frontend  (React + TypeScript)          │
│     Streaming Chat · Task Dashboard · UI         │
└───────────────────┬─────────────────────────────┘
                    │ REST / WebSocket
┌───────────────────▼──────────────┐  ┌───────────────────────┐
│       FastAPI Gateway            │  │    JWT Auth Service    │
│   REST · WebSocket · Streaming   │  │  Tokens · Multi-user   │
└───────────────────┬──────────────┘  └───────────────────────┘
                    │
┌───────────────────▼─────────────────────────────┐
│              Agent Orchestrator                  │
│   LLM Routing · DAG Planner · Self-Healing      │
└────┬──────┬────────┬──────────┬──────────┬──────┘
     │      │        │          │          │
  Planner  Researcher  Coder  Critic  Evaluator
     │      │        │          │          │
┌────▼──────▼────────▼──────────▼──────────▼──────┐
│         Tools Layer  ·  Memory (RAG)             │
│  Code Exec · Search · pgvector · Compression     │
└──────────────────┬──────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────┐
│                 Data Layer                       │
│   PostgreSQL · pgvector · Redis + RQ · DAG DB   │
└─────────────────────────────────────────────────┘
```

**Stack overview:**

| Layer | Technology |
|---|---|
| Backend API | FastAPI (Python 3.11+) |
| Database | PostgreSQL + pgvector |
| Job Queue | Redis + RQ |
| Frontend | React 18 + TypeScript |
| Auth | JWT (access + refresh tokens) |
| LLM | Gemini / OpenAI / Anthropic (configurable) |
| Deployment | Docker + Docker Compose |

---

## ⚡ Quick Start

### Prerequisites

- Python 3.11+
- Node.js 18+
- PostgreSQL 15+ with pgvector extension
- Redis 7+

### 1. Clone the repository

```bash
git clone https://github.com/Darshit02/autonomous-multi-agent-orchestration-system.git
cd ai-os
```

### 2. Backend setup

```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

Copy and configure environment variables:

```bash
cp .env.example .env
```

```env
# .env
DATABASE_URL=postgresql://user:password@localhost:5432/aios
REDIS_URL=redis://localhost:6379
OPENAI_API_KEY=sk-...
JWT_SECRET_KEY=your-secret-key
JWT_ALGORITHM=HS256
```

Run database migrations:

```bash
alembic upgrade head
```

Start the API server:

```bash
uvicorn app.main:app --reload --port 8000
```

Start the background worker:

```bash
rq worker --url redis://localhost:6379
```

### 3. Frontend setup

```bash
cd frontend
npm install
cp .env.example .env.local    # set VITE_API_URL=http://localhost:8000
npm run dev
```

The app is now running at **http://localhost:5173**

### 4. Docker (recommended)

```bash
docker compose up --build
```

This starts the API, frontend, PostgreSQL, and Redis in a single command.

---

## 🤖 Agent System

Each agent is a specialized LLM-powered module with a defined role in the execution pipeline.

| Agent | Role | Key Capabilities |
|---|---|---|
| **Planner** | Decomposes goals into a DAG of tasks | Goal parsing, dependency modeling, task ordering |
| **Researcher** | Retrieves and synthesizes information | RAG search, web lookup, context compression |
| **Coder** | Writes and executes code | Code generation, safe sandbox execution, debugging |
| **Critic** | Validates outputs against requirements | Quality scoring, error detection, feedback generation |
| **Evaluator** | Routes tasks and scores final results | Performance metrics, agent selection, result grading |

### How agent routing works

```
User Goal
    │
    ▼
Planner ──► builds DAG of subtasks
    │
    ▼
Orchestrator ──► routes each subtask to the best agent
    │
    ├──► Researcher (needs information)
    ├──► Coder      (needs code written)
    └──► Critic     (needs validation)
    │
    ▼
Evaluator ──► scores result, triggers retry if needed
    │
    ▼
Self-Healing ──► retries with improved context on failure
```

---

## 🧠 Memory System (RAG)

The memory system provides agents with long-term context using **Retrieval-Augmented Generation**.

```python
# Semantic memory storage
memory.store(
    content="User prefers concise Python code with type hints",
    metadata={"type": "preference", "user_id": "u_123"}
)

# Similarity search at query time
results = memory.search(
    query="write a Python function",
    top_k=5,
    threshold=0.75
)
```

**Memory architecture:**
- **Short-term** — in-context working memory for the current task
- **Long-term** — pgvector embeddings persisted across sessions
- **Compression** — automatic context summarization to fit token limits

---

## 📡 API Reference

Interactive docs available at `http://localhost:8000/docs` (Swagger UI).

### Authentication

```http
POST /auth/register
POST /auth/login
POST /auth/refresh
```

### Tasks

```http
POST   /tasks              # Create and start a new task
GET    /tasks              # List all tasks for current user
GET    /tasks/{id}         # Get task status and result
DELETE /tasks/{id}         # Cancel a running task
```

### Agents

```http
GET  /agents               # List all available agents
POST /agents/chat          # Direct chat with streaming response
```

### Memory

```http
POST /memory/store         # Store a memory entry
POST /memory/search        # Semantic similarity search
GET  /memory               # List memory entries
```

### Example: create a task

```bash
curl -X POST http://localhost:8000/tasks \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "goal": "Research the top 5 open-source LLMs and write a comparison report",
    "agents": ["planner", "researcher", "coder", "critic"],
    "config": { "max_retries": 3, "parallel": true }
  }'
```

---

## 💡 Key Concepts

### DAG Execution Engine

Tasks are modeled as a **Directed Acyclic Graph** where nodes are subtasks and edges are dependencies. The engine resolves the execution order and runs independent subtasks in parallel.

```
[Research LLMs] ─┐
                  ├─► [Write comparison] ─► [Critic review] ─► [Final report]
[Fetch benchmarks]┘
```

### Self-Healing

When an agent fails, the system:
1. Captures the error and the failed context
2. Generates an improved prompt incorporating failure feedback
3. Retries with the same or a fallback agent
4. Escalates to the Evaluator after `max_retries` is exceeded

### Context Engineering

Each agent receives a carefully engineered context window containing:
- The current subtask and its position in the DAG
- Relevant memories retrieved via semantic search
- Outputs from upstream agents in the same workflow
- Compressed history to stay within token limits

---

## 📁 Project Structure

```
ai-os/
├── backend/
│   ├── app/
│   │   ├── agents/          # Planner, Researcher, Coder, Critic, Evaluator
│   │   ├── core/            # DAG engine, orchestrator, self-healing
│   │   ├── memory/          # RAG system, pgvector integration
│   │   ├── tools/           # Code execution, search, file tools
│   │   ├── auth/            # JWT authentication
│   │   ├── api/             # FastAPI routes
│   │   └── models/          # SQLAlchemy database models
│   ├── alembic/             # Database migrations
│   ├── tests/
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/      # UI components
│   │   ├── pages/           # Chat, Dashboard, Task views
│   │   ├── hooks/           # Custom React hooks
│   │   ├── api/             # API client
│   │   └── types/           # TypeScript interfaces
│   └── package.json
├── docker-compose.yml
└── README.md
```

---

## 🧪 Testing

```bash
# Backend tests
cd backend
pytest tests/ -v --cov=app

# Frontend tests
cd frontend
npm run test

# End-to-end
npm run test:e2e
```

---

## 🗺 Roadmap

| Status | Feature |
|---|---|
| ✅ | Multi-agent orchestration |
| ✅ | DAG execution engine |
| ✅ | RAG memory system |
| ✅ | JWT authentication |
| ✅ | Self-healing retry |
| ✅ | React + TypeScript frontend |
| 🚧 | Docker + cloud deployment |
| 🚧 | Observability (logs, tracing, metrics) |
| 🔜 | Distributed worker scaling |
| 🔜 | Advanced UI visualizations |
| 🔜 | Agent marketplace / plugin system |
| 🔜 | Multi-modal tool support (vision, audio) |

---

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

```bash
# Fork → clone → create branch
git checkout -b feature/your-feature-name

# Make changes, add tests, commit
git commit -m "feat: add your feature"

# Push and open a pull request
git push origin feature/your-feature-name
```

---

## 📄 License

This project is licensed under the MIT License — see [LICENSE](LICENSE) for details.

---

<div align="center">

**Built as an advanced AI system design project focusing on real-world architecture, scalability, and autonomy.**

⭐ Star this repo if you found it useful!

</div>
