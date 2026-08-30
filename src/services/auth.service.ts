import api from "./api";
import type { LoginRequest, RegisterRequest } from "../types/auth";
import type { User } from "../types/user";

export async function register(data: RegisterRequest): Promise<User> {
  const response = await api.post<User>("/auth/register", data);
  return response.data;
}

export async function login(data: LoginRequest): Promise<User> {
  const response = await api.post<User>("/auth/login", data);
  return response.data;
}

export async function logout(): Promise<void> {
  await api.post("/auth/logout");
}

export async function getMe(): Promise<User> {
  const response = await api.get<User>("/auth/me");
  return response.data;
}
