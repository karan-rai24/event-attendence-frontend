import api from "./api";
import type { EventSummary } from "../types/event";

export interface OrganizerStats {
  totalEvents: number;
  totalRegistrations: number;
  totalCheckedIn: number;
}

export async function getOrganizerStats(): Promise<OrganizerStats> {
  const eventsResponse = await api.get<EventSummary[]>("/events/organizer/me");
  const myEvents = eventsResponse.data;

  let totalRegistrations = 0;
  let totalCheckedIn = 0;

  for (const event of myEvents) {
    try {
      const regResponse = await api.get<{ pagination: { total: number } }>(`/events/${event.id}/registrations`);
      totalRegistrations += regResponse.data.pagination.total;

      const attResponse = await api.get(`/events/${event.id}/attendance`);
      totalCheckedIn += attResponse.data.length;
    } catch {
      // Skip events we can't access
    }
  }

  return {
    totalEvents: myEvents.length,
    totalRegistrations,
    totalCheckedIn,
  };
}
