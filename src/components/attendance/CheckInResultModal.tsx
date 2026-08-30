interface CheckInResultModalProps {
  studentName: string;
  eventName: string;
  checkedInAt: string;
  onClose: () => void;
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function CheckInResultModal({
  studentName,
  eventName,
  checkedInAt,
  onClose,
}: CheckInResultModalProps) {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-surface rounded-card p-8 flex flex-col items-center gap-4 text-center max-w-sm w-full">
        <div className="text-5xl">✅</div>
        <h2 className="text-2xl font-bold text-success">Check-in Successful</h2>
        <div className="space-y-1">
          <p className="text-text font-medium">{studentName}</p>
          <p className="text-text-secondary text-sm">{eventName}</p>
          <p className="text-text-muted text-sm">{formatTime(checkedInAt)}</p>
        </div>
        <button
          onClick={onClose}
          className="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-hover mt-2"
        >
          Done
        </button>
      </div>
    </div>
  );
}
