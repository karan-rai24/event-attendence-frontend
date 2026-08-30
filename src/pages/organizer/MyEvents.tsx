import { useState } from "react";
import { useOrganizerEvents } from "../../hooks/useEvents";
import EventGrid from "../../components/events/EventGrid";
import Spinner from "../../components/common/Spinner";

export default function MyEvents() {
  const { data: events, isLoading, error } = useOrganizerEvents();
  const [filter, setFilter] = useState<"all" | "upcoming" | "past">("all");

  if (isLoading) return <Spinner />;

  if (error) {
    return (
      <div className="bg-error-bg text-error px-4 py-3 rounded-lg">
        Failed to load events. Please try again later.
      </div>
    );
  }

  const now = new Date();
  const filteredEvents = events?.filter((event) => {
    const endDate = new Date(event.end_time);
    if (filter === "upcoming") return endDate >= now;
    if (filter === "past") return endDate < now;
    return true;
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-text mb-6">My Events</h1>

      <div className="flex gap-2 mb-6">
        {(["all", "upcoming", "past"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === f
                ? "bg-primary text-white"
                : "bg-surface border border-border text-text-secondary hover:text-text"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {!filteredEvents || filteredEvents.length === 0 ? (
        <p className="text-text-secondary">
          {filter === "all"
            ? "No events yet. Create your first event!"
            : `No ${filter} events.`}
        </p>
      ) : (
        <EventGrid events={filteredEvents} />
      )}
    </div>
  );
}
