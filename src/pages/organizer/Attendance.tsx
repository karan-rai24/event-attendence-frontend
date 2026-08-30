import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useEvent } from "../../hooks/useEvents";
import { getEventAttendance } from "../../services/attendance.service";
import type { AttendanceRecord } from "../../types/attendance";
import AttendanceTable from "../../components/attendance/AttendanceTable";
import Spinner from "../../components/common/Spinner";

export default function Attendance() {
  const { id } = useParams<{ id: string }>();
  const eventId = Number(id);
  const { data: event } = useEvent(eventId);
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getEventAttendance(eventId)
      .then(setRecords)
      .catch(() => setError("Failed to load attendance."))
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
      <h1 className="text-2xl font-bold text-text mb-2">Attendance</h1>
      {event && (
        <p className="text-text-secondary mb-6">
          {event.title} — {records.length} checked in
        </p>
      )}
      <AttendanceTable records={records} />
    </div>
  );
}
