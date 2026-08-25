import React, { useState } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { adminService } from '../../services/adminService';
import { DOCTOR_INFO } from '../../data/brandData';
import { 
  Settings, 
  ShieldCheck, 
  Clock, 
  Phone, 
  Mail, 
  MapPin, 
  Download, 
  Upload, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle,
  Lock,
  Key,
  Users
} from 'lucide-react';

interface AdminSettingsProps {
  onNotify: (msg: string, type: 'success' | 'error' | 'info') => void;
}

export const AdminSettings: React.FC<AdminSettingsProps> = ({ onNotify }) => {
  const { adminUser, role } = useAdminAuth();
  const [settings, setSettings] = useState(adminService.getClinicSettings());
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    adminService.saveClinicSettings(settings);
    setSavedSuccess(true);
    onNotify('Clinic operational parameters saved successfully.', 'success');
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleDownloadFullBackup = () => {
    const data = {
      exportedAt: new Date().toISOString(),
      version: '2.0.0',
      clinicSettings: adminService.getClinicSettings(),
      bookings: adminService.getBookings(),
      kundliLogs: adminService.getKundliLogs(),
      lalKitabRemedies: adminService.getLalKitabRemedies(),
      vastuRules: adminService.getVastuRules()
    };
    const jsonStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data, null, 2));
    const link = document.createElement('a');
    link.setAttribute('href', jsonStr);
    link.setAttribute('download', `dr_preeti_sehgal_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onNotify('Full database backup snapshot downloaded.', 'info');
  };

  const handleRestoreBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], 'UTF-8');
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (parsed.bookings) {
            localStorage.setItem('dr_preeti_sehgal_admin_bookings', JSON.stringify(parsed.bookings));
          }
          if (parsed.kundliLogs) {
            localStorage.setItem('dr_preeti_sehgal_kundli_logs', JSON.stringify(parsed.kundliLogs));
          }
          if (parsed.lalKitabRemedies) {
            localStorage.setItem('dr_preeti_sehgal_lalkitab_upays', JSON.stringify(parsed.lalKitabRemedies));
          }
          if (parsed.vastuRules) {
            localStorage.setItem('dr_preeti_sehgal_vastu_rules', JSON.stringify(parsed.vastuRules));
          }
          onNotify('Database successfully restored from backup! Refreshing...', 'success');
          setTimeout(() => window.location.reload(), 1200);
        } catch (err) {
          onNotify('Failed to parse backup JSON file.', 'error');
        }
      };
    }
  };

  return (
    <div className="space-y-6 pb-12 text-left">
      {/* 1. Header */}
      <div>
        <h2 className="font-playfair text-xl font-bold text-[#7C2D12]">
          Clinic Settings & Administration
        </h2>
        <p className="text-xs text-[#9A3412]">
          Manage operating hours, communication helplines, chamber fee schedules, and data backups.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Form */}
        <form onSubmit={handleSaveSettings} className="lg:col-span-2 space-y-6">
          
          {/* General Clinic Information */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-orange-200/90 shadow-2xs space-y-4">
            <h3 className="font-playfair text-base font-bold text-[#7C2D12] flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#EA580C]" />
              Official Clinic & Chamber Coordinates
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-[11px] font-bold uppercase text-stone-600">Clinic Name</label>
                <input
                  type="text"
                  value={settings.clinicName}
                  onChange={(e) => setSettings({ ...settings, clinicName: e.target.value })}
                  className="w-full p-2.5 bg-[#FFF9F2] border border-orange-200 rounded-xl text-xs text-[#7C2D12] focus:outline-none focus:border-[#EA580C]"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[11px] font-bold uppercase text-stone-600">Lead Consultant</label>
                <input
                  type="text"
                  value={settings.doctorName}
                  onChange={(e) => setSettings({ ...settings, doctorName: e.target.value })}
                  className="w-full p-2.5 bg-[#FFF9F2] border border-orange-200 rounded-xl text-xs text-[#7C2D12] focus:outline-none focus:border-[#EA580C]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-[11px] font-bold uppercase text-stone-600">Direct Helpline Phone</label>
                <input
                  type="text"
                  value={settings.primaryPhone}
                  onChange={(e) => setSettings({ ...settings, primaryPhone: e.target.value })}
                  className="w-full p-2.5 bg-[#FFF9F2] border border-orange-200 rounded-xl text-xs text-[#7C2D12] focus:outline-none focus:border-[#EA580C]"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[11px] font-bold uppercase text-stone-600">WhatsApp Notification Number</label>
                <input
                  type="text"
                  value={settings.whatsappNumber}
                  onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                  className="w-full p-2.5 bg-[#FFF9F2] border border-orange-200 rounded-xl text-xs text-[#7C2D12] focus:outline-none focus:border-[#EA580C]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-[11px] font-bold uppercase text-stone-600">Email Address</label>
                <input
                  type="email"
                  value={settings.email}
                  onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                  className="w-full p-2.5 bg-[#FFF9F2] border border-orange-200 rounded-xl text-xs text-[#7C2D12] focus:outline-none focus:border-[#EA580C]"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[11px] font-bold uppercase text-stone-600">Operating Chambers Schedule</label>
                <input
                  type="text"
                  value={settings.operatingHours}
                  onChange={(e) => setSettings({ ...settings, operatingHours: e.target.value })}
                  className="w-full p-2.5 bg-[#FFF9F2] border border-orange-200 rounded-xl text-xs text-[#7C2D12] focus:outline-none focus:border-[#EA580C]"
                />
              </div>
            </div>
          </div>

          {/* Consultation Fee Schedules */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-orange-200/90 shadow-2xs space-y-4">
            <h3 className="font-playfair text-base font-bold text-[#7C2D12] flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#EA580C]" />
              Default Consultation Fee Schedules
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="block text-[11px] font-bold uppercase text-stone-600">Vedic Kundli Deep Dive</label>
                <input
                  type="text"
                  value={settings.consultationFees.vedicKundli}
                  onChange={(e) => setSettings({
                    ...settings,
                    consultationFees: { ...settings.consultationFees, vedicKundli: e.target.value }
                  })}
                  className="w-full p-2.5 bg-[#FFF9F2] border border-orange-200 rounded-xl text-xs text-[#7C2D12] focus:outline-none focus:border-[#EA580C]"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[11px] font-bold uppercase text-stone-600">Kundli Milan (Matchmaking)</label>
                <input
                  type="text"
                  value={settings.consultationFees.kundliMilan}
                  onChange={(e) => setSettings({
                    ...settings,
                    consultationFees: { ...settings.consultationFees, kundliMilan: e.target.value }
                  })}
                  className="w-full p-2.5 bg-[#FFF9F2] border border-orange-200 rounded-xl text-xs text-[#7C2D12] focus:outline-none focus:border-[#EA580C]"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[11px] font-bold uppercase text-stone-600">Vastu Site Audit</label>
                <input
                  type="text"
                  value={settings.consultationFees.vastuAudit}
                  onChange={(e) => setSettings({
                    ...settings,
                    consultationFees: { ...settings.consultationFees, vastuAudit: e.target.value }
                  })}
                  className="w-full p-2.5 bg-[#FFF9F2] border border-orange-200 rounded-xl text-xs text-[#7C2D12] focus:outline-none focus:border-[#EA580C]"
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex items-center justify-between">
            {savedSuccess && (
              <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                Settings saved successfully!
              </span>
            )}
            <button
              type="submit"
              className="ml-auto px-6 py-2.5 rounded-xl font-bold uppercase tracking-wider text-xs bg-[#EA580C] hover:bg-[#C2410C] text-white shadow-xs transition-colors cursor-pointer"
            >
              Save Clinic Settings
            </button>
          </div>
        </form>

        {/* Right 1 Col: Security, Users & Backups */}
        <div className="space-y-6">
          {/* Active Admin Identity */}
          <div className="p-5 rounded-2xl bg-white border border-orange-200/90 shadow-2xs space-y-3">
            <h3 className="font-playfair text-sm font-bold text-[#7C2D12] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#EA580C]" />
              Authorized Account Roles
            </h3>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-orange-50 border border-orange-200">
                <div className="font-bold text-[#7C2D12]">Dr. Preeti Sehgal (Superadmin)</div>
                <div className="text-[10px] text-stone-500 font-mono">admin@preetisehgal.com</div>
                <div className="text-[10px] text-[#EA580C] mt-0.5">Full CRUD & Config Rights</div>
              </div>

              <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
                <div className="font-bold text-stone-800">Clinic Front Desk (Manager)</div>
                <div className="text-[10px] text-stone-500 font-mono">manager@preetisehgal.com</div>
                <div className="text-[10px] text-stone-500 mt-0.5">Bookings & Logs Access</div>
              </div>
            </div>

            <div className="text-[11px] text-stone-500 pt-1">
              Protected by local session inactivity timeout (30 minutes).
            </div>
          </div>

          {/* Database & Backup Operations */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-[#7C2D12] to-[#431407] text-white shadow-md space-y-3">
            <h3 className="font-playfair font-bold text-sm text-amber-200 flex items-center gap-2">
              <Download className="w-4 h-4 text-[#F97316]" />
              Data Snapshot & Recovery
            </h3>
            <p className="text-xs text-orange-200/90 leading-relaxed">
              Export all appointment logs, client dossiers, custom Lal Kitab prescriptions, and Vastu rules.
            </p>

            <div className="pt-2 space-y-2">
              <button
                type="button"
                onClick={handleDownloadFullBackup}
                className="w-full py-2.5 px-3 rounded-xl font-bold uppercase tracking-wider text-xs bg-[#EA580C] hover:bg-[#F97316] text-white shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Export Full Backup (.JSON)</span>
              </button>

              <label className="w-full py-2 px-3 rounded-xl font-semibold text-xs bg-white/10 hover:bg-white/20 text-orange-100 transition-colors flex items-center justify-center gap-2 cursor-pointer text-center">
                <Upload className="w-4 h-4" />
                <span>Restore from JSON File</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleRestoreBackup}
                  className="hidden"
                />
              </label>

              <button
                type="button"
                onClick={() => {
                  if (confirm('Clear all mock storage and reset back to initial seed data?')) {
                    localStorage.removeItem('dr_preeti_sehgal_admin_bookings');
                    localStorage.removeItem('dr_preeti_sehgal_kundli_logs');
                    localStorage.removeItem('dr_preeti_sehgal_lalkitab_upays');
                    localStorage.removeItem('dr_preeti_sehgal_vastu_rules');
                    onNotify('Database reset to fresh demo seeds.', 'info');
                    setTimeout(() => window.location.reload(), 1000);
                  }
                }}
                className="w-full py-1.5 text-[10px] text-orange-300 hover:text-red-300 transition-colors"
              >
                Reset Database to Fresh Seeds
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
