# 🔁 Branch & PR Workflow + Glossary

---

## Branch & PR Workflow
- `main` (prod) ← `develop` (integration) ← `feat/<squad>/<short-desc>`.
- PRs require: green CI (lint + typecheck + test) + 1 review.
- Any change to `packages/schemas` (the contract) requires a review from **each affected squad**.
- Conventional commits (`feat:`, `fix:`, `chore:`…).

## Definition of Done (per feature)
1. Implemented against shared `packages/schemas` types.
2. Unit tests (services) + integration test for any money/escrow path.
3. API documented in `api-contract` / OpenAPI.
4. Reviewed PR merged to `develop`; CI green (lint + typecheck + test).
5. Escrow paths require an **immutable ledger entry assertion** in tests.

---

## Glossary
| Term | Meaning |
|------|---------|
| **Master** | Client who posts and funds a task |
| **Runner** | Freelancer who executes the task on-site |
| **Escrow** | Platform-held funds, released only on approval/ruling |
| **Ledger** | Immutable double-entry record of all money movements |
| **Commission** | 10% platform fee on task completion |
| **KYC** | Identity verification required before payout |
| **Task Room** | Live shared screen (map + chat) during an active task |
