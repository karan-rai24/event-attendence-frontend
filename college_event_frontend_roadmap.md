# College Event & Attendance Management API — Frontend Roadmap

> **Project backend:** FastAPI + SQLAlchemy 2.0 Async + MySQL
> **MySQL port:** `3307`
> **Frontend:** React + TypeScript + Vite

---

## Changes from the original draft (read this first)

This version is corrected to match the actual backend spec (`api-contracts.md`, `architecture.md`, and the 13 MVP phase files). Differences from the original roadmap you uploaded:

| Original had | Corrected to | Why |
|---|---|---|
| Admin role, Admin Dashboard, F9 milestone | Removed from MVP scope, noted as v2 | Backend MVP only implements `organizer` + `student` roles — no `admin` yet |
| Access token + refresh token flow | Access token only, no refresh | Backend issues an access token only for MVP |
| `PATCH /events/{id}`, `DELETE /events/{id}`, `DELETE /registrations/{id}` | Removed from mapping table and UI | None of these exist in the MVP's 14 endpoints |
| `VITE_API_BASE_URL=http://localhost:8000/api` | `VITE_API_BASE_URL=http://localhost:8000` | Backend routes have no `/api` prefix (e.g. `/auth/register`, not `/api/auth/register`) |
| MySQL port 3307 | Kept as-is | Confirmed correct for this setup |

Everything else below is the original structure, trimmed to match.

---

## Frontend Overview

The frontend is a separate React application that consumes the FastAPI backend.

The system has **two roles for MVP**:

- Student
- Organizer

(Admin is a planned v2 role — see "Deferred to v2" section at the end.)

The frontend focuses on UI, user interaction, routing, API communication, and client-side state. Business rules remain enforced by the backend.

---

## Recommended Frontend Stack

- **React**
- **TypeScript**
- **Vite**
- **React Router**
- **Axios** — API requests
- **TanStack Query** — server state/data fetching
- **Tailwind CSS** — styling
- **React Hook Form + Zod** — forms and validation
- **QR generation library** (e.g. `qrcode.react`) — student ticket display, per the locked backend decision that the backend returns only a raw token
- **QR scanning library** (e.g. `html5-qrcode`) — organizer check-in, camera-based, with manual token entry as a required fallback

### Architecture

```text
React + TypeScript
       │
       ├── Pages
       ├── Components
       ├── Hooks
       ├── Services
       ├── Types
       └── State
              │
              ▼
          Axios/API
              │
              ▼
       FastAPI Backend
              │
              ▼
        MySQL Database
        localhost:3307
```

---

## Frontend Folder Structure

