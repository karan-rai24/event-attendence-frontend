# Phase F3 — Student Event Browsing

**Milestone: F3**

## Goal

Let a logged-in student browse events and view details — read-only, no registration yet (that's F4).

## Tasks

- [ ] Create `services/event.service.ts` — `getEvents()`, `getEvent(id)`, typed against `EventSummary`/`Event` from `frontend-types.md`
- [ ] Create `hooks/useEvents.ts` (TanStack Query)
- [ ] Build `components/events/EventCard.tsx` — title, date, venue, spots filled/capacity (full detail, per the locked decision)
- [ ] Build `components/events/EventGrid.tsx` — card grid layout
- [ ] Build `pages/student/Events.tsx` — assembles the grid
- [ ] Build `pages/student/EventDetails.tsx` — full event detail view (register button itself is wired in F4)
- [ ] Apply the generic loading spinner during fetch
- [ ] Apply a tailored empty state ("No events available right now") if the list is empty
- [ ] Apply the toast-on-page-load-error convention if `GET /events` fails

## Definition of Done

- [ ] A student can see a grid of upcoming events with correct data from the backend
- [ ] Clicking an event card navigates to its details page with the full description
- [ ] Loading, empty, and error states all behave per `frontend-component-spec.md`
