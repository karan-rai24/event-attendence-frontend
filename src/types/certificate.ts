export interface Certificate {
  id: number;
  registration_id: number;
  issued_at: string;
  pdf_url: string;
  event_title?: string;
}

export interface CertificateDownload {
  pdf_url: string;
}
