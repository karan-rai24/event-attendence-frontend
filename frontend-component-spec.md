# Frontend Component Specification

This file translates every answered question from `frontend-component-questions.md` into concrete component behavior. Build against this — it's the "how it actually looks and behaves" companion to `frontend-design-system.md` (colors/typography/component list) and `api-contracts.md` (what data each screen consumes).

**Canonical visual direction**: the design system file's palette — indigo `#4F46E5` / violet `#7C3AED` / cyan `#06B6D4`, clean SaaS look. The earlier ticket-stub mockup is not in use.

**Single theme only for MVP** — dark mode was considered but dropped since no dark-mode color values were ever defined. Revisit as a v2 item if actually needed; don't build a half-specified dark mode.

---

## 1. Global Shell

- **Layout**: navbar + sidebar (not navbar-only). Same shell component for both roles — the sidebar's menu items change based on role (`organizer` vs `student`), not the shell itself.
- **Mobile-first**: build and test every screen at mobile width first, then confirm it holds up at tablet/desktop — not the other way around. This matters most for the QR Scanner screen specifically.
- **Footer**: included.
- **Logged-out visitor**: sees a simple landing page before Login/Register — not an immediate redirect.

---

## 2. Theme

- Follow `frontend-design-system.md`'s palette and typography exactly (Inter, indigo/violet/cyan, 12px card radius, defined spacing scale).
- Tailwind gets a custom theme config matching these values from the start of F0 — not default Tailwind with polish later.
- **Single theme only** — no dark mode for MVP.

---

## 3. Authentication

### Register (`Register.tsx`)
- Single form, both roles. A role selector (student / organizer) at the top.
- **If "organizer" is selected**: an additional required field appears — "Organizer Invite Code". This is validated against a shared secret stored in the backend `.env` (`ORGANIZER_INVITE_CODE`), not per-user. Selecting "student" hides this field entirely.
- Password field has a show/hide toggle.
- Client-side validation before submit: email format (basic regex), password minimum length. Do not submit to the backend if these fail.
- Validation errors show inline, directly under the relevant field — not a summary block.

### Login (`Login.tsx`)
- Same inline-under-field error convention.
- Password show/hide toggle.
- On success: redirect automatically based on the role returned from `GET /auth/me` — no intermediate "choose where to go" screen.

---

## 4. Student Pages

### Events (`Events.tsx`)
- **Card grid** layout (`EventGrid` → `EventCard`).
- Each `EventCard` shows: title, date, venue, and spots filled/capacity (e.g. "42/60 registered") — full detail, not trimmed.

### Event Details (`EventDetails.tsx`)
- Register button (`RegistrationButton`):
  - Default state: "Register" — active.
  - If the student is already registered: button is replaced with a status message (e.g. "You're registered ✓") — not a disabled button with the same label.
  - If the event is full: button is replaced with a status message (e.g. "This event is full") — same pattern, no dead disabled button.

### My Registrations (`MyRegistrations.tsx`)
- Cards (`RegistrationCard`), each with the QR code rendered inline as a thumbnail (`RegistrationQR`) — not a separate page per registration.
- **Tapping the QR thumbnail expands it to a full-screen view** (modal or dedicated overlay) for easier scanning at the venue door. This is the actual scan-ready view — the thumbnail alone is not meant to be scanned.
- If the registration has already been checked in (event attended), the card shows a distinct "Checked in ✓" badge, differentiating it from upcoming/not-yet-attended registrations.

### My Certificates (`MyCertificates.tsx`)
- Cards (`CertificateCard`) with:
  - A PDF thumbnail/preview (not just text)
  - Event name, and an issued-status line (e.g. "Issued on 23 Aug 2026")
  - A "View" action that opens the PDF in a new browser tab
  - A "Download" action
- No "already downloaded" state anywhere — downloads are unlimited, so nothing needs to track or display download count/history.

---

## 5. Organizer Pages

### Dashboard (`OrganizerDashboard.tsx`)
- `StatsGrid` shows all three: total events, total registrations, total checked-in. Computed client-side from existing list endpoints (no dedicated stats endpoint).

