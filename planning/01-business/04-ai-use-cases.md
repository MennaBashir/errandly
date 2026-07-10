# 🤖 AI Use Cases

How AI enhances the platform. Delivered as a dedicated `ai-service` microservice.

---

| # | AI Feature | Where it runs | Input | Output / Action |
|---|-----------|---------------|-------|-----------------|
| **AI-1** | **Smart Task Categorization** | On task creation | Free-text description + photos | Predicted category + tags (auto-fill the form) |
| **AI-2** | **Dynamic Pricing Recommendation** | On budget step | Category, zone, time, historical payouts, urgency | Suggested price range ("Tasks like this usually pay $8–$12") |
| **AI-3** | **Smart Matching / Ranking** | On task publish | Runner location, rating, category history, success rate | Ranked list of best-fit Runners + push priority |
| **AI-4** | **Fraud & Risk Detection** | Background + on-post | User velocity, device fingerprint, payment anomalies, text patterns | Risk score → auto-hide / flag to Admin fraud queue |
| **AI-5** | **Content Safety Filter** | On post & chat | Task text, chat messages, images | Block illegal/unsafe tasks (weapons, harassment) |
| **AI-6** | **Dispute Assist (Phase 2)** | On dispute open | Chat logs, proof images, task history | Suggested resolution + evidence summary for Admin |

## AI Architecture Note
AI is delivered as a **dedicated `ai-service` microservice** (Python/FastAPI) exposed via internal REST to the NestJS backend.

**MVP priority:**
- **Mandatory:** AI-1 (categorization), AI-2 (pricing), AI-4 (fraud).
- AI-3 (matching) — rules-based + lightweight ML.
- AI-5 (moderation) — uses a moderation API.
- AI-6 (dispute assist) — Phase 2.

> The AI service returns scores/suggestions only. It **never** makes money decisions — the backend enforces all rules.

---
➡️ Next: [`05-escrow-logic.md`](./05-escrow-logic.md)
