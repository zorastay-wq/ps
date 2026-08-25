import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LalKitabRemedy } from '../../types';
import { 
  BookOpen, 
  Search, 
  Filter, 
  Plus, 
  Edit3, 
  Trash2, 
  RotateCcw, 
  Sparkles, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldAlert, 
  X, 
  Calendar,
  Layers,
  Flame
} from 'lucide-react';

interface AdminLalKitabCMSProps {
  remedies: LalKitabRemedy[];
  onSaveRemedy: (remedy: LalKitabRemedy) => void;
  onDeleteRemedy: (id: string) => void;
  onResetDefaults: () => void;
}

export const AdminLalKitabCMS: React.FC<AdminLalKitabCMSProps> = ({
  remedies,
  onSaveRemedy,
  onDeleteRemedy,
  onResetDefaults
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPlanet, setSelectedPlanet] = useState<string>('all');
  const [editingRemedy, setEditingRemedy] = useState<LalKitabRemedy | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  // Form State for Adding / Editing Upay
  const [formState, setFormState] = useState<LalKitabRemedy>({
    id: '',
    title: '',
    hindiTitle: '',
    category: 'wealth',
    planet: 'Sun',
    issue: '',
    remedy: '',
    duration: '43 Consecutive Days without interruption',
    precautions: ['Do not consume non-vegetarian food or alcohol during the 43-day cycle.'],
    auspiciousDay: 'Sunday morning during Surya Hora'
  });

  const [precautionInput, setPrecautionInput] = useState('');

  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'wealth', label: 'Wealth & Debt' },
    { id: 'marriage', label: 'Marriage & Love' },
    { id: 'career', label: 'Job & Business' },
    { id: 'protection', label: 'Nazar & Evil Eye' },
    { id: 'children', label: 'Children & Studies' },
    { id: 'health', label: 'Health & Stress' }
  ];

  const planets = ['all', 'Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn', 'Rahu', 'Ketu'];

  const filteredRemedies = remedies.filter((r) => {
    const matchCategory = selectedCategory === 'all' || r.category === selectedCategory;
    const matchPlanet = selectedPlanet === 'all' || r.planet.toLowerCase().includes(selectedPlanet.toLowerCase());
    const q = searchQuery.toLowerCase();
    const matchSearch =
      r.title.toLowerCase().includes(q) ||
      r.hindiTitle.toLowerCase().includes(q) ||
      r.issue.toLowerCase().includes(q) ||
      r.remedy.toLowerCase().includes(q) ||
      r.planet.toLowerCase().includes(q);

    return matchCategory && matchPlanet && matchSearch;
  });

  const handleOpenAdd = () => {
    setFormState({
      id: `custom_upay_${Date.now()}`,
      title: '',
      hindiTitle: '',
      category: 'wealth',
      planet: 'Sun',
      issue: '',
      remedy: '',
      duration: '43 Consecutive Days (अखंड 43 दिन)',
      precautions: ['Strictly refrain from consuming non-veg food, alcohol, and leather goods.'],
      auspiciousDay: 'Sunday sunrise'
    });
    setEditingRemedy(null);
    setIsEditorOpen(true);
  };

  const handleOpenEdit = (remedy: LalKitabRemedy) => {
    setFormState({ ...remedy });
    setEditingRemedy(remedy);
    setIsEditorOpen(true);
  };

  const handleAddPrecaution = () => {
    if (!precautionInput.trim()) return;
    setFormState({
      ...formState,
      precautions: [...formState.precautions, precautionInput.trim()]
    });
    setPrecautionInput('');
  };

  const handleRemovePrecaution = (index: number) => {
    setFormState({
      ...formState,
      precautions: formState.precautions.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.title || !formState.remedy || !formState.issue) return;
    onSaveRemedy(formState);
    setIsEditorOpen(false);
  };

  return (
    <div className="space-y-6 pb-12 text-left">
      {/* 1. Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="font-playfair text-xl font-bold text-[#7C2D12]">
            Lal Kitab Remedies & Parhez Content Management
          </h2>
          <p className="text-xs text-[#9A3412]">
            Update classical Lal Kitab upays, customize durations (43-day cycles), and add planetary restrictions.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            type="button"
            onClick={() => {
              if (confirm('Reset all Lal Kitab Upays back to classical default prescriptions?')) {
                onResetDefaults();
              }
            }}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#7C2D12] bg-white hover:bg-orange-50 border border-orange-200 shadow-2xs transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#EA580C]" />
            <span>Reset to Defaults</span>
          </button>

          <button
            type="button"
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#EA580C] to-[#F97316] text-white shadow-xs hover:brightness-105 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Lal Kitab Upay</span>
          </button>
        </div>
      </div>

      {/* 2. Filters & Search Bar */}
      <div className="p-4 rounded-2xl bg-white border border-orange-200/90 shadow-2xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="relative sm:col-span-1">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search upays, grahas, issues..."
              className="w-full pl-8 pr-3 py-2 bg-[#FFF9F2] border border-orange-200 rounded-xl text-xs text-[#7C2D12] placeholder-stone-400 focus:outline-none focus:border-[#EA580C]"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-2 bg-[#FFF9F2] border border-orange-200 rounded-xl text-xs text-[#7C2D12] focus:outline-none focus:border-[#EA580C]"
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>

          <select
            value={selectedPlanet}
            onChange={(e) => setSelectedPlanet(e.target.value)}
            className="w-full px-3 py-2 bg-[#FFF9F2] border border-orange-200 rounded-xl text-xs text-[#7C2D12] focus:outline-none focus:border-[#EA580C]"
          >
            {planets.map((p) => (
              <option key={p} value={p}>
                {p === 'all' ? 'All Ruling Planets (Grahas)' : `Planet: ${p}`}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center justify-between text-xs text-stone-500 pt-1">
          <span>Showing {filteredRemedies.length} of {remedies.length} remedies in catalog</span>
          <span className="text-[11px] text-[#EA580C] font-semibold">Changes immediately reflect in public visualizer</span>
        </div>
      </div>

      {/* 3. Remedies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredRemedies.map((remedy) => (
          <div
            key={remedy.id}
            className="p-5 rounded-2xl bg-white border border-orange-200/90 shadow-2xs hover:shadow-md transition-shadow space-y-3 relative group"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="space-y-0.5">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-orange-100 text-[#7C2D12] border border-orange-200">
                  <Flame className="w-3 h-3 text-[#EA580C]" />
                  <span>{remedy.planet}</span>
                </span>
                <h3 className="font-playfair text-base font-bold text-[#7C2D12]">
                  {remedy.title} <span className="text-xs font-normal text-[#9A3412]">({remedy.hindiTitle})</span>
                </h3>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleOpenEdit(remedy)}
                  className="p-1.5 rounded-lg text-stone-500 hover:text-[#EA580C] hover:bg-orange-50 transition-colors cursor-pointer"
                  title="Edit remedy text"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (confirm(`Delete remedy "${remedy.title}" from Lal Kitab catalog?`)) {
                      onDeleteRemedy(remedy.id);
                    }
                  }}
                  className="p-1.5 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                  title="Delete remedy"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Diagnostic Issue */}
            <div className="p-2.5 rounded-xl bg-[#FFF9F2] text-xs text-stone-700 space-y-0.5">
              <span className="text-[10px] font-bold uppercase text-[#EA580C]">Diagnosed Symptom:</span>
              <p className="font-medium text-stone-800">{remedy.issue}</p>
            </div>

            {/* Upay Prescription */}
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase text-[#7C2D12] flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-500" />
                Prescribed Upay (उपाय):
              </span>
              <p className="text-xs text-stone-800 leading-relaxed font-semibold bg-amber-50/60 p-2.5 rounded-xl border border-amber-200/70">
                {remedy.remedy}
              </p>
            </div>

            {/* Duration & Day */}
            <div className="flex items-center justify-between text-[11px] text-stone-500 font-mono pt-1">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#EA580C]" />
                {remedy.duration}
              </span>
              <span className="text-amber-800 font-semibold">{remedy.auspiciousDay}</span>
            </div>

            {/* Precautions / Parhez */}
            {remedy.precautions && remedy.precautions.length > 0 && (
              <div className="pt-2 border-t border-orange-100 space-y-1">
                <span className="text-[10px] font-bold uppercase text-stone-400">Strict Parhez (सावधानी):</span>
                <ul className="text-[11px] text-stone-600 space-y-0.5 list-disc list-inside">
                  {remedy.precautions.map((p, idx) => (
                    <li key={idx} className="truncate">{p}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 4. ADD / EDIT UPAY MODAL */}
      <AnimatePresence>
        {isEditorOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl border border-orange-200 max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-5 text-left max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-playfair text-xl font-bold text-[#7C2D12]">
                    {editingRemedy ? 'Edit Lal Kitab Prescription' : 'Add New Lal Kitab Upay'}
                  </h3>
                  <p className="text-xs text-[#9A3412]">
                    Publish or modify classical remedial guidelines in the live application.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsEditorOpen(false)}
                  className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold uppercase text-stone-600">English Title *</label>
                    <input
                      type="text"
                      required
                      value={formState.title}
                      onChange={(e) => setFormState({ ...formState, title: e.target.value })}
                      placeholder="e.g. Copper Coin Solar Activation"
                      className="w-full p-2.5 bg-[#FFF9F2] border border-orange-200 rounded-xl text-xs text-[#7C2D12] focus:outline-none focus:border-[#EA580C]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold uppercase text-stone-600">Hindi Title (हिंदी शीर्षक)</label>
                    <input
                      type="text"
                      value={formState.hindiTitle}
                      onChange={(e) => setFormState({ ...formState, hindiTitle: e.target.value })}
                      placeholder="e.g. तांबे के सिक्के का जल प्रवाह"
                      className="w-full p-2.5 bg-[#FFF9F2] border border-orange-200 rounded-xl text-xs text-[#7C2D12] focus:outline-none focus:border-[#EA580C]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold uppercase text-stone-600">Ruling Planet (Graha)</label>
                    <select
                      value={formState.planet}
                      onChange={(e) => setFormState({ ...formState, planet: e.target.value })}
                      className="w-full p-2.5 bg-[#FFF9F2] border border-orange-200 rounded-xl text-xs text-[#7C2D12] focus:outline-none focus:border-[#EA580C]"
                    >
                      {planets.filter((p) => p !== 'all').map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold uppercase text-stone-600">Category</label>
                    <select
                      value={formState.category}
                      onChange={(e) => setFormState({ ...formState, category: e.target.value as any })}
                      className="w-full p-2.5 bg-[#FFF9F2] border border-orange-200 rounded-xl text-xs text-[#7C2D12] focus:outline-none focus:border-[#EA580C]"
                    >
                      {categories.filter((c) => c.id !== 'all').map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-[11px] font-bold uppercase text-stone-600">Diagnosed Issue / Indication *</label>
                  <input
                    type="text"
                    required
                    value={formState.issue}
                    onChange={(e) => setFormState({ ...formState, issue: e.target.value })}
                    placeholder="e.g. Debilitated Sun in 7th or 8th house causing loss of prestige and eye fatigue..."
                    className="w-full p-2.5 bg-[#FFF9F2] border border-orange-200 rounded-xl text-xs text-[#7C2D12] focus:outline-none focus:border-[#EA580C]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[11px] font-bold uppercase text-stone-600">Prescription / Exact Upay *</label>
                  <textarea
                    required
                    value={formState.remedy}
                    onChange={(e) => setFormState({ ...formState, remedy: e.target.value })}
                    placeholder="e.g. Float a pure copper coin with center hole in flowing freshwater for 43 consecutive days without break..."
                    className="w-full p-2.5 bg-[#FFF9F2] border border-orange-200 rounded-xl text-xs text-[#7C2D12] focus:outline-none focus:border-[#EA580C]"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold uppercase text-stone-600">Duration (अवधि)</label>
                    <input
                      type="text"
                      value={formState.duration}
                      onChange={(e) => setFormState({ ...formState, duration: e.target.value })}
                      placeholder="e.g. 43 Consecutive Days"
                      className="w-full p-2.5 bg-[#FFF9F2] border border-orange-200 rounded-xl text-xs text-[#7C2D12] focus:outline-none focus:border-[#EA580C]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold uppercase text-stone-600">Auspicious Day / Timing</label>
                    <input
                      type="text"
                      value={formState.auspiciousDay}
                      onChange={(e) => setFormState({ ...formState, auspiciousDay: e.target.value })}
                      placeholder="e.g. Sunday sunrise during Shukla Paksha"
                      className="w-full p-2.5 bg-[#FFF9F2] border border-orange-200 rounded-xl text-xs text-[#7C2D12] focus:outline-none focus:border-[#EA580C]"
                    />
                  </div>
                </div>

                {/* Precautions Array */}
                <div className="space-y-2 pt-2 border-t border-orange-100">
                  <label className="block text-[11px] font-bold uppercase text-stone-600">Precautions & Dietary Parhez (परहेज)</label>
                  
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={precautionInput}
                      onChange={(e) => setPrecautionInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddPrecaution();
                        }
                      }}
                      placeholder="Add restriction (e.g. Avoid wearing dark blue clothes during Mars cycle)..."
                      className="flex-1 p-2.5 bg-[#FFF9F2] border border-orange-200 rounded-xl text-xs text-[#7C2D12] focus:outline-none focus:border-[#EA580C]"
                    />
                    <button
                      type="button"
                      onClick={handleAddPrecaution}
                      className="px-3.5 py-2 rounded-xl text-xs font-bold bg-[#EA580C] text-white hover:bg-[#C2410C] cursor-pointer"
                    >
                      Add
                    </button>
                  </div>

                  <div className="space-y-1.5 max-h-32 overflow-y-auto">
                    {formState.precautions.map((p, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-stone-50 border border-stone-200 text-xs">
                        <span className="text-stone-800 truncate">{p}</span>
                        <button
                          type="button"
                          onClick={() => handleRemovePrecaution(idx)}
                          className="text-stone-400 hover:text-red-600 ml-2"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-4 border-t border-orange-100">
                  <button
                    type="button"
                    onClick={() => setIsEditorOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 hover:bg-stone-100 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#EA580C] hover:bg-[#C2410C] text-white shadow-xs cursor-pointer"
                  >
                    {editingRemedy ? 'Update Prescription' : 'Publish Upay'}
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
