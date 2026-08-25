import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { DOCTOR_INFO, SERVICES_DATA } from '../data/brandData';
import { ConsultationMode } from '../types';

export interface BookingReceiptData {
  bookingId?: string;
  clientName: string;
  clientPhone: string;
  clientEmail?: string;
  dob?: string;
  tob?: string;
  pob?: string;
  serviceId: string;
  serviceTitle?: string;
  consultationMode: ConsultationMode | string;
  preferredDate: string;
  preferredSlot: string;
  clientNotes?: string;
  clinicNotes?: string;
  meetLink?: string;
  feeAmount?: string;
  status?: string;
  createdAt?: string;
}

// Brand color palette (RGB tuples for jsPDF)
const BRAND_COLORS = {
  deepMaroon: [124, 45, 18] as [number, number, number],      // #7C2D12
  saffronOrange: [249, 115, 22] as [number, number, number],  // #F97316
  darkSaffron: [234, 88, 12] as [number, number, number],     // #EA580C
  warmRust: [154, 52, 18] as [number, number, number],        // #9A3412
  goldAmber: [217, 119, 6] as [number, number, number],       // #D97706
  warmCream: [255, 247, 237] as [number, number, number],     // #FFF7ED
  lightCream: [255, 251, 245] as [number, number, number],    // #FFFBF5
  borderOrange: [254, 215, 170] as [number, number, number],  // #FED7AA
  textDark: [40, 20, 10] as [number, number, number],         // #28140A
  textMuted: [120, 70, 45] as [number, number, number],       // #78462D
  emeraldGreen: [16, 149, 106] as [number, number, number],   // #10B981 / #047857
  navyBlue: [30, 58, 138] as [number, number, number]
};

