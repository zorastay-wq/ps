import React, { useState, useEffect } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { adminService } from '../../services/adminService';
import { AdminTab, AdminBooking, LalKitabRemedy, VastuDirectionRule } from '../../types';
import { AdminSidebar } from './AdminSidebar';
import { AdminHeader } from './AdminHeader';
import { AdminDashboardOverview } from './AdminDashboardOverview';
import { AdminBookingsManager } from './AdminBookingsManager';
import { AdminKundliLogs } from './AdminKundliLogs';
import { AdminLalKitabCMS } from './AdminLalKitabCMS';
import { AdminVastuCMS } from './AdminVastuCMS';
import { AdminSettings } from './AdminSettings';
import { useToast } from '../../context/ToastContext';

interface AdminLayoutProps {
  onExitPortal: () => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ onExitPortal }) => {
  const { adminUser } = useAdminAuth();
  const { showSuccess, showInfo, showError } = useToast();

  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

  // Live Data State
  const [bookings, setBookings] = useState<AdminBooking[]>([]);
  const [kundliLogs, setKundliLogs] = useState(adminService.getKundliLogs());
  const [lalKitabRemedies, setLalKitabRemedies] = useState<LalKitabRemedy[]>([]);
  const [vastuRules, setVastuRules] = useState<VastuDirectionRule[]>([]);
  const [bookingStats, setBookingStats] = useState(adminService.getBookingStats());
  const [kundliAnalytics, setKundliAnalytics] = useState(adminService.getKundliAnalytics());

  // Quick Action Modal trigger in Bookings Manager
  const [isNewBookingModalOpen, setIsNewBookingModalOpen] = useState(false);

  // Load state on mount
  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    setBookings(adminService.getBookings());
    setKundliLogs(adminService.getKundliLogs());
    setLalKitabRemedies(adminService.getLalKitabRemedies());
    setVastuRules(adminService.getVastuRules());
    setBookingStats(adminService.getBookingStats());
    setKundliAnalytics(adminService.getKundliAnalytics());
  };

  // Handlers for Bookings
  const handleUpdateBookingStatus = (id: string, status: AdminBooking['status'], notes?: string) => {
    const updated = adminService.updateBookingStatus(id, status, notes);
    if (updated) {
      refreshData();
      showSuccess(`Status Updated`, `Appointment status updated to "${status.toUpperCase()}".`);
    }
  };

  const handleRescheduleBooking = (id: string, newDate: string, newSlot: string, notes?: string) => {
    const updated = adminService.rescheduleBooking(id, newDate, newSlot, notes);
    if (updated) {
      refreshData();
      showSuccess(`Appointment Rescheduled`, `Successfully rescheduled to ${newDate}.`);
    }
  };

  const handleCreateBooking = (data: Omit<AdminBooking, 'id' | 'createdAt'>) => {
    const created = adminService.createBooking(data);
    refreshData();
    showSuccess(`Consultation Booked`, `New consultation for ${created.clientName} created successfully.`);
  };

  const handleDeleteBooking = (id: string) => {
    const deleted = adminService.deleteBooking(id);
    if (deleted) {
      refreshData();
      showInfo('Booking Deleted', 'The booking has been removed from schedule.');
    }
  };

  // Handlers for Lal Kitab CMS
  const handleSaveLalKitabRemedy = (remedy: LalKitabRemedy) => {
    adminService.saveLalKitabRemedy(remedy);
    refreshData();
    showSuccess('Remedy Saved', `Lal Kitab Upay "${remedy.title}" saved successfully.`);
  };

  const handleDeleteLalKitabRemedy = (id: string) => {
    adminService.deleteLalKitabRemedy(id);
    refreshData();
    showInfo('Remedy Removed', 'Lal Kitab remedy removed from catalog.');
  };

  const handleResetLalKitabDefaults = () => {
    adminService.resetLalKitabRemedies();
    refreshData();
    showInfo('Defaults Restored', 'Lal Kitab catalog restored to classical prescriptions.');
  };

  // Handlers for Vastu CMS
  const handleSaveVastuRule = (rule: VastuDirectionRule) => {
    adminService.saveVastuRule(rule);
    refreshData();
    showSuccess('Vastu Updated', `Vastu direction "${rule.direction}" guidelines updated.`);
  };

  const handleResetVastuDefaults = () => {
    adminService.resetVastuRules();
    refreshData();
    showInfo('Defaults Restored', 'Vastu guidelines reset to canonical 8-direction rules.');
  };

  const pendingBookings = bookings.filter((b) => b.status === 'pending');

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-stone-900 flex flex-col md:flex-row">
      {/* 1. Sidebar Navigation */}
      <AdminSidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        pendingBookingsCount={pendingBookings.length}
        onExitPortal={onExitPortal}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* 2. Main Content Area */}
      <div className="flex-1 md:pl-72 flex flex-col min-w-0">
        {/* Top Header */}
        <AdminHeader
          activeTab={activeTab}
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
          onOpenNewBookingModal={() => {
            setActiveTab('bookings');
            // Trigger new booking in BookingsManager
            setIsNewBookingModalOpen(true);
          }}
          onExitPortal={onExitPortal}
          pendingBookings={pendingBookings}
          onSelectBooking={(b) => {
            setActiveTab('bookings');
          }}
        />

        {/* Dynamic Page View Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {activeTab === 'dashboard' && (
            <AdminDashboardOverview
              stats={bookingStats}
              analytics={kundliAnalytics}
              recentBookings={bookings}
              onSelectTab={setActiveTab}
              onOpenNewBookingModal={() => {
                setActiveTab('bookings');
              }}
              onViewBookingDetails={() => {
                setActiveTab('bookings');
              }}
              onQuickApproveBooking={(id) => {
                handleUpdateBookingStatus(id, 'confirmed');
              }}
            />
          )}

          {activeTab === 'bookings' && (
            <AdminBookingsManager
              bookings={bookings}
              onUpdateStatus={handleUpdateBookingStatus}
              onReschedule={handleRescheduleBooking}
              onCreateBooking={handleCreateBooking}
              onDeleteBooking={handleDeleteBooking}
            />
          )}

          {activeTab === 'analytics' && (
            <AdminKundliLogs
              logs={kundliLogs}
              analytics={kundliAnalytics}
            />
          )}

          {activeTab === 'content-lalkitab' && (
            <AdminLalKitabCMS
              remedies={lalKitabRemedies}
              onSaveRemedy={handleSaveLalKitabRemedy}
              onDeleteRemedy={handleDeleteLalKitabRemedy}
              onResetDefaults={handleResetLalKitabDefaults}
            />
          )}

          {activeTab === 'content-vastu' && (
            <AdminVastuCMS
              directions={vastuRules}
              onSaveDirection={handleSaveVastuRule}
              onResetDefaults={handleResetVastuDefaults}
            />
          )}

          {activeTab === 'settings' && (
            <AdminSettings
              onNotify={(msg, type) => {
                if (type === 'success') showSuccess('Settings Saved', msg);
                else if (type === 'error') showError('Settings Error', msg);
                else showInfo('Settings Info', msg);
              }}
            />
          )}
        </main>
      </div>
    </div>
  );
};
