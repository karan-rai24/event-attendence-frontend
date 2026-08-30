# Phase F0 — Frontend Setup

**Milestone: F0**

## Goal

Initialize the React + TypeScript + Vite project with the locked tooling — nothing built yet, just the foundation.

## Tasks

- [ ] `npm create vite@latest` with the React + TypeScript template
- [ ] Install locked dependencies (see below)
- [ ] Configure Tailwind CSS with a custom theme matching `frontend-design-system.md` (colors, font family, spacing scale, border radius)
- [ ] Create the folder structure per `frontend-design-system.md` / the roadmap (`components/`, `pages/`, `services/`, `hooks/`, `context/`, `routes/`, `types/`, `utils/`, `constants/`)
- [ ] Create `.env` and `.env.example` with `VITE_API_BASE_URL=http://localhost:8000`
- [ ] Create `services/api.ts` — base Axios instance pointed at `VITE_API_BASE_URL`
- [ ] Copy interfaces from `frontend-types.md` into `types/*.ts`
- [ ] Create `.gitignore`, initial `README.md`

## Locked dependencies

```
react-router-dom
axios
@tanstack/react-query
react-hook-form
zod
tailwindcss
qrcode.react
html5-qrcode
```

Per `frontend-design-system.md` — these are locked, not suggestions.

## Deliverables

- `npm run dev` runs cleanly at `localhost:5173`
- Tailwind custom theme applied (visible on a placeholder page using the design system's primary color)
- Folder structure matches the spec
- `types/*.ts` populated from `frontend-types.md`

## Definition of Done

- [ ] Dev server starts with zero errors
- [ ] A test element styled with the custom Tailwind theme renders the correct indigo (`#4F46E5`)
- [ ] `.env.example` committed, `.env` gitignored