export function generateBookingReceiptPDF(data: BookingReceiptData): jsPDF {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;

  // Resolve service metadata
  const matchedService = SERVICES_DATA.find((s) => s.id === data.serviceId);
  const serviceTitle = data.serviceTitle || (matchedService ? matchedService.title : 'Astrological Consultation');
  const serviceHindi = matchedService?.hindiTitle || 'ज्योतिष परामर्श';
  const serviceDuration = matchedService?.duration || '45 - 60 Mins';
  const feeText = data.feeAmount || matchedService?.priceNote || '₹3,500';

  // Format mode description
  let modeLabel = 'Zoom / Google Meet Video Conference';
  let modeVenue = 'Online Secured Video Room (Link sent via WhatsApp/Email)';
  if (data.consultationMode === 'in_person') {
    modeLabel = 'Delhi Chamber In-Person Visit';
    modeVenue = 'Chamber: Roop Nagar, Near Delhi University North Campus, Delhi - 110007';
  } else if (data.consultationMode === 'phone') {
    modeLabel = 'Direct Telephonic Consultation';
    modeVenue = `Direct Call via Chamber Hotline (${DOCTOR_INFO.primaryPhone})`;
  } else if (data.consultationMode === 'report') {
    modeLabel = 'Detailed Written PDF Horoscope Dossier';
    modeVenue = 'Digital Delivery via WhatsApp & Email';
  }

  // Generate reference number if not provided
  const bookingRef = data.bookingId 
    ? (data.bookingId.startsWith('book_') ? `DPS-${data.bookingId.slice(5, 15).toUpperCase()}` : data.bookingId)
    : `DPS-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}-${Math.floor(1000 + Math.random() * 9000)}`;

  const bookingDateIssued = data.createdAt 
    ? new Date(data.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
    : new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

  // --- 1. TOP HEADER BRAND BARS ---
  doc.setFillColor(...BRAND_COLORS.deepMaroon);
  doc.rect(0, 0, pageWidth, 6, 'F');
  
  doc.setFillColor(...BRAND_COLORS.saffronOrange);
  doc.rect(0, 6, pageWidth, 1.5, 'F');

  // Background delicate frame
  doc.setFillColor(...BRAND_COLORS.lightCream);
  doc.rect(margin, 12, contentWidth, pageHeight - 24, 'F');
  doc.setDrawColor(...BRAND_COLORS.borderOrange);
  doc.setLineWidth(0.4);
  doc.rect(margin, 12, contentWidth, pageHeight - 24, 'D');

  let cursorY = 18;

  // Header Title & Logo Text
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(...BRAND_COLORS.deepMaroon);
  doc.text('DR. PREETI SEHGAL', margin + 6, cursorY + 4);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...BRAND_COLORS.saffronOrange);
  doc.text('VEDIC ASTROLOGY • LAL KITAB DARPAN • VASTU SHASTRA • TAROT GUIDANCE', margin + 6, cursorY + 9);

  doc.setFontSize(8);
  doc.setTextColor(...BRAND_COLORS.textMuted);
  doc.text('Ph.D. in Vedic Jyotish | Gold Medalist | 28+ Years Experience | 150,000+ Consultations', margin + 6, cursorY + 13.5);

  // Right Side Header Badge (Booking Confirmation Slip)
  doc.setFillColor(...BRAND_COLORS.deepMaroon);
  doc.roundedRect(pageWidth - margin - 58, cursorY - 2, 52, 18, 2, 2, 'F');
  
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(255, 255, 255);
  doc.text('CONSULTATION APPOINTMENT', pageWidth - margin - 55, cursorY + 3.5);
  
  doc.setFontSize(7.5);
  doc.setTextColor(254, 215, 170); // Warm gold text
  doc.text(`REF: ${bookingRef}`, pageWidth - margin - 55, cursorY + 8);
  doc.text(`ISSUED: ${bookingDateIssued.split(',')[0]}`, pageWidth - margin - 55, cursorY + 12.5);

  cursorY += 20;

  // Thin separator divider
  doc.setDrawColor(...BRAND_COLORS.borderOrange);
  doc.setLineWidth(0.3);
  doc.line(margin + 6, cursorY, pageWidth - margin - 6, cursorY);

  cursorY += 4;

  // --- 2. APPOINTMENT SUMMARY HERO BANNER ---
  doc.setFillColor(...BRAND_COLORS.warmCream);
  doc.roundedRect(margin + 6, cursorY, contentWidth - 12, 19, 2, 2, 'F');
  doc.setDrawColor(...BRAND_COLORS.saffronOrange);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin + 6, cursorY, contentWidth - 12, 19, 2, 2, 'D');

  // Green Verified Icon Badge
  doc.setFillColor(...BRAND_COLORS.emeraldGreen);
  doc.roundedRect(margin + 9, cursorY + 3, 20, 13, 1.5, 1.5, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(255, 255, 255);
  doc.text('SLOT', margin + 14.5, cursorY + 7.5);
  doc.text('CONFIRMED', margin + 10.5, cursorY + 12.5);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...BRAND_COLORS.deepMaroon);
  doc.text(`${serviceTitle} (${serviceHindi})`, margin + 33, cursorY + 6.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...BRAND_COLORS.textDark);
  doc.text(`Scheduled Date: ${data.preferredDate}   |   Slot: ${data.preferredSlot}`, margin + 33, cursorY + 11.5);
  
  doc.setFontSize(8);
  doc.setTextColor(...BRAND_COLORS.warmRust);
  doc.text(`Mode: ${modeLabel}  •  Estimated Duration: ${serviceDuration}`, margin + 33, cursorY + 15.5);

  cursorY += 23;

  // --- 3. TWO COLUMN PARTICULARS: CLIENT & APPOINTMENT DATA ---
  
  // Section A: Client Particulars
  autoTable(doc, {
    startY: cursorY,
    margin: { left: margin + 6, right: pageWidth / 2 + 1 },
    theme: 'plain',
    styles: {
      fontSize: 8,
      cellPadding: 2,
      textColor: BRAND_COLORS.textDark,
      font: 'helvetica'
    },
    headStyles: {
      fillColor: BRAND_COLORS.deepMaroon,
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 8.5
    },
    head: [['CLIENT PARTICULARS', 'DETAILS']],
    body: [
      ['Client Name', data.clientName || 'N/A'],
      ['WhatsApp / Phone', data.clientPhone || 'N/A'],
      ['Email Address', data.clientEmail || 'Direct via WhatsApp'],
      ['Date of Birth', data.dob || 'Provided for Chart'],
      ['Time of Birth', data.tob || 'Provided for Chart'],
      ['Place of Birth', data.pob || 'Provided for Chart']
    ],
    columnStyles: {
      0: { fontStyle: 'bold', textColor: BRAND_COLORS.warmRust, cellWidth: 35 },
      1: { textColor: BRAND_COLORS.textDark }
    }
  });

  // Section B: Session & Chamber Particulars
  autoTable(doc, {
    startY: cursorY,
    margin: { left: pageWidth / 2 + 3, right: margin + 6 },
    theme: 'plain',
    styles: {
      fontSize: 8,
      cellPadding: 2,
      textColor: BRAND_COLORS.textDark,
      font: 'helvetica'
    },
    headStyles: {
      fillColor: BRAND_COLORS.deepMaroon,
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 8.5
    },
    head: [['SESSION PARTICULARS', 'DETAILS']],
    body: [
      ['Consultant', 'Dr. Preeti Sehgal'],
      ['Category', matchedService?.category ? matchedService.category.toUpperCase() : 'VEDIC ASTROLOGY'],
      ['Consultation Mode', data.consultationMode.toUpperCase()],
      ['Session Fee', feeText],
      ['Booking Status', (data.status || 'CONFIRMED').toUpperCase()],
      ['Verification Ref', bookingRef]
    ],
    columnStyles: {
      0: { fontStyle: 'bold', textColor: BRAND_COLORS.warmRust, cellWidth: 35 },
      1: { textColor: BRAND_COLORS.textDark }
    }
  });

  cursorY = (doc as any).lastAutoTable.finalY + 4;

  // --- 4. VENUE & ACCESS DETAILS BOX ---
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(margin + 6, cursorY, contentWidth - 12, 14, 1.5, 1.5, 'F');
  doc.setDrawColor(...BRAND_COLORS.borderOrange);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin + 6, cursorY, contentWidth - 12, 14, 1.5, 1.5, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(...BRAND_COLORS.deepMaroon);
  doc.text('CONSULTATION VENUE & ACCESS INSTRUCTIONS:', margin + 9, cursorY + 4.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(...BRAND_COLORS.textDark);
  doc.text(modeVenue, margin + 9, cursorY + 9, { maxWidth: contentWidth - 18 });

  cursorY += 17;

  // --- 5. KEY CONCERNS & NOTE (If specified) ---
  if (data.clientNotes && data.clientNotes.trim() !== '') {
    doc.setFillColor(...BRAND_COLORS.warmCream);
    doc.roundedRect(margin + 6, cursorY, contentWidth - 12, 13, 1.5, 1.5, 'F');
    doc.setDrawColor(...BRAND_COLORS.borderOrange);
    doc.setLineWidth(0.3);
    doc.roundedRect(margin + 6, cursorY, contentWidth - 12, 13, 1.5, 1.5, 'D');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(...BRAND_COLORS.deepMaroon);
    doc.text('PRIMARY CLIENT FOCUS / TOPIC FOR DISCUSSION:', margin + 9, cursorY + 4);

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(7.5);
    doc.setTextColor(...BRAND_COLORS.textDark);
    const splitNotes = doc.splitTextToSize(`"${data.clientNotes.trim()}"`, contentWidth - 18);
    doc.text(splitNotes, margin + 9, cursorY + 8.5);

    cursorY += 16;
  }

  // --- 6. PRE-CONSULTATION PREPARATION GUIDELINES (4 STEPS) ---
  doc.setFillColor(...BRAND_COLORS.deepMaroon);
  doc.rect(margin + 6, cursorY, contentWidth - 12, 6, 'F');
  
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.text('IMPORTANT GUIDELINES FOR YOUR APPOINTMENT', margin + 9, cursorY + 4.2);

  cursorY += 6;

  const guidelines = [
    {
      num: '1',
      title: 'Birth Coordinate Verification',
      desc: 'Ensure your Date, Exact Time (AM/PM), and Place of Birth are verified before the session to ensure sub-minute D9 Navamsha chart precision.'
    },
    {
      num: '2',
      title: 'Question Preparation',
      desc: 'Please list your 3 to 5 core life concerns (Career, Marriage, Health, Property, or Family) in advance so Dr. Preeti Sehgal can address them systematically.'
    },
    {
      num: '3',
      title: 'Online Video / Phone Protocol',
      desc: 'For Zoom/Meet video sessions, ensure a quiet room and stable internet. The private meeting access link is broadcasted via WhatsApp 10 minutes prior.'
    },
    {
      num: '4',
      title: 'Chamber Visit Protocol (Delhi)',
      desc: 'For in-person consultations, please arrive 10 minutes prior to your allocated slot at the Roop Nagar chamber. Bring existing charts or gemstone rings.'
    }
  ];

  autoTable(doc, {
    startY: cursorY,
    margin: { left: margin + 6, right: margin + 6 },
    theme: 'grid',
    styles: {
      fontSize: 7.5,
      cellPadding: 2.2,
      textColor: BRAND_COLORS.textDark,
      lineColor: BRAND_COLORS.borderOrange,
      lineWidth: 0.2
    },
    body: guidelines.map(g => [
      g.num,
      `${g.title}: ${g.desc}`
    ]),
    columnStyles: {
      0: { cellWidth: 8, fontStyle: 'bold', halign: 'center', textColor: BRAND_COLORS.saffronOrange, fillColor: BRAND_COLORS.warmCream },
      1: { cellWidth: contentWidth - 20, font: 'helvetica' }
    }
  });

  cursorY = (doc as any).lastAutoTable.finalY + 4;

  // --- 7. VERIFICATION BAR & OFFICIAL SEAL / DOCTOR SIGN-OFF ---
  const bottomBoxHeight = 30;
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(margin + 6, cursorY, contentWidth - 12, bottomBoxHeight, 2, 2, 'F');
  doc.setDrawColor(...BRAND_COLORS.borderOrange);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin + 6, cursorY, contentWidth - 12, bottomBoxHeight, 2, 2, 'D');

  // Left Section: Chamber Contacts & Helpline
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(...BRAND_COLORS.deepMaroon);
  doc.text('DIRECT CLINIC HELPLINE & ASSISTANCE', margin + 10, cursorY + 5.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.2);
  doc.setTextColor(...BRAND_COLORS.textDark);
  doc.text(`• Primary Calling Helpline: ${DOCTOR_INFO.primaryPhone} / ${DOCTOR_INFO.secondaryPhone}`, margin + 10, cursorY + 10);
  doc.text(`• WhatsApp Official Desk: +${DOCTOR_INFO.whatsappNumber}  |  Email: ${DOCTOR_INFO.email}`, margin + 10, cursorY + 14);
  doc.text(`• Chamber Address: Roop Nagar (Near Delhi University North Campus), Delhi - 110007`, margin + 10, cursorY + 18);
  doc.text(`• Official Portal: ${DOCTOR_INFO.officialWebsite}  |  Instagram: ${DOCTOR_INFO.instagramHandle}`, margin + 10, cursorY + 22);
  doc.text(`• Note: 100% strict client confidentiality is guaranteed for all consultations.`, margin + 10, cursorY + 26);

  // Right Section: Digital Stamp / Seal of Dr. Preeti Sehgal
  const sealX = pageWidth - margin - 48;
  doc.setFillColor(...BRAND_COLORS.warmCream);
  doc.roundedRect(sealX, cursorY + 3, 40, 24, 2, 2, 'F');
  doc.setDrawColor(...BRAND_COLORS.saffronOrange);
  doc.setLineWidth(0.4);
  doc.roundedRect(sealX, cursorY + 3, 40, 24, 2, 2, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(...BRAND_COLORS.deepMaroon);
  doc.text('OFFICIAL VERIFIED DESK', sealX + 4, cursorY + 8);

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8.5);
  doc.setTextColor(...BRAND_COLORS.warmRust);
  doc.text('Dr. Preeti Sehgal', sealX + 7, cursorY + 14.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(...BRAND_COLORS.textMuted);
  doc.text('Jyotish Acharya & Gold Medalist', sealX + 3, cursorY + 19);
  doc.text(`Auth Code: ${bookingRef.slice(-6)}`, sealX + 8, cursorY + 23);

  // --- 8. BOTTOM DECORATIVE FOOTER STRIP ---
  doc.setFillColor(...BRAND_COLORS.deepMaroon);
  doc.rect(0, pageHeight - 6, pageWidth, 6, 'F');
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(255, 255, 255);
  doc.text(
    `© ${new Date().getFullYear()} Dr. Preeti Sehgal Vedic Astrological Chambers. All Rights Reserved. Confidential Consultation Summary.`,
    pageWidth / 2,
    pageHeight - 2.2,
    { align: 'center' }
  );

  return doc;
}

export function downloadBookingReceiptPDF(data: BookingReceiptData): void {
  const doc = generateBookingReceiptPDF(data);
  const safeName = (data.clientName || 'Client').replace(/[^a-zA-Z0-9]/g, '_');
  const safeDate = (data.preferredDate || 'Consultation').replace(/[^a-zA-Z0-9]/g, '_');
  const filename = `Dr_Preeti_Sehgal_Consultation_Pass_${safeName}_${safeDate}.pdf`;
  doc.save(filename);
}
