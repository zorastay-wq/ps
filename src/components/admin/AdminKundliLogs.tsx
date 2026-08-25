import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { KundliEngineLog, KundliAnalyticsSummary } from '../../types';
import { 
  Sparkles, 
  Search, 
  Filter, 
  Download, 
  Flame, 
  Compass, 
  BookOpen, 
  ShieldAlert, 
  MapPin, 
  Clock, 
  Calendar, 
  X, 
  Eye, 
  CheckCircle2, 
  TrendingUp,
  Activity,
  Layers
} from 'lucide-react';

interface AdminKundliLogsProps {
  logs: KundliEngineLog[];
  analytics: KundliAnalyticsSummary;
}

export const AdminKundliLogs: React.FC<AdminKundliLogsProps> = ({ logs, analytics }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDoshaFilter, setSelectedDoshaFilter] = useState<'all' | 'manglik' | 'sadesati' | 'kaalsarp'>('all');
  const [selectedLog, setSelectedLog] = useState<KundliEngineLog | null>(null);

  const filteredLogs = logs.filter((log) => {
    const matchDosha =
      selectedDoshaFilter === 'all' ||
      (selectedDoshaFilter === 'manglik' && log.isManglik) ||
      (selectedDoshaFilter === 'sadesati' && log.hasSadeSati) ||
      (selectedDoshaFilter === 'kaalsarp' && log.hasKaalSarp);

    const q = searchQuery.toLowerCase();
    const matchSearch =
      log.nativeName.toLowerCase().includes(q) ||
      log.pob.toLowerCase().includes(q) ||
      log.ascendant.toLowerCase().includes(q) ||
      log.moonSign.toLowerCase().includes(q) ||
      log.nakshatra.toLowerCase().includes(q) ||
      log.manglikStatus.toLowerCase().includes(q) ||
      log.sadeSatiStatus.toLowerCase().includes(q);

    return matchDosha && matchSearch;
  });

  const handleExportCSV = () => {
    const headers = ['Log ID,Native Name,Gender,DOB,TOB,POB,Ascendant,Moon Sign,Nakshatra,Manglik,Sade Sati,Kaal Sarp,Calculated At'];
    const rows = filteredLogs.map((l) =>
      `"${l.id}","${l.nativeName}","${l.gender}","${l.dob}","${l.tob}","${l.pob}","${l.ascendant}","${l.moonSign}","${l.nakshatra}","${l.manglikStatus}","${l.sadeSatiStatus}","${l.kaalSarpStatus}","${l.calculatedAt}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `dr_preeti_sehgal_kundli_logs_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 pb-12 text-left">
      {/* 1. Module Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="font-playfair text-xl font-bold text-[#7C2D12]">
            Free Kundli Engine Telemetry & Dosha Trends
          </h2>
          <p className="text-xs text-[#9A3412]">
            Anonymous audit logs of Vedic Janam Kundlis and astrological doshas diagnosed on the public visualizer.
          </p>
        </div>

        <button
          type="button"
          onClick={handleExportCSV}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-[#7C2D12] bg-white hover:bg-orange-50 border border-orange-200 shadow-2xs transition-colors cursor-pointer self-start md:self-auto"
        >
          <Download className="w-3.5 h-3.5 text-[#EA580C]" />
          <span>Export Analytics CSV</span>
        </button>
      </div>

      {/* 2. Dosha Analytics Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Calculations */}
        <div className="p-5 rounded-2xl bg-white border border-orange-200/90 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#9A3412]">Calculations Logged</span>
            <Activity className="w-4 h-4 text-[#EA580C]" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-playfair text-[#7C2D12]">
            {analytics.totalCalculated}
          </div>
          <div className="text-[11px] text-stone-500 font-mono">
            {analytics.todayCalculated} computed today &bull; Live engine
          </div>
        </div>

        {/* Manglik Prevalence */}
        <div className="p-5 rounded-2xl bg-white border border-orange-200/90 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-rose-800">Manglik Dosha Rate</span>
            <Flame className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-playfair text-rose-600">
            {analytics.manglikPercentage}%
          </div>
          <div className="text-[11px] text-stone-500">
            Mars in Houses 1, 4, 7, 8, or 12
          </div>
        </div>

        {/* Sade Sati Prevalence */}
        <div className="p-5 rounded-2xl bg-white border border-orange-200/90 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-blue-800">Shani Sade Sati / Dhaiya</span>
            <Compass className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-playfair text-blue-600">
            {analytics.sadeSatiPercentage}%
          </div>
          <div className="text-[11px] text-stone-500">
            Saturn transiting 12th, 1st, 2nd from Moon
          </div>
        </div>

        {/* Kaal Sarp Prevalence */}
        <div className="p-5 rounded-2xl bg-white border border-orange-200/90 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-purple-800">Kaal Sarp Yoga</span>
            <Sparkles className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-playfair text-purple-600">
            {analytics.kaalSarpPercentage}%
          </div>
          <div className="text-[11px] text-stone-500">
            Planets hemmed between Rahu-Ketu
          </div>
        </div>
      </div>

      {/* 3. Ascendant and Geographical Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Top Ascendant Signs */}
        <div className="p-5 rounded-2xl bg-white border border-orange-200/90 shadow-2xs space-y-3">
          <h3 className="font-playfair text-sm font-bold text-[#7C2D12] flex items-center justify-between">
            <span>Top Detected Ascendant Rashis (Lagna)</span>
            <Layers className="w-4 h-4 text-[#EA580C]" />
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {analytics.topAscendants.map((asc) => (
              <div key={asc.name} className="p-2.5 rounded-xl bg-[#FFF9F2] border border-orange-100 space-y-0.5">
                <div className="text-xs font-bold text-[#7C2D12]">{asc.name}</div>
                <div className="text-[10px] text-stone-500 flex items-center justify-between">
                  <span>{asc.count} users</span>
                  <span className="font-semibold text-[#EA580C]">{asc.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top User Cities */}
        <div className="p-5 rounded-2xl bg-white border border-orange-200/90 shadow-2xs space-y-3">
          <h3 className="font-playfair text-sm font-bold text-[#7C2D12] flex items-center justify-between">
            <span>Top Geographical Hubs (Birth Coordinates)</span>
            <MapPin className="w-4 h-4 text-[#EA580C]" />
          </h3>
          <div className="flex flex-wrap gap-2">
            {analytics.topCities.map((city) => (
              <div key={city.name} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FFF7ED] border border-orange-200 text-xs text-[#7C2D12]">
                <MapPin className="w-3 h-3 text-[#EA580C]" />
                <span className="font-bold">{city.name}</span>
                <span className="text-[10px] text-stone-500 font-mono">({city.count})</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Filter & Search Bar */}
      <div className="p-4 rounded-2xl bg-white border border-orange-200/90 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by native name, city, sign..."
            className="w-full pl-8 pr-3 py-2 bg-[#FFF9F2] border border-orange-200 rounded-xl text-xs text-[#7C2D12] placeholder-stone-400 focus:outline-none focus:border-[#EA580C]"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
          <span className="text-[11px] font-semibold text-stone-500 shrink-0">Filter Dosha:</span>
          {(['all', 'manglik', 'sadesati', 'kaalsarp'] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setSelectedDoshaFilter(mode)}
              className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold uppercase tracking-wider shrink-0 transition-colors cursor-pointer ${
                selectedDoshaFilter === mode
                  ? 'bg-[#EA580C] text-white shadow-2xs'
                  : 'bg-[#FFF9F2] text-stone-700 hover:bg-orange-100 border border-orange-200'
              }`}
            >
              {mode === 'all' ? 'All Logs' : mode === 'manglik' ? 'Manglik Only' : mode === 'sadesati' ? 'Sade Sati' : 'Kaal Sarp'}
            </button>
          ))}
        </div>
      </div>

      {/* 5. Logs Data Table */}
      <div className="rounded-2xl bg-white border border-orange-200/90 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-orange-100 text-[11px] uppercase tracking-wider text-stone-500 bg-[#FFFDF9]">
                <th className="py-3 px-4 font-semibold">Native & Location</th>
                <th className="py-3 px-4 font-semibold">Ascendant (Lagna)</th>
                <th className="py-3 px-4 font-semibold">Moon Sign & Nakshatra</th>
                <th className="py-3 px-4 font-semibold">Manglik Status</th>
                <th className="py-3 px-4 font-semibold">Shani / Kaal Sarp</th>
                <th className="py-3 px-4 font-semibold">Calculated</th>
                <th className="py-3 px-4 font-semibold text-right">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-orange-50">
              {filteredLogs.map((log) => (
                <tr
                  key={log.id}
                  onClick={() => setSelectedLog(log)}
                  className="hover:bg-[#FFF9F2]/80 transition-colors cursor-pointer"
                >
                  {/* Native & Place */}
                  <td className="py-3 px-4">
                    <div className="font-bold text-[#7C2D12]">{log.nativeName}</div>
                    <div className="text-[10px] text-stone-500">{log.pob}</div>
                  </td>

                  {/* Ascendant */}
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-amber-50 border border-amber-200 text-[#7C2D12] font-semibold text-[11px]">
                      {log.ascendant}
                    </span>
                  </td>

                  {/* Moon Sign & Nakshatra */}
                  <td className="py-3 px-4">
                    <div className="font-semibold text-stone-800">{log.moonSign}</div>
                    <div className="text-[10px] text-stone-500">{log.nakshatra}</div>
                  </td>

                  {/* Manglik */}
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      log.isManglik
                        ? 'bg-rose-100 text-rose-900 border border-rose-300'
                        : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                    }`}>
                      {log.isManglik ? 'Manglik' : 'Non-Manglik'}
                    </span>
                  </td>

                  {/* Shani / Kaal Sarp */}
                  <td className="py-3 px-4 space-y-0.5">
                    <div className="text-[11px] font-medium text-stone-700">{log.sadeSatiStatus}</div>
                    {log.hasKaalSarp && (
                      <span className="text-[9px] font-bold text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded border border-purple-200">
                        {log.kaalSarpStatus}
                      </span>
                    )}
                  </td>

                  {/* Time */}
                  <td className="py-3 px-4 text-stone-500 text-[10px] font-mono">
                    {new Date(log.calculatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </td>

                  {/* Inspect Button */}
                  <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      onClick={() => setSelectedLog(log)}
                      className="p-1.5 rounded-lg text-[#7C2D12] hover:bg-orange-100 transition-colors cursor-pointer"
                      title="Inspect Astrological Diagnostics"
                    >
                      <Eye className="w-4 h-4 text-[#EA580C]" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 6. DETAIL INSPECTION MODAL */}
      <AnimatePresence>
        {selectedLog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl border border-orange-200 max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-5 text-left"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#EA580C]">
                    Kundli Calculation Telemetry &bull; {selectedLog.id}
                  </span>
                  <h3 className="font-playfair text-xl font-bold text-[#7C2D12]">
                    {selectedLog.nativeName}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedLog(null)}
                  className="p-1 rounded-full text-stone-400 hover:text-stone-700 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 bg-[#FFF9F2] p-4 rounded-2xl border border-orange-100 text-xs">
                <div>
                  <span className="text-[10px] uppercase text-stone-400 font-bold">Birth Date & Time</span>
                  <div className="font-semibold text-stone-800">{selectedLog.dob} at {selectedLog.tob}</div>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-stone-400 font-bold">Birth Place</span>
                  <div className="font-semibold text-stone-800">{selectedLog.pob}</div>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-stone-400 font-bold">Ascendant (Lagna)</span>
                  <div className="font-bold text-[#7C2D12]">{selectedLog.ascendant}</div>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-stone-400 font-bold">Moon Sign & Nakshatra</span>
                  <div className="font-bold text-stone-800">{selectedLog.moonSign} &bull; {selectedLog.nakshatra}</div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#7C2D12]">
                  Diagnosed Planetary Doshas & Yogas
                </h4>

                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs space-y-1">
                  <div className="font-bold text-rose-900 flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-rose-600" />
                    Manglik Dosha Evaluation:
                  </div>
                  <p className="text-rose-800">{selectedLog.manglikStatus}</p>
                </div>

                <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-xs space-y-1">
                  <div className="font-bold text-blue-900 flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-blue-600" />
                    Shani Sade Sati Status:
                  </div>
                  <p className="text-blue-800">{selectedLog.sadeSatiStatus}</p>
                </div>

                <div className="p-3 rounded-xl bg-purple-50 border border-purple-200 text-xs space-y-1">
                  <div className="font-bold text-purple-900 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                    Kaal Sarp Yoga Assessment:
                  </div>
                  <p className="text-purple-800">{selectedLog.kaalSarpStatus}</p>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedLog(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 cursor-pointer"
                >
                  Close Inspection
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