```text
college-event-frontend/
│
├── public/
│   ├── favicon.ico
│   └── assets/
│
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css
│   │
│   ├── assets/
│   │   ├── images/
│   │   └── icons/
│   │
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Spinner.tsx
│   │   │   ├── EmptyState.tsx
│   │   │   └── ErrorMessage.tsx
│   │   │
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── DashboardLayout.tsx
│   │   │
│   │   ├── events/
│   │   │   ├── EventCard.tsx
│   │   │   ├── EventList.tsx
│   │   │   ├── EventDetails.tsx
│   │   │   ├── EventForm.tsx
│   │   │   └── EventStatus.tsx
│   │   │
│   │   ├── registration/
│   │   │   ├── RegistrationCard.tsx
│   │   │   ├── RegistrationList.tsx
│   │   │   ├── RegistrationButton.tsx
│   │   │   └── QRTicket.tsx
│   │   │
│   │   ├── attendance/
│   │   │   ├── QRScanner.tsx
│   │   │   ├── ManualCheckIn.tsx
│   │   │   ├── AttendanceTable.tsx
│   │   │   └── CheckInResult.tsx
│   │   │
│   │   └── certificates/
│   │       ├── CertificateCard.tsx
│   │       └── CertificateDownload.tsx
│   │
│   ├── pages/
│   │   ├── auth/
│   │   │   ├── Login.tsx
│   │   │   └── Register.tsx
│   │   │
│   │   ├── student/
│   │   │   ├── StudentDashboard.tsx
│   │   │   ├── Events.tsx
│   │   │   ├── EventDetails.tsx
│   │   │   ├── MyRegistrations.tsx
│   │   │   ├── MyQRCode.tsx
│   │   │   └── MyCertificates.tsx
│   │   │
│   │   └── organizer/
│   │       ├── OrganizerDashboard.tsx
│   │       ├── MyEvents.tsx
│   │       ├── CreateEvent.tsx
│   │       ├── EventRegistrations.tsx
│   │       ├── Attendance.tsx
│   │       └── QRScanner.tsx
│   │
│   ├── services/
│   │   ├── api.ts
│   │   ├── auth.service.ts
│   │   ├── event.service.ts
│   │   ├── registration.service.ts
│   │   ├── attendance.service.ts
│   │   └── certificate.service.ts
│   │
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useEvents.ts
│   │   ├── useRegistrations.ts
│   │   ├── useAttendance.ts
│   │   └── useCertificates.ts
│   │
│   ├── context/
│   │   └── AuthContext.tsx
│   │
│   ├── routes/
│   │   ├── AppRoutes.tsx
│   │   ├── ProtectedRoute.tsx
│   │   └── RoleRoute.tsx
│   │
│   ├── types/
│   │   ├── auth.ts
│   │   ├── user.ts
│   │   ├── event.ts
│   │   ├── registration.ts
│   │   ├── attendance.ts
│   │   └── certificate.ts
│   │
│   ├── utils/
│   │   ├── date.ts
│   │   ├── format.ts
│   │   └── validation.ts
│   │
│   └── constants/
│       ├── routes.ts
│       └── roles.ts
│
├── .env
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

*No `pages/admin/` folder for MVP — not built until the backend admin role exists.*
*No `ForgotPassword.tsx` — backend has no password reset flow for MVP.*

---

## Main Frontend Components

### 1. Authentication

**Flow** (matches backend: access token only, `organizer`/`student` roles)

```text
Login
  │
  ▼
Receive access token
  │
  ▼
Store authentication state
  │
  ▼
Fetch /auth/me
  │
  ▼
Determine role
  │
  ├── student
  └── organizer
```

**Components**

```text
Login
Register
ProtectedRoute
RoleRoute
AuthContext
```

---

## Student UI

The student's experience focuses on discovering events, registering, attendance, and certificates.

### Student Dashboard

```text
┌──────────────────────────────────────────┐
│ Navbar                                   │
├──────────────┬───────────────────────────┤
│ Dashboard    │                           │
│ Events       │  Welcome 👋               │
│ My Events    │                           │
│ Certificates │  Upcoming Events          │
│ Profile      │                           │
│              │  ┌─────┐ ┌─────┐ ┌─────┐ │
│              │  │Event│ │Event│ │Event│ │
│              │  └─────┘ └─────┘ └─────┘ │
└──────────────┴───────────────────────────┘
```

### Student Pages

| Page | Purpose | Backend endpoint(s) |
|---|---|---|
| Events | Browse available events | `GET /events` |
| Event Details | View event information | `GET /events/{id}` |
| My Registrations | See registered events | `GET /registrations/me` |
| My QR Code | Display registration QR (rendered client-side from token) | uses `qr_code_token` from registration response |
| My Certificates | View/download certificates | `GET /certificates/{id}`, `GET /certificates/{id}/download` |
| Profile | View user information | `GET /auth/me` |

---

## Organizer UI

The organizer gets a management dashboard for events, registrations, and attendance.

### Organizer Dashboard

```text
┌──────────────────────────────────────────┐
│ Organizer Dashboard                      │
├──────────────────────────────────────────┤
│                                          │
│  Total Events     Registrations          │
│      12                248               │
│                                          │
│  Attendance        Certificates          │
│      198                176               │
│                                          │
├──────────────────────────────────────────┤
│ My Events                                │
│                                          │
│ Python Workshop       80/100 registered  │
│ Hackathon             95/100 registered  │
│ Web Workshop          42/50 registered   │
│                                          │
└──────────────────────────────────────────┘
```

*This dashboard's stats are computed client-side from existing list endpoints — the backend has no dedicated analytics endpoint in MVP.*

### Organizer Pages

| Page | Purpose | Backend endpoint(s) |
|---|---|---|
| Dashboard | Overview | derived from below |
| My Events | View own events | `GET /events` (filtered client-side by organizer id) |
| Create Event | Create event | `POST /events` |
| Registrations | View attendees for an event | `GET /events/{id}/registrations` |
| QR Scanner | Scan student QR, with manual entry fallback | `POST /attendance/check-in` |
| Attendance | View attendance for an event | `GET /events/{id}/attendance` |

*No Edit Event page — `PATCH /events/{id}` doesn't exist in the MVP backend (Phase 3 defers this to v2).*
*No dedicated "Event Analytics" page — no backend support for it yet.*

---

## QR Attendance UI

The QR scanner is one of the most important frontend features — and per the locked backend decision, it must support **both** camera scanning and manual token entry, since the check-in endpoint (`POST /attendance/check-in`) treats them identically.

### Flow

```text
Organizer
    │
    ▼
