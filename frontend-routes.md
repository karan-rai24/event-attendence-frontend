# Frontend Routes

Routing table for `routes/AppRoutes.tsx`. Every route lists whether it's protected, and by which role, matching `ProtectedRoute`/`RoleRoute` from `frontend-design-system.md`'s layout components.

## Public Routes

| Path | Page | Protected? |
|---|---|---|
| `/` | Landing page | No |
| `/login` | Login | No (redirects to role-based home if already logged in) |
| `/register` | Register | No (redirects to role-based home if already logged in) |

## Student Routes (`role: student`)

| Path | Page | Protected? |
|---|---|---|
| `/events` | Events (browse) | Yes — student |
| `/events/:id` | Event Details | Yes — student |
| `/my-registrations` | My Registrations | Yes — student |
| `/my-certificates` | My Certificates | Yes — student |

## Organizer Routes (`role: organizer`)

| Path | Page | Protected? |
|---|---|---|
| `/organizer/dashboard` | Organizer Dashboard | Yes — organizer |
| `/organizer/events` | My Events | Yes — organizer |
| `/organizer/events/new` | Create Event | Yes — organizer |
| `/organizer/events/:id/registrations` | Event Registrations | Yes — organizer, must own event |
| `/organizer/events/:id/attendance` | Attendance | Yes — organizer, must own event |
| `/organizer/events/:id/scan` | QR Scanner | Yes — organizer, must own event |

Ownership checks (organizer must own the event) are enforced by the backend on every request — the frontend route guard only checks role, not ownership. A 403 from the backend on a mis-owned event should route to a clear "not your event" error state, not a generic failure.

## Shared Routes (either role)

| Path | Page | Protected? |
|---|---|---|
| `/profile` | Profile (view own info via `GET /auth/me`) | Yes — any authenticated role |

## Fallback

| Path | Page | Protected? |
|---|---|---|
| `*` | NotFound | No |

## Post-login redirect

Per the locked decision in `frontend-component-spec.md` — after login, redirect automatically based on the role returned from `GET /auth/me`:

```text
role === "student"   → /events
role === "organizer" → /organizer/dashboard
```

No intermediate "choose where to go" screen.

## Route guard behavior

- `ProtectedRoute` — redirects to `/login` if no valid access token is present.
- `RoleRoute` — wraps `ProtectedRoute`; additionally redirects to the user's own role-appropriate home (not a generic error) if they hit a route for the wrong role (e.g. a student navigating to `/organizer/dashboard` directly via URL).
