import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { KundliResult, PlanetaryPosition } from '../types';
import { DOCTOR_INFO } from '../data/brandData';

interface GenerateReportOptions {
  result: KundliResult;
  fullName: string;
  dob: string;
  tob: string;
  pob: string;
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
  redAccent: [185, 28, 28] as [number, number, number]        // #B91C1C
};

export function generateKundliPDF({
  result,
  fullName,
  dob,
  tob,
  pob
}: GenerateReportOptions): void {
  // Create jsPDF document: A4 Portrait (210mm x 297mm)
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;

  const totalPages = 4;
  let currentPage = 1;

  // Helper: Draw header on every page
  const drawPageHeader = (pageNumber: number) => {
    // Decorative top brand ribbon
    doc.setFillColor(...BRAND_COLORS.deepMaroon);
    doc.rect(0, 0, pageWidth, 6, 'F');
    
    doc.setFillColor(...BRAND_COLORS.saffronOrange);
    doc.rect(0, 6, pageWidth, 1.5, 'F');

    // Brand Header Bar (Page 1 has large header, subsequent pages have compact header)
    if (pageNumber === 1) {
      // Top luxury background card
      doc.setFillColor(...BRAND_COLORS.warmCream);
      doc.roundedRect(margin, 12, contentWidth, 24, 3, 3, 'F');
      doc.setDrawColor(...BRAND_COLORS.borderOrange);
      doc.setLineWidth(0.3);
      doc.roundedRect(margin, 12, contentWidth, 24, 3, 3, 'S');

      // Brand Logo / Emblem
      drawBrandLogoEmblem(doc, margin + 4, 15, 18);

      // Astrologer Title & Credentials
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.setTextColor(...BRAND_COLORS.deepMaroon);
      doc.text(DOCTOR_INFO.name, margin + 26, 19);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(...BRAND_COLORS.darkSaffron);
      doc.text(DOCTOR_INFO.subtitle, margin + 26, 24);

      doc.setFontSize(7.5);
      doc.setTextColor(...BRAND_COLORS.textMuted);
      doc.text(`Official Astrological Consultation Chamber &bull; Contact: ${DOCTOR_INFO.primaryPhone} &bull; ${DOCTOR_INFO.officialWebsite}`, margin + 26, 29);

      // Right-side Verification Seal
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(...BRAND_COLORS.goldAmber);
      doc.text('VEDIC JYOTISH CERTIFIED', pageWidth - margin - 5, 20, { align: 'right' });
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(6.5);
      doc.setTextColor(...BRAND_COLORS.textMuted);
      doc.text(`Lahiri Ayanamsha: ${result.doshaDiagnostics?.ayanamsa?.toFixed(4) || '24.16'}°`, pageWidth - margin - 5, 25, { align: 'right' });
      doc.text(`Date: ${new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}`, pageWidth - margin - 5, 29, { align: 'right' });
    } else {
      // Compact top bar for Pages 2 and 3
      doc.setFillColor(...BRAND_COLORS.warmCream);
      doc.roundedRect(margin, 10, contentWidth, 11, 2, 2, 'FD');
      doc.setDrawColor(...BRAND_COLORS.borderOrange);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(...BRAND_COLORS.deepMaroon);
      doc.text(`${DOCTOR_INFO.name} &bull; Vedic Janam Kundli Report`, margin + 4, 17);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(...BRAND_COLORS.darkSaffron);
      doc.text(`Native: ${fullName} (${dob})`, pageWidth - margin - 4, 17, { align: 'right' });
    }
  };

  // Helper: Draw footer on every page
  const drawPageFooter = (pageNumber: number) => {
    const footerY = pageHeight - 12;

    doc.setDrawColor(...BRAND_COLORS.borderOrange);
    doc.setLineWidth(0.3);
    doc.line(margin, footerY - 2, pageWidth - margin, footerY - 2);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(...BRAND_COLORS.textMuted);
    doc.text(`Chamber: ${DOCTOR_INFO.addresses[0].line1}, ${DOCTOR_INFO.addresses[0].line2} &bull; Phone: ${DOCTOR_INFO.primaryPhone}`, margin, footerY + 2);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(...BRAND_COLORS.darkSaffron);
    doc.text(`Page ${pageNumber} of ${totalPages}`, pageWidth - margin, footerY + 2, { align: 'right' });

    // Bottom tiny bar
    doc.setFillColor(...BRAND_COLORS.saffronOrange);
    doc.rect(0, pageHeight - 2, pageWidth, 2, 'F');
  };

  // ==========================================
  // PAGE 1: NATIVE BIRTH PROFILE & DIAMOND KUNDLI CHART
  // ==========================================
  drawPageHeader(1);

  let currentY = 40;

  // Title Banner
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(...BRAND_COLORS.deepMaroon);
  doc.text(`VEDIC JANAM KUNDLI & ASTROLOGICAL BLUEPRINT`, pageWidth / 2, currentY, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...BRAND_COLORS.warmRust);
  doc.text(`Comprehensive Parashari Nirayana (Sidereal) Horoscope Analysis`, pageWidth / 2, currentY + 4.5, { align: 'center' });

  currentY += 9;

  // Native Details Card (2-column layout)
  doc.setFillColor(...BRAND_COLORS.lightCream);
  doc.roundedRect(margin, currentY, contentWidth, 23, 2.5, 2.5, 'F');
  doc.setDrawColor(...BRAND_COLORS.borderOrange);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin, currentY, contentWidth, 23, 2.5, 2.5, 'S');

  // Left Column: Birth Info
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(...BRAND_COLORS.deepMaroon);
  doc.text('Native Full Name:', margin + 4, currentY + 5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...BRAND_COLORS.textDark);
  doc.text(fullName, margin + 35, currentY + 5);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...BRAND_COLORS.deepMaroon);
  doc.text('Date of Birth:', margin + 4, currentY + 10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...BRAND_COLORS.textDark);
  doc.text(dob, margin + 35, currentY + 10);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...BRAND_COLORS.deepMaroon);
  doc.text('Time of Birth:', margin + 4, currentY + 15);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...BRAND_COLORS.textDark);
  doc.text(tob, margin + 35, currentY + 15);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...BRAND_COLORS.deepMaroon);
  doc.text('Place of Birth:', margin + 4, currentY + 20);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...BRAND_COLORS.textDark);
  doc.text(pob, margin + 35, currentY + 20);

  // Right Column: Astrological Coordinates
  const rightColX = margin + contentWidth / 2 + 5;

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...BRAND_COLORS.deepMaroon);
  doc.text('Ascendant (Lagna):', rightColX, currentY + 5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...BRAND_COLORS.darkSaffron);
  doc.text(`${result.ascendant} ${result.ascendantDegreeFormatted ? `(${result.ascendantDegreeFormatted})` : ''}`, rightColX + 33, currentY + 5);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...BRAND_COLORS.deepMaroon);
  doc.text('Moon Sign (Rashi):', rightColX, currentY + 10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...BRAND_COLORS.darkSaffron);
  doc.text(result.moonSign, rightColX + 33, currentY + 10);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...BRAND_COLORS.deepMaroon);
  doc.text('Sun Sign (Surya):', rightColX, currentY + 15);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...BRAND_COLORS.darkSaffron);
  doc.text(result.sunSign, rightColX + 33, currentY + 15);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...BRAND_COLORS.deepMaroon);
  doc.text('Nakshatra & Pada:', rightColX, currentY + 20);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...BRAND_COLORS.darkSaffron);
  doc.text(result.nakshatra, rightColX + 33, currentY + 20);

  currentY += 27;

  // Chart & Core Metrics Container
  const chartSize = 104; // 104mm square
  const chartX = margin + 2;
  const chartY = currentY + 2;

  // Draw Section Title for Kundli Chart
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...BRAND_COLORS.deepMaroon);
  doc.text('LAGNA CHART (D1) - VEDIC DIAMOND MATRIX', chartX + chartSize / 2, currentY, { align: 'center' });

  // Draw North Indian Diamond Chart in vector format directly onto PDF
  drawNorthIndianChartPDF(doc, chartX, chartY, chartSize, result);

  // Right Side of Page 1: Key Astrological Indicators
  const sidePanelX = chartX + chartSize + 6;
  const sidePanelWidth = contentWidth - chartSize - 6;
  let sidePanelY = currentY + 2;

  // 1. Current Mahadasha Card
  doc.setFillColor(...BRAND_COLORS.warmCream);
  doc.roundedRect(sidePanelX, sidePanelY, sidePanelWidth, 23, 2, 2, 'FD');
  doc.setDrawColor(...BRAND_COLORS.borderOrange);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(...BRAND_COLORS.warmRust);
  doc.text('CURRENT VIMSHOTTARI DASHA', sidePanelX + 3, sidePanelY + 5);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(...BRAND_COLORS.deepMaroon);
  doc.text(result.currentDasha || 'Active Dasha Period', sidePanelX + 3, sidePanelY + 11);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(...BRAND_COLORS.textMuted);
  doc.text(`System: Lahiri Sidereal Nirayana`, sidePanelX + 3, sidePanelY + 16);
  doc.text(`Active planetary ruler governs milestones.`, sidePanelX + 3, sidePanelY + 20);

  sidePanelY += 26;

  // 2. Favorable Gemstones & Colors
  doc.setFillColor(...BRAND_COLORS.warmCream);
  doc.roundedRect(sidePanelX, sidePanelY, sidePanelWidth, 23, 2, 2, 'FD');
  doc.setDrawColor(...BRAND_COLORS.borderOrange);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(...BRAND_COLORS.warmRust);
  doc.text('AUSPICIOUS VEDIC ATTRIBUTES', sidePanelX + 3, sidePanelY + 5);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(...BRAND_COLORS.textDark);
  doc.text('Favorable Gemstone:', sidePanelX + 3, sidePanelY + 10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...BRAND_COLORS.darkSaffron);
  doc.text(result.favorableGemstone, sidePanelX + 3, sidePanelY + 14);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...BRAND_COLORS.textDark);
  doc.text('Lucky Number:', sidePanelX + 3, sidePanelY + 18);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...BRAND_COLORS.darkSaffron);
  doc.text(`${result.luckyNumber}  |  Lucky Color: ${result.luckyColor}`, sidePanelX + 22, sidePanelY + 18);

  sidePanelY += 26;

  // 3. Dosha Snapshot Card
  doc.setFillColor(...BRAND_COLORS.warmCream);
  doc.roundedRect(sidePanelX, sidePanelY, sidePanelWidth, 27, 2, 2, 'FD');
  doc.setDrawColor(...BRAND_COLORS.borderOrange);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(...BRAND_COLORS.warmRust);
  doc.text('PARASHARI DOSHA STATUS', sidePanelX + 3, sidePanelY + 5);

  // Manglik status line
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(...BRAND_COLORS.textDark);
  doc.text('Mangal Dosha:', sidePanelX + 3, sidePanelY + 11);
  doc.setFont('helvetica', 'bold');
  const isManglikCancelled = result.manglikDetails?.isCancelled;
  doc.setTextColor(...(isManglikCancelled || result.manglikStatus.includes('Non') ? BRAND_COLORS.emeraldGreen : BRAND_COLORS.darkSaffron));
  doc.text(result.manglikStatus, sidePanelX + 25, sidePanelY + 11);

  // Sade Sati status line
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...BRAND_COLORS.textDark);
  doc.text('Shani Sade Sati:', sidePanelX + 3, sidePanelY + 17);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...(result.sadeSatiDetails?.isActive ? BRAND_COLORS.darkSaffron : BRAND_COLORS.emeraldGreen));
  const sadeSatiShort = result.sadeSatiDetails?.isActive ? result.sadeSatiDetails.status : 'No Active Sade Sati';
  doc.text(doc.splitTextToSize(sadeSatiShort, sidePanelWidth - 27)[0] || sadeSatiShort, sidePanelX + 25, sidePanelY + 17);

  // Kaal Sarp status line
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...BRAND_COLORS.textDark);
  doc.text('Kaal Sarp Yoga:', sidePanelX + 3, sidePanelY + 23);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...(result.kaalSarpDetails?.isPresent ? BRAND_COLORS.darkSaffron : BRAND_COLORS.emeraldGreen));
  const kaalSarpShort = result.kaalSarpDetails?.isPresent ? result.kaalSarpDetails.yogaName : 'Clear (No Affliction)';
  doc.text(doc.splitTextToSize(kaalSarpShort, sidePanelWidth - 27)[0] || kaalSarpShort, sidePanelX + 25, sidePanelY + 23);

  sidePanelY += 30;

  // 4. Parashari Astrological Notice
  doc.setFillColor(...BRAND_COLORS.lightCream);
  doc.roundedRect(sidePanelX, sidePanelY, sidePanelWidth, 24, 2, 2, 'FD');
  doc.setDrawColor(...BRAND_COLORS.borderOrange);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(...BRAND_COLORS.deepMaroon);
  doc.text('DR. PREETI SEHGAL ADVICE', sidePanelX + 3, sidePanelY + 5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(...BRAND_COLORS.textMuted);
  const adviceExcerpt = doc.splitTextToSize(
    'A Janam Kundli is your cosmic blueprint. Planetary configurations indicate karmic tendencies, while focused Lal Kitab remedies and righteous karma empower personal destiny.',
    sidePanelWidth - 6
  );
  doc.text(adviceExcerpt, sidePanelX + 3, sidePanelY + 9);

  // Bottom Notice of Page 1
  const page1BottomY = chartY + chartSize + 6;
  doc.setFillColor(...BRAND_COLORS.warmCream);
  doc.roundedRect(margin, page1BottomY, contentWidth, 15, 2, 2, 'FD');
  doc.setDrawColor(...BRAND_COLORS.borderOrange);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(...BRAND_COLORS.darkSaffron);
  doc.text('Core Lagna Summary:', margin + 4, page1BottomY + 5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(...BRAND_COLORS.textDark);
  const coreSummaryWrapped = doc.splitTextToSize(
    result.corePrediction || `Ascendant in ${result.ascendant} with Moon in ${result.moonSign}. Chart displays balanced planetary forces.`,
    contentWidth - 8
  );
  doc.text(coreSummaryWrapped.slice(0, 2), margin + 4, page1BottomY + 9);

  drawPageFooter(1);

  // ==========================================
  // PAGE 2: PLANETARY POSITIONS TABLE & DOSHA AUDIT
  // ==========================================
  doc.addPage();
  currentPage = 2;
  drawPageHeader(2);

  currentY = 26;

  // Section Header: Planetary Positions
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...BRAND_COLORS.deepMaroon);
  doc.text('GRAHA SPHUTA - PLANETARY POSITIONS & ASTRONOMICAL STATE', margin, currentY);

  currentY += 3;

  // Build Planetary Table using jspdf-autotable
  const planetsData = (result.planetaryPositions || []).map((p) => [
    p.name,
    p.rashi,
    p.degreeFormatted || `${p.degreesInSign.toFixed(2)}°`,
    p.nakshatra || '-',
    p.pada ? `Pada ${p.pada}` : '-',
    `House ${p.house}`,
    p.isRetrograde ? 'Retrograde (R)' : 'Direct',
    p.dignity || 'Neutral'
  ]);

  autoTable(doc, {
    startY: currentY,
    head: [['Planet (Graha)', 'Rashi (Sign)', 'Longitude (DMS)', 'Nakshatra', 'Pada', 'Bhava', 'Motion', 'Dignity / Avastha']],
    body: planetsData,
    theme: 'grid',
    headStyles: {
      fillColor: BRAND_COLORS.deepMaroon,
      textColor: [255, 255, 255],
      fontSize: 7.5,
      fontStyle: 'bold',
      halign: 'center'
    },
    bodyStyles: {
      fontSize: 7,
      textColor: BRAND_COLORS.textDark,
      cellPadding: 1.8
    },
    alternateRowStyles: {
      fillColor: BRAND_COLORS.warmCream
    },
    columnStyles: {
      0: { fontStyle: 'bold', textColor: BRAND_COLORS.darkSaffron, halign: 'left' },
      1: { halign: 'left' },
      2: { halign: 'center', font: 'courier' },
      3: { halign: 'left' },
      4: { halign: 'center' },
      5: { halign: 'center', fontStyle: 'bold' },
      6: { halign: 'center' },
      7: { halign: 'center', fontStyle: 'bold' }
    },
    margin: { left: margin, right: margin }
  });

  // Calculate position after autotable
  // @ts-expect-error - lastAutoTable is injected by jspdf-autotable
  currentY = doc.lastAutoTable.finalY + 8;

  // Section Header: Comprehensive Parashari Dosha Audit
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...BRAND_COLORS.deepMaroon);
  doc.text('PARASHARI DOSHA EVALUATION & BHANGA (CANCELLATION) AUDIT', margin, currentY);

  currentY += 4;

  // Dosha 1: Manglik Kuja Dosha Card
  doc.setFillColor(...BRAND_COLORS.warmCream);
  doc.roundedRect(margin, currentY, contentWidth, 38, 2.5, 2.5, 'FD');
  doc.setDrawColor(...BRAND_COLORS.borderOrange);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...BRAND_COLORS.deepMaroon);
  doc.text('1. Manglik (Kuja) Dosha Analysis & Parashari Bhanga Verdict', margin + 4, currentY + 6);

  // Status Badge
  const manglikBadgeText = `Status: ${result.manglikStatus}`;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  if (result.manglikDetails?.isCancelled || result.manglikStatus.includes('Non')) {
    doc.setTextColor(...BRAND_COLORS.emeraldGreen);
  } else {
    doc.setTextColor(...BRAND_COLORS.darkSaffron);
  }
  doc.text(manglikBadgeText, pageWidth - margin - 4, currentY + 6, { align: 'right' });

  // Details
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(...BRAND_COLORS.textDark);
  doc.text(`Mars Placement: House ${result.manglikDetails?.lagnaHouse || '-'} from Ascendant (Lagna) &bull; House ${result.manglikDetails?.moonHouse || '-'} from Moon (Chandra)`, margin + 4, currentY + 12);

  const manglikExplWrapped = doc.splitTextToSize(
    result.manglikDetails?.explanation || 'Mars position evaluated against traditional 1st, 4th, 7th, 8th, and 12th house placement rules.',
    contentWidth - 8
  );
  doc.text(manglikExplWrapped.slice(0, 2), margin + 4, currentY + 17);

  // Cancellation reasons if present
  if (result.manglikDetails?.cancellationReasons && result.manglikDetails.cancellationReasons.length > 0) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(...BRAND_COLORS.emeraldGreen);
    doc.text('Parashari Bhanga (Cancellation) Rules Triggered:', margin + 4, currentY + 26);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...BRAND_COLORS.textDark);
    let reasonY = currentY + 30;
    result.manglikDetails.cancellationReasons.slice(0, 2).forEach((reason) => {
      doc.text(`&bull; ${reason}`, margin + 6, reasonY);
      reasonY += 4;
    });
  } else {
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(7);
    doc.setTextColor(...BRAND_COLORS.textMuted);
    doc.text('Classical Parashari Kuja principles applied with sidereal planetary calculations.', margin + 4, currentY + 28);
  }

  currentY += 42;

  // Dosha 2: Shani Sade Sati & Dhaiya Card
  doc.setFillColor(...BRAND_COLORS.warmCream);
  doc.roundedRect(margin, currentY, contentWidth, 34, 2.5, 2.5, 'FD');
  doc.setDrawColor(...BRAND_COLORS.borderOrange);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...BRAND_COLORS.deepMaroon);
  doc.text('2. Shani Sade Sati & Dhaiya Real-Time Transit Evaluation', margin + 4, currentY + 6);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(...(result.sadeSatiDetails?.isActive ? BRAND_COLORS.darkSaffron : BRAND_COLORS.emeraldGreen));
  doc.text(result.sadeSatiDetails?.phaseName || result.sadeSatiStatus, pageWidth - margin - 4, currentY + 6, { align: 'right' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(...BRAND_COLORS.textDark);
  doc.text(
    `Transit Saturn: ${result.sadeSatiDetails?.transitSaturnSign || 'Current Sign'} (${result.sadeSatiDetails?.transitSaturnDegree || ''}) &bull; Position: ${result.sadeSatiDetails?.houseFromMoon || '-'}th House from Natal Moon (${result.sadeSatiDetails?.natalMoonSign || result.moonSign})`,
    margin + 4,
    currentY + 12
  );

  const sadeSatiDescWrapped = doc.splitTextToSize(
    result.sadeSatiDetails?.description || 'Transit of Saturn is monitored relative to natal lunar placement.',
    contentWidth - 8
  );
  doc.text(sadeSatiDescWrapped.slice(0, 2), margin + 4, currentY + 17);

  if (result.sadeSatiDetails?.remedyAdvice) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(...BRAND_COLORS.warmRust);
    doc.text('Recommended Saturn Upay:', margin + 4, currentY + 26);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...BRAND_COLORS.textDark);
    doc.text(result.sadeSatiDetails.remedyAdvice, margin + 40, currentY + 26);
  }

  currentY += 38;

  // Dosha 3: Kaal Sarp Yoga / Dosha Card
  doc.setFillColor(...BRAND_COLORS.warmCream);
  doc.roundedRect(margin, currentY, contentWidth, 34, 2.5, 2.5, 'FD');
  doc.setDrawColor(...BRAND_COLORS.borderOrange);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...BRAND_COLORS.deepMaroon);
  doc.text('3. Kaal Sarp Yoga Strict 180° Axis Hemming Verification', margin + 4, currentY + 6);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(...(result.kaalSarpDetails?.isPresent ? BRAND_COLORS.darkSaffron : BRAND_COLORS.emeraldGreen));
  doc.text(result.kaalSarpDetails?.isPresent ? result.kaalSarpDetails.yogaName : 'Clear (No Kaal Sarp Yoga)', pageWidth - margin - 4, currentY + 6, { align: 'right' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(...BRAND_COLORS.textDark);
  doc.text(
    `Nodal Axis: Rahu (H${result.kaalSarpDetails?.rahuHouse || 1}) - Ketu (H${result.kaalSarpDetails?.ketuHouse || 7}) &bull; Classification: ${result.kaalSarpDetails?.type || 'None'}`,
    margin + 4,
    currentY + 12
  );

  const kaalSarpDescWrapped = doc.splitTextToSize(
    result.kaalSarpDetails?.explanation || 'All 7 classical planets are tested for strict 180° hemming between Rahu and Ketu.',
    contentWidth - 8
  );
  doc.text(kaalSarpDescWrapped.slice(0, 3), margin + 4, currentY + 17);

  drawPageFooter(2);

  // ==========================================
  // PAGE 3: LAL KITAB REMEDIES & ASTROLOGICAL SYNTHESIS
  // ==========================================
  doc.addPage();
  currentPage = 3;
  drawPageHeader(3);

  currentY = 26;

  // Section Header: Comprehensive Astrological Prediction
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...BRAND_COLORS.deepMaroon);
  doc.text('ASTROLOGICAL SYNTHESIS & LIFE PATH FORECAST', margin, currentY);

  currentY += 4;

  // Prediction Container
  doc.setFillColor(...BRAND_COLORS.lightCream);
  doc.roundedRect(margin, currentY, contentWidth, 48, 2.5, 2.5, 'FD');
  doc.setDrawColor(...BRAND_COLORS.borderOrange);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...BRAND_COLORS.warmRust);
  doc.text('Dr. Preeti Sehgal\'s Astrological Assessment & Planetary Roadmap', margin + 4, currentY + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(...BRAND_COLORS.textDark);

  const fullPredictionText = `${result.corePrediction}\n\nKey Strategic Advice: Emphasize harmonious relationships during favorable transits. With your Ascendant in ${result.ascendant}, maintaining disciplined daily routines and ethical financial stewardship enhances overall prosperity. Wear your favorable gemstone (${result.favorableGemstone}) set in auspicious metal after energizing with relevant Vedic mantras on an auspicious weekday.`;
  const predLines = doc.splitTextToSize(fullPredictionText, contentWidth - 8);
  doc.text(predLines.slice(0, 9), margin + 4, currentY + 12);

  currentY += 54;

  // Section Header: Lal Kitab Karma Remedies
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...BRAND_COLORS.deepMaroon);
  doc.text('LAL KITAB KARMA REMEDIES & MANDATORY PARHEZ', margin, currentY);

  currentY += 4;

  // Lal Kitab Prescription Box
  const profile = result.lalKitabProfile;
  doc.setFillColor(...BRAND_COLORS.warmCream);
  doc.roundedRect(margin, currentY, contentWidth, 54, 2.5, 2.5, 'FD');
  doc.setDrawColor(...BRAND_COLORS.borderOrange);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...BRAND_COLORS.deepMaroon);
  doc.text('Prescribed Lal Kitab Dynamic Karma Upay (लाल किताब अचूक उपाय):', margin + 4, currentY + 5.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.2);
  doc.setTextColor(...BRAND_COLORS.textDark);
  
  const lagnaLordText = profile 
    ? `1. Lagna Lord Upay (${profile.lagnaLordRemedy.planet} in House ${profile.lagnaLordRemedy.house}): ${profile.lagnaLordRemedy.remedy} [Duration: ${profile.lagnaLordRemedy.duration} | Timing: ${profile.lagnaLordRemedy.timeOfDay}]`
    : `1. Primary Lagna Upay: ${result.lalKitabRemedy}`;
  const lagnaLines = doc.splitTextToSize(lagnaLordText, contentWidth - 8);
  doc.text(lagnaLines.slice(0, 2), margin + 4, currentY + 11.5);

  const doshaText = (profile && profile.doshaPrescriptions.length > 0)
    ? `2. Dosha Upay (${profile.doshaPrescriptions[0].doshaType} - ${profile.doshaPrescriptions[0].status}): ${profile.doshaPrescriptions[0].prescribedUpay} [Timing: ${profile.doshaPrescriptions[0].timeOfDayRule}]`
    : `2. Surya & Pitra Strengthening: Offer fresh water (Arghya) with saffron to Lord Surya in a copper lota at sunrise. Respect fatherly figures and seek elders' blessings.`;
  const doshaLines = doc.splitTextToSize(doshaText, contentWidth - 8);
  doc.text(doshaLines.slice(0, 2), margin + 4, currentY + 21);

  const parhezText = (profile && profile.mandatoryParhez.length > 0)
    ? `3. Mandatory Parhez (परहेज - Essential Restrictions): ${profile.mandatoryParhez.slice(0, 3).join(' ')}`
    : `3. Navagraha Harmony: Feed stray birds with soaked grains (bajra/wheat) and feed black cows or dogs on Saturdays. Avoid donating benefic items.`;
  const parhezLines = doc.splitTextToSize(parhezText, contentWidth - 8);
  doc.text(parhezLines.slice(0, 3), margin + 4, currentY + 31);

  const debtText = (profile && profile.karmicDebts.length > 0)
    ? `4. Karmic Debt (Rin Kundli): ${profile.karmicDebts[0].name} detected (${profile.karmicDebts[0].planetaryCause}). Family Remedy: ${profile.karmicDebts[0].collectiveFamilyRemedy}`
    : `4. 43-Day Cycle Rule: Follow all remedies continuously for 43 consecutive days without missing a sunrise cycle to guarantee cosmic fruition.`;
  const debtLines = doc.splitTextToSize(debtText, contentWidth - 8);
  doc.text(debtLines.slice(0, 2), margin + 4, currentY + 44);

  currentY += 60;

  // Astrologer Official Consultation Chamber Box
  doc.setFillColor(...BRAND_COLORS.deepMaroon);
  doc.roundedRect(margin, currentY, contentWidth, 48, 2.5, 2.5, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(255, 255, 255);
  doc.text('CONSULTATION & APPOINTMENT BOOKING', margin + 6, currentY + 7);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...BRAND_COLORS.borderOrange);
  doc.text(`${DOCTOR_INFO.name} &bull; ${DOCTOR_INFO.hindiName}`, margin + 6, currentY + 13);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(255, 247, 237);
  doc.text(DOCTOR_INFO.title, margin + 6, currentY + 18);
  doc.text(`Experience: ${DOCTOR_INFO.experienceYears} | Over ${DOCTOR_INFO.consultationsCount} Consultations Globally`, margin + 6, currentY + 23);

  doc.setDrawColor(...BRAND_COLORS.borderOrange);
  doc.setLineWidth(0.2);
  doc.line(margin + 6, currentY + 26, pageWidth - margin - 6, currentY + 26);

  // Address & Contacts in 2 columns inside dark card
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(...BRAND_COLORS.borderOrange);
  doc.text('Consultation Chambers (Delhi):', margin + 6, currentY + 31);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(255, 255, 255);
  doc.text(`1. ${DOCTOR_INFO.addresses[0].title} &bull; ${DOCTOR_INFO.addresses[0].line2}`, margin + 6, currentY + 36);
  doc.text(`2. ${DOCTOR_INFO.addresses[1].title} &bull; ${DOCTOR_INFO.addresses[1].line2}`, margin + 6, currentY + 41);

  const contactColX = margin + contentWidth / 2 + 10;
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...BRAND_COLORS.borderOrange);
  doc.text('Helpline & WhatsApp:', contactColX, currentY + 31);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(255, 255, 255);
  doc.text(`Phone: ${DOCTOR_INFO.primaryPhone} / ${DOCTOR_INFO.secondaryPhone}`, contactColX, currentY + 36);
  doc.text(`Email: ${DOCTOR_INFO.email} | Web: ${DOCTOR_INFO.officialWebsite}`, contactColX, currentY + 41);

  drawPageFooter(3);

  // ==========================================
  // PAGE 4: VIMSHOTTARI DASHA TIMELINE & INFLUENCE ANALYSIS
  // ==========================================
  doc.addPage();
  currentPage = 4;
  drawPageHeader(4);

  currentY = 26;

  // Section Header: Vimshottari Dasha Analysis
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...BRAND_COLORS.deepMaroon);
  doc.text('VIMSHOTTARI DASHA ANALYSIS & PLANETARY INFLUENCES', margin, currentY);

  currentY += 4;

  // Dasha Master Summary Box
  const dashaReport = result.dashaAnalysis?.currentReport;
  if (dashaReport) {
    doc.setFillColor(...BRAND_COLORS.warmCream);
    doc.roundedRect(margin, currentY, contentWidth, 34, 2.5, 2.5, 'FD');
    doc.setDrawColor(...BRAND_COLORS.borderOrange);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...BRAND_COLORS.deepMaroon);
    doc.text(
      `Active Period: ${dashaReport.mahadashaLord} (${dashaReport.mahadashaHindi}) Mahadasha &bull; ${dashaReport.antardashaLord} Antardasha`,
      margin + 4,
      currentY + 6
    );

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(...BRAND_COLORS.darkSaffron);
    doc.text(`Window: ${dashaReport.startDate} - ${dashaReport.endDate}`, pageWidth - margin - 4, currentY + 6, { align: 'right' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.2);
    doc.setTextColor(...BRAND_COLORS.textDark);

    const mahaSummaryLines = doc.splitTextToSize(
      `Mahadasha Lord: ${dashaReport.mahadashaLord} (${dashaReport.mahadashaDignity}) in House ${dashaReport.mahadashaHouse} (${dashaReport.mahadashaSign}). ${dashaReport.mahadashaLordSummary}`,
      contentWidth - 8
    );
    doc.text(mahaSummaryLines.slice(0, 2), margin + 4, currentY + 13);

    const antarSummaryLines = doc.splitTextToSize(
      `Antardasha Lord: ${dashaReport.antardashaLord} (${dashaReport.antardashaDignity}) in House ${dashaReport.antardashaHouse} (${dashaReport.antardashaSign}). Synergy: ${dashaReport.positionalAxis} (${dashaReport.naturalRelationship}). ${dashaReport.synergyParagraph}`,
      contentWidth - 8
    );
    doc.text(antarSummaryLines.slice(0, 2), margin + 4, currentY + 23);

    currentY += 39;

    // 4 Thematic Pillars
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(...BRAND_COLORS.deepMaroon);
    doc.text('THEMATIC LIFE IMPACT (CAREER, WEALTH, MARRIAGE, HEALTH & SPIRITUALITY)', margin, currentY);

    currentY += 4;

    const colWidth = (contentWidth - 4) / 2;
    const boxHeight = 28;

    // Box 1: Career & Wealth
    doc.setFillColor(...BRAND_COLORS.lightCream);
    doc.roundedRect(margin, currentY, colWidth, boxHeight, 2, 2, 'FD');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...BRAND_COLORS.warmRust);
    doc.text('1. Career & Financial Progress', margin + 3, currentY + 5);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.8);
    doc.setTextColor(...BRAND_COLORS.textDark);
    const careerLines = doc.splitTextToSize(dashaReport.themes.careerWealth, colWidth - 6);
    doc.text(careerLines.slice(0, 4), margin + 3, currentY + 10);

    // Box 2: Love & Relationships
    doc.setFillColor(...BRAND_COLORS.lightCream);
    doc.roundedRect(margin + colWidth + 4, currentY, colWidth, boxHeight, 2, 2, 'FD');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...BRAND_COLORS.warmRust);
    doc.text('2. Love, Marriage & Family Harmony', margin + colWidth + 7, currentY + 5);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.8);
    doc.setTextColor(...BRAND_COLORS.textDark);
    const loveLines = doc.splitTextToSize(dashaReport.themes.loveRelationships, colWidth - 6);
    doc.text(loveLines.slice(0, 4), margin + colWidth + 7, currentY + 10);

    currentY += boxHeight + 3;

    // Box 3: Health & Vitality
    doc.setFillColor(...BRAND_COLORS.lightCream);
    doc.roundedRect(margin, currentY, colWidth, boxHeight, 2, 2, 'FD');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...BRAND_COLORS.warmRust);
    doc.text('3. Health, Immunity & Vital Energy', margin + 3, currentY + 5);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.8);
    doc.setTextColor(...BRAND_COLORS.textDark);
    const healthLines = doc.splitTextToSize(dashaReport.themes.healthVitality, colWidth - 6);
    doc.text(healthLines.slice(0, 4), margin + 3, currentY + 10);

    // Box 4: Spiritual Growth & Mind
    doc.setFillColor(...BRAND_COLORS.lightCream);
    doc.roundedRect(margin + colWidth + 4, currentY, colWidth, boxHeight, 2, 2, 'FD');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...BRAND_COLORS.warmRust);
    doc.text('4. Spiritual Evolution & Mindset', margin + colWidth + 7, currentY + 5);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.8);
    doc.setTextColor(...BRAND_COLORS.textDark);
    const spiritLines = doc.splitTextToSize(dashaReport.themes.spiritualMindset, colWidth - 6);
    doc.text(spiritLines.slice(0, 4), margin + colWidth + 7, currentY + 10);

    currentY += boxHeight + 4;

    // Dasha Harmonization Upay
    doc.setFillColor(...BRAND_COLORS.warmCream);
    doc.roundedRect(margin, currentY, contentWidth, 22, 2, 2, 'FD');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...BRAND_COLORS.deepMaroon);
    doc.text('Prescribed Dasha Harmonizer Upay (दशा शांति एवं ग्रह संतुलन):', margin + 3, currentY + 5.5);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(...BRAND_COLORS.textDark);
    const upayLines = doc.splitTextToSize(dashaReport.remedialAdvice, contentWidth - 6);
    doc.text(upayLines.slice(0, 3), margin + 3, currentY + 11);

    currentY += 27;
  }

  // Astrologer Chamber Booking Card on Page 4
  doc.setFillColor(...BRAND_COLORS.deepMaroon);
  doc.roundedRect(margin, currentY, contentWidth, 42, 2.5, 2.5, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(255, 255, 255);
  doc.text('SCHEDULE COMPREHENSIVE DASHA TIMING CONSULTATION', margin + 6, currentY + 6.5);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(...BRAND_COLORS.borderOrange);
  doc.text(`${DOCTOR_INFO.name} &bull; ${DOCTOR_INFO.title}`, margin + 6, currentY + 12);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(255, 247, 237);
  doc.text(`Direct Helpline: ${DOCTOR_INFO.primaryPhone} / ${DOCTOR_INFO.secondaryPhone} &bull; Email: ${DOCTOR_INFO.email}`, margin + 6, currentY + 17);
  doc.text(`Consultation Chambers: ${DOCTOR_INFO.addresses[0].line1}, ${DOCTOR_INFO.addresses[0].line2} &bull; Web: ${DOCTOR_INFO.officialWebsite}`, margin + 6, currentY + 22);

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(6);
  doc.setTextColor(...BRAND_COLORS.textMuted);
  doc.text(
    'Astrological Disclaimer: This Janam Kundli report is prepared strictly in accordance with traditional Parashari and Lal Kitab principles based on birth coordinates provided. Astrological insights are intended as guidance for spiritual alignment, self-awareness, and dharmic growth.',
    margin,
    pageHeight - 18
  );

  drawPageFooter(4);

  // Generate clean filename
  const cleanName = fullName.trim().replace(/[^a-zA-Z0-9]/g, '_') || 'Native';
  const fileName = `Janam_Kundli_${cleanName}_DrPreetiSehgal.pdf`;

  // Download PDF
  doc.save(fileName);
}