Open QR Scanner screen
    │
    ├── Camera scan ──────┐
    │                     │
    └── Manual token entry┤
                          │
                          ▼
                   Extract/enter token
                          │
                          ▼
              POST /attendance/check-in
                          │
                          ▼
                  Backend validation
                          │
              ┌───────────┼───────────┐
              ▼           ▼           ▼
          400 Invalid  409 Already  201 Success
                        checked in
```

### Scanner UI

```text
┌──────────────────────────────┐
│        Scan QR Code          │
│                              │
│    ┌────────────────────┐    │
│    │                    │    │
│    │      CAMERA        │    │
│    │                    │    │
│    │       ┌────┐       │    │
│    │       │ QR │       │    │
│    │       └────┘       │    │
│    │                    │    │
│    └────────────────────┘    │
│                              │
│     Waiting for scan...      │
│                              │
│   ── or enter manually ──    │
│   [ TKN-________ ] [Check in]│
└──────────────────────────────┘
```

The manual entry field should always be visible alongside the camera view, not hidden behind a toggle — venue lighting and camera permission issues are common, per the earlier decision to make this a mandatory fallback, not an edge case.

### Successful Check-in

```text
        ✅
   Check-in Successful

   Student: Rahul Sharma
   Event: Python Workshop
   Time: 10:42 AM
```

### Failed Check-in

```text
        ❌
   Check-in Failed

   Invalid, unknown, or already-used QR code
```

Match this to the backend's actual error cases: `400` (invalid token), `403` (organizer doesn't own the event), `409` (already checked in) — show a message appropriate to each rather than one generic failure state.

---

## Certificate UI

The student can see certificates generated from completed attendance. Per the locked backend decision, **downloads are unlimited** — no "already downloaded" state needs to exist in this UI.

```text
My Certificates

┌─────────────────────────────┐
│ 🏆 Python Workshop          │
│    August 2026              │
│                             │
│    [View] [Download PDF]    │
└─────────────────────────────┘
```

### Certificate Request Flow

```text
Frontend
   │
   ▼
GET /certificates/{id}/download
   │
   ▼
FastAPI
   │
   ▼
Cloudinary PDF URL
```

---

## API Service Layer

Avoid making Axios calls directly inside every component.

```text
Component
    │
    ▼
Hook
    │
    ▼
Service
    │
    ▼
Axios
    │
    ▼
FastAPI
```

### Example

```text
EventCard
    ↓
useEvents()
    ↓
event.service.ts
    ↓
api.ts
    ↓
