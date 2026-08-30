# Frontend Types

TypeScript interfaces for every request/response shape in `api-contracts.md`. These are the source of truth for `src/types/*.ts` — copy them in directly rather than re-deriving field names from prose descriptions elsewhere.

**Locked decision**: fields keep the backend's exact `snake_case` naming — no camelCase transform layer. Simpler for MVP; a mapping layer can be added later if it's ever worth the overhead.

---

## `types/auth.ts`

```typescript
export type Role = "organizer" | "student";

export interface RegisterRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: Role;
  organizer_code?: string; // required only when role === "organizer"
}

export interface LoginRequest {
  email: string;
  password: string;
}

// POST /auth/login response — returns the user directly.
// No access_token field — the token is delivered as an httpOnly cookie,
// invisible to and unhandled by frontend JS entirely.
export type LoginResponse = User;
```

Note: `LoginResponse` references `User` from `types/user.ts` — import it there rather than redefining the shape.

## `types/user.ts`

```typescript
import { Role } from "./auth";

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: Role;
  created_at: string; // ISO 8601 UTC
}
```
Used for both the register response and `GET /auth/me`.

## `types/event.ts`

```typescript
// GET /events — list view (lighter than detail view)
export interface EventSummary {
  id: number;
  title: string;
  venue: string;
  start_time: string; // ISO 8601 UTC
  end_time: string;   // ISO 8601 UTC
  capacity: number;
  spots_filled: number;
}

// GET /events/{id} and POST /events response — full detail
export interface Event extends EventSummary {
  description: string;
  organizer_id: number;
  created_at: string;
}

// POST /events request body
export interface CreateEventRequest {
  title: string;
  description: string;
  venue: string;
  start_time: string;
  end_time: string;
  capacity: number;
}
```

## `types/registration.ts`

```typescript
// POST /events/{id}/register response
export interface Registration {
  id: number;
  event_id: number;
  user_id: number;
  registered_at: string;
  qr_code_token: string;
}

// GET /registrations/me — one entry
export interface MyRegistration {
  id: number;
  event_id: number;
  event_title: string;
  registered_at: string;
  qr_code_token: string;
  checked_in: boolean;
}

// GET /events/{id}/registrations — one entry (organizer view)
export interface EventRegistration {
  id: number;
  user_id: number;
  user_name: string;
  registered_at: string;
  checked_in: boolean;
}
```

## `types/attendance.ts`

```typescript
// POST /attendance/check-in request
export interface CheckInRequest {
  qr_code_token: string;
}

// POST /attendance/check-in response
export interface CheckInResult {
  id: number;
  registration_id: number;
  student_name: string;
  checked_in_at: string;
  checked_in_by: number;
}

// GET /events/{id}/attendance — one entry
export interface AttendanceRecord {
  registration_id: number;
  student_name: string;
  checked_in_at: string;
}
```

## `types/certificate.ts`

```typescript
// GET /certificates/{id}
export interface Certificate {
  id: number;
  registration_id: number;
  issued_at: string;
  pdf_url: string;
}

// GET /certificates/{id}/download
export interface CertificateDownload {
  pdf_url: string;
}
```

## `types/error.ts`

```typescript
// Standard error shape — most endpoints
export interface ApiError {
  detail: string;
}

// 422 validation error shape (FastAPI/Pydantic default)
export interface ValidationErrorItem {
  loc: (string | number)[];
  msg: string;
  type: string;
}

export interface ValidationError {
  detail: ValidationErrorItem[];
}

// Union to check against when handling any API error response
export type ApiErrorResponse = ApiError | ValidationError;
```

---

## Notes for `services/*.ts`

Each service function's return type should be one of the interfaces above, not `any` or an inferred Axios response — e.g.:

```typescript
// event.service.ts
export async function getEvents(): Promise<EventSummary[]> {
  const res = await api.get<EventSummary[]>("/events");
  return res.data;
}
```

This is the enforcement mechanism for `code-standards.md`'s "avoid `Any`" rule, applied to the frontend side.
