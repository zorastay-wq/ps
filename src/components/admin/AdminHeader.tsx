import React, { useState, useEffect, useRef } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { AdminTab, AdminBooking } from '../../types';
import { 
  Menu, 
  Search, 
  Bell, 
  Plus, 
  Clock, 
  Calendar, 
  ExternalLink, 
  ShieldCheck, 
  LogOut, 
  Sparkles,
  ChevronDown,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface AdminHeaderProps {
  activeTab: AdminTab;
  onOpenMobileSidebar: () => void;
  onOpenNewBookingModal: () => void;
  onExitPortal: () => void;
  onSearchGlobal?: (query: string) => void;
  pendingBookings?: AdminBooking[];
  onSelectBooking?: (booking: AdminBooking) => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  activeTab,
  onOpenMobileSidebar,
  onOpenNewBookingModal,
  onExitPortal,
  onSearchGlobal,
  pendingBookings = [],
  onSelectBooking
}) => {
  const { adminUser, logout, role } = useAdminAuth();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Live Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-IN', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const tabTitles: Record<AdminTab, { title: string; subtitle: string }> = {
    dashboard: {
      title: 'Clinic Dashboard & Metrics',
      subtitle: 'Real-time overview of appointments, revenue, and Kundli traffic'
    },
    bookings: {
      title: 'Consultation Bookings Management',
      subtitle: 'Schedule, confirm, reschedule, and conduct client sessions'
    },
    analytics: {
      title: 'Kundli Engine Logs & Dosha Trends',
      subtitle: 'Anonymous engine usage, Manglik, Sade Sati & Kaal Sarp analytics'
    },
    'content-lalkitab': {
      title: 'Lal Kitab Remedies CMS',
      subtitle: 'Manage classical Vedic upays, planetary parhez, and durations'
    },
    'content-vastu': {
      title: 'Vastu Shastra CMS & 8-Direction Matrix',
      subtitle: 'Curate directional elemental rules, deities, and zero-demolition remedies'
    },
    settings: {
      title: 'Clinic Settings & Data Backups',
      subtitle: 'System parameters, operating hours, and database synchronization'
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (onSearchGlobal) {
      onSearchGlobal(e.target.value);
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-orange-200 px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4 shadow-2xs">
      {/* Left: Mobile Toggle & Page Title */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          type="button"
          onClick={onOpenMobileSidebar}
          className="md:hidden p-2 rounded-xl text-[#7C2D12] hover:bg-orange-100 transition-colors cursor-pointer"
          aria-label="Open Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="font-playfair text-base sm:text-lg font-bold text-[#7C2D12] truncate">
              {tabTitles[activeTab]?.title || 'Admin Portal'}
            </h1>
          </div>
          <p className="text-[11px] text-[#9A3412] hidden sm:block truncate">
            {tabTitles[activeTab]?.subtitle}
          </p>
        </div>
      </div>

      {/* Right: Actions, Search, Live Clock, Notifications & Profile */}
      <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
        {/* Global Search Bar (Medium+ screens) */}
        <div className="relative hidden lg:block w-56 xl:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search clients, logs, upays..."
            className="w-full pl-8 pr-3 py-1.5 bg-[#FFF9F2] border border-orange-200 rounded-xl text-xs text-[#7C2D12] placeholder-stone-400 focus:outline-none focus:border-[#EA580C] focus:ring-1 focus:ring-orange-400"
          />
        </div>

        {/* Live Clock & Date Badge */}
        <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#FFF7ED] border border-orange-200 text-xs font-mono text-[#7C2D12]">
          <Clock className="w-3.5 h-3.5 text-[#EA580C]" />
          <span>{currentTime || '05:45 PM'}</span>
        </div>

        {/* "+ New Booking" Button */}
        <button
          type="button"
          onClick={onOpenNewBookingModal}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#EA580C] to-[#F97316] hover:brightness-105 text-white shadow-xs transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add Booking</span>
        </button>

        {/* Notification Bell Dropdown */}
        <div className="relative" ref={notifRef}>
          <button
            type="button"
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="p-2 rounded-xl text-[#7C2D12] hover:bg-orange-100 border border-orange-200/80 transition-colors relative cursor-pointer"
            aria-label="View notifications"
          >
            <Bell className="w-4 h-4" />
            {pendingBookings.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#EA580C] text-white text-[9px] font-bold flex items-center justify-center animate-pulse shadow-xs">
                {pendingBookings.length}
              </span>
            )}
          </button>

          {/* Notifications Dropdown Panel */}
          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-orange-200 rounded-2xl shadow-xl p-3.5 space-y-2.5 z-50 animate-in fade-in zoom-in-95 duration-150 text-left">
              <div className="flex items-center justify-between pb-2 border-b border-orange-100">
                <span className="font-playfair font-bold text-sm text-[#7C2D12]">
                  Pending Client Requests ({pendingBookings.length})
                </span>
                <span className="text-[10px] text-[#EA580C] font-semibold">Real-Time Queue</span>
              </div>

              <div className="max-h-72 overflow-y-auto space-y-2 custom-scrollbar">
                {pendingBookings.length === 0 ? (
                  <div className="p-4 text-center text-xs text-stone-500">
                    <CheckCircle2 className="w-6 h-6 text-emerald-500 mx-auto mb-1" />
                    All consultation requests have been confirmed.
                  </div>
                ) : (
                  pendingBookings.map((b) => (
                    <div
                      key={b.id}
                      onClick={() => {
                        if (onSelectBooking) onSelectBooking(b);
                        setNotificationsOpen(false);
                      }}
                      className="p-2.5 rounded-xl bg-[#FFF7ED] hover:bg-orange-100 border border-orange-200/80 transition-colors cursor-pointer text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <strong className="text-[#7C2D12]">{b.clientName}</strong>
                        <span className="text-[10px] font-bold text-[#EA580C] uppercase">{b.consultationMode}</span>
                      </div>
                      <p className="text-[11px] text-[#9A3412] truncate">{b.serviceTitle}</p>
                      <div className="text-[10px] text-stone-500 flex items-center justify-between">
                        <span>Slot: {b.preferredDate}</span>
                        <span className="text-amber-700 font-semibold">{b.feeAmount}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Admin Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            type="button"
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-orange-100 transition-colors cursor-pointer border border-transparent hover:border-orange-200"
          >
            <div className="w-8 h-8 rounded-full bg-[#7C2D12] text-amber-200 font-bold text-xs flex items-center justify-center shadow-2xs">
              {adminUser?.name ? adminUser.name[0] : 'A'}
            </div>
            <div className="hidden md:block text-left leading-tight">
              <div className="text-xs font-bold text-[#7C2D12]">{adminUser?.name || 'Administrator'}</div>
              <div className="text-[10px] text-[#EA580C] uppercase font-semibold">
                {role === 'superadmin' ? 'Superadmin' : 'Clinic Lead'}
              </div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-[#9A3412]" />
          </button>

          {/* Profile Dropdown Menu */}
          {profileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white border border-orange-200 rounded-2xl shadow-xl p-3 space-y-2 z-50 animate-in fade-in zoom-in-95 duration-150 text-left">
              <div className="p-2 bg-[#FFF7ED] rounded-xl border border-orange-200/80">
                <div className="font-playfair font-bold text-xs text-[#7C2D12]">{adminUser?.name}</div>
                <div className="text-[10px] text-[#9A3412]">{adminUser?.email}</div>
                <div className="text-[10px] text-stone-500 mt-1">{adminUser?.title}</div>
              </div>

              <div className="space-y-1">
                <button
                  type="button"
                  onClick={() => {
                    setProfileDropdownOpen(false);
                    onExitPortal();
                  }}
                  className="w-full flex items-center gap-2 p-2 rounded-lg text-xs text-[#7C2D12] hover:bg-orange-50 transition-colors cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[#EA580C]" />
                  <span>View Public Website</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setProfileDropdownOpen(false);
                    logout();
                  }}
                  className="w-full flex items-center gap-2 p-2 rounded-lg text-xs text-red-700 hover:bg-red-50 transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5 text-red-600" />
                  <span>Sign Out of Portal</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
