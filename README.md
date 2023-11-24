# Pre-requisites

- Node 18 LTS
- PNPM or BUN

# Getting started

- Clone the repository

```
git clone git@github.com:Luks3110/bitway-tech-assessment.git <project_name>
```

- Install dependencies

```bash
cd <project_name>
# backend
pnpm i
# frontend (you can use any package manager to be honest)
bun install
```

# Start the development server

First, run the development server:

```bash
# backend
pnpm dev
# frontend
bun dev
```

Frontend:
Open [http://localhost:3000](http://localhost:3000)

Backend:
Open [http://localhost:8000](http://localhost:8000)

# Build the project

```bash
# frontend
bun run build
bun start
# backend
pnpm run build
pnpm start
```

# Populate the database

```bash
pnpm run populate:employees &&
pnpm run populate:customers
```

# Docker

Docker is in dev mode, Next.js is not building for production yet.
Run the following commands to compose the containers:

```bash
docker compose -f "docker.compose.yaml" up -d --build
```

# Docs

You can find the swagger of the backend at /docs
