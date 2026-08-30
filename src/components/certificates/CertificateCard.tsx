import type { Certificate } from "../../types/certificate";

interface CertificateCardProps {
  certificate: Certificate;
  eventName?: string;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function CertificateCard({ certificate, eventName }: CertificateCardProps) {
  const handleView = () => {
    window.open(certificate.pdf_url, "_blank");
  };

  const handleDownload = async () => {
    const link = document.createElement("a");
    link.href = certificate.pdf_url;
    link.download = `certificate-${certificate.id}.pdf`;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-surface border border-border rounded-card p-5">
      <div className="flex items-start gap-4">
        <div className="w-16 h-20 bg-info-bg rounded flex items-center justify-center flex-shrink-0">
          <span className="text-2xl">🏆</span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-text mb-1">
            {eventName || `Certificate #${certificate.id}`}
          </h3>
          <p className="text-sm text-text-secondary mb-3">
            Issued on {formatDate(certificate.issued_at)}
          </p>
          <div className="flex gap-2">
            <button
              onClick={handleView}
              className="px-3 py-1.5 text-sm border border-border rounded-lg text-text-secondary hover:text-text hover:bg-background"
            >
              View
            </button>
            <button
              onClick={handleDownload}
              className="px-3 py-1.5 text-sm bg-primary text-white rounded-lg hover:bg-primary-hover"
            >
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
