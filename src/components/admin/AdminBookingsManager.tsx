import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AdminBooking, BookingFilter, ConsultationMode } from '../../types';
import { SERVICES_DATA, DOCTOR_INFO } from '../../data/brandData';
import { downloadBookingReceiptPDF } from '../../utils/bookingReceiptGenerator';
import { 
  Search, 
  Filter, 
  Calendar, 
  Clock, 
  Video, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  FileText, 
  Download, 
  Plus, 
  MoreVertical, 
  ChevronDown, 
  CalendarDays, 
  Sparkles, 
  User, 
  MessageCircle, 
  ExternalLink,
  Edit3,
  Trash2,
  Share2,
  X
} from 'lucide-react';

interface AdminBookingsManagerProps {
  bookings: AdminBooking[];
  onUpdateStatus: (id: string, status: AdminBooking['status'], clinicNotes?: string) => void;
  onReschedule: (id: string, newDate: string, newSlot: string, clinicNotes?: string) => void;
  onCreateBooking: (booking: Omit<AdminBooking, 'id' | 'createdAt'>) => void;
  onDeleteBooking: (id: string) => void;
}

export const AdminBookingsManager: React.FC<AdminBookingsManagerProps> = ({
  bookings,
  onUpdateStatus,
  onReschedule,
  onCreateBooking,
  onDeleteBooking
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterService, setFilterService] = useState<string>('all');
  const [filterMode, setFilterMode] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals state
  const [selectedBooking, setSelectedBooking] = useState<AdminBooking | null>(null);
  const [isDossierOpen, setIsDossierOpen] = useState<boolean>(false);
  const [isRescheduleOpen, setIsRescheduleOpen] = useState<boolean>(false);
  const [isNewBookingOpen, setIsNewBookingOpen] = useState<boolean>(false);

  // Reschedule Form State
  const [rescheduleDate, setRescheduleDate] = useState<string>('');
  const [rescheduleSlot, setRescheduleSlot] = useState<string>('');
  const [rescheduleNotes, setRescheduleNotes] = useState<string>('');

  // New Booking Form State
  const [newBookingForm, setNewBookingForm] = useState({
    clientName: '',
    clientPhone: '',
    clientEmail: '',
    serviceId: 'vedic-kundli',
    consultationMode: 'video' as ConsultationMode,
    preferredDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    preferredSlot: '11:30 AM - 12:30 PM (Morning Slot)',
    birthDetails: 'DOB: 1992-05-15 | TOB: 08:30 AM | POB: Delhi, India',
    clientNotes: '',
    feeAmount: '₹3,500',
    paymentStatus: 'paid' as 'paid' | 'unpaid' | 'waived',
    status: 'confirmed' as AdminBooking['status'],
    clinicNotes: 'Scheduled via Clinic Desk'
  });

  const timeSlots = [
    '10:30 AM - 11:30 AM (Morning)',
    '11:30 AM - 12:30 PM (Morning Slot)',
    '02:30 PM - 03:30 PM (Afternoon)',
    '04:00 PM - 05:00 PM (Evening)',
    '06:00 PM - 07:00 PM (Evening)',
    '07:00 PM - 08:00 PM (Night Special)'
  ];

  // Filtering
  const filteredBookings = bookings.filter((b) => {
    const matchStatus = filterStatus === 'all' || b.status === filterStatus;
    const matchService = filterService === 'all' || b.serviceId === filterService;
    const matchMode = filterMode === 'all' || b.consultationMode === filterMode;
    const matchSearch =
      b.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.clientPhone.includes(searchQuery) ||
      b.clientEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.serviceTitle.toLowerCase().includes(searchQuery.toLowerCase());

    return matchStatus && matchService && matchMode && matchSearch;
  });

  const handleOpenDossier = (booking: AdminBooking) => {
    setSelectedBooking(booking);
    setIsDossierOpen(true);
  };

  const handleOpenReschedule = (booking: AdminBooking) => {
    setSelectedBooking(booking);
    setRescheduleDate(booking.preferredDate);
    setRescheduleSlot(booking.preferredSlot);
    setRescheduleNotes(booking.clinicNotes || '');
    setIsRescheduleOpen(true);
  };

  const handleConfirmReschedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBooking || !rescheduleDate || !rescheduleSlot) return;
    onReschedule(selectedBooking.id, rescheduleDate, rescheduleSlot, rescheduleNotes);
    setIsRescheduleOpen(false);
  };

  const handleCreateNewBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBookingForm.clientName || !newBookingForm.clientPhone) return;
    
    const service = SERVICES_DATA.find((s) => s.id === newBookingForm.serviceId) || SERVICES_DATA[0];

    onCreateBooking({
      ...newBookingForm,
      serviceTitle: service.title,
      assignedAstrologer: 'Dr. Preeti Sehgal'
    });

    setIsNewBookingOpen(false);
    // Reset form
    setNewBookingForm({
      clientName: '',
      clientPhone: '',
      clientEmail: '',
      serviceId: 'vedic-kundli',
      consultationMode: 'video',
      preferredDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      preferredSlot: '11:30 AM - 12:30 PM (Morning Slot)',
      birthDetails: 'DOB: 1992-05-15 | TOB: 08:30 AM | POB: Delhi, India',
      clientNotes: '',
      feeAmount: '₹3,500',
      paymentStatus: 'paid',
      status: 'confirmed',
      clinicNotes: 'Scheduled via Clinic Desk'
    });
  };

  const handleExportCSV = () => {
    const headers = ['Booking ID,Client Name,Phone,Email,Service,Mode,Date,Slot,Status,Fee,Created At'];
    const rows = filteredBookings.map((b) =>
      `"${b.id}","${b.clientName}","${b.clientPhone}","${b.clientEmail}","${b.serviceTitle}","${b.consultationMode}","${b.preferredDate}","${b.preferredSlot}","${b.status}","${b.feeAmount || ''}","${b.createdAt}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `dr_preeti_sehgal_consultations_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadReceiptPDF = (booking: AdminBooking) => {
    // Parse birth details if formatted as "DOB: ... | TOB: ... | POB: ..."
    let dob = '1995-01-01';
    let tob = '10:00 AM';
    let pob = 'Delhi, India';
    
    if (booking.birthDetails) {
      const parts = booking.birthDetails.split('|').map((s) => s.trim());
      parts.forEach((p) => {
        if (p.toLowerCase().startsWith('dob:')) dob = p.replace(/dob:/i, '').trim();
        else if (p.toLowerCase().startsWith('tob:')) tob = p.replace(/tob:/i, '').trim();
        else if (p.toLowerCase().startsWith('pob:')) pob = p.replace(/pob:/i, '').trim();
      });
    }

    downloadBookingReceiptPDF({
      bookingId: booking.id,
      clientName: booking.clientName,
      clientPhone: booking.clientPhone,
      clientEmail: booking.clientEmail,
      dob,
      tob,
      pob,
      serviceId: booking.serviceId,
      serviceTitle: booking.serviceTitle,
      consultationMode: booking.consultationMode,
      preferredDate: booking.preferredDate,
      preferredSlot: booking.preferredSlot,
      clientNotes: booking.clientNotes || '',
      clinicNotes: booking.clinicNotes,
      feeAmount: booking.feeAmount || '₹3,500',
      status: booking.status,
      createdAt: booking.createdAt
    });
  };

  const handleSendWhatsAppNotification = (booking: AdminBooking) => {
    const text = `*Namaste ${booking.clientName} Ji,*
This is from Dr. Preeti Sehgal's Vedic Astrology Chambers.

Your consultation has been confirmed:
• *Service:* ${booking.serviceTitle}
• *Mode:* ${booking.consultationMode.toUpperCase()}
• *Date:* ${booking.preferredDate}
• *Time Slot:* ${booking.preferredSlot}

Chamber Address: ${DOCTOR_INFO.addresses[0].line1}, ${DOCTOR_INFO.addresses[0].line2}
Direct Helpline: ${DOCTOR_INFO.primaryPhone}

Looking forward to providing you with sacred astrological clarity.`;

    const cleanPhone = booking.clientPhone.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanPhone || DOCTOR_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Header with Controls & Action Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="font-playfair text-xl font-bold text-[#7C2D12]">
            Consultation Appointments Roster
          </h2>
          <p className="text-xs text-[#9A3412]">
            Manage client appointments, confirm video sessions, and organize offline chamber visits.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            type="button"
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#7C2D12] bg-white hover:bg-orange-50 border border-orange-200 shadow-2xs transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-[#EA580C]" />
            <span>Export CSV</span>
          </button>

          <button
            type="button"
            onClick={() => setIsNewBookingOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#EA580C] to-[#F97316] text-white shadow-xs hover:brightness-105 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>New Walk-in / Phone Booking</span>
          </button>
        </div>
      </div>

      {/* 2. Filters Bar */}
      <div className="p-4 rounded-2xl bg-white border border-orange-200/90 shadow-2xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by client, phone, ID..."
              className="w-full pl-8 pr-3 py-2 bg-[#FFF9F2] border border-orange-200 rounded-xl text-xs text-[#7C2D12] placeholder-stone-400 focus:outline-none focus:border-[#EA580C]"
            />
          </div>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full px-3 py-2 bg-[#FFF9F2] border border-orange-200 rounded-xl text-xs text-[#7C2D12] focus:outline-none focus:border-[#EA580C]"
          >
            <option value="all">All Statuses ({bookings.length})</option>
            <option value="pending">Pending Review</option>
            <option value="confirmed">Confirmed / Active</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>

          {/* Service Filter */}
          <select
            value={filterService}
            onChange={(e) => setFilterService(e.target.value)}
            className="w-full px-3 py-2 bg-[#FFF9F2] border border-orange-200 rounded-xl text-xs text-[#7C2D12] focus:outline-none focus:border-[#EA580C]"
          >
            <option value="all">All Astrological Services</option>
            {SERVICES_DATA.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title}
              </option>
            ))}
          </select>

          {/* Mode Filter */}
          <select
            value={filterMode}
            onChange={(e) => setFilterMode(e.target.value)}
            className="w-full px-3 py-2 bg-[#FFF9F2] border border-orange-200 rounded-xl text-xs text-[#7C2D12] focus:outline-none focus:border-[#EA580C]"
          >
            <option value="all">All Consultation Modes</option>
            <option value="video">Video Call (Google Meet / Zoom)</option>
            <option value="phone">Direct Phone Call</option>
            <option value="in_person">In-Person Delhi Chamber</option>
            <option value="report">Written Vedic Report PDF</option>
          </select>
        </div>

        {/* Active Filter Chips Bar */}
        {(filterStatus !== 'all' || filterService !== 'all' || filterMode !== 'all' || searchQuery) && (
          <div className="flex items-center gap-2 pt-2 border-t border-orange-100 text-xs">
            <span className="text-[11px] text-stone-500 font-medium">Active Filters:</span>
            <button
              type="button"
              onClick={() => {
                setFilterStatus('all');
                setFilterService('all');
                setFilterMode('all');
                setSearchQuery('');
              }}
              className="text-[10px] text-[#EA580C] hover:underline font-bold"
            >
              Reset All Filters
            </button>
            <span className="text-[11px] text-stone-500 ml-auto font-semibold">
              Showing {filteredBookings.length} of {bookings.length}
            </span>
          </div>
        )}
      </div>

      {/* 3. Comprehensive Data Table */}
      <div className="rounded-2xl bg-white border border-orange-200/90 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-orange-100 text-[11px] uppercase tracking-wider text-stone-500 bg-[#FFFDF9]">
                <th className="py-3 px-4 font-semibold">Client Details</th>
                <th className="py-3 px-4 font-semibold">Requested Service</th>
                <th className="py-3 px-4 font-semibold">Mode & Slot</th>
                <th className="py-3 px-4 font-semibold">Fee & Payment</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-orange-50">
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-stone-500 space-y-2">
                    <AlertCircle className="w-8 h-8 text-amber-500 mx-auto opacity-70" />
                    <p className="text-sm font-semibold">No consultations match your filter criteria.</p>
                    <p className="text-xs text-stone-400">Try adjusting your search query or reset filters.</p>
                  </td>
                </tr>
              ) : (
                filteredBookings.map((b) => {
                  const isPending = b.status === 'pending';
                  const isConfirmed = b.status === 'confirmed';
                  const isCompleted = b.status === 'completed';
                  const isCancelled = b.status === 'cancelled';

                  return (
                    <tr
                      key={b.id}
                      className="hover:bg-[#FFF9F2]/70 transition-colors group cursor-pointer"
                      onClick={() => handleOpenDossier(b)}
                    >
                      {/* Client info */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-[#FFF7ED] border border-orange-200 text-[#7C2D12] font-bold text-xs flex items-center justify-center shrink-0">
                            {b.clientName[0]}
                          </div>
                          <div>
                            <div className="font-bold text-[#7C2D12]">{b.clientName}</div>
                            <div className="text-[10px] text-stone-500 font-mono">{b.clientPhone}</div>
                            {b.clientEmail && <div className="text-[10px] text-stone-400">{b.clientEmail}</div>}
                          </div>
                        </div>
                      </td>

                      {/* Service */}
                      <td className="py-3.5 px-4 max-w-[200px]">
                        <div className="font-medium text-stone-800 leading-snug">{b.serviceTitle}</div>
                        <div className="text-[10px] text-stone-400 font-mono mt-0.5">ID: {b.id}</div>
                      </td>

                      {/* Mode & Slot */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                            b.consultationMode === 'video'
                              ? 'bg-purple-100 text-purple-900 border border-purple-200'
                              : b.consultationMode === 'in_person'
                              ? 'bg-amber-100 text-amber-900 border border-amber-200'
                              : b.consultationMode === 'phone'
                              ? 'bg-blue-100 text-blue-900 border border-blue-200'
                              : 'bg-stone-100 text-stone-900 border border-stone-200'
                          }`}>
                            {b.consultationMode === 'video' && <Video className="w-2.5 h-2.5" />}
                            {b.consultationMode === 'in_person' && <MapPin className="w-2.5 h-2.5" />}
                            {b.consultationMode === 'phone' && <Phone className="w-2.5 h-2.5" />}
                            <span>{b.consultationMode}</span>
                          </span>
                        </div>
                        <div className="text-xs font-semibold text-stone-700 mt-1">{b.preferredDate}</div>
                        <div className="text-[10px] text-stone-500">{b.preferredSlot.split('(')[0]}</div>
                      </td>

                      {/* Fee & Payment */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-[#7C2D12]">{b.feeAmount || '₹3,100'}</div>
                        <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${
                          b.paymentStatus === 'paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {b.paymentStatus || 'paid'}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          isPending
                            ? 'bg-amber-100 text-amber-900 border border-amber-300 animate-pulse'
                            : isConfirmed
                            ? 'bg-blue-100 text-blue-900 border border-blue-300'
                            : isCompleted
                            ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                            : 'bg-red-100 text-red-900 border border-red-300'
                        }`}>
                          {b.status}
                        </span>
                      </td>

                      {/* Action buttons */}
                      <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1.5">
                          {isPending && (
                            <button
                              type="button"
                              onClick={() => {
                                onUpdateStatus(b.id, 'confirmed');
                                handleSendWhatsAppNotification({ ...b, status: 'confirmed' });
                              }}
                              className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-[#EA580C] hover:bg-[#C2410C] text-white shadow-2xs transition-colors cursor-pointer"
                              title="Approve & Send WhatsApp Notification"
                            >
                              Approve
                            </button>
                          )}

                          {isConfirmed && (
                            <button
                              type="button"
                              onClick={() => onUpdateStatus(b.id, 'completed')}
                              className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-2xs transition-colors cursor-pointer"
                              title="Mark session completed"
                            >
                              Complete
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() => handleOpenReschedule(b)}
                            className="p-1.5 rounded-lg text-stone-600 hover:text-[#7C2D12] hover:bg-orange-100 transition-colors cursor-pointer"
                            title="Reschedule appointment"
                          >
                            <CalendarDays className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDownloadReceiptPDF(b)}
                            className="p-1.5 rounded-lg text-[#EA580C] hover:text-[#C2410C] hover:bg-orange-100 transition-colors cursor-pointer"
                            title="Download Consultation Slip (PDF)"
                          >
                            <Download className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleOpenDossier(b)}
                            className="p-1.5 rounded-lg text-stone-600 hover:text-[#7C2D12] hover:bg-orange-100 transition-colors cursor-pointer"
                            title="View Client Dossier"
                          >
                            <FileText className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleSendWhatsAppNotification(b)}
                            className="p-1.5 rounded-lg text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 transition-colors cursor-pointer"
                            title="Message Client on WhatsApp"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. CLIENT DOSSIER MODAL */}
      <AnimatePresence>
        {isDossierOpen && selectedBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl border border-orange-200 max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto text-left"
            >
              <button
                type="button"
                onClick={() => setIsDossierOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#EA580C]">
                  Astrological Client Dossier &bull; {selectedBooking.id}
                </span>
                <h3 className="font-playfair text-2xl font-bold text-[#7C2D12]">
                  {selectedBooking.clientName}
                </h3>
                <p className="text-xs text-stone-500">
                  Requested on {new Date(selectedBooking.createdAt).toLocaleString()}
                </p>
              </div>

              {/* Grid of Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#FFF9F2] p-4 rounded-2xl border border-orange-100">
                <div>
                  <label className="text-[10px] font-bold uppercase text-stone-400">Service</label>
                  <div className="text-xs font-bold text-[#7C2D12]">{selectedBooking.serviceTitle}</div>
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase text-stone-400">Consultation Mode</label>
                  <div className="text-xs font-bold text-stone-800 uppercase">{selectedBooking.consultationMode}</div>
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase text-stone-400">Scheduled Date & Slot</label>
                  <div className="text-xs font-bold text-stone-800">{selectedBooking.preferredDate} ({selectedBooking.preferredSlot})</div>
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase text-stone-400">Contact</label>
                  <div className="text-xs font-bold text-stone-800">{selectedBooking.clientPhone}</div>
                  <div className="text-[11px] text-stone-500">{selectedBooking.clientEmail || 'No email provided'}</div>
                </div>
              </div>

              {/* Google Meet Space Video Integration */}
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-bold uppercase text-emerald-800 flex items-center gap-1.5">
                    <Video className="w-3.5 h-3.5 text-emerald-600" />
                    Google Meet Video Consultation Space
                  </label>
                  {selectedBooking.meetLink ? (
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                      Active Chamber
                    </span>
                  ) : (
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 border border-stone-200">
                      Not Generated
                    </span>
                  )}
                </div>

                {selectedBooking.meetLink ? (
                  <div className="flex items-center justify-between gap-3 bg-white p-2.5 rounded-xl border border-emerald-200">
                    <div className="font-mono text-xs text-emerald-950 font-bold truncate">
                      {selectedBooking.meetLink}
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <a
                        href={selectedBooking.meetLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-transform active:scale-95"
                      >
                        <span>Launch Meet</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs text-emerald-900 font-light">
                      Create an instant, secure Google Meet room for this Vedic consultation.
                    </p>
                    <button
                      type="button"
                      onClick={async () => {
                        const uniqueCode = `dps-${Math.random().toString(36).substring(2, 6)}-${Math.random().toString(36).substring(2, 5)}`;
                        const link = `https://meet.google.com/${uniqueCode}`;
                        onUpdateStatus(selectedBooking.id, selectedBooking.status, `${selectedBooking.clinicNotes || ''}\n[Google Meet: ${link}]`);
                        setSelectedBooking({ ...selectedBooking, meetLink: link });
                      }}
                      className="inline-flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-xs cursor-pointer shrink-0"
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>Generate Meet Link</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Birth Details */}
              <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-1">
                <label className="text-[10px] font-bold uppercase text-amber-800 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  Native Birth Coordinates
                </label>
                <p className="text-xs font-mono text-stone-800 font-semibold">{selectedBooking.birthDetails}</p>
              </div>

              {/* Specific Concerns */}
              {selectedBooking.clientNotes && (
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
                  <label className="text-[10px] font-bold uppercase text-stone-500">Client's Specific Concern</label>
                  <p className="text-xs text-stone-700 leading-relaxed italic">"{selectedBooking.clientNotes}"</p>
                </div>
              )}

              {/* Clinic Notes */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase text-[#7C2D12]">Internal Clinic Notes</label>
                <textarea
                  defaultValue={selectedBooking.clinicNotes || ''}
                  onBlur={(e) => onUpdateStatus(selectedBooking.id, selectedBooking.status, e.target.value)}
                  placeholder="Add private observations, chart findings, or follow-up notes..."
                  className="w-full p-3 rounded-xl border border-orange-200 text-xs text-stone-800 bg-[#FFFDF9] focus:outline-none focus:border-[#EA580C]"
                  rows={3}
                />
                <span className="text-[10px] text-stone-400">Auto-saved when you click away</span>
              </div>

              {/* Dossier Footer Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-orange-100 flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      onUpdateStatus(selectedBooking.id, 'confirmed');
                      setIsDossierOpen(false);
                    }}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold bg-[#EA580C] text-white hover:bg-[#C2410C] cursor-pointer"
                  >
                    Confirm Booking
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onUpdateStatus(selectedBooking.id, 'completed');
                      setIsDossierOpen(false);
                    }}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 cursor-pointer"
                  >
                    Mark Completed
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleDownloadReceiptPDF(selectedBooking)}
                    className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-orange-100 text-[#7C2D12] border border-orange-300 hover:bg-orange-200 flex items-center gap-1.5 cursor-pointer shadow-2xs"
                    title="Download Formatted PDF Consultation Slip"
                  >
                    <Download className="w-3.5 h-3.5 text-[#EA580C]" />
                    <span>Download PDF</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSendWhatsAppNotification(selectedBooking)}
                    className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 flex items-center gap-1.5 cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp Link</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (confirm(`Delete booking ${selectedBooking.id}?`)) {
                        onDeleteBooking(selectedBooking.id);
                        setIsDossierOpen(false);
                      }
                    }}
                    className="p-2 rounded-xl text-red-600 hover:bg-red-50 cursor-pointer"
                    title="Delete record"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 5. RESCHEDULE APPOINTMENT MODAL */}
      <AnimatePresence>
        {isRescheduleOpen && selectedBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl border border-orange-200 max-w-md w-full p-6 shadow-2xl space-y-5 text-left"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-playfair text-lg font-bold text-[#7C2D12]">
                  Reschedule Consultation
                </h3>
                <button
                  type="button"
                  onClick={() => setIsRescheduleOpen(false)}
                  className="p-1 rounded-full text-stone-400 hover:text-stone-700 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-stone-500">
                Updating appointment for <strong className="text-[#7C2D12]">{selectedBooking.clientName}</strong>
              </p>

              <form onSubmit={handleConfirmReschedule} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold uppercase text-stone-600">
                    New Date
                  </label>
                  <input
                    type="date"
                    value={rescheduleDate}
                    onChange={(e) => setRescheduleDate(e.target.value)}
                    required
                    className="w-full p-2.5 bg-[#FFF9F2] border border-orange-200 rounded-xl text-xs text-[#7C2D12] focus:outline-none focus:border-[#EA580C]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold uppercase text-stone-600">
                    Time Slot
                  </label>
                  <select
                    value={rescheduleSlot}
                    onChange={(e) => setRescheduleSlot(e.target.value)}
                    className="w-full p-2.5 bg-[#FFF9F2] border border-orange-200 rounded-xl text-xs text-[#7C2D12] focus:outline-none focus:border-[#EA580C]"
                  >
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold uppercase text-stone-600">
                    Rescheduling Reason / Note
                  </label>
                  <input
                    type="text"
                    value={rescheduleNotes}
                    onChange={(e) => setRescheduleNotes(e.target.value)}
                    placeholder="Client requested shift to evening slot..."
                    className="w-full p-2.5 bg-[#FFF9F2] border border-orange-200 rounded-xl text-xs text-[#7C2D12] focus:outline-none focus:border-[#EA580C]"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-3">
                  <button
                    type="button"
                    onClick={() => setIsRescheduleOpen(false)}
                    className="px-3.5 py-2 rounded-xl text-xs font-semibold text-stone-600 hover:bg-stone-100 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#EA580C] hover:bg-[#C2410C] text-white shadow-xs cursor-pointer"
                  >
                    Save & Reschedule
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 6. CREATE MANUAL BOOKING MODAL */}
      <AnimatePresence>
        {isNewBookingOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl border border-orange-200 max-w-xl w-full p-6 sm:p-8 shadow-2xl space-y-5 text-left max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-playfair text-xl font-bold text-[#7C2D12]">
                    Add Walk-in / Direct Phone Consultation
                  </h3>
                  <p className="text-xs text-[#9A3412]">
                    Directly log a client booking into Dr. Preeti Sehgal's official schedule.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsNewBookingOpen(false)}
                  className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateNewBooking} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold uppercase text-stone-600">Client Full Name *</label>
                    <input
                      type="text"
                      required
                      value={newBookingForm.clientName}
                      onChange={(e) => setNewBookingForm({ ...newBookingForm, clientName: e.target.value })}
                      placeholder="e.g. Ramesh Chandra"
                      className="w-full p-2.5 bg-[#FFF9F2] border border-orange-200 rounded-xl text-xs text-[#7C2D12] focus:outline-none focus:border-[#EA580C]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold uppercase text-stone-600">Phone Number *</label>
                    <input
                      type="text"
                      required
                      value={newBookingForm.clientPhone}
                      onChange={(e) => setNewBookingForm({ ...newBookingForm, clientPhone: e.target.value })}
                      placeholder="+91 98110 12345"
                      className="w-full p-2.5 bg-[#FFF9F2] border border-orange-200 rounded-xl text-xs text-[#7C2D12] focus:outline-none focus:border-[#EA580C]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold uppercase text-stone-600">Email Address (Optional)</label>
                    <input
                      type="email"
                      value={newBookingForm.clientEmail}
                      onChange={(e) => setNewBookingForm({ ...newBookingForm, clientEmail: e.target.value })}
                      placeholder="client@example.com"
                      className="w-full p-2.5 bg-[#FFF9F2] border border-orange-200 rounded-xl text-xs text-[#7C2D12] focus:outline-none focus:border-[#EA580C]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold uppercase text-stone-600">Consultation Service</label>
                    <select
                      value={newBookingForm.serviceId}
                      onChange={(e) => setNewBookingForm({ ...newBookingForm, serviceId: e.target.value })}
                      className="w-full p-2.5 bg-[#FFF9F2] border border-orange-200 rounded-xl text-xs text-[#7C2D12] focus:outline-none focus:border-[#EA580C]"
                    >
                      {SERVICES_DATA.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold uppercase text-stone-600">Mode</label>
                    <select
                      value={newBookingForm.consultationMode}
                      onChange={(e) => setNewBookingForm({ ...newBookingForm, consultationMode: e.target.value as ConsultationMode })}
                      className="w-full p-2.5 bg-[#FFF9F2] border border-orange-200 rounded-xl text-xs text-[#7C2D12] focus:outline-none focus:border-[#EA580C]"
                    >
                      <option value="video">Video Call</option>
                      <option value="phone">Direct Phone</option>
                      <option value="in_person">In-Person Chamber</option>
                      <option value="report">Written PDF</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold uppercase text-stone-600">Date</label>
                    <input
                      type="date"
                      value={newBookingForm.preferredDate}
                      onChange={(e) => setNewBookingForm({ ...newBookingForm, preferredDate: e.target.value })}
                      className="w-full p-2.5 bg-[#FFF9F2] border border-orange-200 rounded-xl text-xs text-[#7C2D12] focus:outline-none focus:border-[#EA580C]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold uppercase text-stone-600">Slot</label>
                    <select
                      value={newBookingForm.preferredSlot}
                      onChange={(e) => setNewBookingForm({ ...newBookingForm, preferredSlot: e.target.value })}
                      className="w-full p-2.5 bg-[#FFF9F2] border border-orange-200 rounded-xl text-xs text-[#7C2D12] focus:outline-none focus:border-[#EA580C]"
                    >
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-[11px] font-bold uppercase text-stone-600">Birth Coordinates (DOB, TOB, POB)</label>
                  <input
                    type="text"
                    value={newBookingForm.birthDetails}
                    onChange={(e) => setNewBookingForm({ ...newBookingForm, birthDetails: e.target.value })}
                    placeholder="DOB: 1990-01-01 | TOB: 10:00 AM | POB: Delhi"
                    className="w-full p-2.5 bg-[#FFF9F2] border border-orange-200 rounded-xl text-xs text-[#7C2D12] focus:outline-none focus:border-[#EA580C]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[11px] font-bold uppercase text-stone-600">Client Concern / Notes</label>
                  <textarea
                    value={newBookingForm.clientNotes}
                    onChange={(e) => setNewBookingForm({ ...newBookingForm, clientNotes: e.target.value })}
                    placeholder="E.g., Matchmaking Kundli Milan analysis..."
                    className="w-full p-2.5 bg-[#FFF9F2] border border-orange-200 rounded-xl text-xs text-[#7C2D12] focus:outline-none focus:border-[#EA580C]"
                    rows={2}
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-orange-100">
                  <button
                    type="button"
                    onClick={() => setIsNewBookingOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 hover:bg-stone-100 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#EA580C] hover:bg-[#C2410C] text-white shadow-xs cursor-pointer"
                  >
                    Save & Confirm Booking
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
