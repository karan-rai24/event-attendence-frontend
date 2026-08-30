import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const studentLinks = [
  { to: "/events", label: "Events" },
  { to: "/my-registrations", label: "My Registrations" },
  { to: "/my-certificates", label: "My Certificates" },
];

const organizerLinks = [
  { to: "/organizer/dashboard", label: "Dashboard" },
  { to: "/organizer/events", label: "My Events" },
  { to: "/organizer/events/new", label: "Create Event" },
];

export default function Sidebar() {
  const { role } = useAuth();
  const links = role === "organizer" ? organizerLinks : studentLinks;

  return (
    <aside className="w-64 bg-surface border-r border-border min-h-screen p-4 hidden md:block">
      <ul className="space-y-1">
        {links.map((link) => (
          <li key={link.to}>
            <NavLink
              to={link.to}
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg text-sm transition-colors ${
                  isActive
                    ? "bg-primary-light text-primary font-medium"
                    : "text-text-secondary hover:bg-background hover:text-text"
                }`
              }
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
}
