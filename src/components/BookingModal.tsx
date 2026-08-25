import React, { useState, useEffect } from 'react';
import { SERVICES_DATA, DOCTOR_INFO } from '../data/brandData';
import { ConsultationMode, BookingFormState } from '../types';
import { useUserProfile } from '../context/UserProfileContext';
import { LocationAutocomplete } from './LocationAutocomplete';
import { db, auth } from '../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { adminService } from '../services/adminService';
import { createGoogleMeetSpace } from '../services/googleMeetService';
import { downloadBookingReceiptPDF, BookingReceiptData } from '../utils/bookingReceiptGenerator';
import { 
  X, 
  Video, 
  Phone, 
  MapPin, 
  FileText, 
  CheckCircle2, 
  MessageCircle, 
  Sparkles, 
  Download, 
  Calendar, 
  Clock, 
  User, 
  Copy, 
  Check, 
  Printer,
  ShieldCheck,
  VideoIcon,
  ExternalLink
} from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialServiceId?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialServiceId
}) => {
  const { profile, hasCustomProfile } = useUserProfile();

  const [formState, setFormState] = useState<BookingFormState>({
    fullName: profile.fullName || '',
    phone: profile.phone || '',
    email: profile.email || '',
    dob: profile.dob || '1995-01-01',
    tob: profile.tob || '10:00',
    pob: profile.pob || 'Delhi, India',
    serviceId: initialServiceId || 'lal-kitab',
    mode: 'video',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    timeSlot: '11:30 AM - 12:30 PM (Morning Slot)',
    specificConcerns: ''
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [confirmedBookingData, setConfirmedBookingData] = useState<BookingReceiptData | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [hasCopiedRef, setHasCopiedRef] = useState(false);

  // Keep form state in sync whenever modal opens or profile changes
  useEffect(() => {
    if (isOpen && profile) {
      setFormState((prev) => ({
        ...prev,
        fullName: prev.fullName || profile.fullName || '',
        phone: prev.phone || profile.phone || '',
        email: prev.email || profile.email || '',
        dob: profile.dob || prev.dob,
        tob: profile.tob || prev.tob,
        pob: profile.pob || prev.pob,
        serviceId: initialServiceId || prev.serviceId
      }));
    }
  }, [isOpen, profile, initialServiceId]);

  // Reset success state on modal close
  useEffect(() => {
    if (!isOpen) {
      setIsSuccess(false);
      setConfirmedBookingData(null);
      setIsDownloading(false);
      setHasCopiedRef(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const timeSlots = [
    '10:30 AM - 11:30 AM (Morning)',
    '11:30 AM - 12:30 PM (Morning)',
    '02:30 PM - 03:30 PM (Afternoon)',
    '04:00 PM - 05:00 PM (Evening)',
    '06:00 PM - 07:00 PM (Evening)',
    '07:00 PM - 08:00 PM (Night Special)'
  ];

  const handleModeSelect = (mode: ConsultationMode) => {
    setFormState({ ...formState, mode });
  };

  const selectedService = SERVICES_DATA.find((s) => s.id === formState.serviceId) || SERVICES_DATA[0];

  const handleDownloadPDF = () => {
    if (!confirmedBookingData) return;
    setIsDownloading(true);
    try {
      downloadBookingReceiptPDF(confirmedBookingData);
    } catch (err) {
      console.error('Error generating PDF receipt:', err);
    } finally {
      setTimeout(() => setIsDownloading(false), 800);
    }
  };

  const handleCopyRef = (refId: string) => {
    navigator.clipboard.writeText(refId);
    setHasCopiedRef(true);
    setTimeout(() => setHasCopiedRef(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.fullName || !formState.phone) return;

    const uniqueIdSuffix = Math.floor(1000 + Math.random() * 9000);
    const bookingRefId = `DPS-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}-${uniqueIdSuffix}`;
    const fullBookingId = `book_${Date.now()}_${uniqueIdSuffix}`;

    let generatedMeetLink = '';
    if (formState.mode === 'video') {
      try {
        const meetSession = await createGoogleMeetSpace(`${selectedService.title} - ${formState.fullName}`);
        generatedMeetLink = meetSession.joinUrl;
      } catch (e) {
        console.warn('Google Meet space generated with default room:', e);
      }
    }

    const receiptPayload: BookingReceiptData = {
      bookingId: bookingRefId,
      clientName: formState.fullName.trim(),
      clientPhone: formState.phone.trim(),
      clientEmail: formState.email.trim(),
      dob: formState.dob,
      tob: formState.tob,
      pob: formState.pob,
      serviceId: formState.serviceId,
      serviceTitle: selectedService.title,
      consultationMode: formState.mode,
      preferredDate: formState.date,
      preferredSlot: formState.timeSlot,
      clientNotes: formState.specificConcerns || '',
      meetLink: generatedMeetLink || undefined,
      feeAmount: selectedService.priceNote || '₹3,500',
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    setConfirmedBookingData(receiptPayload);

    // Save booking to Firestore if available
    try {
      const uid = auth.currentUser?.uid || 'guest_client';
      const bookingDocRef = doc(db, 'bookings', fullBookingId);
      
      const payload = {
        userId: uid,
        bookingRef: bookingRefId,
        serviceId: formState.serviceId.slice(0, 50),
        serviceTitle: selectedService.title.slice(0, 120),
        consultationType: formState.mode.slice(0, 50),
        preferredDate: formState.date.slice(0, 25),
        preferredSlot: formState.timeSlot.slice(0, 30),
        clientName: formState.fullName.trim().slice(0, 100),
        clientPhone: formState.phone.trim().slice(0, 25),
        clientEmail: formState.email ? formState.email.trim().slice(0, 150) : '',
        birthDetails: `DOB: ${formState.dob} | TOB: ${formState.tob} | POB: ${formState.pob}`.slice(0, 250),
        clientNotes: (formState.specificConcerns || 'General Consultation').slice(0, 1000),
        meetLink: generatedMeetLink || '',
        status: 'pending',
        createdAt: new Date().toISOString(),
      };

      if (auth.currentUser) {
        await setDoc(bookingDocRef, payload);
      }

      // Also persist to local admin database
      adminService.createBooking({
        clientName: formState.fullName.trim(),
        clientPhone: formState.phone.trim(),
        clientEmail: formState.email.trim(),
        serviceId: formState.serviceId,
        serviceTitle: selectedService.title,
        consultationMode: formState.mode,
        preferredDate: formState.date,
        preferredSlot: formState.timeSlot,
        birthDetails: `DOB: ${formState.dob} | TOB: ${formState.tob} | POB: ${formState.pob}`,
        clientNotes: formState.specificConcerns || 'General Consultation',
        meetLink: generatedMeetLink || undefined,
        feeAmount: selectedService.priceNote || '₹3,500',
        paymentStatus: 'paid',
        status: 'pending',
        assignedAstrologer: 'Dr. Preeti Sehgal'
      });
    } catch (err: any) {
      console.warn('Booking stored locally / error writing to Firestore:', err);
    }

    const message = `*🌟 New Astrology Consultation Appointment Request 🌟*
*Reference ID:* ${bookingRefId}
*Client Name:* ${formState.fullName}
*Phone:* ${formState.phone}
*Email:* ${formState.email || 'N/A'}
*Service:* ${selectedService.title}
*Preferred Mode:* ${formState.mode.toUpperCase()}${generatedMeetLink ? `\n*Google Meet Link:* ${generatedMeetLink}` : ''}
*Date:* ${formState.date}
*Time Slot:* ${formState.timeSlot}
*Birth Date:* ${formState.dob}
*Birth Time:* ${formState.tob}
*Birth Place:* ${formState.pob}
*Specific Concern:* ${formState.specificConcerns || 'General Lifetime Forecast'}`;

    window.open(`https://wa.me/${DOCTOR_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#FFF9F2]/95 backdrop-blur-2xl text-[#7C2D12] rounded-3xl border border-orange-200/90 max-w-2xl w-full p-6 sm:p-8 shadow-2xl shadow-orange-950/20 relative max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-[#9A3412] hover:text-[#7C2D12] hover:bg-orange-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-4 space-y-5 animate-in zoom-in-95 duration-200 text-left">
            
            {/* Top Success Icon & Heading */}
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-300 flex items-center justify-center text-emerald-600 mx-auto shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h3 className="font-playfair text-2xl font-bold text-[#7C2D12]">
                Appointment Request Confirmed!
              </h3>

              <p className="text-[#9A3412] text-xs sm:text-sm max-w-md mx-auto leading-relaxed font-light">
                Namaste <strong className="text-[#7C2D12] font-semibold">{formState.fullName}</strong>. Your consultation has been recorded and transmitted to Dr. Preeti Sehgal's chamber desk.
              </p>
            </div>

            {/* Reference Token Badge */}
            {confirmedBookingData?.bookingId && (
              <div className="flex items-center justify-between bg-orange-100/70 border border-orange-300/80 rounded-2xl px-4 py-2.5 max-w-md mx-auto">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#EA580C]" />
                  <span className="text-[11px] font-semibold text-[#7C2D12] uppercase tracking-wider">Booking Ref:</span>
                  <span className="font-mono text-xs font-bold text-[#EA580C]">{confirmedBookingData.bookingId}</span>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopyRef(confirmedBookingData.bookingId || '')}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#9A3412] hover:text-[#7C2D12] bg-white/80 hover:bg-white px-2.5 py-1 rounded-lg border border-orange-200 transition-all cursor-pointer shadow-2xs"
                  title="Copy Reference Code"
                >
                  {hasCopiedRef ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-600" />
                      <span className="text-emerald-700">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Structured Appointment Summary Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/90 border border-orange-200/90 shadow-sm text-xs text-[#7C2D12] space-y-3 max-w-lg mx-auto">
              <div className="flex items-center justify-between pb-2 border-b border-orange-100">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-orange-100 flex items-center justify-center text-[#EA580C]">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold text-[#9A3412] tracking-wider">Selected Service</div>
                    <div className="font-bold text-sm text-[#7C2D12]">{selectedService.title}</div>
                  </div>
                </div>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700">
                  Confirmed
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-[11px]">
                <div className="bg-orange-50/50 p-2 rounded-xl border border-orange-100/80">
                  <span className="text-[10px] text-stone-500 font-medium block">Date & Time Slot:</span>
                  <span className="font-bold text-stone-800">{formState.date}</span>
                  <span className="text-stone-600 block text-[10px]">{formState.timeSlot}</span>
                </div>

                <div className="bg-orange-50/50 p-2 rounded-xl border border-orange-100/80">
                  <span className="text-[10px] text-stone-500 font-medium block">Consultation Mode:</span>
                  <span className="font-bold text-[#EA580C] uppercase tracking-wide">{formState.mode}</span>
                  <span className="text-stone-600 block text-[10px]">
                    {formState.mode === 'video' ? 'Zoom/Meet Video Call' : formState.mode === 'in_person' ? 'Delhi Chamber Visit' : formState.mode === 'phone' ? 'Direct Calling' : 'Written Report'}
                  </span>
                </div>

                <div className="bg-orange-50/50 p-2 rounded-xl border border-orange-100/80">
                  <span className="text-[10px] text-stone-500 font-medium block">Client Name & Phone:</span>
                  <span className="font-bold text-stone-800">{formState.fullName}</span>
                  <span className="text-stone-600 block text-[10px]">{formState.phone}</span>
                </div>

                <div className="bg-orange-50/50 p-2 rounded-xl border border-orange-100/80">
                  <span className="text-[10px] text-stone-500 font-medium block">Birth Coordinates:</span>
                  <span className="font-bold text-stone-800">{formState.dob} ({formState.tob})</span>
                  <span className="text-stone-600 block text-[10px] truncate">{formState.pob}</span>
                </div>
              </div>

              {/* Google Meet Link if Video Mode */}
              {confirmedBookingData?.meetLink && (
                <div className="bg-emerald-50 border border-emerald-300/80 p-3 rounded-2xl flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-emerald-600 flex items-center justify-center text-white shrink-0">
                      <Video className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">Google Meet Video Chamber</div>
                      <div className="text-xs font-mono font-bold text-emerald-950 truncate max-w-[210px] sm:max-w-xs">{confirmedBookingData.meetLink}</div>
                    </div>
                  </div>
                  <a
                    href={confirmedBookingData.meetLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-sm transition-transform active:scale-95 shrink-0"
                  >
                    <span>Join Room</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}

              <div className="pt-2 border-t border-orange-100 flex items-center justify-between text-[11px] text-[#9A3412]">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Assigned Astrologer: <strong className="text-[#7C2D12]">Dr. Preeti Sehgal</strong></span>
                </div>
                <span>Helpline: <strong>{DOCTOR_INFO.primaryPhone}</strong></span>
              </div>
            </div>

            {/* ACTION BUTTONS (PDF Download + WhatsApp + Close) */}
            <div className="pt-2 max-w-lg mx-auto space-y-2.5">
              
              {/* PRIMARY ACTION: Download PDF Summary */}
              <button
                type="button"
                onClick={handleDownloadPDF}
                disabled={isDownloading}
                className="w-full inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#EA580C] to-[#C2410C] hover:from-[#C2410C] hover:to-[#9A3412] text-white px-5 py-3.5 rounded-2xl font-bold text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-orange-950/20 active:scale-[0.99] disabled:opacity-75"
              >
                {isDownloading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Generating Official PDF Slip...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 text-white" />
                    <span>Download Consultation Summary (PDF)</span>
                  </>
                )}
              </button>

              {/* SECONDARY ROW: WhatsApp Desk & Close */}
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    const message = `*Consultation Booking Ref:* ${confirmedBookingData?.bookingId || 'New Booking'}
*Client:* ${formState.fullName} (${formState.phone})
*Service:* ${selectedService.title}
*Date & Slot:* ${formState.date} (${formState.timeSlot})
*Mode:* ${formState.mode.toUpperCase()}`;
                    window.open(`https://wa.me/${DOCTOR_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
                  }}
                  className="inline-flex items-center justify-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 px-4 py-2.5 rounded-xl font-semibold text-xs transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>WhatsApp Desk</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex items-center justify-center bg-orange-100/60 hover:bg-orange-100 text-[#7C2D12] border border-orange-200 px-4 py-2.5 rounded-xl font-semibold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Close Window
                </button>
              </div>

            </div>

          </div>
        ) : (
          <div>
            
            {/* Modal Header */}
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-1.5 border border-orange-300 bg-orange-50 px-3.5 py-1 rounded-full text-[11px] font-medium text-[#C2410C] tracking-[0.2em] uppercase mb-3 shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 text-[#F97316]" />
                  <span>Private Consultation Booking</span>
                </div>
                {hasCustomProfile && (
                  <div className="inline-flex items-center gap-1.5 text-[11px] text-emerald-800 bg-emerald-50 border border-emerald-300 px-2.5 py-0.5 rounded-full mb-3 font-medium">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>Autofilled from Profile ({profile.fullName})</span>
                  </div>
                )}
              </div>
              <h3 className="font-playfair text-2xl font-normal text-[#7C2D12]">
                Schedule Session with Dr. Preeti Sehgal
              </h3>
              <p className="text-xs text-[#9A3412] font-light mt-1">
                28+ Years Experienced Vedic Astrologer &bull; Delhi Chambers & Worldwide Video Calls
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Step 1: Select Service */}
              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-widest text-[#7C2D12] mb-1.5">
                  1. Select Astrological Service *
                </label>
                <select
                  value={formState.serviceId}
                  onChange={(e) => setFormState({ ...formState, serviceId: e.target.value })}
                  className="w-full bg-orange-50/40 border border-orange-200 rounded-xl px-3 py-2 text-xs text-[#7C2D12] focus:outline-none focus:border-[#F97316]"
                >
                  {SERVICES_DATA.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.title} ({s.hindiTitle}) - {s.duration}
                    </option>
                  ))}
                </select>
              </div>

              {/* Step 2: Consultation Mode */}
              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-widest text-[#7C2D12] mb-1.5">
                  2. Preferred Consultation Mode *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => handleModeSelect('video')}
                    className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                      formState.mode === 'video'
                        ? 'bg-[#F97316] text-white border-[#F97316] font-semibold shadow-sm'
                        : 'bg-orange-50/40 border-orange-200 text-[#9A3412] hover:border-orange-400 hover:text-[#7C2D12]'
                    }`}
                  >
                    <Video className="w-4 h-4 mb-1 text-inherit" />
                    <div className="font-medium text-[11px]">Zoom / Meet Video</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleModeSelect('in_person')}
                    className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                      formState.mode === 'in_person'
                        ? 'bg-[#F97316] text-white border-[#F97316] font-semibold shadow-sm'
                        : 'bg-orange-50/40 border-orange-200 text-[#9A3412] hover:border-orange-400 hover:text-[#7C2D12]'
                    }`}
                  >
                    <MapPin className="w-4 h-4 mb-1 text-inherit" />
                    <div className="font-medium text-[11px]">Delhi Chamber Visit</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleModeSelect('phone')}
                    className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                      formState.mode === 'phone'
                        ? 'bg-[#F97316] text-white border-[#F97316] font-semibold shadow-sm'
                        : 'bg-orange-50/40 border-orange-200 text-[#9A3412] hover:border-orange-400 hover:text-[#7C2D12]'
                    }`}
                  >
                    <Phone className="w-4 h-4 mb-1 text-inherit" />
                    <div className="font-medium text-[11px]">Direct Phone Call</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleModeSelect('report')}
                    className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                      formState.mode === 'report'
                        ? 'bg-[#F97316] text-white border-[#F97316] font-semibold shadow-sm'
                        : 'bg-orange-50/40 border-orange-200 text-[#9A3412] hover:border-orange-400 hover:text-[#7C2D12]'
                    }`}
                  >
                    <FileText className="w-4 h-4 mb-1 text-inherit" />
                    <div className="font-medium text-[11px]">Written PDF Report</div>
                  </button>
                </div>
              </div>

              {/* Step 3: Date & Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-widest text-[#7C2D12] mb-1.5">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formState.date}
                    onChange={(e) => setFormState({ ...formState, date: e.target.value })}
                    className="w-full bg-orange-50/40 border border-orange-200 rounded-xl px-3 py-2 text-xs text-[#7C2D12] focus:outline-none focus:border-[#F97316]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-widest text-[#7C2D12] mb-1.5">
                    Preferred Time Slot *
                  </label>
                  <select
                    value={formState.timeSlot}
                    onChange={(e) => setFormState({ ...formState, timeSlot: e.target.value })}
                    className="w-full bg-orange-50/40 border border-orange-200 rounded-xl px-3 py-2 text-xs text-[#7C2D12] focus:outline-none focus:border-[#F97316]"
                  >
                    {timeSlots.map((ts, i) => (
                      <option key={i} value={ts}>{ts}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Step 4: Personal Particulars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-widest text-[#7C2D12] mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.fullName}
                    onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
                    placeholder="e.g. Anjali Gupta"
                    className="w-full bg-orange-50/40 border border-orange-200 rounded-xl px-3 py-2 text-xs text-[#7C2D12] placeholder:text-orange-900/40 focus:outline-none focus:border-[#F97316]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-widest text-[#7C2D12] mb-1.5">
                    WhatsApp Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formState.phone}
                    onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                    placeholder="+91 98100 XXXXX"
                    className="w-full bg-orange-50/40 border border-orange-200 rounded-xl px-3 py-2 text-xs text-[#7C2D12] placeholder:text-orange-900/40 focus:outline-none focus:border-[#F97316]"
                  />
                </div>
              </div>

              {/* Step 5: Birth Details for Chart Calculation */}
              <div className="p-3.5 rounded-xl bg-orange-50/70 border border-orange-200 space-y-2">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-[#F97316] block">
                  Birth Particulars for Kundli Verification:
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-[9px] uppercase tracking-wider text-[#7C2D12] mb-1 font-medium">Date of Birth</label>
                    <input
                      type="date"
                      value={formState.dob}
                      onChange={(e) => setFormState({ ...formState, dob: e.target.value })}
                      className="w-full bg-white border border-orange-200 rounded-lg px-2 py-1 text-xs text-[#7C2D12]"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] uppercase tracking-wider text-[#7C2D12] mb-1 font-medium">Time of Birth</label>
                    <input
                      type="time"
                      value={formState.tob}
                      onChange={(e) => setFormState({ ...formState, tob: e.target.value })}
                      className="w-full bg-white border border-orange-200 rounded-lg px-2 py-1 text-xs text-[#7C2D12]"
                    />
                  </div>
                  <div className="col-span-1 sm:col-span-1">
                    <LocationAutocomplete
                      id="booking-pob-autocomplete"
                      value={formState.pob}
                      onChange={(val, loc) => {
                        setFormState(prev => ({
                          ...prev,
                          pob: val,
                          lat: loc ? loc.lat : prev.lat,
                          lng: loc ? loc.lng : prev.lng,
                          timezone: loc ? loc.timezone : prev.timezone
                        }));
                      }}
                      onSelectLocation={(loc) => {
                        setFormState(prev => ({
                          ...prev,
                          lat: loc.lat,
                          lng: loc.lng,
                          timezone: loc.timezone
                        }));
                      }}
                      placeholder="City..."
                      label="Place of Birth"
                      compact={true}
                      showIcon={false}
                      inputClassName="bg-white px-2 py-1 text-xs text-[#7C2D12] border-orange-200 rounded-lg"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-widest text-[#7C2D12] mb-1.5">
                  Key Question or Dilemma (Optional)
                </label>
                <input
                  type="text"
                  value={formState.specificConcerns}
                  onChange={(e) => setFormState({ ...formState, specificConcerns: e.target.value })}
                  placeholder="e.g., Marriage delay remedies, Career timing, Vastu balance..."
                  className="w-full bg-orange-50/40 border border-orange-200 rounded-xl px-3 py-2 text-xs text-[#7C2D12] placeholder:text-orange-900/40 focus:outline-none focus:border-[#F97316]"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#F97316] hover:bg-[#EA580C] text-white font-semibold text-xs uppercase tracking-wider py-3.5 rounded-xl shadow-md transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-white" />
                  <span>Confirm Slot & Sync on WhatsApp</span>
                </button>
              </div>

            </form>

          </div>
        )}

      </div>
    </div>
  );
};
