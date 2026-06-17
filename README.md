# Sistema de Triagem — IESB

Sistema web para gerenciamento de fila de atendimento clínico, com classificação de risco por prioridade (protocolo Manchester simplificado). Projeto acadêmico de **DevOps** (PBL — Caso 4) do **IESB**.

A aplicação é composta por um **frontend** em React e um **backend** REST em Node.js, orquestrados via **Docker Compose**.

## Funcionalidades

- Cadastro de pacientes com dados clínicos e classificação de prioridade
- Fila de espera com filtros por nível de risco (Emergência, Urgente, Pouco Urgente, Não Urgente)
- Atualização de status: `aguardando` → `em_atendimento` → `finalizado`
- Cálculo automático do tempo de espera
- Dashboard com cards por prioridade e tabela de pacientes
- Healthcheck da API (`GET /health`) para monitoramento e orquestração Docker

## Tecnologias

| Camada     | Stack                                      |
| ---------- | ------------------------------------------ |
| Frontend   | React 19, TypeScript, Vite, Axios, Nginx   |
| Backend    | Node.js 20, Express, SQLite (libsql)       |
| Infra      | Docker, Docker Compose                     |

## Arquitetura

<img width="890" height="174" alt="image" src="https://github.com/user-attachments/assets/0ba19635-7a15-4027-9b78-9744cdf296c1" />


## Estrutura do repositório

```
SistemaTriagemDocker-IESB/
├── docker-compose.yml      # Orquestração dos serviços
├── front/                  # Frontend React + TypeScript
│   ├── Dockerfile
│   ├── nginx.conf
│   └── src/
└── back/
    └── backend/            # API REST Node.js
        ├── Dockerfile
        ├── src/
        └── tests/
```

## Pré-requisitos

- [Docker](https://www.docker.com/) e Docker Compose **ou**
- Node.js 20+ e npm (para execução local em desenvolvimento)

## Executando com Docker (recomendado)

Na raiz do repositório:

```bash
docker compose up --build
```

| Serviço  | URL                          |
| -------- | ---------------------------- |
| Frontend | http://localhost:8080        |
| Backend  | http://localhost:3000        |
| Health   | http://localhost:3000/health |

O banco SQLite é persistido no volume Docker `backend-data`.

Para encerrar:

```bash
docker compose down
```

Para remover também o volume com os dados:

```bash
docker compose down -v
```

## Executando localmente (desenvolvimento)

### Backend

```bash
cd back/backend
cp .env.example .env
npm install
npm run dev
```

A API ficará disponível em `http://localhost:3000`.

### Frontend

Em outro terminal:

```bash
cd front
cp .env.example .env
npm install
npm run dev
```

O frontend de desenvolvimento ficará disponível em `http://localhost:5173` (porta padrão do Vite).

## Variáveis de ambiente

### Backend (`back/backend/.env`)

| Variável  | Descrição              | Padrão                    |
| --------- | ---------------------- | ------------------------- |
| `PORT`    | Porta da API           | `3000`                    |
| `DB_PATH` | Caminho do banco SQLite | `/app/data/fila.db` (Docker) |

### Frontend (`front/.env`)

| Variável        | Descrição          | Padrão                  |
| --------------- | ------------------ | ----------------------- |
| `VITE_API_URL`  | URL base da API    | `http://localhost:3000` |

> No build Docker do frontend, `VITE_API_URL` é definida como argumento de build no `docker-compose.yml`.

## API REST

| Método   | Rota                      | Descrição                    |
| -------- | ------------------------- | ---------------------------- |
| `GET`    | `/health`                 | Healthcheck                  |
| `GET`    | `/pacientes`              | Lista todos os pacientes     |
| `POST`   | `/pacientes`              | Cadastra um paciente         |
| `PUT`    | `/pacientes/:id/status`   | Atualiza o status do paciente |
| `DELETE` | `/pacientes/:id`          | Remove um paciente           |

### Prioridades válidas

- `emergencia` — atendimento imediato
- `urgente` — até 10 minutos
- `pouco_urgente` — até 30 minutos
- `nao_urgente` — até 120 minutos

### Status válidos

- `aguardando`
- `em_atendimento`
- `finalizado`

### Exemplo de cadastro

```bash
curl -X POST http://localhost:3000/pacientes \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Maria Silva",
    "genero": "feminino",
    "idade": 45,
    "cpf_rg": "123.456.789-00",
    "prioridade": "urgente",
    "queixa_principal": "Febre alta",
    "observacoes": ""
  }'
```

## Testes

Os testes da API utilizam o runner nativo do Node.js:

```bash
cd back/backend
npm test
```

## Licença

Projeto acadêmico — IESB / DevOps PBL Caso 4.
