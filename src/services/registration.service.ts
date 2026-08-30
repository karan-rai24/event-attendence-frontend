import api from "./api";
import type { Registration, MyRegistration } from "../types/registration";

export async function registerForEvent(eventId: number): Promise<Registration> {
  const response = await api.post<Registration>(`/events/${eventId}/register`);
  return response.data;
}

export async function getMyRegistrations(): Promise<MyRegistration[]> {
  const response = await api.get<MyRegistration[]>("/registrations/me");
  return response.data;
}
