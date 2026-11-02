# ⚙️ Non-Functional Requirements (NFRs)

Quality attributes the platform must satisfy in the MVP.

---

| Category | Requirement |
|----------|-------------|
| **Performance** | Map/task feed loads < 1.5s; real-time bid updates < 500ms |
| **Availability** | 99.5% uptime for MVP |
| **Security** | PCI-compliant payments (via Stripe/processor — never store raw card data); JWT auth; rate limiting |
| **Scalability** | Stateless API behind load balancer; WebSocket gateway horizontally scalable via Redis adapter |
| **Compliance** | KYC for payout-eligible Runners; GDPR-style data deletion endpoint |
| **Observability** | Structured logs, request tracing, error monitoring (Sentry), escrow audit log |

> 🔗 Detailed security & trust/safety strategy: [`../03-engineering/06-security-trust-safety.md`](../03-engineering/06-security-trust-safety.md)
