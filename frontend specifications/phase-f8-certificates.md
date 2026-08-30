# Phase F8 — Certificates

**Milestone: F8**

## Goal

Let a student view and download their certificates.

## Locked decisions that affect this phase

- Certificate card shows a PDF thumbnail/preview, not just text — plus event name and an "Issued on [date]" line.
- "View" opens the PDF in a new browser tab.
- Downloads are unlimited — no "already downloaded" state anywhere in this UI.

## Tasks

- [ ] Create `services/certificate.service.ts` — `getMyCertificates()`, `getCertificate(id)`, `downloadCertificate(id)`, typed against `Certificate`/`CertificateDownload` and the student's certificate collection
- [ ] Build `components/certificates/CertificateCard.tsx` — thumbnail/preview, event name, issued date, View + Download actions
- [ ] Build `pages/student/MyCertificates.tsx` using `getMyCertificates()` to display the student's full certificate list
- [ ] Wire "View" to open `pdf_url` in a new tab
- [ ] Wire "Download" to trigger the file download
- [ ] Tailored empty state ("No certificates yet — attend an event to earn one")

## Definition of Done

- [ ] A student can view all their certificates with correct thumbnails and dates
- [ ] View and Download both work correctly against the Cloudinary URL
- [ ] Downloading the same certificate multiple times works with no restriction
