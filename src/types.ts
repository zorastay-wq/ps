export type ConsultationMode = 'video' | 'phone' | 'in_person' | 'report';

export interface ServiceItem {
  id: string;
  title: string;
  hindiTitle: string;
  tagline: string;
  description: string;
  fullDetails: string[];
  keyBenefits: string[];
  iconName: string;
  popular?: boolean;
  category: 'astrology' | 'lalkitab' | 'vastu' | 'tarot' | 'numerology' | 'gemstones';
  duration: string;
  priceNote: string;
}

export interface LalKitabRemedy {
  id: string;
  title: string;
  hindiTitle: string;
  category: 'wealth' | 'marriage' | 'career' | 'health' | 'protection' | 'children';
  issue: string;
  remedy: string;
  planet: string;
  duration: string;
  precautions: string[];
  auspiciousDay: string;
}

export type TarotDeckTheme = 'vedic' | 'rider-waite';

export interface TarotCard {
  id: number;
  name: string;
  arcana: 'Major' | 'Minor';
  suit?: 'Wands' | 'Cups' | 'Swords' | 'Pentacles';
  number?: string | number;
  imageUrl?: string;
  uprightMeaning: string;
  reversedMeaning: string;
  isReversed?: boolean;
  psychologicalMeaning?: string;
  spiritualMeaning?: string;
  astrologicalSign: string;
  element: string;
  guidance: string;
  color: string;
  symbols?: string[];
  spreadAdvice?: {
    past?: string;
    present?: string;
    future?: string;
  };
}

