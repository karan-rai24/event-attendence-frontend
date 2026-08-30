# College Event & Attendance Management API — Frontend Design System

> **Frontend:** React + TypeScript + Vite
> **Backend:** FastAPI
> **Database:** MySQL
> **MySQL Port:** `3307`

## What was removed and why

| Removed | Reason |
|---|---|
| Admin Components section (AdminDashboard, Users list, admin Events table) | Backend MVP has only `organizer`/`student` roles — no `admin` role exists yet |
| `components/users/UserTable.tsx`, `UserRoleBadge.tsx`, `UserStatusBadge.tsx` | These are for managing a list of all users — an admin-only capability with no backend support |
| `DeleteEventDialog.tsx` | No `DELETE /events/{id}` endpoint exists |
| `CancelRegistrationDialog.tsx` | No `DELETE /registrations/{id}` endpoint exists |
| Registration badge "Cancelled" state | Same reason — cancellation isn't a supported action yet |
| Event badge "Cancelled" state | Events have no stored `status` field and no delete/cancel endpoint — status is only ever computed from `start_time`/`end_time` |
| Refresh Token flow | Backend issues an access token only for MVP |
| `/api` suffix on `VITE_API_BASE_URL` | Backend routes are flat (`/auth/register`, not `/api/auth/register`) |
| `PATCH /events/{id}`, `DELETE /events/{id}`, `DELETE /registrations/{id}` rows in the mapping table | None of these exist in the 14 MVP endpoints |
| "Admin Dashboard" step in the roadmap and F9 milestone | Same as above — no admin role yet |

**One thing not removed, but flagged**: this file's color system (indigo `#4F46E5` / violet `#7C3AED` / cyan — a clean SaaS look) is a different visual direction from the ticket-stub mockup made earlier (indigo/marigold/teal with a perforated-divider motif). Both are complete, coherent systems — I haven't merged or picked between them. See the note at the very end of this file.

---

## Color Palette

### Primary

| Purpose | Hex |
|---|---|
| Primary | `#4F46E5` |
| Primary Hover | `#4338CA` |
| Primary Light | `#EEF2FF` |
| Secondary | `#7C3AED` |
| Accent | `#06B6D4` |

### Neutral

| Purpose | Hex |
|---|---|
| Background | `#F8FAFC` |
| Surface/Card | `#FFFFFF` |
| Border | `#E2E8F0` |
| Primary Text | `#0F172A` |
| Secondary Text | `#475569` |
| Muted Text | `#94A3B8` |

### Status

| Status | Hex |
|---|---|
| Success | `#16A34A` |
| Success Background | `#DCFCE7` |
| Warning | `#D97706` |
| Warning Background | `#FEF3C7` |
| Error | `#DC2626` |
| Error Background | `#FEE2E2` |
| Info | `#2563EB` |
| Info Background | `#DBEAFE` |

### Usage

```text
Primary → Buttons, links, active navigation
Violet  → Secondary actions / accents
Cyan    → Small highlights / statistics
Green   → Success / attendance
Amber   → Upcoming / pending
Red     → Errors only (no delete actions exist in MVP)
Slate   → Text / borders / backgrounds
```

---

## Typography

### Primary Font

**Inter**

Use it for headings, body text, buttons, navigation, tables, forms, and dashboards.

```css
font-family: "Inter", sans-serif;
```

### Optional Display Font

For a landing page:

```text
Headings → Plus Jakarta Sans
Body     → Inter
```

For the dashboard, Inter everywhere is recommended.

### Typography Scale

```text
Display      48px / 56px
H1           36px / 44px
H2           30px / 38px
H3           24px / 32px
H4           20px / 28px
Body Large   18px / 28px
Body         16px / 24px
Body Small   14px / 20px
Caption      12px / 16px
```

---

## Component System

```text
components/
├── UI Primitives
├── Shared Components
└── Feature Components
```

### UI Primitives

```text
components/ui/

├── Button.tsx
├── Input.tsx
├── Textarea.tsx
├── Select.tsx
├── Checkbox.tsx
├── Radio.tsx
├── Switch.tsx
├── Badge.tsx
├── Avatar.tsx
├── Card.tsx
├── Modal.tsx
├── Dialog.tsx
├── Dropdown.tsx
├── Tooltip.tsx
├── Tabs.tsx
├── Spinner.tsx
├── Skeleton.tsx
├── Alert.tsx
├── Toast.tsx
└── Table.tsx
```

*`Pagination.tsx` kept out for now — backend list endpoints return plain arrays with no pagination until Phase 8 (per `api-contracts.md`).*

### Layout

```text
components/layout/

├── Navbar.tsx
├── Sidebar.tsx
├── MobileSidebar.tsx
├── DashboardLayout.tsx
├── PageHeader.tsx
├── Breadcrumbs.tsx
└── Footer.tsx
```

### Authentication

```text
components/auth/

├── LoginForm.tsx
├── RegisterForm.tsx
├── PasswordInput.tsx
├── AuthGuard.tsx
├── RoleGuard.tsx
└── LogoutButton.tsx
```

### Dashboard

