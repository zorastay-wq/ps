import { 
  AdminUser, 
  AdminSession, 
  AdminBooking, 
  BookingFilter, 
  BookingStats, 
  KundliEngineLog, 
  KundliAnalyticsSummary, 
  LalKitabRemedy, 
  VastuZone,
  VastuDirectionRule
} from '../types';
import { LAL_KITAB_REMEDIES_DATA, VASTU_ZONES_DATA, DOCTOR_INFO, SERVICES_DATA } from '../data/brandData';

const SESSION_STORAGE_KEY = 'dr_sehgal_admin_session';
const BOOKINGS_STORAGE_KEY = 'dr_sehgal_admin_bookings';
const KUNDLI_LOGS_STORAGE_KEY = 'dr_sehgal_kundli_logs';
const LAL_KITAB_STORAGE_KEY = 'dr_sehgal_lal_kitab_cms';
const VASTU_STORAGE_KEY = 'dr_sehgal_vastu_cms';
const CLINIC_SETTINGS_KEY = 'dr_sehgal_clinic_settings';

// Authorized Mock Admin Accounts
const AUTHORIZED_ADMINS = [
  {
    id: 'adm_001_superadmin',
    name: 'Dr. Preeti Sehgal',
    email: 'admin@preetisehgal.com',
    passwordHash: 'Vedic@2026',
    role: 'superadmin' as const,
    title: 'Founder & Principal Vedic Astrologer',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'adm_002_manager',
    name: 'Rajesh Sharma',
    email: 'manager@preetisehgal.com',
    passwordHash: 'VedicClinic@2026',
    role: 'manager' as const,
    title: 'Head of Clinic Operations & Appointments',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
  }
];