export interface ReviewItem {
  id: string;
  name: string;
  location: string;
  service: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface InstagramPost {
  id: string;
  type: 'reel' | 'post' | 'tip';
  title: string;
  caption: string;
  views: string;
  likes: string;
  thumbnailGradient: string;
  topic: string;
  date: string;
  embedUrl?: string;
  bulletPoints: string[];
}

export interface LocationData {
  city: string;
  state?: string;
  country: string;
  countryCode: string;
  lat: number;
  lng: number;
  timezone: string;
  utcOffsetHours: number;
  displayName: string;
}

export interface BookingFormState {
  fullName: string;
  phone: string;
  email: string;
  dob: string;
  tob: string;
  pob: string;
  lat?: number;
  lng?: number;
  timezone?: string;
  serviceId: string;
  mode: ConsultationMode;
  date: string;
  timeSlot: string;
  specificConcerns: string;
}

export interface PlanetaryPosition {
  name: string;
  hindiName: string;
  symbol: string;
  rashi: string;
  rashiSanskrit: string;
  signIndex: number;
  degreesInSign: number;
  absoluteDegree: number;
  degreeFormatted: string;
  house: number;
  nakshatra: string;
  pada: number;
  dignity: 'Exalted' | 'Own Sign' | 'Moolatrikona' | 'Friendly' | 'Neutral' | 'Enemy' | 'Debilitated';
  isRetrograde: boolean;
  isCombust?: boolean;
  element: 'Fire' | 'Earth' | 'Air' | 'Water';
  color: string;
  karaka: string;
  aspectHouses: number[];
}

export interface ManglikDetails {
  status: 'High Manglik' | 'Low / Partial Manglik' | 'Cancelled Manglik (Bhanga)' | 'Non-Manglik';
  isManglik: boolean;
  isCancelled: boolean;
  severity: 'High' | 'Low' | 'Cancelled' | 'None';
  lagnaHouse: number;
  moonHouse: number;
  isLagnaManglik: boolean;
  isMoonManglik: boolean;
  cancellationReasons: string[];
  explanation: string;
}

export interface SadeSatiDetails {
  status: string;
  isActive: boolean;
  type: 'Sade Sati' | 'Dhaiya' | 'None';
  phaseName: string;
  phaseNumber?: 1 | 2 | 3;
  transitSaturnSign: string;
  transitSaturnDegree: string;
  transitSaturnSignIndex: number;
  natalMoonSign: string;
  natalMoonSignIndex: number;
  houseFromMoon: number;
  description: string;
  remedyAdvice: string;
}

export interface KaalSarpDetails {
  status: string;
  isPresent: boolean;
  yogaName: string;
  rahuHouse: number;
  ketuHouse: number;
  axis: string;
  type: 'Udit (Rahu to Ketu)' | 'Anudit (Ketu to Rahu)' | 'None';
  hemmedPlanetsCount: number;
  unhemmedPlanets: string[];
  planetsInRahuKetuArc: string[];
  planetsInKetuRahuArc: string[];
  explanation: string;
}

export interface DoshaDiagnostics {
  ayanamsa: number;
  timestamp: string;
  marsData: {
    sign: string;
    signIndex: number;
    degreeFormatted: string;
    houseFromLagna: number;
    houseFromMoon: number;
    dignity: string;
  };
  manglikBhangaChecks: {
    ownOrExaltedSign: boolean;
    jupiterConjunctionOrAspect: boolean;
    venusConjunctionOrAspect: boolean;
    specificHouseSignAlignment: boolean;
    chandraMangalYoga: boolean;
    cancellationSummary: string[];
  };
  saturnTransitData: {
    transitSign: string;
    transitDegree: string;
    natalMoonSign: string;
    houseOffsetFromMoon: number;
    detectedPhase: string;
  };
  kaalSarpHemmingData: {
    rahuDegree: number;
    ketuDegree: number;
    planetsInRahuKetuArc: string[];
    planetsInKetuRahuArc: string[];
    isFullyHemmed: boolean;
  };
}

export interface LalKitabHouseRemedy {
  planet: string;
  hindiName: string;
  house: number;
  pakkaGhar: number;
  isPakkaGhar: boolean;
  significance: string;
  issue: string;
  upayTitle: string;
  remedy: string;
  duration: string;
  timeOfDay: string;
  precautions: string[];
  auspiciousDay: string;
  elementOrSubstance: string;
}

export interface LalKitabDoshaPrescription {
  doshaType: 'Manglik' | 'Sade Sati' | 'Kaal Sarp';
  status: string;
  title: string;
  hindiTitle: string;
  prescribedUpay: string;
  cycleRule: string;
  timeOfDayRule: string;
  precautions: string[];
  rationale: string;
}

export interface LalKitabKarmicDebt {
  id: string;
  name: string;
  hindiName: string;
  planetaryCause: string;
  detectedReason: string;
  karmicSymptoms: string;
  collectiveFamilyRemedy: string;
  cycleRule: string;
  precautions: string[];
}

export interface LalKitabPrescriptionProfile {
  lagnaLordRemedy: LalKitabHouseRemedy;
  keyHouseRemedies: LalKitabHouseRemedy[];
  doshaPrescriptions: LalKitabDoshaPrescription[];
  karmicDebts: LalKitabKarmicDebt[];
  mandatoryParhez: string[];
  summaryPrescription: string;
}

export interface DashaThemes {
  careerWealth: string;
  loveRelationships: string;
  healthVitality: string;
  spiritualMindset: string;
}

export interface DashaInfluenceReport {
  mahadashaLord: string;
  mahadashaHindi: string;
  mahadashaHouse: number;
  mahadashaSign: string;
  mahadashaDignity: string;
  mahadashaRuledHouses: number[];

  antardashaLord: string;
  antardashaHindi: string;
  antardashaHouse: number;
  antardashaSign: string;
  antardashaDignity: string;
  antardashaRuledHouses: number[];

  startDate: string;
  endDate: string;
  naturalRelationship: 'Friend' | 'Enemy' | 'Neutral';
  positionalAxis: string;
  positionalAxisType: string;
  isSynergistic: boolean;

  mahadashaLordSummary: string;
  antardashaLordSummary: string;
  synergyParagraph: string;

