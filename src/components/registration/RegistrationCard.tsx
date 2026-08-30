import type { MyRegistration } from "../../types/registration";
import RegistrationQR from "./RegistrationQR";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function RegistrationCard({ registration }: { registration: MyRegistration }) {
  return (
    <div className="bg-surface border border-border rounded-card p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-text mb-1">{registration.event_title}</h3>
          <p className="text-sm text-text-secondary mb-2">
            Registered {formatDate(registration.registered_at)}
          </p>
          {registration.checked_in && (
            <span className="inline-block bg-success-bg text-success px-2 py-0.5 rounded text-xs font-medium">
              Checked in ✓
            </span>
          )}
        </div>
        <RegistrationQR token={registration.qr_code_token} />
      </div>
    </div>
  );
}
