import { useParams, Link } from "react-router-dom";
import { useEvent } from "../../hooks/useEvents";
import { useMyRegistrations } from "../../hooks/useRegistrations";
import RegistrationButton from "../../components/registration/RegistrationButton";
import Spinner from "../../components/common/Spinner";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function EventDetails() {
  const { id } = useParams<{ id: string }>();
  const eventId = Number(id);
  const { data: event, isLoading, error } = useEvent(eventId);
  const { data: registrations } = useMyRegistrations();

  const isRegistered = registrations?.some((r) => r.event_id === eventId) ?? false;
  const isFull = event ? event.spots_filled >= event.capacity : false;

  if (isLoading) return <Spinner />;

  if (error) {
    return (
      <div className="bg-error-bg text-error px-4 py-3 rounded-lg">
        Failed to load event. Please try again later.
      </div>
    );
  }

  if (!event) {
    return (
      <div className="text-center py-12">
        <p className="text-text-secondary">Event not found.</p>
        <Link to="/events" className="text-primary hover:underline mt-4 inline-block">
          Back to events
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <Link to="/events" className="text-primary hover:underline text-sm mb-4 inline-block">
        &larr; Back to events
      </Link>

      <div className="bg-surface border border-border rounded-card p-6">
        <h1 className="text-2xl font-bold text-text mb-4">{event.title}</h1>

        <div className="space-y-3 mb-6">
          <div>
            <span className="text-sm font-medium text-text-secondary">Date</span>
            <p className="text-text">{formatDate(event.start_time)} — {formatDate(event.end_time)}</p>
          </div>
          <div>
            <span className="text-sm font-medium text-text-secondary">Venue</span>
            <p className="text-text">{event.venue}</p>
          </div>
          <div>
            <span className="text-sm font-medium text-text-secondary">Capacity</span>
            <p className="text-text">{event.spots_filled}/{event.capacity} registered</p>
          </div>
        </div>

        <div className="mb-6">
          <span className="text-sm font-medium text-text-secondary">Description</span>
          <p className="text-text mt-1">{event.description}</p>
        </div>

        <div className="pt-4 border-t border-border">
          <RegistrationButton
            eventId={eventId}
            isRegistered={isRegistered}
            isFull={isFull}
          />
        </div>
      </div>
    </div>
  );
}
