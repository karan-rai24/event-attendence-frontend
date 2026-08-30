# Phase F6 — Event Creation

**Milestone: F6**

## Goal

Let an organizer create a new event.

## Locked decisions that affect this phase

- Native HTML `<input type="datetime-local">` for start/end time — no external date-picker library.
- Validation errors shown inline, under each specific field (capacity > 0, end time after start time).
- Submit button shows a loading/disabled state while the request is in flight, preventing duplicate event creation on a double-tap.

## Tasks

- [ ] Extend `event.service.ts` with `createEvent()`, typed against `CreateEventRequest` from `frontend-types.md`
- [ ] Build `components/events/EventForm.tsx` — React Hook Form + Zod, Zod schema mirroring `CreateEventRequest`
- [ ] Build `pages/organizer/CreateEvent.tsx`
- [ ] Wire inline validation errors for capacity and time-range rules
- [ ] Toast confirmation on success ("Event created"), then redirect to `/organizer/events`

## Definition of Done

- [ ] An organizer can create an event end to end against the real backend
- [ ] Invalid capacity or an end time before the start time is rejected with a clear inline message before the request is even sent
- [ ] The new event appears in My Events immediately after creation
