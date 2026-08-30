# Phase F5 — Organizer Dashboard

**Milestone: F5**

## Goal

Give the organizer an overview: stats and their event list.

## Locked decisions that affect this phase

- Dashboard stat cards show all three: total events, total registrations, total checked-in — computed client-side from existing list endpoints (no dedicated backend stats endpoint).
- My Events is filterable/sortable by upcoming vs past, computed from `end_time` vs now — not a stored field.

## Tasks

- [ ] Extend `event.service.ts` to call the backend-scoped organizer endpoint (for example `GET /events/organizer/me` or an equivalent authenticated query) so it returns only the current organizer's events; keep any `organizer_id` filtering as presentation-only logic, not the access boundary
- [ ] Build `components/dashboard/StatsGrid.tsx` + `StatCard.tsx` — computes totals from already-fetched event/registration/attendance data
- [ ] Build `pages/organizer/OrganizerDashboard.tsx`
- [ ] Build `pages/organizer/MyEvents.tsx` with the upcoming/past filter
- [ ] Reuse `EventCard`/`EventGrid` from the student side where reasonable, rather than rebuilding

## Definition of Done

- [ ] The dashboard shows correct totals matching what's actually in the backend for that organizer
- [ ] My Events correctly separates upcoming vs past events
- [ ] An organizer only sees their own events, never another organizer's
