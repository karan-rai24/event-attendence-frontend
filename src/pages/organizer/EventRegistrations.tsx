import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useEvent } from "../../hooks/useEvents";
import type { EventRegistration } from "../../types/registration";
import api from "../../services/api";
import RegistrationTable from "../../components/registration/RegistrationTable";
import Spinner from "../../components/common/Spinner";

export default function EventRegistrations() {
  const { id } = useParams<{ id: string }>();
  const eventId = Number(id);
  const { data: event } = useEvent(eventId);
  const [registrations, setRegistrations] = useState<EventRegistration[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .get<{ items: EventRegistration[] }>(`/events/${eventId}/registrations`)
      .then((res) => setRegistrations(res.data.items))
      .catch(() => setError("Failed to load registrations."))
      .finally(() => setIsLoading(false));
  }, [eventId]);

  if (isLoading) return <Spinner />;

  if (error) {
    return (
      <div className="bg-error-bg text-error px-4 py-3 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-text mb-2">Event Registrations</h1>
      {event && (
        <p className="text-text-secondary mb-6">
          {event.title} — {registrations.length} registered
        </p>
      )}
      <RegistrationTable registrations={registrations} />
    </div>
  );
}
