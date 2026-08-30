import { useQuery } from "@tanstack/react-query";
import * as eventService from "../services/event.service";

export function useEvents() {
  return useQuery({
    queryKey: ["events"],
    queryFn: eventService.getEvents,
  });
}

export function useOrganizerEvents() {
  return useQuery({
    queryKey: ["events", "organizer"],
    queryFn: eventService.getOrganizerEvents,
  });
}

export function useEvent(id: number) {
  return useQuery({
    queryKey: ["events", id],
    queryFn: () => eventService.getEvent(id),
  });
}
