export interface Registration {
  id: number;
  event_id: number;
  user_id: number;
  registered_at: string;
  qr_code_token: string;
}

export interface MyRegistration {
  id: number;
  event_id: number;
  event_title: string;
  registered_at: string;
  qr_code_token: string;
  checked_in: boolean;
}

export interface EventRegistration {
  id: number;
  user_id: number;
  user_name: string;
  registered_at: string;
  checked_in: boolean;
}
