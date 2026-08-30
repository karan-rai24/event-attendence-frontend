import api from "./api";
import type { Certificate, CertificateDownload } from "../types/certificate";

export async function getMyCertificates(): Promise<Certificate[]> {
  const response = await api.get<Certificate[]>("/certificates/me");
  return response.data;
}

export async function getCertificate(id: number): Promise<Certificate> {
  const response = await api.get<Certificate>(`/certificates/${id}`);
  return response.data;
}

export async function downloadCertificate(id: number): Promise<CertificateDownload> {
  const response = await api.get<CertificateDownload>(`/certificates/${id}/download`);
  return response.data;
}