```text
components/dashboard/

├── StatCard.tsx
├── StatsGrid.tsx
├── RecentEvents.tsx
├── RecentRegistrations.tsx
├── AttendanceOverview.tsx
├── EventOverview.tsx
└── QuickActions.tsx
```

*`ActivityFeed.tsx` removed — no activity-log endpoint exists in the backend to power it.*

### Events

```text
components/events/

├── EventCard.tsx
├── EventGrid.tsx
├── EventList.tsx
├── EventDetails.tsx
├── EventForm.tsx
├── EventStatusBadge.tsx   (computed: Upcoming / Ongoing / Completed — from start_time/end_time, not a stored field)
├── EventCapacity.tsx
├── EventDate.tsx
└── EventVenue.tsx
```

### Registration

```text
components/registration/

├── RegistrationButton.tsx
├── RegistrationCard.tsx
├── RegistrationList.tsx
├── RegistrationStatus.tsx   (Registered only — no Cancelled state)
├── RegistrationStats.tsx
└── RegistrationQR.tsx
```

### Attendance / QR

```text
components/attendance/

├── QRScanner.tsx
├── ManualCheckIn.tsx
├── QRDisplay.tsx
├── ScannerOverlay.tsx
├── CheckInResult.tsx
├── AttendanceTable.tsx
├── AttendanceStats.tsx
└── AttendanceStatus.tsx
```

*Added `ManualCheckIn.tsx` — the backend's check-in endpoint treats a manually-typed token identically to a scanned one, and the manual field is a required, always-visible fallback, not optional.*

### Certificates

```text
components/certificates/

├── CertificateCard.tsx
├── CertificatePreview.tsx
├── CertificateDownload.tsx
└── CertificateList.tsx
```

*`CertificateStatus.tsx` removed — since downloads are unlimited (locked decision), there's no meaningful status to display beyond "available."*

### Users

```text
components/users/

├── UserAvatar.tsx
└── UserProfile.tsx
```

*Trimmed from the original list — `UserTable.tsx`, `UserRoleBadge.tsx`, and `UserStatusBadge.tsx` were for managing a list of all users, which is an admin capability that doesn't exist yet.*

### Feedback

```text
components/feedback/

├── LoadingState.tsx
├── ErrorState.tsx
├── EmptyState.tsx
├── SuccessMessage.tsx
├── ErrorMessage.tsx
├── ConfirmDialog.tsx
└── NotFound.tsx
```

---

## Student Components

```text
StudentDashboard
├── StatsGrid
├── UpcomingEvents
├── RecentRegistrations
└── QuickActions
```

```text
Events
├── PageHeader
├── EventFilters
├── EventGrid
│   └── EventCard
```

*No `Pagination` here for the same reason noted above.*

```text
EventDetails
├── EventDetails
├── EventCapacity
├── EventVenue
├── EventDate
└── RegistrationButton
```

```text
MyRegistrations
├── PageHeader
└── RegistrationList
    └── RegistrationCard
        └── RegistrationQR
```

```text
MyCertificates
├── PageHeader
└── CertificateList
    └── CertificateCard
        └── CertificateDownload
```

---

## Organizer Components

```text
OrganizerDashboard
├── StatsGrid
├── RecentEvents
├── RecentRegistrations
├── AttendanceOverview
└── QuickActions
```

```text
MyEvents
├── PageHeader
├── CreateEventButton
├── EventFilters
└── EventGrid
    └── EventCard
```

*No `DeleteEventDialog` under `EventCard` — deletion isn't supported yet.*

```text
EventRegistrations
├── PageHeader
├── RegistrationStats
├── Search
└── RegistrationTable
```

```text
QRScanner
├── ScannerOverlay
├── QRScanner
├── ManualCheckIn
└── CheckInResult
```

```text
Attendance
├── AttendanceStats
├── AttendanceFilters
└── AttendanceTable
```

---

## Button System

### Primary

```text
Background: #4F46E5
```

Used for:

- Create Event
- Register
- Save
- Confirm
- Submit
- Check In

### Secondary

White background with border.

### Danger

```text
#DC2626
```

*No destructive actions exist in the MVP backend (no delete/cancel endpoints) — reserve this for form validation errors and failed check-ins only, not action buttons, until delete/cancel endpoints exist.*

### Ghost

Used for navigation, secondary actions, and icon buttons.

---

## Badge System

### Event (computed from `start_time`/`end_time`, not a stored field)

```text
🟡 Upcoming
🟢 Ongoing
⚪ Completed
```

### Registration

```text
🟢 Registered
```

### Attendance

```text
🟢 Present
⚪ Not Checked In
```

---

## Card Design

```text
Background: #FFFFFF
Border: #E2E8F0
Border Radius: 12px
Shadow: Very subtle
Padding: 20–24px
```

Keep cards clean and avoid excessive shadows.

---

## Spacing System

Use:

```text
4px
8px
12px
16px
20px
24px
32px
40px
48px
64px
```

Avoid arbitrary spacing unless necessary.

---

## Responsive Design

Support:

```text
Mobile
   ↓
Tablet
   ↓
Desktop
```

Desktop:

