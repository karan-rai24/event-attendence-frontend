import type { Role } from "./auth";

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: Role;
  created_at: string;
}
