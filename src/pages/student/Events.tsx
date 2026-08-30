import { useEvents } from "../../hooks/useEvents";
import EventGrid from "../../components/events/EventGrid";
import Spinner from "../../components/common/Spinner";

export default function Events() {
  const { data: events, isLoading, error } = useEvents();

  if (isLoading) return <Spinner />;

  if (error) {
    return (
      <div className="bg-error-bg text-error px-4 py-3 rounded-lg">
        Failed to load events. Please try again later.
      </div>
    );
  }

  if (!events || events.length === 0) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-text mb-2">Events</h1>
        <p className="text-text-secondary">No events available right now.</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-text mb-6">Events</h1>
      <EventGrid events={events} />
    </div>
  );
}
