import { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useEvent } from "../../hooks/useEvents";
import { checkIn, getEventAttendance } from "../../services/attendance.service";
import type { AttendanceRecord, CheckInResult } from "../../types/attendance";
import QRScannerCamera from "../../components/attendance/QRScannerCamera";
import ManualCheckIn from "../../components/attendance/ManualCheckIn";
import CheckInResultModal from "../../components/attendance/CheckInResultModal";

export default function QRScannerPage() {
  const { id } = useParams<{ id: string }>();
  const eventId = Number(id);
  const { data: event } = useEvent(eventId);

  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [isCheckingIn, setIsCheckingIn] = useState(false);
  const [result, setResult] = useState<CheckInResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchAttendance = useCallback(async () => {
    try {
      const data = await getEventAttendance(eventId);
      setAttendance(data);
    } catch {
      // Silently fail — count will be stale
    }
  }, [eventId]);

  useEffect(() => {
    fetchAttendance();
  }, [fetchAttendance]);

  const handleCheckIn = async (token: string) => {
    setIsCheckingIn(true);
    setError(null);
    try {
      const res = await checkIn(token);
      setResult(res);
      // Vibrate on success
      if (navigator.vibrate) navigator.vibrate(200);
      fetchAttendance();
    } catch (err: any) {
      // Vibrate on failure
      if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
      const status = err.response?.status;
      const detail = err.response?.data?.detail;
      if (status === 400) {
        setError("Invalid QR code");
      } else if (status === 403) {
        setError("This registration belongs to a different event");
      } else if (status === 409) {
        setError("This student is already checked in");
      } else {
        setError(detail || "Check-in failed. Please try again.");
      }
    } finally {
      setIsCheckingIn(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-text mb-2">QR Scanner</h1>
      {event && (
        <p className="text-text-secondary mb-6">
          {event.title} — {attendance.length}/{event.capacity} checked in
        </p>
      )}

      <div className="space-y-6">
        <QRScannerCamera onScan={handleCheckIn} isScanning={isCheckingIn} />

        <div className="text-center text-text-muted text-sm">— or enter manually —</div>

        <ManualCheckIn onSubmit={handleCheckIn} isLoading={isCheckingIn} />

        {error && (
          <div className="bg-error-bg text-error px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}
      </div>

      {result && (
        <CheckInResultModal
          studentName={result.student_name}
          eventName={event?.title || ""}
          checkedInAt={result.checked_in_at}
          onClose={() => setResult(null)}
        />
      )}
    </div>
  );
}