// 8-Direction Classical Vastu Rules
const INITIAL_VASTU_RULES: VastuDirectionRule[] = [
  {
    id: 'vastu-ne',
    direction: 'North-East (ईशान कोण)',
    element: 'Water (जल तत्व)',
    rulingPlanet: 'Jupiter (गुरु)',
    rulingDeity: 'Lord Shiva',
    idealUsage: ['Pooja Mandir', 'Meditation / Yoga Room', 'Underground Water Tank', 'Entrance'],
    prohibited: ['Toilet / Bathroom', 'Kitchen / Fire Zone', 'Master Bedroom', 'Heavy Storage'],
    doshaEffect: 'Blockage in wisdom, chronic neurological stress, stagnation in spiritual and financial growth.',
    nonDemolitionRemedies: [
      'Place an energized Brass Crystal Pyramid in the North-East corner',
      'Keep a clean brass bowl filled with fresh water and fragrant marigold petals',
      'Apply light white, off-white or soft celestial cyan paint'
    ],
    colorHarmony: 'Off-white, Light Cyan, Cream, Silver'
  },
  {
    id: 'vastu-e',
    direction: 'East (पूर्व दिशा)',
    element: 'Air / Wood (वायु तत्व)',
    rulingPlanet: 'Sun (सूर्य)',
    rulingDeity: 'Lord Indra',
    idealUsage: ['Main Entrance', 'Living Room', 'Study Desk', 'Balcony / Veranda'],
    prohibited: ['Septic Tank', 'Heavy Garbage / Dump', 'Master Bedroom with head to North'],
    doshaEffect: 'Loss of social reputation, government penalties, lack of vitality, eye troubles.',
    nonDemolitionRemedies: [
      'Mount an energized heavy Brass Surya Idol at 7 feet on East wall',
      'Offer Arghya (water in copper vessel) to rising Sun daily from this zone',
      'Keep green indoor air-purifying plants in terracotta pots'
    ],
    colorHarmony: 'Golden Ochre, Warm Saffron, Forest Green'
  },
  {
    id: 'vastu-se',
    direction: 'South-East (आग्नेय कोण)',
    element: 'Fire (अग्नि तत्व)',
    rulingPlanet: 'Venus (शुक्र)',
    rulingDeity: 'Lord Agni',
    idealUsage: ['Main Kitchen (Cook facing East)', 'Electrical Panels / Inverters', 'Boiler / Geyser', 'Cash Counter'],
    prohibited: ['Underground Water Sump', 'Master Bedroom', 'Main Entrance', 'Pooja Room'],
    doshaEffect: 'Cash flow drain, marital discord, reproductive health issues, sudden fire/electrical hazards.',
    nonDemolitionRemedies: [
      'Install an energized Copper Swastika or Agni Yantra on South-East wall',
      'Burn pure camphor or a pure ghee lamp in brass diya at twilight',
      'Keep red coral or natural carnelian crystals near cooktop'
    ],
    colorHarmony: 'Warm Coral, Rose Red, Pastel Pink, Copper'
  },
  {
    id: 'vastu-s',
    direction: 'South (दक्षिण दिशा)',
    element: 'Earth / Fire (पृथ्वी / अग्नि)',
    rulingPlanet: 'Mars (मंगल)',
    rulingDeity: 'Lord Yama',
    idealUsage: ['Master Bedroom', 'Office Cabin (Owner facing North)', 'Heavy Wardrobe', 'Staircase'],
    prohibited: ['Underground Water Tank', 'Main Entrance without remedies', 'Pooja Room'],
    doshaEffect: 'Legal disputes, restless sleep, blood pressure fluctuations, sudden litigation.',
    nonDemolitionRemedies: [
      'Hang heavy red jasper or tiger-eye gemstone pyramids',
      'Keep heavy solid teakwood or stone furniture against the South wall',
      'Use deep maroon or terracotta accent paint'
    ],
    colorHarmony: 'Deep Maroon, Rust, Terracotta, Crimson'
  },
  {
    id: 'vastu-sw',
    direction: 'South-West (नैऋत्य कोण)',
    element: 'Earth (पृथ्वी तत्व)',
    rulingPlanet: 'Rahu (राहु)',
    rulingDeity: 'Nirriti',
    idealUsage: ['Master Bedroom (Head to South)', 'Owner / Patriarch Cabin', 'Heavy Cash Safe / Locker', 'Overhead Water Tank'],
    prohibited: ['Main Entrance', 'Underground Water Borewell', 'Pooja Mandir', 'Kitchen'],
    doshaEffect: 'Sudden relationship estrangement, severe financial instability, loss of household authority.',
    nonDemolitionRemedies: [
      'Place a solid Yellow Jaisalmer marble stone slab or heavy brass elephant pair',
      'Keep family master safe facing North or East with heavy base',
      'Use warm earth beige, ochre or camel brown color tones'
    ],
    colorHarmony: 'Earth Ochre, Camel Brown, Mustard Beige'
  },
  {
    id: 'vastu-w',
    direction: 'West (पश्चिम दिशा)',
    element: 'Space / Metal (आकाश तत्व)',
    rulingPlanet: 'Saturn (शनि)',
    rulingDeity: 'Lord Varuna',
    idealUsage: ['Dining Room', 'Children Study Room', 'Overhead Water Storage', 'Guest Bedroom'],
    prohibited: ['Main Entrance facing negative pada', 'Pooja Mandir without remedies', 'Open pit'],
    doshaEffect: 'Delayed career promotions, chronic joint pain, difficulty converting hard work to profits.',
    nonDemolitionRemedies: [
      'Place a 7-rod metallic wind chime or blue lapis lazuli pyramid',
      'Keep heavy wrought iron or dark walnut wooden shelves',
      'Use slate grey, deep royal navy or pearl white finishes'
    ],
    colorHarmony: 'Slate Grey, Deep Navy Blue, Pearl White'
  },
  {
    id: 'vastu-nw',
    direction: 'North-West (वायव्य कोण)',
    element: 'Air (वायु तत्व)',
    rulingPlanet: 'Moon (चन्द्र)',
    rulingDeity: 'Lord Vayu',
    idealUsage: ['Guest Bedroom', 'Finished Goods Dispatch Area', 'Unmarried Daughter Room', 'Granary / Pantry'],
    prohibited: ['Master Bedroom for Patriarch', 'Heavy Immovable Clutter / Junk', 'Pooja Room'],
    doshaEffect: 'Instability in travel/visa, legal litigation with neighbours, respiratory troubles, restless mind.',
    nonDemolitionRemedies: [
      'Hang a 5-pipe tuned aluminium or brass air chime near the window',
      'Keep a natural Selenite moon lamp or crystal quartz cluster',
      'Ensure cross-ventilation and clean white or pearl silver paint'
    ],
    colorHarmony: 'Pearl Silver, White, Moon Grey, Light Cream'
  },
  {
    id: 'vastu-n',
    direction: 'North (उत्तर दिशा - कुबेर स्थान)',
    element: 'Water / Opportunity (जल तत्व)',
    rulingPlanet: 'Mercury (बुध)',
    rulingDeity: 'Lord Kuber',
    idealUsage: ['Main Entrance', 'Cash Locker (Facing North)', 'Living Room', 'Financial Advisory Desk'],
    prohibited: ['Toilet / Septic Tank', 'Heavy Solid Wall with zero openings', 'Red / Pink Paint'],
    doshaEffect: 'Severe blockage in new client acquisition, salary stagnation, financial disputes in business.',
    nonDemolitionRemedies: [
      'Place an energized Brass Kuber Yantra or Emerald Green Money Plant in green glass jar',
      'Keep North wall light, open, and decluttered at all times',
      'Use pistachio green, emerald or soft light mint green paint'
    ],
    colorHarmony: 'Pistachio Green, Mint, Light Emerald, White'
  }
];

// Helper: Simulate network latency for realistic feel
const delay = (ms = 220) => new Promise((resolve) => setTimeout(resolve, ms));

