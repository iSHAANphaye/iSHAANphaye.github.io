# Technical Handoff & Build Specification for Antigravity IDE

**Project:** Ishaan Shailesh Phaye — SDE & Applied AI Engineer Portfolio  
**Target Domain:** `ishaanphaye.dev`  
**Stack:** Next.js 15 (App Router), TypeScript, Tailwind CSS v4, Framer Motion, Groq API, Upstash Redis, Resend API

---

## 1. Executive Summary & Architecture

This application is built as a single-source-of-truth portfolio and conversion funnel for recruiters and engineering managers.

- **Data Grounding:** `src/data/portfolio.ts` feeds both the rendered React UI components and the system prompt inside `src/lib/knowledge-base.ts`. There is zero drift between what recruiters see on screen and what the embedded AI assistant answers.
- **AI Chat Architecture (`/api/chat`):** Driven by Groq (`llama-3.3-70b-versatile`) with sub-300ms streaming responses. Guardrails strictly limit questions to verified candidate facts, capping queries at 300 characters to prevent prompt injection and API quota abuse.
- **Rate Limiting:** Managed via `@upstash/ratelimit`. In local development without Redis keys, it falls back to a graceful in-memory token bucket so local testing never breaks.
- **Contact Form (`/api/contact`):** Uses Resend with Zod input validation and a hidden honeypot field (`website`) to reject automated spam bots before sending emails.

---

## 2. Directory Structure

```text
ishaan-portfolio/
├── public/
│   ├── resume.pdf                  # [HUMAN INPUT REQUIRED] Drop actual PDF here
│   ├── art/                        # SVG line-art stickers (terminal, chip, graph, shield, etc.)
│   └── projects/                   # WebP/SVG project screenshots and SVG architecture diagrams
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── chat/route.ts       # Grounded LLM endpoint + rate limiting
│   │   │   └── contact/route.ts    # Resend email handler + honeypot validation
│   │   ├── globals.css             # Tailwind v4 theme variables & marquee animations
│   │   ├── layout.tsx              # SEO metadata, Json-LD Person schema, font loading
│   │   └── page.tsx                # Composition of layout sections
│   ├── components/
│   │   ├── layout/                 # StickyNav.tsx, Footer.tsx
│   │   ├── sections/               # Hero, Marquee, AskAI, Projects, Skills, Experience, Education, Contact
│   │   └── ui/                     # ProjectModal.tsx
│   ├── data/
│   │   └── portfolio.ts            # SINGLE SOURCE OF TRUTH (All dossier info)
│   ├── lib/
│   │   ├── knowledge-base.ts       # Serializes portfolio.ts into system prompt
│   │   ├── ratelimit.ts            # Upstash Redis + fallback memory rate limiter
│   │   ├── utils.ts                # Tailwind class merger (clsx + tailwind-merge)
│   │   └── validators.ts           # Zod validation schemas for AI chat and contact form
│   └── types/
│       └── portfolio.ts            # TypeScript interfaces for data models
├── .env.example                    # Template for environment variables
├── ANTIGRAVITY_HANDOFF.md          # Technical instruction guide for IDE execution
├── next.config.ts                  # Next.js configuration
├── package.json                    # Dependencies & build scripts
└── tsconfig.json                   # Strict TypeScript configuration
```

---

## 3. Execution Plan for Antigravity IDE

Antigravity IDE should execute the following steps in sequence:

### Automated Steps (Run in Terminal)

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Environment File Setup:**
   ```bash
   cp .env.example .env.local
   ```

3. **Type-Check & Verification:**
   ```bash
   npx tsc --noEmit
   ```

4. **Production Build Verification:**
   ```bash
   npm run build
   ```

5. **Launch Local Development Server:**
   ```bash
   npm run dev
   ```

---

## 4. Required Human Inputs & Environment Setup

Before testing full AI streaming or contact form submissions, update `.env.local` with your operational keys:

### Environment Variables Checklist (`.env.local`)

```env
# 1. Groq API Key (Required for Grounded AI Assistant)
# Get a free key at: https://console.groq.com/keys
GROQ_API_KEY=gsk_your_groq_api_key_here

# 2. Resend API Key (Required for Contact Form Submissions)
# Get a free key at: https://resend.com/api-keys
RESEND_API_KEY=re_your_resend_api_key_here

# 3. Notification Recipient Email
CONTACT_TO_EMAIL=ishaanphaye@gmail.com

# 4. Upstash Redis (Recommended for production Vercel deployment)
# Get free keys at: https://console.upstash.com
UPSTASH_REDIS_REST_URL=https://your-redis-instance.upstash.io
UPSTASH_REDIS_REST_TOKEN=your_upstash_token_here
```

### Static File Assets Needed

1. **Resume PDF:** Place your current resume at `public/resume.pdf`. All navigation CTAs link to this endpoint.
2. **Project Screenshots (Optional):** Replace the preview SVG assets in `public/projects/` (`clipsense.webp`, `mini-db.webp`, etc.) with high-resolution WebP screenshots of your live tools whenever available.

---

## 5. Verification & Testing Playbook

When testing locally on `http://localhost:3000`:

1. **Scroll-Spy & Nav:** Click navigation headers (`Ask AI`, `Projects`, `Skills`, `Experience`, `Education`, `Contact`) to confirm smooth scrolling and section activation.
2. **KPI Strip & Marquee:** Verify that the 4 metric cards (`96%`, `35%`, `95.67%`, `8th / 3,500+`) render correctly and the infinite ticker pauses on hover.
3. **Ask AI Section:**
   - Test preset prompt buttons (e.g., *"How did ClipSense AI cut search latency by 96%?"*).
   - Verify stream output and ensure rate limit counters deduct queries correctly.
   - Test off-topic guardrails by asking *"What is the candidate's target salary?"* (The bot should politely redirect to email).
4. **Projects Filter & Architecture Drawer:**
   - Filter by categories (`All`, `AI / ML`, `Systems`, `Full-Stack`, `Edge`).
   - Click **"Inspect Architecture & Benchmarks →"** on any project to verify modal popups, SVG diagrams, and performance metric tables.
5. **Contact Form:**
   - Fill out Name, Email, and Message. Verify success toast notifications.
   - Confirm hidden honeypot input prevents automated submission abuse.

---

## 6. Vercel Deployment & Custom Domain

1. Push the repository to your GitHub account (`github.com/iSHAANphaye/ishaan-portfolio`).
2. Log into **Vercel**, click **Add New Project**, and import your repo.
3. In the project settings, add the environment variables from `.env.local`:
   - `GROQ_API_KEY`
   - `RESEND_API_KEY`
   - `CONTACT_TO_EMAIL`
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`
4. Deploy the application.
5. Navigate to **Project Settings → Domains** and attach `ishaanphaye.dev`. Configure your DNS provider with the requested `A` record (`76.76.21.21`) or `CNAME` (`cname.vercel-dns.com`).