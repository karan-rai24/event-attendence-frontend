# Phase F2 — Authentication

**Milestone: F2**

## Goal

Build Login and Register, wired to the real backend auth endpoints, including the organizer invite-code flow.

## Locked decisions that affect this phase

- **Token storage: `httpOnly` cookie.** The backend sets this on login; frontend JavaScript never sees or handles the raw token at all — no `localStorage`, no manual header attaching. This protects the token from XSS-based theft.
- Register is a single form with a role selector. Selecting `organizer` reveals a required "Organizer Invite Code" field, validated against `ORGANIZER_INVITE_CODE` on the backend (see `api-contracts.md`).
- Password fields have a show/hide toggle.
- Client-side validation before submit: email format, password minimum length.
- Validation errors show inline, under the specific field — never a summary block.
- After login, auto-redirect based on the role in the login response body (per the updated `api-contracts.md`, login now returns the user object directly — no separate `/auth/me` call needed immediately after login).

## Tasks

- [ ] Create `context/AuthContext.tsx` — holds the current user (from the login/`/auth/me` response body). **Does not** store or manage a token directly — the cookie is handled entirely by the browser and backend.
- [ ] Create `hooks/useAuth.ts`
- [ ] Create `services/auth.service.ts` — `register()`, `login()`, `logout()`, `getMe()`, using the interfaces from `frontend-types.md`
- [ ] Set `withCredentials: true` on the shared Axios instance (`services/api.ts`) — **required** for the browser to send/receive the cookie cross-origin (frontend `:5173` → backend `:8000`)
- [ ] Axios interceptor: on a `401` response, clear local auth state and redirect to `/login` (no silent refresh — there is no refresh token). No `Authorization` header needs to be attached — the cookie goes automatically.
- [ ] Build `pages/auth/Login.tsx` — React Hook Form + Zod validation
- [ ] Build `pages/auth/Register.tsx` — role selector, conditional `organizer_code` field, React Hook Form + Zod. On success, redirect to `/login` (register does not log the user in automatically — see `api-contracts.md`)
- [ ] Wire up auto-redirect after successful login (based on the role in the response body)
- [ ] Build a Logout action (in the navbar/sidebar) that calls `POST /auth/logout`, then clears local auth state and redirects to `/`
- [ ] Handle the `403` (invalid organizer code) and `422` (missing organizer code) error cases from `api-contracts.md`, shown inline

## Definition of Done

- [ ] A student can register, is redirected to Login, logs in, and lands on `/events`
- [ ] An organizer can register with a valid invite code, log in, and land on `/organizer/dashboard`
- [ ] Registering as organizer with a missing or wrong invite code shows a clear inline error, not a generic failure
- [ ] Login works, and a wrong password shows an inline error
- [ ] Visiting a protected route without logging in redirects to `/login`
- [ ] The session persists across a page refresh (confirms the cookie is being sent correctly — check via `GET /auth/me` succeeding on load)
- [ ] Logout actually clears the session — a subsequent protected request returns 401
- [ ] Opening browser dev tools confirms the cookie is `HttpOnly` and **not** readable via `document.cookie` in the console
