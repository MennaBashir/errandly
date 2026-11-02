# 🛠️ Local Development Quickstart

How to run the whole stack locally.

---

```bash
# prerequisites: node 20+, pnpm 9+, docker, expo cli

git clone <repo> errandly && cd errandly
pnpm install

# 1. spin up infra (postgres, redis, minio)
docker compose -f infra/docker/docker-compose.dev.yml up -d

# 2. set up the database
pnpm --filter api prisma migrate dev
pnpm --filter api prisma db seed

# 3. run everything (turbo runs all dev tasks in parallel)
pnpm dev
#   api        → http://localhost:3000/api/v1
#   web        → http://localhost:3001
#   ai-service → http://localhost:8000
#   mobile     → expo dev server (scan QR)

# run a single app
pnpm --filter mobile dev
pnpm --filter web dev
pnpm --filter api dev
```

## Quality gates (run before every PR)
```bash
pnpm lint          # eslint across workspace
pnpm typecheck     # tsc --noEmit everywhere
pnpm test          # unit + integration (escrow tests MUST pass)
```
