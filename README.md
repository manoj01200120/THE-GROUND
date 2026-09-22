# THE GROUND — Student-Driven Builder Ecosystem

A complete, production-ready website and registration platform for **THE GROUND** — an ecosystem where people come to build.

> *"Learn. Build. Lead. Guide. Repeat."*

---

## 1. Overview

THE GROUND is a student-driven builder ecosystem designed to bridge the gap between classroom theory and real-world capability. This platform provides:

- **Public Narrative Platform**: Full ecosystem explanation, 10-stage operating lifecycle, multidisciplinary contributions, member progression journey, live project dashboard preview, commercial client system, and community flywheel.
- **5-Step Student Registration Engine (`/join`)**: Real application wizard with validation (React Hook Form + Zod), capturing personal information, prior builds, curiosity, skills, commitment, and proof of work (GitHub, Portfolio, LinkedIn, Resume), saving directly into PostgreSQL via Prisma.
- **Client Inquiry Portal (`/clients`)**: Comprehensive intake portal ("Bring us a problem") for startups and organizations seeking student builder squads.
- **Project Dashboard (`/projects`)**: Filterable project showcase displaying active and shipped builds, squad members, blockers, outcomes, and stages.
- **Secure Admin Management Console (`/admin`)**:
  - Key metrics: total applications, pending reviews, active projects, client leads.
  - Candidate evaluation: search, filter, status progression (`PENDING` &rarr; `REVIEWING` &rarr; `SHORTLISTED` &rarr; `ACCEPTED` / `REJECTED`), and internal evaluation notes.
  - Client pipeline: lead qualification, proposal tracking, and project conversion.
  - Project management: create projects, assign student squads, update lifecycle stages, and monitor blockers.
  - Live activity audit trail.

---

## 2. Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **UI & Components**: React 19, TypeScript (Strict)
- **Styling**: Tailwind CSS with custom dark cinematic tokens
- **Animations & Smooth Scrolling**:
  - Centralized animation coordinator combining [Lenis](https://github.com/darkroomengineering/lenis) smooth scrolling and [GSAP](https://gsap.com/) ScrollTrigger.
  - [Framer Motion](https://www.framer.com/motion/) micro-interactions.
  - HTML5 Canvas background with drifting particle network and aurora gradient (60+ FPS optimized, no layout-thrashing).
  - Full `prefers-reduced-motion` compliance.
- **Database & ORM**: PostgreSQL with [Prisma ORM](https://www.prisma.io/)
- **Forms & Validation**: React Hook Form + Zod
- **Icons**: Lucide React
- **Authentication**: Secure cookie-based JWT admin session (`jose` + `bcryptjs`)

---

## 3. Database Schema

Models defined in `prisma/schema.prisma`:

- `Admin`: Secure administrator credentials and roles.
- `StudentApplication`: Detailed applicant profile, skills, projects, learning goals, time commitment, links, and status.
- `ClientInquiry`: Commercial problem brief, expected outcome, budget, timeline, and status.
- `Project`: Project details, stage (`DISCOVERY`, `DECISION`, `TEAM`, `BUILD`, `VALIDATE`, `SHIP`, `MAINTAIN`, `LEARN`), progress, blockers, outcome.
- `ProjectMember`: Squad members and assigned roles.
- `ActivityLog`: Comprehensive audit log tracking system actions.

---

## 4. Getting Started

### Prerequisites
- Node.js 18+ / 20+ / 24+
- PostgreSQL database (Local PostgreSQL, [Neon](https://neon.tech), [Supabase](https://supabase.com), or [Railway](https://railway.app))

### Setup Instructions

1. **Clone or Navigate to the Project**:
   ```bash
   cd the-ground
   ```

2. **Configure Environment Variables**:
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   Set your `DATABASE_URL`:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/theground?schema=public"
   ```

3. **Install Dependencies**:
   ```bash
   npm install
   ```

4. **Generate Prisma Client & Push Database Schema**:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Seed the Database with Initial Data**:
   ```bash
   npm run db:seed
   ```
   *Seeds default admin credentials, sample projects across stages, sample applicants, and client inquiries.*

6. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 5. Admin Access

- **URL**: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
- **Default Email**: `admin@theground.build`
- **Default Password**: `ground_admin_secure_2026!`

*(You can change these in `.env` or in `prisma/seed.ts`)*

---

## 6. Project Architecture

```
the-ground/
├── prisma/
│   ├── schema.prisma              # PostgreSQL schema
│   └── seed.ts                    # Database seeder
├── src/
│   ├── app/
│   │   ├── layout.tsx             # Root layout with fonts, smooth scroll, navigation
│   │   ├── page.tsx               # Cinematic Public Homepage
│   │   ├── join/page.tsx          # Student Registration Platform
│   │   ├── clients/page.tsx       # Client Portal ("Bring us a problem")
│   │   ├── projects/page.tsx      # Project Dashboard & Showcase
│   │   ├── admin/
│   │   │   ├── page.tsx           # Admin Overview & Analytics
│   │   │   ├── applications/      # Student Applications Manager
│   │   │   ├── clients/           # Client Inquiries Manager
│   │   │   ├── projects/          # Projects & Squad Manager
│   │   │   └── login/page.tsx     # Secure Admin Login
│   │   ├── api/                   # REST API routes
│   │   ├── sitemap.ts             # SEO Sitemap
│   │   └── robots.ts              # SEO Robots
│   ├── components/
│   │   ├── navigation/            # Navbar & Footer
│   │   ├── hero/                  # Hero & Canvas Mesh
│   │   ├── sections/              # Public ecosystem sections
│   │   ├── forms/                 # Multi-step student & client forms
│   │   ├── projects/              # Projects view
│   │   ├── admin/                 # Admin console components
│   │   └── providers/             # Lenis + GSAP provider
│   ├── lib/
│   │   ├── db/prisma.ts           # Prisma singleton
│   │   ├── auth/session.ts        # Admin session helpers
│   │   ├── validation/            # Zod validation schemas
│   │   └── actions/               # Server Actions (DB mutations)
│   └── types/                     # Shared TypeScript interfaces
```

---

## 7. Ethos & Core Principles

- **Student-Driven**: Built by students, for students.
- **Learn by Doing**: *Understand &rarr; Build &rarr; Ship &rarr; Communicate &rarr; Improve*.
- **10-Stage Operating Lifecycle**: *Problem &rarr; Discovery &rarr; Decision &rarr; Team &rarr; Build &rarr; Validate &rarr; Ship &rarr; Maintain &rarr; Learn*.
- **The Member Journey**: *Explore &rarr; Build &rarr; Carry &rarr; Guide &rarr; Inspire &rarr; Explore*.
- **Pillars of Growth**: *Capability + Reliability + Contribution + Trust*.
- **No False Promises**: Real capabilities, genuine proof of work, no guaranteed jobs or artificial credentials.
