# Phase F4 — Registration + QR Display

**Milestone: F4**

## Goal

Let a student register for an event and see their QR ticket.

## Locked decisions that affect this phase

- Register button on Event Details: hidden/disabled with a status message once already registered or once the event is full — not a dead disabled button with the same label.
- My Registrations: cards with the QR code rendered inline as a thumbnail (`qrcode.react`, generated client-side from `qr_code_token` — the backend never sends an image).
- Tapping the QR thumbnail expands it to full-screen for easier scanning at the venue.
- A registration already checked in shows a distinct "Checked in ✓" badge.

## Tasks

- [ ] Create `services/registration.service.ts` — `registerForEvent(eventId)`, `getMyRegistrations()`, typed against `Registration`/`MyRegistration` from `frontend-types.md`
- [ ] Create `hooks/useRegistrations.ts`
- [ ] Wire `components/registration/RegistrationButton.tsx` into `EventDetails.tsx` — handles the three states (register / already registered / full)
- [ ] Build `components/registration/RegistrationQR.tsx` using `qrcode.react`, rendering `qr_code_token`
- [ ] Build the full-screen expand-on-tap behavior for the QR (modal or overlay)
- [ ] Build `components/registration/RegistrationCard.tsx` — includes `RegistrationQR` thumbnail and the checked-in badge
- [ ] Build `pages/student/MyRegistrations.tsx`
- [ ] Handle `409` errors (already registered, event full) with a clear inline/toast message, not a generic failure
- [ ] Toast confirmation on successful registration ("Registered successfully")

## Definition of Done

- [ ] A student can register for an event end to end against the real backend
- [ ] The QR ticket renders correctly and expands to full-screen on tap
- [ ] Attempting to register twice, or for a full event, shows the correct `409` message
- [ ] A checked-in registration visibly differs from a not-yet-attended one