GET /events
```

This keeps the frontend modular and maintainable.

---

## Frontend Authentication

The backend uses JWT authentication — **access token only for MVP, no refresh token.**

### Request Flow

```text
API Request
    ↓
Attach Access Token
    ↓
FastAPI
    ↓
401?
    │
    ├── No → Return response
    │
    └── Yes → Redirect to Login
              (no silent refresh — user must log in again)
```

Keep token handling centralized (in `AuthContext` / an Axios interceptor) instead of implementing it separately in each page/component. When refresh tokens are added to the backend in v2, this is the one place that needs updating.

---

## Frontend Environment Variables

For Vite:

```env
VITE_API_BASE_URL=http://localhost:8000
```

Note: no `/api` prefix — backend routes are `/auth/...`, `/events/...` etc. directly.

### `.env.example`

```env
VITE_API_BASE_URL=http://localhost:8000
```

### Local Architecture

```text
Frontend
http://localhost:5173

       ↓

FastAPI
http://localhost:8000

       ↓

MySQL
localhost:3307
```

> The frontend does not connect directly to MySQL; only the FastAPI backend connects to it.

Never put backend secrets such as JWT signing keys, database passwords, or Cloudinary API secrets in the frontend `.env`.

---

## Frontend Development Roadmap

Build the frontend after the backend endpoints begin stabilizing (Phase 7 of the backend roadmap — the working end-to-end MVP milestone).

```text
1. Frontend Setup
       ↓
2. Routing + Layout
       ↓
3. Authentication
       ↓
4. Student Events
       ↓
5. Registration + QR Display
       ↓
6. Organizer Dashboard
       ↓
7. Event Creation
       ↓
8. QR Scanner + Manual Check-in
       ↓
9. Attendance
       ↓
10. Certificates
       ↓
11. UI Polish
       ↓
12. Testing
       ↓
13. Deployment
```

---

## Frontend Milestones

| Milestone | Frontend Work |
|---|---|
| **F0** | React + TypeScript setup |
| **F1** | Routing + layouts |
| **F2** | Login/register + auth |
| **F3** | Student event browsing |
| **F4** | Registration + QR display |
| **F5** | Organizer dashboard |
| **F6** | Event creation UI |
| **F7** | QR scanner + manual check-in + attendance |
| **F8** | Certificates |
| **F9** | Testing + polish |
| **F10** | Deployment |

---

## Recommended Build Strategy

Do not build the entire frontend at once.

### Stage 1 — Student MVP

```text
F0 → F1 → F2 → F3 → F4
```

This gives you: React setup, routing, authentication, event browsing, event details, registration, student QR code.

### Stage 2 — Organizer Workflow

```text
F5 → F6 → F7 → F8
```

This gives you: organizer dashboard, event creation, registration management, QR scanner + manual check-in, attendance, certificates.

### Stage 3 — Production

```text
F9 → F10
```

This gives you: testing, UI polish, production deployment.

*(Admin dashboard is a v2 stage, added only once the backend admin role exists — see below.)*

---

## Frontend ↔ Backend Mapping (matches `api-contracts.md` exactly)

| Frontend Feature | Backend Endpoint |
|---|---|
| Register | `POST /auth/register` |
| Login | `POST /auth/login` |
| Logout | `POST /auth/logout` |
| Current user | `GET /auth/me` |
| Browse events | `GET /events` |
| Event details | `GET /events/{id}` |
| Create event | `POST /events` |
| Register for event | `POST /events/{id}/register` |
| My registrations | `GET /registrations/me` |
| Event registrations | `GET /events/{id}/registrations` |
| QR check-in (scan or manual) | `POST /attendance/check-in` |
| Event attendance | `GET /events/{id}/attendance` |
| Certificate | `GET /certificates/{id}` |
| Download certificate | `GET /certificates/{id}/download` |

*14 endpoints, matching the backend MVP exactly. No `PATCH`, `DELETE`, admin, or refresh-token entries — those don't exist yet.*

---

## Final Frontend Goal (MVP)

```text
                    ┌──────────────┐
                    │    Login     │
                    └──────┬───────┘
                           │
                           ▼
                     Detect Role
                           │
                ┌──────────┴──────────┐
                ▼                     ▼
             STUDENT               ORGANIZER
                │                     │
                ▼                     ▼
          Browse Events            My Events
                │                     │
                ▼                     ▼
            Register              Create Event
                │                     │
                ▼                     ▼
            Get QR              View Registrations
                │                     │
                │                     ▼
                │                 Scan QR / Manual entry
                │                     │
                │                     ▼
                │                 Attendance
                │                     │
                │                     ▼
                │                 Certificate generated
                │                     │
                └──────────┬──────────┘
                           ▼
                    Download PDF
