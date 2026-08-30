export interface EventSummary {
  id: number;
  title: string;
  venue: string;
  start_time: string;
  end_time: string;
  capacity: number;
  spots_filled: number;
}

export interface Event extends EventSummary {
  description: string;
  organizer_id: number;
  created_at: string;
}

export interface CreateEventRequest {
  title: string;
  description: string;
  venue: string;
  start_time: string;
  end_time: string;
  capacity: number;
}
