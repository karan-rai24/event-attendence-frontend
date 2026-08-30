# College Event Frontend

React + TypeScript + Vite frontend for the College Event & Attendance Management API.

## Tech Stack

- React + TypeScript + Vite
- React Router
- Axios (with httpOnly cookie auth)
- TanStack Query
- React Hook Form + Zod
- Tailwind CSS
- qrcode.react
- html5-qrcode

## Setup

```bash
npm install
cp .env.example .env
npm run dev
```

Frontend runs at `http://localhost:5173`, backend at `http://localhost:8000`.

## Progress

| Phase | Milestone | Status |
|-------|-----------|--------|
| F0 | React + TypeScript setup | ✅ Complete |
| F1 | Routing + layout shell | ✅ Complete |
| F2 | Login/register + auth | ✅ Complete |
| F3 | Student event browsing | ✅ Complete |
| F4 | Registration + QR display | ✅ Complete |
| F5 | Organizer dashboard | ✅ Complete |
| F6 | Event creation UI | ✅ Complete |
| F7 | QR scanner + manual check-in + attendance | ✅ Complete |
| F8 | Certificates | ✅ Complete |
| F9 | Testing + polish | ✅ Complete |
| F10 | Deployment | ⬜ Pending |

### F0 — React + TypeScript Setup (committed `aae53d2`)
- Vite + React + TypeScript scaffolded in `frontend/`
- Tailwind CSS v4 with custom theme (indigo, violet, cyan, Inter)
- Axios instance with `withCredentials: true`
- TypeScript types from `frontend-types.md`
- `.env` / `.env.example` with `VITE_API_BASE_URL`

### F1 — Routing + Layout Shell (committed `b6a9b52`)
- `AuthContext` with user state for route guards
- `ProtectedRoute` — redirects unauthenticated users to `/login`
- `RoleRoute` — redirects wrong-role users to their role-home
- `AppRoutes` — all 13 routes from `frontend-routes.md` wired
- `DashboardLayout` with Navbar, role-based Sidebar, Footer
- Placeholder pages for all routes
- Landing page and NotFound fallback

### F2 — Authentication (committed `5a0be94`)
- `auth.service.ts` — register, login, logout, getMe API calls
- `AuthContext` — full auth state with login/register/logout actions, fetch `/auth/me` on mount for session persistence
- Login page — React Hook Form + Zod, password show/hide toggle, server error display, role-based redirect after login
- Register page — role selector (student/organizer), conditional organizer_code field, redirect to `/login` on success
- Navbar — logout calls `POST /auth/logout`, clears state, redirects to `/`
- `ProtectedRoute` — handles `isLoading` state during initial `/auth/me` check
- API interceptor — 401 responses redirect to `/login`

### F3 — Student Event Browsing (committed `3351624`)
- `event.service.ts` — getEvents(), getEvent(id) API calls
- `useEvents` hook — TanStack Query for event list and single event
- `EventCard` — title, date range, venue, spots filled/capacity
- `EventGrid` — responsive card grid (1/2/3 columns)
- Events page — grid with loading, empty, and error states
- EventDetails page — full detail view with back link, loading/error states

### F4 — Registration + QR Display (committed `55b4df6`)
- `registration.service.ts` — registerForEvent(), getMyRegistrations()
- `useRegistrations` hook — TanStack Query with cache invalidation on registration
- `RegistrationButton` — 3 states (register / already registered / full) with toast feedback
- `RegistrationQR` — qrcode.react thumbnail with full-screen expand modal
- `RegistrationCard` — event title, registration date, QR thumbnail, checked-in badge
- EventDetails — wired RegistrationButton with registration status check
- MyRegistrations — card list with QR thumbnails and checked-in badges

### F5 — Organizer Dashboard (committed `12fb699`)
- `organizer.service.ts` — getOrganizerStats() computes totals from event/registration/attendance endpoints
- `StatCard` + `StatsGrid` — dashboard stat cards (total events, registrations, checked-in)
- OrganizerDashboard — loads and displays stats with loading/error states
- MyEvents — event list with upcoming/past filter tabs, reuses EventGrid

### F6 — Event Creation (committed `f9dde76`)
- `event.service.ts` — added createEvent() API call
- `EventForm` — React Hook Form + Zod with title, description, venue, datetime-local inputs, capacity
- Zod validation — capacity > 0, end time after start time (client-side before submit)
- CreateEvent page — wires EventForm with success toast and redirect to /organizer/events

### F7 — QR Scanner + Manual Check-in + Attendance (committed)
- `attendance.service.ts` — checkIn(), getEventAttendance() API calls
- `QRScannerCamera` — html5-qrcode camera view with permission denied fallback
- `ManualCheckIn` — always-visible token input, same submit path as scan
- `CheckInResultModal` — full-screen success modal with student name, event, time
- `AttendanceTable` — table view of checked-in students
- `RegistrationTable` — search/filter by student name (no checked-in status, per locked decision)
- QRScanner page — live count, camera + manual entry, vibration feedback, 400/403/409 error handling
- Attendance page — attendance list with live count
- EventRegistrations page — registration list with search

### F8 — Certificates (committed)
- `certificate.service.ts` — getCertificate(), downloadCertificate() API calls
- `CertificateCard` — PDF thumbnail, event name, issued date, View + Download actions
- MyCertificates page — fetches certificates for checked-in registrations, card list with empty state

### F9 — Testing + Polish (committed)
- Created `Spinner` component — consistent loading spinner across all pages
- Replaced all loading text with Spinner in every page (Events, EventDetails, MyRegistrations, MyCertificates, OrganizerDashboard, MyEvents, Attendance, EventRegistrations, ProtectedRoute)
- Built Profile page — displays user info (name, email, phone, role, member since) from useAuth
- Removed dead code — `StudentDashboard.tsx` placeholder (not routed)
