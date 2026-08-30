import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";

interface RegistrationQRProps {
  token: string;
  size?: number;
}

export default function RegistrationQR({ token, size = 64 }: RegistrationQRProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <button
        onClick={() => setExpanded(true)}
        className="cursor-pointer hover:opacity-80 transition-opacity"
      >
        <QRCodeSVG value={token} size={size} />
      </button>

      {expanded && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setExpanded(false)}
        >
          <div
            className="bg-surface rounded-card p-8 flex flex-col items-center gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <QRCodeSVG value={token} size={256} />
            <p className="text-sm text-text-secondary font-mono">{token}</p>
            <button
              onClick={() => setExpanded(false)}
              className="text-sm text-primary hover:underline"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
