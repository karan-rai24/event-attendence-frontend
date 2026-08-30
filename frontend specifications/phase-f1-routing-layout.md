# Phase F1 — Routing + Layout

**Milestone: F1**

## Goal

Build the app shell (navbar + sidebar + footer) and wire up every route from `frontend-routes.md`, before any real page content exists.

## Tasks

- [ ] Create `routes/AppRoutes.tsx` with every route listed in `frontend-routes.md`
- [ ] Create `routes/ProtectedRoute.tsx` — redirects to `/login` if no valid token
- [ ] Create `routes/RoleRoute.tsx` — wraps `ProtectedRoute`; redirects to the user's own role-home if they hit the wrong role's route
- [ ] Create `components/layout/DashboardLayout.tsx` — navbar + sidebar + footer shell
- [ ] Create `components/layout/Navbar.tsx`, `Sidebar.tsx`, `Footer.tsx`
- [ ] Sidebar menu items differ by role, but it's the same shell component (per the locked decision — not two separate layouts)
- [ ] Build the public landing page (`/`)
- [ ] Build the `NotFound.tsx` fallback for unmatched routes
- [ ] Confirm mobile-first responsiveness of the shell — sidebar collapses appropriately on small screens

## Locked decisions that affect this phase

- Mobile-first throughout — build and test this shell at mobile width first
- Footer is included
- Logged-out visitor sees the landing page, not an immediate redirect to Login

## Definition of Done

- [ ] Every route in `frontend-routes.md` resolves to a page (even if the page is just a placeholder for now)
- [ ] An unauthenticated user hitting a protected route is redirected to `/login`
- [ ] The shell renders correctly at mobile width, not just desktop
