import { useState } from "react";
import type { EventRegistration } from "../../types/registration";

export default function RegistrationTable({ registrations }: { registrations: EventRegistration[] }) {
  const [search, setSearch] = useState("");

  const filtered = registrations.filter((reg) =>
    reg.user_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by student name..."
          className="w-full px-4 py-2 border border-border rounded-lg bg-surface text-text focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="text-text-secondary">
          {registrations.length === 0
            ? "No registrations yet."
            : "No registrations match your search."}
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium text-text-secondary">Student</th>
                <th className="text-left py-3 px-4 font-medium text-text-secondary">Registered</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((reg) => (
                <tr key={reg.id} className="border-b border-border">
                  <td className="py-3 px-4 text-text">{reg.user_name}</td>
                  <td className="py-3 px-4 text-text-secondary">
                    {new Date(reg.registered_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
