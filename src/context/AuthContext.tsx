import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import type { User } from "../types/user";
import type { Role } from "../types/auth";
import * as authService from "../services/auth.service";
import { setOnUnauthorized } from "../services/api";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  role: Role | null;
  login: (email: string, password: string) => Promise<User>;
  register: (data: import("../types/auth").RegisterRequest) => Promise<User>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    authService
      .getMe()
      .then((u) => setUser(u))
      .catch(() => setUser(null))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    setOnUnauthorized(() => setUser(null));
  }, []);

  const isAuthenticated = user !== null;
  const role: Role | null = user?.role ?? null;

  const login = useCallback(async (email: string, password: string) => {
    const u = await authService.login({ email, password });
    setUser(u);
    return u;
  }, []);

  const register = useCallback(async (data: import("../types/auth").RegisterRequest) => {
    const u = await authService.register(data);
    return u;
  }, []);

  const logout = useCallback(async () => {
    await authService.logout();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, role, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
