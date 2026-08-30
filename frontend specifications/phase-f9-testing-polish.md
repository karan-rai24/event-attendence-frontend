# Phase F9 — Testing + Polish

**Milestone: F9**

## Goal

Harden and polish the frontend before deployment — this is integration and verification, not new features.

## Tasks

- [ ] Manually run every flow end to end against the real (local) backend: student register → browse → register for event → view QR → get checked in → view/download certificate
- [ ] Manually run the organizer flow: register (with invite code) → create event → view registrations → scan/manually check in students → view attendance
- [ ] Verify every cross-cutting convention is actually applied consistently across all pages, not just some:
  - [ ] Generic spinner on every loading state
  - [ ] Tailored empty-state messages everywhere a list can be empty
  - [ ] Toast for page-load errors, inline for form errors
  - [ ] Error messages are friendlified, never raw backend `detail` strings
  - [ ] Toast success confirmations auto-dismiss
  - [ ] Every submit button shows a loading/disabled state
- [ ] Test the QR Scanner specifically on a real phone, in a real-world lighting scenario if possible — this is the screen most likely to have real-world surprises
- [ ] Confirm mobile-first responsiveness holds up across all pages, not just the ones built first
- [ ] Basic accessibility pass: form labels, focus states, alt text on any images, QR overlay keyboard activation, dialog semantics, visible close control, Escape-to-close behavior, focus trapping while open, and focus restoration after closing
- [ ] Remove console.logs and dead code
- [ ] Update `context/progress-tracker.md` — frontend F0–F9 are deferred until F9 completion, then marked Completed as part of the final sign-off

## Definition of Done (matches the Frontend Definition of Done in the roadmap)

```
✅ User can register/login
✅ User role determines dashboard (student vs organizer)
✅ Student can browse events
✅ Student can register
✅ Student can view registration QR
✅ Organizer can create events
✅ Organizer can view registrations
✅ Organizer can scan QR codes AND manually enter a token
✅ Attendance result is displayed, matching all 3 backend error cases (400/403/409)
✅ Student can view certificates
✅ Student can download certificates (unlimited times)
✅ Protected routes work (role-based)
✅ API errors are displayed properly, friendlified per convention
✅ Loading/empty/error states exist and are consistent
✅ Frontend communicates cleanly with FastAPI
```
