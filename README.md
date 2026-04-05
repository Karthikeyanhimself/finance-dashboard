# Finance Dashboard UI

> A High-Performance, macOS-Inspired Wealth Management Dashboard.

Finance Dashboard UI is a financial tracking application built with **Next.js 16** and **Three.js**. It blends high-end desktop aesthetics (macOS Dock, Glassmorphism) with robust data management and interactive 3D visualizations.

---

## The Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router + Turbopack) |
| Styling | Tailwind CSS (Glassmorphism & Fluid Design) |
| 3D Engine | Three.js & @react-three/fiber |
| Animations | Framer Motion & Lenis (Smooth Scroll) |
| State Management | Zustand with LocalStorage Persistence |
| Components | Shadcn UI & Lucide Icons |

---

## Key Features

### The macOS Dock

A fully functional, high-fidelity dock featuring:

- **Trigonometric Magnification** — Custom $1 - \cos(\theta)$ math for smooth, wave-like icon scaling.
- **Contextual Feedback** — Active route indicators and tooltips.
- **Theme Integration** — A unified celestial toggle for instant Dark/Light mode switching.

### Role-Based Access Control (RBAC)

A built-in Admin/User toggle located in the Header that dynamically alters the UI:

- **Admin Mode** — Grants access to Create and Edit transaction modals.
- **User Mode** — Provides a read-only, distraction-free viewing experience.

###  Data Visualization

- **Balance Trends** — Interactive Line Charts tracking net worth.
- **Expense Analysis** — Grouped Bar Charts comparing Income vs. Expenses.
- **Fluid Responsiveness** — Charts utilize horizontal scrolling on mobile to maintain readability without data squishing.

---

## Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/your-username/finance-os.git
cd finance-os
npm install
```

### 2. Add UI Components

```bash
npx shadcn@latest add switch label table dialog input select
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your OS in action.

---

## Project Structure

```
.
├── app/(main)/          # Core dashboard, transactions, and insights routes
├── components/layout/   # NavigationDock, Header, and Sidebar logic
├── components/visuals/  # Three.js HeroCanvas and AnimatedBackgrounds
├── store/               # Zustand stores for Global State (Role, Finance Data, UI)
├── lib/                 # Mock GraphQL resolvers and utility functions
└── public/icons/        # High-resolution PNGs for the macOS Dock
```

---

## Roadmap

- [ ] **Real-time API Integration** — Swapping mock GraphQL with live database endpoints.
- [ ] **Financial Export** — PDF and CSV generation for transaction reports.
- [ ] **Deployment** — One-click Vercel deployment with optimized edge-caching.

---

> **Note:** This project was developed with a focus on **Hydration Safety** and **UX Performance**, ensuring a seamless transition between Server-Side Rendering (SSR) and Client-Side Interactive elements.