import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ROLE_HOMES: Record<string, string> = {
  student: "/events",
  organizer: "/organizer/dashboard",
};

export default function RoleRoute({ allowedRole }: { allowedRole: string }) {
  const { role } = useAuth();

  if (role !== allowedRole) {
    const home = ROLE_HOMES[role ?? ""] ?? "/login";
    return <Navigate to={home} replace />;
  }

  return <Outlet />;
}