// Pre-seeded Bookings for Clinic Management
const INITIAL_BOOKINGS: AdminBooking[] = [
  {
    id: 'BK-2026-8801',
    clientName: 'Aarav Malhotra',
    clientPhone: '+91 98112 34567',
    clientEmail: 'aarav.malhotra@techcorp.in',
    serviceId: 'vedic-kundli',
    serviceTitle: 'Complete Vedic Janam Kundli & Lifetime Destiny Map',
    consultationMode: 'video',
    preferredDate: '2026-08-24',
    preferredSlot: '11:30 AM - 12:30 PM (Morning Slot)',
    birthDetails: 'DOB: 1989-11-14 | TOB: 06:45 AM | POB: New Delhi, India',
    clientNotes: 'Seeking career transition guidance into global leadership and Shani Sade Sati timeline analysis.',
    status: 'pending',
    feeAmount: '₹3,500',
    paymentStatus: 'paid',
    assignedAstrologer: 'Dr. Preeti Sehgal',
    createdAt: '2026-08-23T08:15:00Z',
    clinicNotes: 'High priority client. Requested PDF chart printout.'
  },
  {
    id: 'BK-2026-8802',
    clientName: 'Pooja & Vikram Singhania',
    clientPhone: '+91 98710 99882',
    clientEmail: 'poojasingh89@gmail.com',
    serviceId: 'kundli-milan',
    serviceTitle: 'Ashtakoot Kundli Milan & Marriage Compatibility',
    consultationMode: 'in_person',
    preferredDate: '2026-08-25',
    preferredSlot: '04:00 PM - 05:00 PM (Evening)',
    birthDetails: 'Bride: 1993-04-12 Delhi | Groom: 1991-08-22 Jaipur',
    clientNotes: 'Manglik Dosha evaluation and Nadi Dosha cancellation remedies required for upcoming wedding.',
    status: 'confirmed',
    feeAmount: '₹4,100',
    paymentStatus: 'paid',
    assignedAstrologer: 'Dr. Preeti Sehgal',
    createdAt: '2026-08-22T14:30:00Z',
    clinicNotes: 'Scheduled in South Extension Delhi Chamber.'
  },
  {
    id: 'BK-2026-8803',
    clientName: 'Meera Deshmukh',
    clientPhone: '+91 98201 44556',
    clientEmail: 'meera.deshmukh@horizon.org',
    serviceId: 'lal-kitab',
    serviceTitle: 'Lal Kitab Customized Upay & Debt Dissolution',
    consultationMode: 'phone',
    preferredDate: '2026-08-24',
    preferredSlot: '02:30 PM - 03:30 PM (Afternoon)',
    birthDetails: 'DOB: 1984-07-03 | TOB: 18:20 PM | POB: Mumbai, Maharashtra',
    clientNotes: 'Recurrent business obstacles and ancestral Rin (Pitri Rin) remedies needed.',
    status: 'confirmed',
    feeAmount: '₹3,100',
    paymentStatus: 'paid',
    assignedAstrologer: 'Dr. Preeti Sehgal',
    createdAt: '2026-08-22T18:00:00Z'
  },
  {
    id: 'BK-2026-8804',
    clientName: 'Col. Sanjeev Bakshi (Retd.)',
    clientPhone: '+91 94191 88776',
    clientEmail: 'sanjeev.bakshi@defence.gov.in',
    serviceId: 'vastu-audit',
    serviceTitle: 'On-Site & Digital Commercial/Residential Vastu Audit',
    consultationMode: 'in_person',
    preferredDate: '2026-08-26',
    preferredSlot: '10:30 AM - 11:30 AM (Morning)',
    birthDetails: 'DOB: 1968-02-18 | TOB: 05:15 AM | POB: Chandigarh',
    clientNotes: 'New villa construction architectural blueprint review with zero-demolition energy grid alignment.',
    status: 'pending',
    feeAmount: '₹8,500',
    paymentStatus: 'paid',
    assignedAstrologer: 'Dr. Preeti Sehgal',
    createdAt: '2026-08-23T04:20:00Z'
  },
  {
    id: 'BK-2026-8805',
    clientName: 'Dr. Ananya Roy',
    clientPhone: '+91 98300 11223',
    clientEmail: 'ananya.roy@aiims.edu',
    serviceId: 'gemstone-consultation',
    serviceTitle: 'Planetary Gemstone & 1-14 Mukhi Rudraksha Prescription',
    consultationMode: 'video',
    preferredDate: '2026-08-21',
    preferredSlot: '06:00 PM - 07:00 PM (Evening)',
    birthDetails: 'DOB: 1992-09-28 | TOB: 12:10 PM | POB: Kolkata, West Bengal',
    clientNotes: 'Prescription for career focus & mental peace; Yellow Sapphire & 5-Mukhi Rudraksha analysis.',
    status: 'completed',
    feeAmount: '₹2,500',
    paymentStatus: 'paid',
    assignedAstrologer: 'Dr. Preeti Sehgal',
    createdAt: '2026-08-20T11:00:00Z',
    clinicNotes: 'Prescription report emailed & Yellow Sapphire certified ring dispatched.'
  },
  {
    id: 'BK-2026-8806',
    clientName: 'Rohan Oberoi',
    clientPhone: '+91 99100 55443',
    clientEmail: 'rohan.oberoi@venturecapital.com',
    serviceId: 'numerology',
    serviceTitle: 'Business & Personal Numerology / Brand Name Correction',
    consultationMode: 'video',
    preferredDate: '2026-08-27',
    preferredSlot: '07:00 PM - 08:00 PM (Night Special)',
    birthDetails: 'DOB: 1996-05-19 | POB: Gurugram, Haryana',
    clientNotes: 'Startup trademark name calculation on Chaldean Pythagorean compound number grid.',
    status: 'pending',
    feeAmount: '₹3,500',
    paymentStatus: 'unpaid',
    assignedAstrologer: 'Dr. Preeti Sehgal',
    createdAt: '2026-08-23T07:45:00Z'
  },
  {
    id: 'BK-2026-8807',
    clientName: 'Sneha Kapoor',
    clientPhone: '+91 98101 22334',
    clientEmail: 'sneha.k@designstudio.in',
    serviceId: 'tarot',
    serviceTitle: '3-Card Vedic & Rider-Waite Intuitive Tarot Session',
    consultationMode: 'video',
    preferredDate: '2026-08-20',
    preferredSlot: '04:00 PM - 05:00 PM (Evening)',
    birthDetails: 'DOB: 1998-12-05 | POB: Noida, UP',
    clientNotes: 'Creative block and relationship crossroad clarity.',
    status: 'completed',
    feeAmount: '₹2,100',
    paymentStatus: 'paid',
    assignedAstrologer: 'Dr. Preeti Sehgal',
    createdAt: '2026-08-19T16:20:00Z'
  }
];

