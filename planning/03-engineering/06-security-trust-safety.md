# 🛡️ Security & Trust/Safety Strategy

This is a two-sided marketplace handling real money and real-world meetups — safety is a product feature.

---

## 1. Platform & Data Security
- **Auth:** short-lived access JWT + rotating refresh tokens; OTP rate-limited; admin 2FA.
- **Transport:** HTTPS/WSS only; HSTS.
- **Payments:** never store raw card data — tokenized via Stripe; webhooks signature-verified.
- **Input:** all bodies validated (zod); parameterized queries via Prisma (no raw SQL injection surface).
- **Rate limiting & throttling** on auth, posting, and payout endpoints.
- **Secrets:** in env/secret manager, never committed; per-environment.
- **PII:** KYC docs encrypted at rest in S3, access-logged; GDPR-style delete endpoint.
- **RBAC:** admin/support/finance roles; least privilege; all admin money actions audit-logged.

## 2. Mitigating Master ↔ Runner Risk

| Risk | Mitigation |
|------|-----------|
| **Runner does work, doesn't get paid** | Escrow locks funds *before* task goes live; auto-release timer prevents Masters trapping money |
| **Master pays, Runner doesn't deliver** | Funds only release on proof + approval; dispute → Admin can refund |
| **Fake / scam tasks** | No funds locked = not visible; AI fraud scoring; content moderation blocks illegal tasks |
| **Unsafe / illegal errands** | AI content filter (`/moderate`) blocks weapons, harassment, illicit categories at post time |
| **Identity fraud** | Mandatory KYC (ID + selfie) before any payout; admin review queue |
| **Off-platform payment (bypassing fee)** | Detect contact-info exchange patterns in chat; in-app payments only; warnings |
| **Disputes / he-said-she-said** | Full chat transcript + proof images stored; AI evidence summary; Admin split/refund tool |
| **Account abuse / velocity fraud** | Device fingerprinting, velocity checks, fraud flags → auto-hide + admin review |
| **Physical safety at meetups** | Live location sharing, in-app chat (no phone exchange needed), ratings, report button |

## 3. Dispute Resolution Flow
```
Either party opens dispute  →  Task=DISPUTED, escrow frozen (IN_DISPUTE)
   →  Admin reviews: chat + proof + history + AI summary
   →  Admin rules: RELEASE (to Runner) | REFUND (to Master) | SPLIT (custom %)
   →  Escrow transitions accordingly; both parties notified; resolution logged immutably
```
