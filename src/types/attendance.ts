export interface CheckInRequest {
  qr_code_token: string;
}

export interface CheckInResult {
  id: number;
  registration_id: number;
  student_name: string;
  checked_in_at: string;
  checked_in_by: number;
}

export interface AttendanceRecord {
  registration_id: number;
  student_name: string;
  checked_in_at: string;
}