// Pre-seeded Kundli Engine Logs
const INITIAL_KUNDLI_LOGS: KundliEngineLog[] = [
  {
    id: 'LOG-KND-901',
    nativeName: 'Vikas Gupta',
    gender: 'Male',
    dob: '1992-06-15',
    tob: '08:30',
    pob: 'Delhi, India',
    ascendant: 'Cancer (Kark)',
    moonSign: 'Scorpio (Vrishchik)',
    sunSign: 'Gemini (Mithun)',
    nakshatra: 'Anuradha',
    manglikStatus: 'Partial Manglik (12th House Mars)',
    isManglik: true,
    sadeSatiStatus: 'Dhaiya Active (Kantaka Shani)',
    hasSadeSati: true,
    kaalSarpStatus: 'No Kaal Sarp',
    hasKaalSarp: false,
    hasPitriRin: true,
    calculatedAt: new Date(Date.now() - 1000 * 60 * 18).toISOString(),
    source: 'web_visualizer'
  },
  {
    id: 'LOG-KND-902',
    nativeName: 'Ananya Sharma',
    gender: 'Female',
    dob: '1996-03-22',
    tob: '14:15',
    pob: 'Mumbai, India',
    ascendant: 'Leo (Simha)',
    moonSign: 'Aries (Mesh)',
    sunSign: 'Pisces (Meen)',
    nakshatra: 'Ashwini',
    manglikStatus: 'Anshik Manglik (1st House Mars)',
    isManglik: true,
    sadeSatiStatus: 'Peak Sade Sati (Janma Shani)',
    hasSadeSati: true,
    kaalSarpStatus: 'Anant Kaal Sarp Yoga',
    hasKaalSarp: true,
    hasKemdrum: false,
    calculatedAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    source: 'web_visualizer'
  },
  {
    id: 'LOG-KND-903',
    nativeName: 'Rohan Verma',
    gender: 'Male',
    dob: '1988-10-09',
    tob: '23:45',
    pob: 'Jaipur, Rajasthan',
    ascendant: 'Gemini (Mithun)',
    moonSign: 'Libra (Tula)',
    sunSign: 'Virgo (Kanya)',
    nakshatra: 'Swati',
    manglikStatus: 'Non-Manglik',
    isManglik: false,
    sadeSatiStatus: 'Sade Sati Free',
    hasSadeSati: false,
    kaalSarpStatus: 'No Kaal Sarp',
    hasKaalSarp: false,
    calculatedAt: new Date(Date.now() - 1000 * 60 * 110).toISOString(),
    source: 'web_visualizer'
  },
  {
    id: 'LOG-KND-904',
    nativeName: 'Kavita Patel',
    gender: 'Female',
    dob: '1994-01-30',
    tob: '05:10',
    pob: 'Ahmedabad, Gujarat',
    ascendant: 'Sagittarius (Dhanu)',
    moonSign: 'Leo (Simha)',
    sunSign: 'Capricorn (Makar)',
    nakshatra: 'Magha',
    manglikStatus: 'High Manglik (7th House Mars)',
    isManglik: true,
    sadeSatiStatus: 'Setting Sade Sati (Ootati)',
    hasSadeSati: true,
    kaalSarpStatus: 'Kulik Kaal Sarp Yoga',
    hasKaalSarp: true,
    calculatedAt: new Date(Date.now() - 1000 * 60 * 190).toISOString(),
    source: 'web_visualizer'
  },
  {
    id: 'LOG-KND-905',
    nativeName: 'Aditya Sen',
    gender: 'Male',
    dob: '1990-12-14',
    tob: '19:20',
    pob: 'Kolkata, West Bengal',
    ascendant: 'Taurus (Vrishabh)',
    moonSign: 'Aquarius (Kumbh)',
    sunSign: 'Scorpio (Vrishchik)',
    nakshatra: 'Shatabhisha',
    manglikStatus: 'Non-Manglik',
    isManglik: false,
    sadeSatiStatus: 'Peak Sade Sati (Janma Shani)',
    hasSadeSati: true,
    kaalSarpStatus: 'No Kaal Sarp',
    hasKaalSarp: false,
    hasKemdrum: true,
    calculatedAt: new Date(Date.now() - 1000 * 60 * 270).toISOString(),
    source: 'web_visualizer'
  },
  {
    id: 'LOG-KND-906',
    nativeName: 'Natasha Kapoor',
    gender: 'Female',
    dob: '1997-08-04',
    tob: '11:05',
    pob: 'Bengaluru, Karnataka',
    ascendant: 'Virgo (Kanya)',
    moonSign: 'Cancer (Kark)',
    sunSign: 'Cancer (Kark)',
    nakshatra: 'Pushya',
    manglikStatus: 'Partial Manglik (8th House Mars)',
    isManglik: true,
    sadeSatiStatus: 'Sade Sati Free',
    hasSadeSati: false,
    kaalSarpStatus: 'Vasuki Kaal Sarp Yoga',
    hasKaalSarp: true,
    calculatedAt: new Date(Date.now() - 1000 * 60 * 380).toISOString(),
    source: 'web_visualizer'
  }
];

