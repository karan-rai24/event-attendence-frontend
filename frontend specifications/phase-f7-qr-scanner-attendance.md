# Phase F7 — QR Scanner + Manual Check-in + Attendance

**Milestone: F7**

## Goal

Build the highest-pressure screen in the app — organizer check-in — plus the attendance list. Every decision here favors speed and unambiguous feedback.

## Locked decisions that affect this phase

- Camera view on top, manual token-entry field directly below — both always visible, not tabs or a toggle.
- On successful check-in: a full-screen success modal (student name, event name, time).
- Vibration and/or sound feedback on both success and failure (Web Vibration API, progressive enhancement — fails silently if unsupported).
- If camera permission is denied/unavailable: an explicit error state with a clear "Use manual entry" button — never a silent fallback. Clicking it immediately focuses the always-visible manual token-entry field without switching screens or hiding the input.
- The live "X/Y checked in" count updates immediately after every successful check-in.
- The three backend error cases are shown with distinct messages, not one generic failure:
  - `400` (invalid token) → "Invalid QR code"
  - `403` (wrong event) → a message distinct from an invalid token
  - `409` (already checked in) → "This student is already checked in"
- Event Registrations page does NOT show checked-in status inline — that only lives on the Attendance page.

## Tasks

- [ ] Create `services/attendance.service.ts` — `checkIn(token)`, `getEventAttendance(eventId)`, typed against `CheckInRequest`/`CheckInResult`/`AttendanceRecord`
- [ ] Build `components/attendance/QRScanner.tsx` using `html5-qrcode` — camera view
- [ ] Build `components/attendance/ManualCheckIn.tsx` — always-visible token input, same submit path as a scan
- [ ] Build `components/attendance/CheckInResult.tsx` — the full-screen success modal
- [ ] Implement camera-permission-denied handling with the manual-entry fallback button
- [ ] Implement vibration/sound feedback on success and failure
- [ ] Build `pages/organizer/QRScanner.tsx` (route: `/organizer/events/:id/scan`) — live count, camera + manual entry
- [ ] Differentiate the 400/403/409 error displays as specified above
- [ ] Build `components/attendance/AttendanceTable.tsx` and `pages/organizer/Attendance.tsx`
- [ ] Build `components/registration/RegistrationTable` with search/filter by student name for `pages/organizer/EventRegistrations.tsx` — **without** checked-in status, per the locked decision

## Definition of Done

- [ ] A valid scanned QR check-in succeeds and shows the full-screen success modal with correct data
- [ ] A manually-typed valid token produces an identical result to a scan
- [ ] All three error cases (400/403/409) are visually distinct
- [ ] The live count updates immediately, with no manual refresh
- [ ] Camera permission denial shows the explicit fallback, not a silent switch
- [ ] The Attendance page correctly lists who's checked in; the Registrations page does not duplicate that data
