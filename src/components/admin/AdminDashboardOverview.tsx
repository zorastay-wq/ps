import React from 'react';
import { motion } from 'motion/react';
import { AdminBooking, BookingStats, KundliAnalyticsSummary, AdminTab } from '../../types';
import { 
  CalendarDays, 
  Sparkles, 
  BookOpen, 
  Video, 
  UserCheck, 
  ArrowUpRight, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Compass, 
  Flame, 
  ShieldCheck, 
  TrendingUp,
  MapPin,
  ChevronRight,
  Phone,
  FileText
} from 'lucide-react';

interface AdminDashboardOverviewProps {
  stats: BookingStats;
  analytics: KundliAnalyticsSummary;
  recentBookings: AdminBooking[];
  onSelectTab: (tab: AdminTab) => void;
  onOpenNewBookingModal: () => void;
  onViewBookingDetails: (booking: AdminBooking) => void;
  onQuickApproveBooking: (id: string) => void;
}

export const AdminDashboardOverview: React.FC<AdminDashboardOverviewProps> = ({
  stats,
  analytics,
  recentBookings,
  onSelectTab,
  onOpenNewBookingModal,
  onViewBookingDetails,
  onQuickApproveBooking
}) => {
  const metricCards = [
    {
      id: 'metric_bookings',
      title: 'Consultations Booked',
      value: stats.totalBookings.toString(),
      subtext: `${stats.pendingBookings} pending review`,
      icon: <CalendarDays className="w-5 h-5 text-[#EA580C]" />,
      badge: stats.pendingBookings > 0 ? `${stats.pendingBookings} Action Required` : 'Up to Date',
      badgeColor: stats.pendingBookings > 0 ? 'bg-amber-100 text-amber-800 border-amber-300' : 'bg-emerald-100 text-emerald-800 border-emerald-300',
      actionTab: 'bookings' as AdminTab
    },
    {
      id: 'metric_kundli',
      title: 'Kundlis Calculated Today',
      value: analytics.todayCalculated.toString(),
      subtext: `${analytics.totalCalculated} cumulative total`,
      icon: <Sparkles className="w-5 h-5 text-amber-600" />,
      badge: '+18% vs yesterday',
      badgeColor: 'bg-orange-100 text-orange-800 border-orange-300',
      actionTab: 'analytics' as AdminTab
    },
    {
      id: 'metric_remedies',
      title: 'Active Lal Kitab Upays',
      value: '28 Classical',
      subtext: '9 Grahas & 12 Bhavas',
      icon: <BookOpen className="w-5 h-5 text-[#7C2D12]" />,
      badge: 'CMS Synced',
      badgeColor: 'bg-stone-100 text-stone-800 border-stone-300',
      actionTab: 'content-lalkitab' as AdminTab
    },
    {
      id: 'metric_video',
      title: 'Pending Video Appointments',
      value: stats.videoAppointmentsCount.toString(),
      subtext: `${stats.inPersonChambersCount} in-person chambers`,
      icon: <Video className="w-5 h-5 text-[#C2410C]" />,
      badge: 'Chambers Active',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      actionTab: 'bookings' as AdminTab
    }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Top-Level Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metricCards.map((card) => (
          <div
            key={card.id}
            onClick={() => onSelectTab(card.actionTab)}
            className="p-5 rounded-2xl bg-white border border-orange-200/90 shadow-2xs hover:shadow-md hover:border-[#EA580C] transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="flex items-start justify-between">
              <div className="p-2.5 rounded-xl bg-[#FFF7ED] border border-orange-200/80 group-hover:bg-[#EA580C] group-hover:text-white transition-colors">
                {card.icon}
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${card.badgeColor}`}>
                {card.badge}
              </span>
            </div>

            <div className="mt-4 space-y-1">
              <div className="text-2xl sm:text-3xl font-bold font-playfair text-[#7C2D12] tracking-tight">
                {card.value}
              </div>
              <div className="text-xs font-semibold text-[#9A3412]">{card.title}</div>
              <div className="text-[11px] text-stone-500">{card.subtext}</div>
            </div>

            <div className="mt-3 pt-2.5 border-t border-orange-100 flex items-center justify-between text-[11px] font-semibold text-[#EA580C] group-hover:text-[#C2410C]">
              <span>Manage & View</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {/* 2. Main 2-Column Split: Recent Consultations & Dosha Diagnostics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Recent Consultations Table */}
        <div className="lg:col-span-2 p-5 sm:p-6 rounded-2xl bg-white border border-orange-200/90 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-playfair text-lg font-bold text-[#7C2D12]">
                Active Consultation Requests
              </h2>
              <p className="text-xs text-[#9A3412]">
                Recent client appointments submitted via website & WhatsApp
              </p>
            </div>
            <button
              type="button"
              onClick={() => onSelectTab('bookings')}
              className="inline-flex items-center gap-1 text-xs font-bold text-[#EA580C] hover:text-[#C2410C] cursor-pointer"
            >
              <span>View All ({stats.totalBookings})</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-orange-100 text-[11px] uppercase tracking-wider text-stone-500 bg-[#FFFDF9]">
                  <th className="py-2.5 px-3 font-semibold">Client Name</th>
                  <th className="py-2.5 px-3 font-semibold">Requested Service</th>
                  <th className="py-2.5 px-3 font-semibold">Date & Slot</th>
                  <th className="py-2.5 px-3 font-semibold">Status</th>
                  <th className="py-2.5 px-3 font-semibold text-right">Quick Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-orange-50">
                {recentBookings.slice(0, 5).map((booking) => {
                  const isPending = booking.status === 'pending';
                  const isConfirmed = booking.status === 'confirmed';
                  const isCompleted = booking.status === 'completed';

                  return (
                    <tr 
                      key={booking.id}
                      className="hover:bg-[#FFF9F2] transition-colors group cursor-pointer"
                      onClick={() => onViewBookingDetails(booking)}
                    >
                      <td className="py-3 px-3">
                        <div className="font-bold text-[#7C2D12]">{booking.clientName}</div>
                        <div className="text-[10px] text-stone-500 font-mono">{booking.clientPhone}</div>
                      </td>
                      <td className="py-3 px-3">
                        <div className="font-medium text-stone-800 truncate max-w-[160px]">{booking.serviceTitle}</div>
                        <div className="text-[10px] font-bold text-[#EA580C] uppercase">{booking.consultationMode}</div>
                      </td>
                      <td className="py-3 px-3">
                        <div className="font-semibold text-stone-700">{booking.preferredDate}</div>
                        <div className="text-[10px] text-stone-500 truncate max-w-[130px]">{booking.preferredSlot.split('(')[0]}</div>
                      </td>
                      <td className="py-3 px-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          isPending
                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                            : isConfirmed
                            ? 'bg-blue-100 text-blue-900 border border-blue-300'
                            : isCompleted
                            ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                            : 'bg-stone-100 text-stone-700'
                        }`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right" onClick={(e) => e.stopPropagation()}>
                        {isPending ? (
                          <button
                            type="button"
                            onClick={() => onQuickApproveBooking(booking.id)}
                            className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-[#EA580C] hover:bg-[#C2410C] text-white shadow-2xs transition-colors cursor-pointer"
                          >
                            Approve
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => onViewBookingDetails(booking)}
                            className="px-2.5 py-1 rounded-lg text-[11px] font-semibold text-[#7C2D12] hover:bg-orange-100 border border-orange-200 transition-colors cursor-pointer"
                          >
                            Details
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right 1 Col: Dosha Diagnostics Analytics & Quick Actions */}
        <div className="space-y-6">
          {/* Dosha Prevalences */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-orange-200/90 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-playfair text-base font-bold text-[#7C2D12]">
                Dosha Diagnostics Frequency
              </h3>
              <span className="text-[10px] font-bold text-amber-700 px-2 py-0.5 bg-amber-50 rounded-md border border-amber-200">
                Engine Real-Time
              </span>
            </div>
            <p className="text-xs text-[#9A3412]">
              Statistical prevalence in calculated Janam Kundlis
            </p>

            <div className="space-y-3 pt-1">
              {/* Manglik Dosha */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-[#7C2D12] flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-rose-500" />
                    Manglik Dosha
                  </span>
                  <span className="font-mono text-rose-600 font-bold">{analytics.manglikPercentage}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-orange-100 overflow-hidden">
                  <div 
                    className="h-full bg-rose-500 rounded-full transition-all duration-700" 
                    style={{ width: `${analytics.manglikPercentage}%` }}
                  />
                </div>
              </div>

              {/* Shani Sade Sati */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-[#7C2D12] flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-blue-600" />
                    Shani Sade Sati / Dhaiya
                  </span>
                  <span className="font-mono text-blue-600 font-bold">{analytics.sadeSatiPercentage}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-orange-100 overflow-hidden">
                  <div 
                    className="h-full bg-blue-600 rounded-full transition-all duration-700" 
                    style={{ width: `${analytics.sadeSatiPercentage}%` }}
                  />
                </div>
              </div>

              {/* Kaal Sarp Yoga */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-[#7C2D12] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                    Kaal Sarp Yoga
                  </span>
                  <span className="font-mono text-purple-600 font-bold">{analytics.kaalSarpPercentage}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-orange-100 overflow-hidden">
                  <div 
                    className="h-full bg-purple-600 rounded-full transition-all duration-700" 
                    style={{ width: `${analytics.kaalSarpPercentage}%` }}
                  />
                </div>
              </div>

              {/* Pitri Rin */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-[#7C2D12] flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-amber-600" />
                    Pitri Rin (Karmic Debt)
                  </span>
                  <span className="font-mono text-amber-700 font-bold">{analytics.pitriRinPercentage}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-orange-100 overflow-hidden">
                  <div 
                    className="h-full bg-amber-600 rounded-full transition-all duration-700" 
                    style={{ width: `${analytics.pitriRinPercentage}%` }}
                  />
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onSelectTab('analytics')}
              className="w-full py-2 rounded-xl text-xs font-bold text-[#EA580C] hover:bg-orange-50 border border-orange-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer mt-2"
            >
              <span>Explore Full Analytics Stream</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Clinic Operations Actions */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-[#7C2D12] to-[#431407] text-white shadow-md space-y-3">
            <h3 className="font-playfair font-bold text-sm text-amber-200 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#F97316]" />
              Astrologer Chambers Schedule
            </h3>
            <p className="text-xs text-orange-200/90 leading-relaxed">
              Dr. Preeti Sehgal's live consultation chambers are active. South Extension & GK-1 chambers open for in-person clients.
            </p>
            <div className="pt-2 flex flex-col gap-2">
              <button
                type="button"
                onClick={onOpenNewBookingModal}
                className="w-full py-2.5 px-3 rounded-xl font-bold uppercase tracking-wider text-xs bg-[#EA580C] hover:bg-[#F97316] text-white shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <CalendarDays className="w-4 h-4" />
                <span>Add Offline Booking</span>
              </button>
              <button
                type="button"
                onClick={() => onSelectTab('content-lalkitab')}
                className="w-full py-2 px-3 rounded-xl font-semibold text-xs bg-white/10 hover:bg-white/20 text-orange-100 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                <span>Review Lal Kitab Upays</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
