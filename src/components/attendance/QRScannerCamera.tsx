import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

interface QRScannerCameraProps {
  onScan: (token: string) => void;
  isScanning: boolean;
}

export default function QRScannerCamera({ onScan, isScanning }: QRScannerCameraProps) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scanner = new Html5Qrcode("qr-reader");
    scannerRef.current = scanner;

    scanner
      .start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        (decodedText) => {
          if (isScanning) return;
          onScan(decodedText);
        },
        () => {}
      )
      .then(() => setHasPermission(true))
      .catch(() => {
        setHasPermission(false);
      });

    return () => {
      if (scannerRef.current?.isScanning) {
        scannerRef.current.stop().catch(() => {});
      }
    };
  }, []);

  if (hasPermission === false) {
    return (
      <div className="bg-warning-bg border border-warning rounded-card p-4 text-center">
        <p className="text-warning font-medium mb-2">Camera not available</p>
        <p className="text-text-secondary text-sm">
          Use manual token entry below to check in students.
        </p>
      </div>
    );
  }

  return (
    <div ref={containerRef} id="qr-reader" className="rounded-card overflow-hidden" />
  );
}
