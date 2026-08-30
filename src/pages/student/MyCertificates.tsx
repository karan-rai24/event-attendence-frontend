import { useQuery } from "@tanstack/react-query";
import { getMyCertificates } from "../../services/certificate.service";
import CertificateCard from "../../components/certificates/CertificateCard";
import Spinner from "../../components/common/Spinner";

export default function MyCertificates() {
  const { data: certificates, isLoading, error } = useQuery({
    queryKey: ["certificates"],
    queryFn: getMyCertificates,
  });

  if (isLoading) return <Spinner />;

  if (error) {
    return (
      <div className="bg-error-bg text-error px-4 py-3 rounded-lg">
        Failed to load certificates. Please try again later.
      </div>
    );
  }

  if (!certificates || certificates.length === 0) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-text mb-2">My Certificates</h1>
        <p className="text-text-secondary">
          No certificates yet — attend an event to earn one.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-text mb-6">My Certificates</h1>
      <div className="space-y-4">
        {certificates.map((cert) => (
          <CertificateCard
            key={cert.id}
            certificate={cert}
            eventName={cert.event_title}
          />
        ))}
      </div>
    </div>
  );
}