```text
Sidebar + Content
```

Mobile:

```text
Navbar
   ↓
Content
   ↓
Mobile Navigation
```

The QR scanner (with its manual check-in fallback) should be optimized for mobile/tablet use above all else — that's the screen an organizer relies on live, at a real event.

---

## API Service Architecture

Do not make Axios requests directly from every component.

Use:

```text
Component
    ↓
Hook
    ↓
Service
    ↓
Axios
    ↓
FastAPI
```

Example:

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

---

## Authentication Architecture

Access token only — no refresh token in the MVP backend. Delivered as an `httpOnly` cookie, not a token in the response body or `localStorage` — invisible to frontend JavaScript entirely.

```text
API Request (withCredentials: true)
    ↓
Browser attaches the httpOnly cookie automatically
    ↓
FastAPI reads the cookie
    ↓
401?
    ├── No → Return response
    └── Yes → Clear local auth state, redirect to Login
              (no silent refresh — user logs in again)
```

The frontend never reads, stores, or attaches the token itself — that's the entire point of `httpOnly`. `AuthContext` holds the *user object* (from login/`/auth/me`), not a token. Logging out requires an actual `POST /auth/logout` call, since frontend JS can't delete an `httpOnly` cookie on its own.

Keep authentication handling centralized (`AuthContext` / an Axios interceptor) rather than duplicated per page.

---

## Frontend Environment

For Vite:

```env
VITE_API_BASE_URL=http://localhost:8000
```

`.env.example`:

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

> The frontend never connects directly to MySQL. Only the FastAPI backend connects to MySQL.

Never put backend secrets such as JWT secrets, database passwords, or Cloudinary keys in the frontend environment.

---

## Frontend ↔ Backend Mapping

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

*14 rows, matching `api-contracts.md` exactly.*

---

## Frontend Development Roadmap

```text
1. Frontend Setup
       ↓
2. Routing + Layout
       ↓
3. Authentication
       ↓
4. Student Events
       ↓
5. Registration
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

| Milestone | Work |
|---|---|
| F0 | React + TypeScript setup |
| F1 | Routing + layouts |
| F2 | Login/register + auth |
| F3 | Student event browsing |
| F4 | Registration + QR display |
| F5 | Organizer dashboard |
| F6 | Event creation UI |
| F7 | QR scanner + manual check-in + attendance |
| F8 | Certificates |
| F9 | Testing + polish |
| F10 | Deployment |

---

## Visual Identity

```text
                    COLLEGE EVENT
                         │
                ┌────────┴────────┐
                │                 │
             INDIGO             VIOLET
             #4F46E5            #7C3AED
                │                 │
                └────────┬────────┘
                         │
                    SLATE SYSTEM
                         │
                    Clean White UI
```

Overall feel:

**Modern · Professional · Minimal · Academic · SaaS**

### Avoid

- ❌ Too many gradients
- ❌ Excessive animations
- ❌ Huge rounded cards everywhere
- ❌ Too many colors
- ❌ Neon colors
- ❌ Excessive glassmorphism

### Use

- ✅ Strong typography
- ✅ Generous whitespace
- ✅ Clear hierarchy
- ✅ Subtle borders
- ✅ Consistent cards
- ✅ Indigo as the main identity
- ✅ Small, purposeful animations

---

## Quick Reference

```text
FONT
Inter

PRIMARY
#4F46E5

PRIMARY HOVER
#4338CA

SECONDARY
#7C3AED

ACCENT
#06B6D4

BACKGROUND
#F8FAFC

SURFACE
#FFFFFF

BORDER
#E2E8F0

TEXT
#0F172A

SECONDARY TEXT
#475569

MUTED
#94A3B8

SUCCESS
#16A34A

WARNING
#D97706

ERROR
#DC2626

INFO
#2563EB

CARD RADIUS
12px

CARD PADDING
20–24px

DESIGN STYLE
Modern + Minimal + SaaS + Academic

MYSQL PORT
3307
```

---

## Locked Tech Stack (confirmed, not illustrative)

| Concern | Library | Note |
|---|---|---|
| Routing | React Router | |
| HTTP client | Axios | |
| Server state / data fetching | TanStack Query | wraps every service call — no raw `useEffect` + `fetch` |
| Forms + validation | React Hook Form + Zod | Zod schemas should mirror `frontend-types.md` request interfaces |
| Styling | Tailwind CSS | custom theme config per `frontend-design-system.md` |
| QR code generation (student ticket) | `qrcode.react` | renders the image client-side from `qr_code_token` — backend never sends an image |
| QR code scanning (organizer check-in) | `html5-qrcode` | camera-based scan; paired with the always-visible manual entry field per `frontend-component-spec.md` |

These are locked, not suggestions — build against these specific libraries rather than swapping in an equivalent mid-project.

---

## Open item: two competing visual directions exist

This file (indigo/violet/cyan, clean SaaS look) and the earlier design mockup artifact (indigo/marigold/teal, ticket-stub perforated-divider motif, Space Grotesk display font) are both complete but different. **Resolved**: this file's palette is canonical — see `frontend-component-spec.md`.
