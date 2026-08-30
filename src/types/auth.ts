export type Role = "organizer" | "student";

export interface RegisterRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: Role;
  organizer_code?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export type LoginResponse = User;

import type { User } from "./user";
