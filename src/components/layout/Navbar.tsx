import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { isAuthenticated, user, role, logout } = useAuth();
  const navigate = useNavigate();

  const homePath = role === "organizer" ? "/organizer/dashboard" : "/events";

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <header className="bg-surface border-b border-border px-4 py-3">
      <nav className="flex items-center justify-between max-w-7xl mx-auto">
        <Link to={isAuthenticated ? homePath : "/"} className="text-xl font-bold text-primary">
          College Event
        </Link>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <Link to="/profile" className="text-sm text-text-secondary hover:text-text">
                {user?.name}
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm text-text-secondary hover:text-text"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm text-text-secondary hover:text-text">
                Login
              </Link>
              <Link
                to="/register"
                className="text-sm bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-hover"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
