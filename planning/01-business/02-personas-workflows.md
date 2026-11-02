# 👥 Personas & User Workflows

The three roles in the Errandly ecosystem and their step-by-step journeys.

---

## Persona A — The Master (Client)
| Attribute | Detail |
|-----------|--------|
| **Who** | Busy professional (30–50), elderly individual, or a person with limited time/mobility |
| **Goal** | Offload a real-world errand quickly and trust it gets done |
| **Pain** | No time/energy for bureaucracy, queues, or physical pickups |
| **Tech comfort** | Medium — uses ride-hailing & food apps comfortably |
| **Fears** | Paying upfront and getting scammed; Runner not showing up |

### Master Workflow (Happy Path)
```
1.  Open app → Login (KYC-lite: phone + email verified)
2.  Tap "Post a Task"
3.  Select category (AI suggests category from description)
4.  Describe task + add photos + set location on map
5.  Set budget (AI shows suggested price range for that category/zone)
6.  Review fee breakdown: Task Cost + 10% service fee
7.  Confirm → Funds LOCKED into Escrow (card / wallet)
8.  Task goes LIVE → nearby Runners notified
9.  Receive bids OR instant-accept (depending on task mode)
10. Select Runner → Task = ASSIGNED
11. Track Runner live on map + chat in-app
12. Runner marks "Completed" + uploads proof (photo/receipt)
13. Master REVIEWS proof → Approves (or Disputes)
14. On Approval → Escrow releases payout to Runner (minus 10%)
15. Rate & review the Runner
```

---

## Persona B — The Runner (Freelancer)
| Attribute | Detail |
|-----------|--------|
| **Who** | Student, gig worker, retiree, or anyone seeking flexible income |
| **Goal** | Earn money on a flexible schedule without complex skills |
| **Pain** | Hard to find trustworthy, well-paid local gigs |
| **Tech comfort** | Low–Medium — needs a dead-simple UI |
| **Fears** | Doing the work and not getting paid; unsafe tasks |

### Runner Workflow (Happy Path)
```
1.  Open app → Login → Complete KYC (ID + selfie + bank/wallet details)
2.  Toggle "Available" (Online) → location shared
3.  Browse nearby tasks on map/list (filtered by category, distance, payout)
4.  Open task detail → AI safety/fraud score shown to platform (flagged tasks hidden)
5.  Bid on task OR Accept instantly
6.  On selection → Task = ASSIGNED → navigation starts
7.  Travel to location → tap "Start Task"
8.  Execute errand on-site
9.  Tap "Mark Completed" → upload proof (photo, receipt, signature)
10. Wait for Master approval
11. On Approval → Payout (Task Cost − 10%) credited to Runner wallet
12. Withdraw to bank/mobile wallet
13. Rate & review the Master
```

---

## Persona C — The Admin
| Attribute | Detail |
|-----------|--------|
| **Who** | Platform operations / trust & safety staff |
| **Goal** | Keep marketplace safe, solvent, and dispute-free |
| **Tools** | Web Dashboard (Next.js) |

### Admin Workflow
```
1.  Login to Web Dashboard (RBAC: admin / support / finance)
2.  Monitor live KPIs (active tasks, GMV, fees collected, online runners)
3.  Review KYC submissions → approve/reject Runners
4.  Review AI-flagged tasks/users (fraud queue)
5.  Resolve disputes → release / refund / split escrow
6.  Manage payouts & reconcile platform commission
7.  Manage categories, pricing rules, and zones
```

---
➡️ Next: [`03-user-stories.md`](./03-user-stories.md)
