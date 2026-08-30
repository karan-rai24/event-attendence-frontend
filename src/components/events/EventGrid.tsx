import type { EventSummary } from "../../types/event";
import EventCard from "./EventCard";

export default function EventGrid({ events }: { events: EventSummary[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}