class AdminService {
  // ----------------------------------------------------
  // 1. AUTHENTICATION & SESSION
  // ----------------------------------------------------

  async login(email: string, password: string): Promise<AdminSession> {
    await delay(350);
    const cleanEmail = email.trim().toLowerCase();
    const admin = AUTHORIZED_ADMINS.find(
      (a) => a.email.toLowerCase() === cleanEmail && a.passwordHash === password
    );

    if (!admin) {
      throw new Error('Invalid Administrator credentials. Please verify your email and password.');
    }

    const sessionUser: AdminUser = {
      id: admin.id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
      title: admin.title,
      avatar: admin.avatar,
      lastLogin: new Date().toISOString()
    };

    const token = `v_adm_${Math.random().toString(36).substring(2)}_${Date.now()}`;
    const expiresAt = Date.now() + 4 * 60 * 60 * 1000; // 4 hour token lifetime
    const session: AdminSession = {
      user: sessionUser,
      token,
      expiresAt,
      loginTimestamp: Date.now()
    };

    // Store session in sessionStorage
    try {
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
    } catch {
      // ignore
    }

    return session;
  }

  getCurrentSession(): AdminSession | null {
    try {
      const raw = sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (!raw) return null;
      const session = JSON.parse(raw) as AdminSession;
      if (session.expiresAt && Date.now() > session.expiresAt) {
        this.logout();
        return null;
      }
      return session;
    } catch {
      return null;
    }
  }

  logout(): void {
    try {
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
    } catch {
      // ignore
    }
  }

  // ----------------------------------------------------
  // 2. CONSULTATION BOOKINGS MANAGEMENT
  // ----------------------------------------------------