### My Events (`MyEvents.tsx`)
- Filterable/sortable by **upcoming vs past** (computed from `end_time` vs now — not a stored field).
- Card grid, same `EventCard` component as the student view where reasonable, reused rather than rebuilt.

### Create Event (`EventForm.tsx`)
- Native HTML `<input type="datetime-local">` for start/end time — no external date-picker library.
- Validation errors (capacity must be > 0, end time after start time, invite-code style errors if relevant) shown inline, under each specific field.
- Submit button shows a loading/disabled state while the request is in flight — prevents duplicate event creation on a double-tap.

### Event Registrations (`EventRegistrations.tsx`)
- A `RegistrationTable`, not cards — this is a management view.
- Includes a **search field, filtering by student name** — necessary at 60–150 students per event.
- Does **not** show checked-in status inline on this page — that lives only on the separate Attendance page. Keep these two views distinct rather than duplicating the data.

### Attendance (`Attendance.tsx`)
- Shows checked-in status per student (this is where that data belongs, per the above).

---

## 6. QR Scanner & Check-in (`QRScanner.tsx` — organizer)

This is the highest-pressure screen in the app. Every decision here favors speed and unambiguous feedback over subtlety.

- **Layout**: camera view on top, manual token-entry field directly below it — both always visible simultaneously, not tabs or a toggle.
- **On successful check-in**: a **full-screen success modal** — student name, event name, check-in time. High-visibility, impossible to miss in a noisy venue.
- **Feedback**: vibration and/or a short sound plays on both success and failure, in addition to the visual modal/message. Use the Web Vibration API where supported; treat this as progressive enhancement (fails silently on unsupported devices/browsers).
- **If camera permission is denied or unavailable**: show an explicit error state with a clear "Use manual entry" button — do not silently swap to manual entry without telling the organizer why.
- **Live count** (e.g. "41/60 checked in"): updates immediately after every successful check-in, no manual refresh needed. This implies the count is refetched or optimistically incremented right after each `POST /attendance/check-in` success.
- **Error states are differentiated**, not generic:
  - `400` (token doesn't match any registration) → "Invalid QR code"
  - `403` (organizer doesn't own this event) → a message distinct from an invalid token — this is a wrong-event/permissions issue, not a bad scan
  - `409` (already checked in) → "This student is already checked in" — distinct from "invalid," since it's not actually an error in the student's ticket, just a duplicate action

---

## 7. Cross-Cutting Conventions (apply everywhere)

| Concern | Convention |
|---|---|
| Loading | One generic spinner component, reused everywhere — no per-component skeleton loaders for MVP |
| Empty states | Tailored message per context (e.g. "No events yet, create your first one" for an organizer with zero events vs "No registrations yet — browse events to get started" for a student) — never one generic "Nothing here" |
| Errors | **Page-load errors** (e.g. failed `GET /events`) → toast notification. **Form-submit errors** (e.g. failed `POST /events`) → inline under the relevant field, or a general inline banner if the error isn't field-specific |
| Error message wording | The backend's raw `detail` string is **not** shown as-is — the frontend translates it into a friendlier phrase. Maintain a small mapping (or a fallback "Something went wrong, try again") rather than displaying raw API error text to the user |
| Success feedback | Toast confirmations (e.g. "Event created", "Registered successfully") — auto-dismiss after a few seconds, no manual close required |
| Form submit buttons | Always show a loading/disabled state while the request is in flight, across every form (Login, Register, Create Event, Register-for-event, Check-in) — prevents double-submits |
| Form validation error placement | Always inline, directly under the specific field — never a top-of-form summary block, for consistency across every form in the app |

---

## Backend change this spec depends on

`POST /auth/register` now requires an `organizer_code` field when `role` is `"organizer"`, validated against `ORGANIZER_INVITE_CODE` in the backend `.env`. This has been added to `api-contracts.md`, `phase-02-auth-authorization.md`, and `architecture.md` — see those files for the exact request/response shape and validation rule. The Register component in Section 3 above is built against that updated contract.