```

---

## Frontend Definition of Done (MVP)

```text
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
✅ API errors are displayed properly, matching the standard error format in api-contracts.md
✅ Loading/empty/error states exist
✅ Frontend communicates cleanly with FastAPI
```

---

## Final Full-Stack Architecture

```text
┌─────────────────────────────────────────────────────┐
│                    FRONTEND                         │
│                                                     │
│  React + TypeScript + Vite                          │
│                                                     │
│  Pages → Components → Hooks → Services → Axios     │
└────────────────────────┬────────────────────────────┘
                         │
                         │ REST API / JSON
                         ▼
┌─────────────────────────────────────────────────────┐
│                    BACKEND                          │
│                                                     │
│  FastAPI                                             │
│                                                     │
│  Routers → Schemas → Services → SQLAlchemy          │
└────────────────────────┬────────────────────────────┘
                         │
                         │ Async MySQL connection (aiomysql)
                         ▼
┌─────────────────────────────────────────────────────┐
│                     MySQL                           │
│                                                     │
│                localhost:3307                      │
│                                                     │
│  Users → Events → Registrations → Attendance        │
│                              ↓                      │
│                         Certificates                 │
│                              ↓                      │
│                    (pdf_url → Cloudinary)            │
└─────────────────────────────────────────────────────┘
```

---

## Backend Database URL (for reference — lives in the backend `.env`, not the frontend's)

```env
DATABASE_URL=mysql+aiomysql://root:YOUR_PASSWORD@localhost:3307/college_events
```

The frontend never uses this — it only talks to FastAPI over HTTP.

---

## Deferred to v2 (not part of this roadmap's MVP scope)

These were in the original draft but depend on backend features that don't exist yet:

- **Admin role and Admin Dashboard** — blocked until the backend adds an `admin` role (currently `organizer`/`student` only)
- **Refresh token handling** — blocked until the backend issues refresh tokens (currently access-token only)
- **Edit Event UI** — blocked until `PATCH /events/{id}` exists
- **Cancel Registration UI** — blocked until `DELETE /registrations/{id}` exists
- **Forgot Password flow** — blocked until the backend has a password reset flow
- **Event Analytics page** — blocked until a dedicated analytics endpoint exists

Add these back into the roadmap only once their backend dependency is actually built — check `api-contracts.md` before starting any of them.

---

## Final Project Outcome (MVP)

```text
Student
  ↓
Register/Login
  ↓
Browse Event
  ↓
Register
  ↓
Receive QR (rendered client-side from token)
  ↓
Attend Event
  ↓
QR Scanned or Token Entered Manually
  ↓
Attendance Confirmed
  ↓
Certificate Generated (Cloudinary)
  ↓
Download Certificate
```

while organizers can:

```text
Login
  ↓
Create Event
  ↓
Manage Registrations
  ↓
Scan QR Codes / Manual Check-in
  ↓
Track Attendance
  ↓
Certificates Auto-Issue
```

This gives a clean separation between the **React frontend**, **FastAPI backend**, and **MySQL database**, matched exactly to what the backend actually implements — no UI built against an endpoint that doesn't exist yet.