// ==========================================
// VECTOR CHART RENDERER FOR JSPDF
// ==========================================
function drawNorthIndianChartPDF(
  doc: jsPDF,
  startX: number,
  startY: number,
  size: number,
  result: KundliResult
): void {
  const S = size;
  const X = startX;
  const Y = startY;

  // Background square
  doc.setFillColor(...BRAND_COLORS.warmCream);
  doc.rect(X, Y, S, S, 'F');

  // Outer border
  doc.setDrawColor(...BRAND_COLORS.deepMaroon);
  doc.setLineWidth(0.6);
  doc.rect(X, Y, S, S, 'S');

  // Diagonal Lines (X)
  doc.setLineWidth(0.4);
  doc.line(X, Y, X + S, Y + S);
  doc.line(X + S, Y, X, Y + S);

  // Inner Diamond connecting midpoints
  doc.line(X + S / 2, Y, X + S, Y + S / 2);
  doc.line(X + S, Y + S / 2, X + S / 2, Y + S);
  doc.line(X + S / 2, Y + S, X, Y + S / 2);
  doc.line(X, Y + S / 2, X + S / 2, Y);

  // Compute Ascendant Sign Index (0-11)
  const ascendantSignStr = result.ascendant.split(' ')[0];
  const RASHI_NAMES = [
    'Aries', 'Taurus', 'Gemini', 'Cancer',
    'Leo', 'Virgo', 'Libra', 'Scorpio',
    'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
  ];
  const foundAscIndex = RASHI_NAMES.findIndex(
    (r) => ascendantSignStr.toLowerCase().includes(r.toLowerCase())
  );
  const ascIndex = foundAscIndex >= 0 ? foundAscIndex : 0;

  // Map sign number (1-12) for each house (1-12) counter-clockwise
  const getSignNum = (house: number) => {
    return (((ascIndex + (house - 1)) % 12) + 12) % 12 + 1;
  };

  // Group planets by house (1-12)
  const planetsByHouse: Record<number, PlanetaryPosition[]> = {};
  for (let i = 1; i <= 12; i++) {
    planetsByHouse[i] = [];
  }

  (result.planetaryPositions || []).forEach((p) => {
    if (p.house >= 1 && p.house <= 12) {
      planetsByHouse[p.house].push(p);
    }
  });

  // Precise geometric coordinates for House Sign Numbers and Planets in North Indian Kundli
  const houseLayouts: Record<
    number,
    { signPos: [number, number]; planetStart: [number, number]; align: 'center' | 'left' | 'right' }
  > = {
    // 1st House: Top Diamond Center
    1: { signPos: [X + S / 2, Y + S * 0.17], planetStart: [X + S / 2, Y + S * 0.28], align: 'center' },
    // 2nd House: Top-Left Upper Triangle
    2: { signPos: [X + S * 0.27, Y + S * 0.08], planetStart: [X + S * 0.22, Y + S * 0.15], align: 'center' },
    // 3rd House: Top-Left Lower Triangle
    3: { signPos: [X + S * 0.08, Y + S * 0.27], planetStart: [X + S * 0.13, Y + S * 0.35], align: 'center' },
    // 4th House: Left Diamond Center
    4: { signPos: [X + S * 0.23, Y + S / 2], planetStart: [X + S * 0.28, Y + S / 2 - 2], align: 'center' },
    // 5th House: Bottom-Left Upper Triangle
    5: { signPos: [X + S * 0.08, Y + S * 0.73], planetStart: [X + S * 0.13, Y + S * 0.65], align: 'center' },
    // 6th House: Bottom-Left Lower Triangle
    6: { signPos: [X + S * 0.27, Y + S * 0.92], planetStart: [X + S * 0.22, Y + S * 0.85], align: 'center' },
    // 7th House: Bottom Diamond Center
    7: { signPos: [X + S / 2, Y + S * 0.83], planetStart: [X + S / 2, Y + S * 0.72], align: 'center' },
    // 8th House: Bottom-Right Lower Triangle
    8: { signPos: [X + S * 0.73, Y + S * 0.92], planetStart: [X + S * 0.78, Y + S * 0.85], align: 'center' },
    // 9th House: Bottom-Right Upper Triangle
    9: { signPos: [X + S * 0.92, Y + S * 0.73], planetStart: [X + S * 0.87, Y + S * 0.65], align: 'center' },
    // 10th House: Right Diamond Center
    10: { signPos: [X + S * 0.77, Y + S / 2], planetStart: [X + S * 0.72, Y + S / 2 - 2], align: 'center' },
    // 11th House: Top-Right Lower Triangle
    11: { signPos: [X + S * 0.92, Y + S * 0.27], planetStart: [X + S * 0.87, Y + S * 0.35], align: 'center' },
    // 12th House: Top-Right Upper Triangle
    12: { signPos: [X + S * 0.73, Y + S * 0.08], planetStart: [X + S * 0.78, Y + S * 0.15], align: 'center' }
  };

  // Planet short name mapping for neat chart printing
  const PLANET_SHORT_CODES: Record<string, string> = {
    Sun: 'Su',
    Moon: 'Mo',
    Mars: 'Ma',
    Mercury: 'Me',
    Jupiter: 'Ju',
    Venus: 'Ve',
    Saturn: 'Sa',
    Rahu: 'Ra',
    Ketu: 'Ke'
  };

  // Draw house numbers and planets
  for (let h = 1; h <= 12; h++) {
    const layout = houseLayouts[h];
    const signNum = getSignNum(h);

    // Draw Sign Number in small rustic badge
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.5);
    doc.setTextColor(...BRAND_COLORS.warmRust);
    doc.text(String(signNum), layout.signPos[0], layout.signPos[1], { align: 'center' });

    // Draw Planets placed in this house
    const planets = planetsByHouse[h];
    if (planets && planets.length > 0) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(6.2);

      let textY = layout.planetStart[1] - ((planets.length - 1) * 2.8) / 2;

      planets.forEach((p) => {
        const shortName = PLANET_SHORT_CODES[p.name] || p.name.slice(0, 2);
        const retroStr = p.isRetrograde ? '(R)' : '';
        const degStr = p.degreeFormatted ? p.degreeFormatted.split(' ')[0] : '';
        const planetLabel = `${shortName}${retroStr} ${degStr}`.trim();

        // Highlight Sun/Moon/Jupiter or Exalted with warm color
        if (p.dignity === 'Exalted' || p.dignity === 'Own Sign') {
          doc.setTextColor(...BRAND_COLORS.emeraldGreen);
        } else if (p.name === 'Mars' && (result.manglikStatus.includes('High') || result.manglikStatus.includes('Partial'))) {
          doc.setTextColor(...BRAND_COLORS.redAccent);
        } else {
          doc.setTextColor(...BRAND_COLORS.deepMaroon);
        }

        doc.text(planetLabel, layout.planetStart[0], textY, { align: 'center' });
        textY += 2.8;
      });
    }
  }

  // Draw Lagna badge in Center of 1st House
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(5.5);
  doc.setTextColor(...BRAND_COLORS.darkSaffron);
  doc.text('LAGNA', X + S / 2, Y + S * 0.12, { align: 'center' });
}

