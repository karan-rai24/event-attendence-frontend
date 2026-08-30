import { useMyRegistrations } from "../../hooks/useRegistrations";
import RegistrationCard from "../../components/registration/RegistrationCard";
import Spinner from "../../components/common/Spinner";

export default function MyRegistrations() {
  const { data: registrations, isLoading, error } = useMyRegistrations();

  if (isLoading) return <Spinner />;

  if (error) {
    return (
      <div className="bg-error-bg text-error px-4 py-3 rounded-lg">
        Failed to load registrations. Please try again later.
      </div>
    );
  }

  if (!registrations || registrations.length === 0) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-text mb-2">My Registrations</h1>
        <p className="text-text-secondary">You haven't registered for any events yet.</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-text mb-6">My Registrations</h1>
      <div className="space-y-4">
        {registrations.map((reg) => (
          <RegistrationCard key={reg.id} registration={reg} />
        ))}
      </div>
    </div>
  );
}
