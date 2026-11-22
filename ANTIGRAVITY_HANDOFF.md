# Antigravity IDE Handoff & Build Runbook

> **Purpose:** This technical handoff instructs Antigravity (or any coding agent) how to initialize, verify, customize, and deploy Ishaan Shailesh Phaye's portfolio from this bundle, while clearly flagging every step that requires Ishaan's manual input.

---

## 1. Architecture Overview

- **Framework:** Next.js 15 (App Router) + React 19 + TypeScript + Tailwind CSS v4.
- **Single Source of Truth:** `src/data/portfolio.ts` powers **both** the UI sections and the grounded AI assistant (`src/lib/knowledge-base.ts`). Any update to projects, skills, or experience automatically updates the AI's context.
- **API Routes:**
  - `POST /api/chat` — Calls Groq (`llama-3.3-70b-versatile`) with strict grounding rules, prompt-injection defense, Zod input validation (300-char cap), and rate limiting (`10 requests / 24h` per IP).
  - `POST /api/contact` — Validates inquiries with Zod, checks a hidden honeypot field, enforces rate limiting (`3 requests / hour` per IP), and sends email via Resend.
- **Graceful Local Fallback:** `src/lib/ratelimit.ts` uses Upstash Redis when `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` are set, and automatically falls back to an in-memory limiter during local development so the app runs immediately.

---

## 2. Automated Agent Steps (Antigravity Can Execute Directly)

Run these steps in order after extracting `ishaan-portfolio.zip` into the workspace root:

1. **Install Dependencies:**
   ```bash
   npm install
   ```
2. **Create Local Env File:**
   ```bash
   cp .env.example .env.local
   ```
   *(Pause and prompt Ishaan to paste his API keys into `.env.local` — see Section 3.)*
3. **Type-Check & Production Build Verification:**
   ```bash
   npx tsc --noEmit
   npm run build
   ```
   If any TypeScript or Tailwind v4 utility issue appears, fix it before starting the dev server.
4. **Local Smoke Test:**
   ```bash
   npm run dev
   ```
   Verify:
   - `http://localhost:3000` renders all 8 sections (`Hero`, `Marquee`, `Ask AI`, `Projects`, `Skills`, `Experience & Honors`, `Education`, `Contact`) with zero console errors.
   - Clicking any project card opens `ProjectModal` with its SVG architecture diagram and benchmark table; pressing `Esc` closes it.
   - Category filter tabs (`All`, `AI / ML`, `Systems`, `Full-Stack`, `Edge`) filter the grid cleanly.
   - Clicking Email copies `ishaanphaye@gmail.com` and triggers a Sonner toast.
   - Once `GROQ_API_KEY` is present, test a suggested prompt in `Ask AI` and confirm the budget badge decrements from `10 / 10` to `9 / 10`.
   - Once `RESEND_API_KEY` is present, submit a test message in `Contact` and verify receipt.

---

## 3. Steps Requiring User Input (Ishaan's Action Items)

Antigravity **cannot** complete these without your credentials or assets. Provide them when prompted:

### A. API Keys (`.env.local` & Vercel Environment Variables)
| Variable | Required? | Where to Get It | Notes |
| :--- | :--- | :--- | :--- |
| `GROQ_API_KEY` | **Yes** (for Ask AI) | [console.groq.com/keys](https://console.groq.com/keys) | Free tier is plenty for portfolio traffic. |
| `RESEND_API_KEY` | **Yes** (for Contact Form) | [resend.com/api-keys](https://resend.com/api-keys) | Free tier allows 3,000 emails/month. |
| `CONTACT_TO_EMAIL` | **Yes** | Pre-filled: `ishaanphaye@gmail.com` | Destination inbox for contact form submissions. |
| `CONTACT_FROM_EMAIL` | Optional | Default: `Portfolio Inquiry <onboarding@resend.dev>` | Update to `noreply@ishaanphaye.dev` once you verify your domain in Resend. |
| `UPSTASH_REDIS_REST_URL` | **Recommended for Prod** | [console.upstash.com](https://console.upstash.com/) | Create a free Redis database so rate limits persist across Vercel serverless cold starts. |
| `UPSTASH_REDIS_REST_TOKEN` | **Recommended for Prod** | [console.upstash.com](https://console.upstash.com/) | Paired with the Upstash URL above. |

### B. Static Assets to Drop into `public/`
1. **Resume PDF:** Place your latest resume at `public/resume.pdf`. All "Resume" and "View Resume PDF" buttons already point to `/resume.pdf`.
2. **Real Project Screenshots (Optional Upgrade):** The bundle ships with crisp, custom-designed SVG preview cards in `public/projects/` so the site looks polished immediately. Whenever you want to swap in real UI screenshots (16:9 WebP, `< 120 KB`), replace the paths in `src/data/portfolio.ts`:
   - `public/projects/clipsense.webp`
   - `public/projects/mini-db.webp`
   - `public/projects/gpt2.webp`
   - `public/projects/object-detection.webp`
   - `public/projects/vaatika.webp`

### C. Vercel Deployment & Custom Domain
1. Push the repository to GitHub (e.g., `github.com/iSHAANphaye/portfolio`).
2. Import the repo in [vercel.com/new](https://vercel.com/new).
3. Add all environment variables from `.env.local` in **Vercel Project Settings → Environment Variables**.
4. Attach your custom domain `ishaanphaye.dev` under **Settings → Domains**.

---

## 4. File Map Reference

```text
ishaan-portfolio/
├── ANTIGRAVITY_HANDOFF.md         # This runbook
├── public/
│   ├── art/                       # 6 lightweight SVG stickers
│   └── projects/                  # Preview SVGs + 3 system architecture SVG diagrams
├── src/
│   ├── types/portfolio.ts         # Shared TypeScript interfaces
│   ├── data/portfolio.ts          # Single source of truth (edit here to update site + AI)
│   ├── lib/
│   │   ├── knowledge-base.ts      # Compiles src/data/portfolio.ts into LLM system prompt
│   │   ├── ratelimit.ts           # Upstash Redis + local in-memory fallback
│   │   ├── validators.ts          # Zod schemas for /api/chat and /api/contact
│   │   └── utils.ts               # Tailwind cn() helper
│   ├── app/
│   │   ├── layout.tsx             # Fonts (Space Grotesk, Inter, JetBrains Mono), SEO, JSON-LD
│   │   ├── globals.css            # Design tokens + marquee keyframes
│   │   ├── page.tsx               # Main page composition
│   │   └── api/
│   │       ├── chat/route.ts      # Grounded Groq AI endpoint
│   │       └── contact/route.ts   # Resend contact form endpoint
│   └── components/
│       ├── layout/                # StickyNav.tsx, Footer.tsx
│       ├── ui/                    # ProjectModal.tsx
│       └── sections/              # Hero, Marquee, AskAI, Projects, Skills, Experience, Education, Contact
```