  private getStoredBookings(): AdminBooking[] {
    try {
      const raw = localStorage.getItem(BOOKINGS_STORAGE_KEY);
      if (!raw) {
        localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(INITIAL_BOOKINGS));
        return INITIAL_BOOKINGS;
      }
      return JSON.parse(raw);
    } catch {
      return INITIAL_BOOKINGS;
    }
  }

  private saveBookings(bookings: AdminBooking[]): void {
    try {
      localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(bookings));
    } catch {
      // ignore
    }
  }

  getBookings(filter?: BookingFilter): AdminBooking[] {
    let list = this.getStoredBookings();

    if (filter?.status && filter.status !== 'all') {
      list = list.filter((b) => b.status === filter.status);
    }

    if (filter?.serviceId && filter.serviceId !== 'all') {
      list = list.filter((b) => b.serviceId === filter.serviceId);
    }

    if (filter?.mode && filter.mode !== 'all') {
      list = list.filter((b) => b.consultationMode === filter.mode);
    }

    if (filter?.search) {
      const q = filter.search.toLowerCase();
      list = list.filter(
        (b) =>
          b.clientName.toLowerCase().includes(q) ||
          b.clientPhone.includes(q) ||
          b.clientEmail.toLowerCase().includes(q) ||
          b.id.toLowerCase().includes(q) ||
          b.serviceTitle.toLowerCase().includes(q)
      );
    }

    return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  getBookingStats(): BookingStats {
    const list = this.getStoredBookings();
    const todayStr = new Date().toISOString().split('T')[0];

    return {
      totalBookings: list.length,
      pendingBookings: list.filter((b) => b.status === 'pending').length,
      confirmedBookings: list.filter((b) => b.status === 'confirmed').length,
      completedBookings: list.filter((b) => b.status === 'completed').length,
      cancelledBookings: list.filter((b) => b.status === 'cancelled').length,
      todayBookings: list.filter((b) => b.preferredDate === todayStr || b.createdAt.startsWith(todayStr)).length,
      videoAppointmentsCount: list.filter((b) => b.consultationMode === 'video' && b.status !== 'cancelled').length,
      inPersonChambersCount: list.filter((b) => b.consultationMode === 'in_person' && b.status !== 'cancelled').length
    };
  }

  updateBookingStatus(id: string, status: AdminBooking['status'], clinicNotes?: string): AdminBooking {
    const list = this.getStoredBookings();
    const idx = list.findIndex((b) => b.id === id);
    if (idx === -1) {
      throw new Error(`Booking with ID ${id} not found.`);
    }

    list[idx] = {
      ...list[idx],
      status,
      clinicNotes: clinicNotes !== undefined ? clinicNotes : list[idx].clinicNotes,
      updatedAt: new Date().toISOString()
    };

    this.saveBookings(list);
    return list[idx];
  }

  rescheduleBooking(id: string, newDate: string, newSlot: string, clinicNotes?: string): AdminBooking {
    const list = this.getStoredBookings();
    const idx = list.findIndex((b) => b.id === id);
    if (idx === -1) {
      throw new Error(`Booking with ID ${id} not found.`);
    }

    list[idx] = {
      ...list[idx],
      preferredDate: newDate,
      preferredSlot: newSlot,
      status: 'confirmed',
      clinicNotes: clinicNotes || `Rescheduled on ${new Date().toLocaleDateString()}: ${list[idx].clinicNotes || ''}`,
      updatedAt: new Date().toISOString()
    };

    this.saveBookings(list);
    return list[idx];
  }

  createBooking(booking: Omit<AdminBooking, 'id' | 'createdAt'>): AdminBooking {
    const list = this.getStoredBookings();
    const newId = `BK-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newBooking: AdminBooking = {
      ...booking,
      id: newId,
      createdAt: new Date().toISOString()
    };

    list.unshift(newBooking);
    this.saveBookings(list);
    return newBooking;
  }

  deleteBooking(id: string): boolean {
    let list = this.getStoredBookings();
    list = list.filter((b) => b.id !== id);
    this.saveBookings(list);
    return true;
  }

  // Method to record client booking from public BookingModal
  recordClientBooking(bookingData: Partial<AdminBooking>): void {
    try {
      const list = this.getStoredBookings();
      const newId = `BK-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      const service = SERVICES_DATA.find((s) => s.id === bookingData.serviceId) || SERVICES_DATA[0];
      
      const newBooking: AdminBooking = {
        id: newId,
        clientName: bookingData.clientName || 'Client Native',
        clientPhone: bookingData.clientPhone || '+91 99999 99999',
        clientEmail: bookingData.clientEmail || '',
        serviceId: bookingData.serviceId || 'lal-kitab',
        serviceTitle: service?.title || 'Vedic Astrology Consultation',
        consultationMode: bookingData.consultationMode || 'video',
        preferredDate: bookingData.preferredDate || new Date().toISOString().split('T')[0],
        preferredSlot: bookingData.preferredSlot || '11:30 AM - 12:30 PM (Morning Slot)',
        birthDetails: bookingData.birthDetails || 'Birth Coordinates Provided',
        clientNotes: bookingData.clientNotes || '',
        status: 'pending',
        feeAmount: '₹3,100',
        paymentStatus: 'paid',
        assignedAstrologer: 'Dr. Preeti Sehgal',
        createdAt: new Date().toISOString()
      };

      list.unshift(newBooking);
      this.saveBookings(list);
    } catch (e) {
      console.warn('Failed to record client booking to admin local storage', e);
    }
  }

  // ----------------------------------------------------
  // 3. KUNDLI LOGS & DOSHA ANALYTICS
  // ----------------------------------------------------

  private getStoredKundliLogs(): KundliEngineLog[] {
    try {
      const raw = localStorage.getItem(KUNDLI_LOGS_STORAGE_KEY);
      if (!raw) {
        localStorage.setItem(KUNDLI_LOGS_STORAGE_KEY, JSON.stringify(INITIAL_KUNDLI_LOGS));
        return INITIAL_KUNDLI_LOGS;
      }
      return JSON.parse(raw);
    } catch {
      return INITIAL_KUNDLI_LOGS;
    }
  }

  logKundliCalculation(data: {
    fullName: string;
    gender?: string;
    dob: string;
    tob: string;
    pob: string;
    ascendant: string;
    moonSign: string;
    sunSign: string;
    nakshatra: string;
    manglikStatus: string;
    sadeSatiStatus: string;
    kaalSarpStatus: string;
  }): void {
    try {
      const logs = this.getStoredKundliLogs();
      const isManglik = !data.manglikStatus.toLowerCase().includes('non-manglik') && !data.manglikStatus.toLowerCase().includes('no manglik');
      const hasSadeSati = !data.sadeSatiStatus.toLowerCase().includes('free') && !data.sadeSatiStatus.toLowerCase().includes('no sade');
      const hasKaalSarp = !data.kaalSarpStatus.toLowerCase().includes('no kaal sarp');

      const newLog: KundliEngineLog = {
        id: `LOG-KND-${Math.floor(1000 + Math.random() * 9000)}`,
        nativeName: data.fullName || 'Anonymous Native',
        gender: data.gender || 'Not Specified',
        dob: data.dob,
        tob: data.tob,
        pob: data.pob,
        ascendant: data.ascendant,
        moonSign: data.moonSign,
        sunSign: data.sunSign,
        nakshatra: data.nakshatra,
        manglikStatus: data.manglikStatus,
        isManglik,
        sadeSatiStatus: data.sadeSatiStatus,
        hasSadeSati,
        kaalSarpStatus: data.kaalSarpStatus,
        hasKaalSarp,
        calculatedAt: new Date().toISOString(),
        source: 'web_visualizer'
      };

      logs.unshift(newLog);
      // Keep last 100 logs in local storage
      const trimmed = logs.slice(0, 100);
      localStorage.setItem(KUNDLI_LOGS_STORAGE_KEY, JSON.stringify(trimmed));
    } catch (e) {
      console.warn('Failed to log kundli calculation', e);
    }
  }

  getKundliLogs(searchTerm?: string): KundliEngineLog[] {
    let logs = this.getStoredKundliLogs();
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      logs = logs.filter(
        (l) =>
          l.nativeName.toLowerCase().includes(q) ||
          l.pob.toLowerCase().includes(q) ||
          l.ascendant.toLowerCase().includes(q) ||
          l.moonSign.toLowerCase().includes(q) ||
          l.manglikStatus.toLowerCase().includes(q) ||
          l.sadeSatiStatus.toLowerCase().includes(q)
      );
    }
    return logs;
  }

  getKundliAnalytics(): KundliAnalyticsSummary {
    const logs = this.getStoredKundliLogs();
    const total = logs.length;
    if (total === 0) {
      return {
        totalCalculated: 0,
        todayCalculated: 0,
        manglikPercentage: 0,
        sadeSatiPercentage: 0,
        kaalSarpPercentage: 0,
        pitriRinPercentage: 0,
        topAscendants: [],
        topCities: [],
        dailyTrend: []
      };
    }

    const todayStr = new Date().toISOString().split('T')[0];
    const todayCount = logs.filter((l) => l.calculatedAt.startsWith(todayStr)).length;

    const manglikCount = logs.filter((l) => l.isManglik).length;
    const sadeSatiCount = logs.filter((l) => l.hasSadeSati).length;
    const kaalSarpCount = logs.filter((l) => l.hasKaalSarp).length;
    const pitriCount = logs.filter((l) => l.hasPitriRin).length;

    // Ascendant distributions
    const ascCounts: Record<string, number> = {};
    logs.forEach((l) => {
      const cleanAsc = l.ascendant.split('(')[0].trim();
      ascCounts[cleanAsc] = (ascCounts[cleanAsc] || 0) + 1;
    });

    const topAscendants = Object.entries(ascCounts)
      .map(([name, count]) => ({
        name,
        count,
        percentage: Math.round((count / total) * 100)
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);

    // City distributions
    const cityCounts: Record<string, number> = {};
    logs.forEach((l) => {
      const city = l.pob.split(',')[0].trim();
      cityCounts[city] = (cityCounts[city] || 0) + 1;
    });

    const topCities = Object.entries(cityCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // 7-day trend
    const dailyTrend = [
      { date: '17 Aug', count: 18 },
      { date: '18 Aug', count: 24 },
      { date: '19 Aug', count: 29 },
      { date: '20 Aug', count: 35 },
      { date: '21 Aug', count: 42 },
      { date: '22 Aug', count: 51 },
      { date: 'Today', count: Math.max(todayCount, 16) }
    ];

    return {
      totalCalculated: total + 246, // Include historic aggregate for high-volume realism
      todayCalculated: Math.max(todayCount, 16),
      manglikPercentage: Math.round((manglikCount / total) * 100),
      sadeSatiPercentage: Math.round((sadeSatiCount / total) * 100),
      kaalSarpPercentage: Math.round((kaalSarpCount / total) * 100),
      pitriRinPercentage: Math.round((pitriCount / total) * 100 || 22),
      topAscendants,
      topCities,
      dailyTrend
    };
  }

  // ----------------------------------------------------
  // 4. LAL KITAB CONTENT MANAGEMENT (CRUD)
  // ----------------------------------------------------

  getLalKitabRemedies(): LalKitabRemedy[] {
    try {
      const raw = localStorage.getItem(LAL_KITAB_STORAGE_KEY);
      if (!raw) {
        localStorage.setItem(LAL_KITAB_STORAGE_KEY, JSON.stringify(LAL_KITAB_REMEDIES_DATA));
        return LAL_KITAB_REMEDIES_DATA;
      }
      return JSON.parse(raw);
    } catch {
      return LAL_KITAB_REMEDIES_DATA;
    }
  }

  saveLalKitabRemedy(remedy: LalKitabRemedy): LalKitabRemedy {
    const list = this.getLalKitabRemedies();
    const idx = list.findIndex((r) => r.id === remedy.id);

    if (idx >= 0) {
      list[idx] = remedy;
    } else {
      list.unshift(remedy);
    }

    localStorage.setItem(LAL_KITAB_STORAGE_KEY, JSON.stringify(list));
    return remedy;
  }

  deleteLalKitabRemedy(id: string): boolean {
    let list = this.getLalKitabRemedies();
    list = list.filter((r) => r.id !== id);
    localStorage.setItem(LAL_KITAB_STORAGE_KEY, JSON.stringify(list));
    return true;
  }

  resetLalKitabRemedies(): LalKitabRemedy[] {
    localStorage.setItem(LAL_KITAB_STORAGE_KEY, JSON.stringify(LAL_KITAB_REMEDIES_DATA));
    return LAL_KITAB_REMEDIES_DATA;
  }

  // ----------------------------------------------------
  // 5. VASTU SHASTRA CONTENT MANAGEMENT (CRUD)
  // ----------------------------------------------------

  getVastuRules(): VastuDirectionRule[] {
    try {
      const raw = localStorage.getItem(VASTU_STORAGE_KEY);
      if (!raw) {
        localStorage.setItem(VASTU_STORAGE_KEY, JSON.stringify(INITIAL_VASTU_RULES));
        return INITIAL_VASTU_RULES;
      }
      return JSON.parse(raw);
    } catch {
      return INITIAL_VASTU_RULES;
    }
  }

  saveVastuRule(rule: VastuDirectionRule): VastuDirectionRule {
    const list = this.getVastuRules();
    const idx = list.findIndex((z) => z.id === rule.id);

    if (idx >= 0) {
      list[idx] = rule;
    } else {
      list.push(rule);
    }

    localStorage.setItem(VASTU_STORAGE_KEY, JSON.stringify(list));
    return rule;
  }

  resetVastuRules(): VastuDirectionRule[] {
    localStorage.setItem(VASTU_STORAGE_KEY, JSON.stringify(INITIAL_VASTU_RULES));
    return INITIAL_VASTU_RULES;
  }

  // ----------------------------------------------------
  // 6. CLINIC SETTINGS & EXPORTS
  // ----------------------------------------------------

  getClinicSettings() {
    try {
      const raw = localStorage.getItem(CLINIC_SETTINGS_KEY);
      if (raw) return JSON.parse(raw);
    } catch {
      // ignore
    }

    return {
      clinicName: 'Dr. Preeti Sehgal Astro & Vastu Research Centre',
      helplinePhone: DOCTOR_INFO.primaryPhone,
      whatsappNumber: DOCTOR_INFO.whatsappNumber,
      contactEmail: DOCTOR_INFO.email,
      primaryChamber: DOCTOR_INFO.addresses[0].line1 + ', ' + DOCTOR_INFO.addresses[0].line2,
      secondaryChamber: DOCTOR_INFO.addresses[1].line1 + ', ' + DOCTOR_INFO.addresses[1].line2,
      consultationHours: DOCTOR_INFO.addresses[0].timings,
      emergencyNotice: 'For urgent Muhurat or health questions, WhatsApp direct line is monitored 24x7.',
      autoApproveOfflineBookings: false,
      enableInactivityTimeout: true,
      inactivityTimeoutMinutes: 30
    };
  }

  saveClinicSettings(settings: any) {
    localStorage.setItem(CLINIC_SETTINGS_KEY, JSON.stringify(settings));
    return settings;
  }

  exportAllDataBackup(): string {
    const backup = {
      exportedAt: new Date().toISOString(),
      version: '1.2.0-vedic-corp',
      bookings: this.getStoredBookings(),
      kundliLogs: this.getStoredKundliLogs(),
      lalKitabRemedies: this.getLalKitabRemedies(),
      vastuRules: this.getVastuRules(),
      clinicSettings: this.getClinicSettings()
    };
    return JSON.stringify(backup, null, 2);
  }
}

export const adminService = new AdminService();
