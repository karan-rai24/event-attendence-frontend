import api from "./api";
import type { EventSummary, Event, CreateEventRequest } from "../types/event";

export async function getEvents(): Promise<EventSummary[]> {
  const response = await api.get<{ items: EventSummary[] }>("/events");
  return response.data.items;
}

export async function getOrganizerEvents(): Promise<EventSummary[]> {
  const response = await api.get<EventSummary[]>("/events/organizer/me");
  return response.data;
}

export async function getEvent(id: number): Promise<Event> {
  const response = await api.get<Event>(`/events/${id}`);
  return response.data;
}

export async function createEvent(data: CreateEventRequest): Promise<Event> {
  const response = await api.post<Event>("/events", data);
  return response.data;
}
