import { useState } from "react";
import { useRegisterForEvent } from "../../hooks/useRegistrations";

interface RegistrationButtonProps {
  eventId: number;
  isRegistered: boolean;
  isFull: boolean;
}

export default function RegistrationButton({ eventId, isRegistered, isFull }: RegistrationButtonProps) {
  const registerMutation = useRegisterForEvent();
  const [toast, setToast] = useState<string | null>(null);

  if (isRegistered) {
    return (
      <div className="bg-success-bg text-success px-4 py-2 rounded-lg text-sm font-medium">
        You're registered ✓
      </div>
    );
  }

  if (isFull) {
    return (
      <div className="bg-warning-bg text-warning px-4 py-2 rounded-lg text-sm font-medium">
        This event is full
      </div>
    );
  }

  const handleRegister = async () => {
    try {
      await registerMutation.mutateAsync(eventId);
      setToast("Registered successfully");
      setTimeout(() => setToast(null), 3000);
    } catch (err: any) {
      const detail = err.response?.data?.detail;
      setToast(detail || "Registration failed");
      setTimeout(() => setToast(null), 3000);
    }
  };

  return (
    <div>
      <button
        onClick={handleRegister}
        disabled={registerMutation.isPending}
        className="bg-primary text-white px-6 py-2.5 rounded-lg font-medium hover:bg-primary-hover disabled:opacity-50"
      >
        {registerMutation.isPending ? "Registering..." : "Register"}
      </button>
      {toast && (
        <div className="mt-2 bg-success-bg text-success px-4 py-2 rounded-lg text-sm">
          {toast}
        </div>
      )}
    </div>
  );
}
