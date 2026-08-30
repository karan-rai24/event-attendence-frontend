import api from "./api";
import type { CheckInResult, AttendanceRecord } from "../types/attendance";

export async function checkIn(qrCodeToken: string): Promise<CheckInResult> {
  const response = await api.post<CheckInResult>("/attendance/check-in", {
    qr_code_token: qrCodeToken,
  });
  return response.data;
}

export async function getEventAttendance(eventId: number): Promise<AttendanceRecord[]> {
  const response = await api.get<AttendanceRecord[]>(`/events/${eventId}/attendance`);
  return response.data;
}
