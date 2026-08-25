import React from 'react';
import { BrandLogo } from '../BrandLogo';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { AdminTab } from '../../types';
import { 
  LayoutDashboard, 
  CalendarDays, 
  Sparkles, 
  BookOpen, 
  Compass, 
  Settings, 
  LogOut, 
  ShieldCheck, 
  UserCheck, 
  Clock, 
  ExternalLink,
  ChevronRight,
  Database
} from 'lucide-react';

interface AdminSidebarProps {
  activeTab: AdminTab;
  onSelectTab: (tab: AdminTab) => void;
  pendingBookingsCount?: number;
  onExitPortal: () => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeTab,
  onSelectTab,
  pendingBookingsCount = 0,
  onExitPortal,
  isMobileOpen = false,
  onCloseMobile
}) => {
  const { adminUser, logout, role, timeRemainingMinutes } = useAdminAuth();

  const navItems: { id: AdminTab; label: string; icon: React.ReactNode; badge?: number; description: string }[] = [
    {
      id: 'dashboard',
      label: 'Dashboard Overview',
      icon: <LayoutDashboard className="w-4 h-4" />,
      description: 'Clinic metrics & summary'
    },
    {
      id: 'bookings',
      label: 'Consultation Bookings',
      icon: <CalendarDays className="w-4 h-4" />,
      badge: pendingBookingsCount,
      description: 'Appointments & slots'
    },
    {
      id: 'analytics',
      label: 'Kundli Engine Logs',
      icon: <Sparkles className="w-4 h-4" />,
      description: 'Dosha diagnostics & traffic'
    },
    {
      id: 'content-lalkitab',
      label: 'Lal Kitab Remedies CMS',
      icon: <BookOpen className="w-4 h-4" />,
      description: 'Manage upays & parhez'
    },
    {
      id: 'content-vastu',
      label: 'Vastu Shastra CMS',
      icon: <Compass className="w-4 h-4" />,
      description: '8-Direction guidelines'
    },
    {
      id: 'settings',
      label: 'Clinic Settings & Data',
      icon: <Settings className="w-4 h-4" />,
      description: 'Security & backups'
    }
  ];

  const handleNavClick = (tabId: AdminTab) => {
    onSelectTab(tabId);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs md:hidden"
        />
      )}

      <aside
        id="admin-sidebar"
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-[#2D0F08] text-white flex flex-col justify-between border-r border-orange-500/20 shadow-2xl transition-transform duration-300 md:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top Brand Header */}
        <div className="p-5 border-b border-orange-500/20 space-y-3">
          <BrandLogo variant="light" size="sm" />
          <div className="flex items-center justify-between pt-1">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-orange-500/20 text-orange-200 border border-orange-400/30">
              <ShieldCheck className="w-3 h-3 text-[#F97316]" />
              <span>Admin Portal &bull; CMS</span>
            </span>
            <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
              role === 'superadmin' ? 'bg-amber-400 text-stone-900' : 'bg-orange-300 text-stone-900'
            }`}>
              {role === 'superadmin' ? 'Superadmin' : 'Manager'}
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto p-3.5 space-y-1.5 custom-scrollbar">
          <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-orange-300/60">
            Core Modules
          </div>

          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all cursor-pointer group ${
                  isActive
                    ? 'bg-gradient-to-r from-[#EA580C] to-[#F97316] text-white shadow-md shadow-orange-950/40 font-semibold'
                    : 'text-orange-100/80 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`p-1.5 rounded-lg ${isActive ? 'bg-white/20 text-white' : 'bg-orange-950/60 text-orange-300 group-hover:text-white'}`}>
                    {item.icon}
                  </div>
                  <div className="truncate">
                    <div className="text-xs font-bold truncate leading-tight">{item.label}</div>
                    <div className={`text-[10px] truncate ${isActive ? 'text-orange-100' : 'text-orange-300/60'}`}>
                      {item.description}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-stone-950 shadow-xs animate-pulse">
                      {item.badge}
                    </span>
                  )}
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-white/80" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Bottom User Info & Footer Actions */}
        <div className="p-3.5 border-t border-orange-500/20 space-y-3 bg-black/20">
          {/* Admin User Card */}
          {adminUser && (
            <div className="p-2.5 rounded-xl bg-orange-950/40 border border-orange-400/20 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-full bg-[#EA580C] text-white font-bold text-xs flex items-center justify-center border border-amber-300 shrink-0 shadow-xs">
                  {adminUser.name[0]}
                </div>
                <div className="truncate text-left">
                  <div className="text-xs font-bold text-white truncate">{adminUser.name}</div>
                  <div className="text-[10px] text-orange-200/70 truncate">{adminUser.email}</div>
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="flex items-center gap-1 text-[9px] text-emerald-400 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>Online</span>
                </div>
              </div>
            </div>
          )}

          {/* Session Inactivity Badge */}
          <div className="flex items-center justify-between text-[10px] text-orange-200/60 px-1 font-mono">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-orange-400" />
              <span>Idle Timeout:</span>
            </span>
            <span className="text-amber-300 font-bold">{timeRemainingMinutes}m left</span>
          </div>

          {/* Action Buttons: Public Site & Logout */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={onExitPortal}
              className="py-2 px-2.5 rounded-xl text-[11px] font-semibold text-orange-200 hover:text-white bg-white/5 hover:bg-white/10 border border-orange-400/20 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Public Site</span>
            </button>

            <button
              type="button"
              onClick={() => logout()}
              className="py-2 px-2.5 rounded-xl text-[11px] font-semibold text-red-200 hover:text-white bg-red-950/40 hover:bg-red-900/60 border border-red-500/30 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5 text-red-400" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
