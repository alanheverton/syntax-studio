# Syntax Studio – SaaS Client Dashboard

Welcome, Future AI Model or Developer! This file serves as the official project handover document. Review this carefully before taking actions on the codebase to guarantee architecture parity and alignment with the overarching goals.

## 📌 Project Overview
This application is a **Full-Stack SaaS Client Management Dashboard**, initially designed for a freelance writing / content agency. It tracks Clients, Orders (content requests), live Timelog sessions, and Billing invoices.

**Current State**: We have successfully completed **Phases 1 & 2** of the build. The Next.js 15 App Router is fully structured. We have completed all interactive interfaces, routing, and UI. *State is currently handled by a fully functional in-memory mocked REST backend.*

### Tech Stack
- **Framework**: Next.js 15 (App Router Mode)
- **Language**: TypeScript (`.tsx` / `.ts` strict mode)
- **Styling**: Tailwind CSS (Vanilla utilities, avoiding external component libs like shadcn/ui when building primitive cards)
- **Icons**: `lucide-react`
- **Charts**: `recharts` for dashboard telemetry

## 🎨 Design System & Aesthetic (CRITICAL)
If you alter the design, you **must adhere to these established patterns**. The aesthetic direction is **"2026 Frosted Glass"**, contrasting translucent foregrounds over a vibrant, warm background.

- **Background**: We utilize a complex, warm radial background gradient spanning the viewport, managed globally in `globals.css` beneath the structure layout.
- **Glassmorphism Base**: Cards, Sidebars, and Tables utilize the utility chain:
  `bg-white/40 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60`
- **Clickable Entities**: Any interactive dashboard row uses `hover:bg-white/50`, `transition-all`, and `cursor-pointer`. Input boxes map to `bg-[#FAFAFA]/50` or `bg-white/50` for nested depth.
- **Accent Color**: Vivid Red/Crimson `text-[#E63B48]` and `bg-[#E63B48]` used for active text emphasis and primary CTA buttons.

## ⚙️ How Data Currently Works (Mock API)
The platform currently boasts **100% CRUD Capability**, but it is entirely ephemeral, mapped locally during development. 

1. **`lib/mockDatabase.ts`**: This file acts as a singleton memory bank holding arrays for `Orders`, `Clients`, `Timers`, and `Invoices`. It ships with full local helper functions (`updateClient()`, `createTimer()`, etc).
2. **`app/api/...`**: We built 12 true simulated REST routes (`/api/orders`, `/api/orders/[id]`, `/api/clients...`). The `.tsx` frontend strictly utilizes JavaScript `fetch()` calls bridging to these API routes, which then interact with `mockDatabase.ts`. 

*(We did this deliberately so that migrating to an external DB only requires pivoting inside the exact API routes, leaving the UI components completely untouched.)*

## 📁 Architecture Overview
- **`/app/(features)`**:
  - `/orders`: List of orders. 
  - `/orders/[id]`: Frosted glass Edit / Delete page.
  - `/orders/new`: Creation form.
  - *(This identical nested structure exists for `/clients`, `/billing`, and `/timers`)*
- **`/app/timers`**: Has a highly custom live `useEffect` tick interval syncing real-time tracking against the API (`/api/timers`). Be careful editing the timer hook dependency arrays.

## 🚀 Future Roadmap & Instructions for AI

### Immediate Next Step: Phase 3 (Supabase)
The user's next intended milestone is ripping out `mockDatabase.ts` and wiring real persistent backend pipelines.
1. Implement real User Authentication + Middleware redirects.
2. Hook up Supabase Client.
3. Overwrite the `app/api/.../route.ts` commands using the official `@supabase/ssr` methods to persist data natively. Leave the frontend mostly identical.

### Phase 4 (Polish & Security)
- Introduce **Zod** schema validations into the API POST/PUT checks.
- Build real File Uploaders handling Client Avatar icons and PDF Invoice storage.

### AI Instructions
- **Do NOT delete the frosted glass tailwind utility chains** without permission.
- If the user asks you to implement a new page entity (like "Settings" or "Team"), follow the exact same structural paradigm: build an API layer, create the `page.tsx` array map, create the `new/page.tsx` creator form, and finally craft the `[id]/page.tsx` edit page.
- Always include an explicitly colored **"Delete [Object]"** button at the bottom bounding border of the `/[id]/` Edit forms. 
- Use the `lucide-react` library aggressively for UI navigation and text cues.