// Draw Brand Logo Emblem onto PDF
function drawBrandLogoEmblem(doc: jsPDF, x: number, y: number, size: number): void {
  const radius = size / 2;
  const cx = x + radius;
  const cy = y + radius;

  // Background circular fill
  doc.setFillColor(255, 247, 237); // Warm cream
  doc.circle(cx, cy, radius, 'F');

  // Outer orange ring
  doc.setDrawColor(...BRAND_COLORS.saffronOrange);
  doc.setLineWidth(0.4);
  doc.circle(cx, cy, radius - 0.5, 'S');

  // Inner ring
  doc.setDrawColor(...BRAND_COLORS.darkSaffron);
  doc.setLineWidth(0.2);
  doc.circle(cx, cy, radius - 2, 'S');

  // Central Sun Rays (8-fold cross)
  doc.setDrawColor(...BRAND_COLORS.saffronOrange);
  doc.setLineWidth(0.25);
  const rRay = radius - 3;
  doc.line(cx, cy - rRay, cx, cy + rRay);
  doc.line(cx - rRay, cy, cx + rRay, cy);
  const diag = rRay * 0.707;
  doc.line(cx - diag, cy - diag, cx + diag, cy + diag);
  doc.line(cx - diag, cy + diag, cx + diag, cy - diag);

  // Center Sun Bindu
  doc.setFillColor(...BRAND_COLORS.saffronOrange);
  doc.circle(cx, cy, 2, 'F');
  doc.setFillColor(...BRAND_COLORS.deepMaroon);
  doc.circle(cx, cy, 1, 'F');
}
