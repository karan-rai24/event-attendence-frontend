import type { AttendanceRecord } from "../../types/attendance";

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function AttendanceTable({ records }: { records: AttendanceRecord[] }) {
  if (records.length === 0) {
    return <p className="text-text-secondary">No attendance records yet.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 px-4 font-medium text-text-secondary">Student</th>
            <th className="text-left py-3 px-4 font-medium text-text-secondary">Time</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.registration_id} className="border-b border-border">
              <td className="py-3 px-4 text-text">{record.student_name}</td>
              <td className="py-3 px-4 text-text-secondary">
                {formatDate(record.checked_in_at)} {formatTime(record.checked_in_at)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