  themes: DashaThemes;
  remedialAdvice: string;
}

export interface AntardashaDetail {
  id: string;
  lord: string;
  hindi: string;
  startDateFormatted: string;
  endDateFormatted: string;
  isActive: boolean;
  durationYears: number;
  interpretation: DashaInfluenceReport;
}

export interface DashaTimelineItem {
  mahadashaLord: string;
  mahadashaHindi: string;
  startDateFormatted: string;
  endDateFormatted: string;
  totalYears: number;
  isActive: boolean;
  antardashas: AntardashaDetail[];
}

export interface DashaAnalysisData {
  currentReport: DashaInfluenceReport;
  timeline: DashaTimelineItem[];
}

export interface KundliResult {
  ascendant: string;
  ascendantDegree?: number;
  ascendantDegreeFormatted?: string;
  ascendantNakshatra?: string;
  ascendantPada?: number;
  ayanamsa?: number;
  moonSign: string;
  sunSign: string;
  nakshatra: string;
  manglikStatus: string;
  manglikDetails?: ManglikDetails;
  sadeSatiStatus: string;
  sadeSatiDetails?: SadeSatiDetails;
  kaalSarpStatus: string;
  kaalSarpDetails?: KaalSarpDetails;
  doshaDiagnostics?: DoshaDiagnostics;
  favorableGemstone: string;
  luckyNumber: number;
  luckyColor: string;
  currentDasha: string;
  corePrediction: string;
  lalKitabRemedy: string;
  lalKitabProfile?: LalKitabPrescriptionProfile;
  dashaAnalysis?: DashaAnalysisData;
  planetaryPositions?: PlanetaryPosition[];
  locationDetails?: {
    city: string;
    country: string;
    lat: number;
    lng: number;
    timezone: string;
    utcOffsetHours: number;
  };
}

export interface VastuZone {
  id: string;
  direction: string;
  element: string;
  ruler: string;
  colors: string;
  idealFor: string;
  avoid: string;
  nonDemolitionRemedy: string;
}

export interface GemstoneInfo {
  id: string;
  name: string;
  hindiName: string;
  planet: string;
  colorHex: string;
  metal: string;
  finger: string;
  auspiciousDay: string;
  mantra: string;
  benefits: string[];
  suitableFor: string[];
}

export interface UserProfile {
  fullName: string;
  dob: string;
  tob: string;
  pob: string;
  lat?: number;
  lng?: number;
  timezone?: string;
  gender?: 'male' | 'female' | 'other';
  phone?: string;
  email?: string;
  gotra?: string;
  savedAt?: string;
}

// ==========================================
// ADMIN PORTAL & CMS DATA TYPES
// ==========================================

export type AdminRole = 'superadmin' | 'manager';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  title: string;
  avatar?: string;
  lastLogin?: string;
}

export interface AdminSession {
  user: AdminUser;
  token: string;
  expiresAt: number;
  loginTimestamp: number;
}

export interface AdminBooking {
  id: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  serviceId: string;
  serviceTitle: string;
  consultationMode: ConsultationMode;
  preferredDate: string;
  preferredSlot: string;
  birthDetails: string;
  clientNotes?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  feeAmount?: string;
  paymentStatus?: 'unpaid' | 'paid' | 'waived';
  assignedAstrologer?: string;
  meetLink?: string;
  meetSpaceId?: string;
  createdAt: string;
  updatedAt?: string;
  clinicNotes?: string;
}

export interface BookingFilter {
  status?: string;
  search?: string;
  serviceId?: string;
  mode?: string;
  dateFrom?: string;
  dateTo?: string;
}

export interface BookingStats {
  totalBookings: number;
  pendingBookings: number;
  confirmedBookings: number;
  completedBookings: number;
  cancelledBookings: number;
  todayBookings: number;
  videoAppointmentsCount: number;
  inPersonChambersCount: number;
}

export interface KundliEngineLog {
  id: string;
  nativeName: string;
  gender: string;
  dob: string;
  tob: string;
  pob: string;
  ascendant: string;
  moonSign: string;
  sunSign: string;
  nakshatra: string;
  manglikStatus: string;
  isManglik: boolean;
  sadeSatiStatus: string;
  hasSadeSati: boolean;
  kaalSarpStatus: string;
  hasKaalSarp: boolean;
  hasKemdrum?: boolean;
  hasPitriRin?: boolean;
  calculatedAt: string;
  clientIp?: string;
  source: 'web_visualizer' | 'manual_admin';
}

export interface KundliAnalyticsSummary {
  totalCalculated: number;
  todayCalculated: number;
  manglikPercentage: number;
  sadeSatiPercentage: number;
  kaalSarpPercentage: number;
  pitriRinPercentage: number;
  topAscendants: { name: string; count: number; percentage: number }[];
  topCities: { name: string; count: number }[];
  dailyTrend: { date: string; count: number }[];
}

export interface VastuDirectionRule {
  id: string;
  direction: string;
  hindiName?: string;
  element: string;
  rulingPlanet: string;
  planetaryLord?: string;
  rulingDeity: string;
  idealUsage: string[];
  prohibited: string[];
  doshaEffect: string;
  nonDemolitionRemedies: string[];
  colorHarmony: string;
}

export type AdminTab = 'dashboard' | 'bookings' | 'analytics' | 'content-lalkitab' | 'content-vastu' | 'settings';

