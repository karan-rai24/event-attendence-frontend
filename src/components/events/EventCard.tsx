import { Link } from "react-router-dom";
import type { EventSummary } from "../../types/event";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function EventCard({ event }: { event: EventSummary }) {
  return (
    <Link
      to={`/events/${event.id}`}
      className="block bg-surface border border-border rounded-card p-5 hover:shadow-md transition-shadow"
    >
      <h3 className="text-lg font-semibold text-text mb-2">{event.title}</h3>
      <p className="text-sm text-text-secondary mb-1">
        {formatDate(event.start_time)} — {formatDate(event.end_time)}
      </p>
      <p className="text-sm text-text-secondary mb-3">{event.venue}</p>
      <p className="text-sm font-medium text-primary">
        {event.spots_filled}/{event.capacity} registered
      </p>
    </Link>
  );
}
