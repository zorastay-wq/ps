import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { VastuDirectionRule } from '../../types';
import { 
  Compass, 
  Search, 
  Edit3, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Sparkles, 
  X, 
  Layers,
  Flame,
  Droplets,
  Wind,
  Sun,
  ShieldAlert
} from 'lucide-react';

interface AdminVastuCMSProps {
  directions: VastuDirectionRule[];
  onSaveDirection: (direction: VastuDirectionRule) => void;
  onResetDefaults: () => void;
}

export const AdminVastuCMS: React.FC<AdminVastuCMSProps> = ({
  directions,
  onSaveDirection,
  onResetDefaults
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDirection, setSelectedDirection] = useState<VastuDirectionRule | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  // Form State
  const [formState, setFormState] = useState<VastuDirectionRule | null>(null);
  const [idealUsageInput, setIdealUsageInput] = useState('');
  const [prohibitedInput, setProhibitedInput] = useState('');
  const [remedyInput, setRemedyInput] = useState('');

  const filteredDirections = directions.filter((d) => {
    const q = searchQuery.toLowerCase();
    return (
      d.direction.toLowerCase().includes(q) ||
      d.element.toLowerCase().includes(q) ||
      d.rulingDeity.toLowerCase().includes(q) ||
      d.idealUsage.some((u) => u.toLowerCase().includes(q)) ||
      d.nonDemolitionRemedies.some((r) => r.toLowerCase().includes(q))
    );
  });

  const handleOpenEdit = (rule: VastuDirectionRule) => {
    setFormState({
      ...rule,
      idealUsage: [...rule.idealUsage],
      prohibited: [...rule.prohibited],
      nonDemolitionRemedies: [...rule.nonDemolitionRemedies]
    });
    setIsEditorOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState) return;
    onSaveDirection(formState);
    setIsEditorOpen(false);
  };

  return (
    <div className="space-y-6 pb-12 text-left">
      {/* 1. Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="font-playfair text-xl font-bold text-[#7C2D12]">
            Vastu Shastra 8-Direction Matrix CMS
          </h2>
          <p className="text-xs text-[#9A3412]">
            Curate elemental alignments, ruling deities, positive placements, and non-structural Vedic remedies.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            if (confirm('Reset all 8-Direction Vastu guidelines back to classical canonical defaults?')) {
              onResetDefaults();
            }
          }}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#7C2D12] bg-white hover:bg-orange-50 border border-orange-200 shadow-2xs transition-colors cursor-pointer self-start md:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5 text-[#EA580C]" />
          <span>Reset to Canonical Defaults</span>
        </button>
      </div>

      {/* 2. Search & Info Bar */}
      <div className="p-4 rounded-2xl bg-white border border-orange-200/90 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search directions, elements, deities..."
            className="w-full pl-8 pr-3 py-2 bg-[#FFF9F2] border border-orange-200 rounded-xl text-xs text-[#7C2D12] placeholder-stone-400 focus:outline-none focus:border-[#EA580C]"
          />
        </div>

        <div className="text-xs text-stone-500 font-medium">
          Showing {filteredDirections.length} Vedic Zones &bull; Non-Demolition remedies active
        </div>
      </div>

      {/* 3. 8-Direction Matrix Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDirections.map((rule) => (
          <div
            key={rule.id}
            className="p-5 rounded-2xl bg-white border border-orange-200/90 shadow-2xs hover:shadow-md transition-all space-y-3.5 flex flex-col justify-between"
          >
            <div>
              {/* Top Direction Badge & Edit */}
              <div className="flex items-start justify-between">
                <div className="space-y-0.5">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-orange-100 text-[#7C2D12] border border-orange-200">
                    <Compass className="w-3 h-3 text-[#EA580C]" />
                    <span>{rule.element} Element</span>
                  </span>
                  <h3 className="font-playfair text-lg font-bold text-[#7C2D12]">
                    {rule.direction}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => handleOpenEdit(rule)}
                  className="p-1.5 rounded-lg text-stone-500 hover:text-[#EA580C] hover:bg-orange-50 transition-colors cursor-pointer"
                  title="Edit Vastu Zone Rule"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>

              {/* Deity & Planetary Lord */}
              <div className="p-2.5 rounded-xl bg-[#FFF9F2] text-xs space-y-1 mt-2">
                <div className="flex justify-between">
                  <span className="text-[10px] uppercase font-bold text-stone-400">Ruling Deity</span>
                  <span className="font-semibold text-stone-800">{rule.rulingDeity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[10px] uppercase font-bold text-stone-400">Governing Planet</span>
                  <span className="font-semibold text-[#EA580C]">{rule.planetaryLord || rule.rulingPlanet}</span>
                </div>
              </div>

              {/* Ideal Usages */}
              <div className="mt-3 space-y-1 text-xs">
                <span className="text-[10px] font-bold uppercase text-emerald-800 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  Ideal Usages (शुभ स्थान):
                </span>
                <div className="flex flex-wrap gap-1">
                  {rule.idealUsage.map((u, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-900 text-[10px] border border-emerald-200">
                      {u}
                    </span>
                  ))}
                </div>
              </div>

              {/* Prohibited Placements */}
              <div className="mt-2.5 space-y-1 text-xs">
                <span className="text-[10px] font-bold uppercase text-rose-800 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3 text-rose-600" />
                  Strictly Prohibited (अशुभ):
                </span>
                <div className="flex flex-wrap gap-1">
                  {rule.prohibited.map((p, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-rose-50 text-rose-900 text-[10px] border border-rose-200">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Non-Demolition Remedies */}
            <div className="pt-3 border-t border-orange-100 space-y-1 text-xs">
              <span className="text-[10px] font-bold uppercase text-[#7C2D12] flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-500" />
                Zero-Demolition Vedic Upays:
              </span>
              <ul className="text-[11px] text-stone-700 space-y-0.5 list-disc list-inside bg-amber-50/50 p-2 rounded-xl border border-amber-200/60">
                {rule.nonDemolitionRemedies.map((r, i) => (
                  <li key={i} className="truncate">{r}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* 4. EDIT VASTU RULE MODAL */}
      <AnimatePresence>
        {isEditorOpen && formState && (
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
                    Edit Vastu Zone: {formState.direction}
                  </h3>
                  <p className="text-xs text-[#9A3412]">
                    Update elemental guidelines and non-structural Vedic harmonizers.
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

              <form onSubmit={handleSave} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold uppercase text-stone-600">Element</label>
                    <input
                      type="text"
                      value={formState.element}
                      onChange={(e) => setFormState({ ...formState, element: e.target.value })}
                      className="w-full p-2.5 bg-[#FFF9F2] border border-orange-200 rounded-xl text-xs text-[#7C2D12] focus:outline-none focus:border-[#EA580C]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold uppercase text-stone-600">Ruling Deity</label>
                    <input
                      type="text"
                      value={formState.rulingDeity}
                      onChange={(e) => setFormState({ ...formState, rulingDeity: e.target.value })}
                      className="w-full p-2.5 bg-[#FFF9F2] border border-orange-200 rounded-xl text-xs text-[#7C2D12] focus:outline-none focus:border-[#EA580C]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold uppercase text-stone-600">Governing Planet</label>
                    <input
                      type="text"
                      value={formState.planetaryLord || formState.rulingPlanet || ''}
                      onChange={(e) => setFormState({ ...formState, planetaryLord: e.target.value, rulingPlanet: e.target.value })}
                      className="w-full p-2.5 bg-[#FFF9F2] border border-orange-200 rounded-xl text-xs text-[#7C2D12] focus:outline-none focus:border-[#EA580C]"
                    />
                  </div>
                </div>

                {/* Ideal Usages Array */}
                <div className="space-y-2 pt-2 border-t border-orange-100">
                  <label className="block text-[11px] font-bold uppercase text-emerald-800">Ideal Usages (शुभ स्थान)</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={idealUsageInput}
                      onChange={(e) => setIdealUsageInput(e.target.value)}
                      placeholder="Add ideal room (e.g. Master Bedroom, Vault)..."
                      className="flex-1 p-2.5 bg-[#FFF9F2] border border-orange-200 rounded-xl text-xs text-[#7C2D12]"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (!idealUsageInput.trim()) return;
                        setFormState({
                          ...formState,
                          idealUsage: [...formState.idealUsage, idealUsageInput.trim()]
                        });
                        setIdealUsageInput('');
                      }}
                      className="px-3 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white cursor-pointer"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {formState.idealUsage.map((u, idx) => (
                      <span key={idx} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs">
                        {u}
                        <button
                          type="button"
                          onClick={() => setFormState({ ...formState, idealUsage: formState.idealUsage.filter((_, i) => i !== idx) })}
                          className="hover:text-red-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Prohibited Placements Array */}
                <div className="space-y-2 pt-2 border-t border-orange-100">
                  <label className="block text-[11px] font-bold uppercase text-rose-800">Prohibited Placements (अशुभ)</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={prohibitedInput}
                      onChange={(e) => setProhibitedInput(e.target.value)}
                      placeholder="Add prohibited structure (e.g. Toilet, Overhead Water Tank)..."
                      className="flex-1 p-2.5 bg-[#FFF9F2] border border-orange-200 rounded-xl text-xs text-[#7C2D12]"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (!prohibitedInput.trim()) return;
                        setFormState({
                          ...formState,
                          prohibited: [...formState.prohibited, prohibitedInput.trim()]
                        });
                        setProhibitedInput('');
                      }}
                      className="px-3 py-2 rounded-xl text-xs font-bold bg-rose-600 text-white cursor-pointer"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {formState.prohibited.map((p, idx) => (
                      <span key={idx} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-50 border border-rose-200 text-rose-900 text-xs">
                        {p}
                        <button
                          type="button"
                          onClick={() => setFormState({ ...formState, prohibited: formState.prohibited.filter((_, i) => i !== idx) })}
                          className="hover:text-red-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Non-Demolition Remedies */}
                <div className="space-y-2 pt-2 border-t border-orange-100">
                  <label className="block text-[11px] font-bold uppercase text-[#7C2D12]">Non-Demolition Remedies (उपाय)</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={remedyInput}
                      onChange={(e) => setRemedyInput(e.target.value)}
                      placeholder="Add remedy (e.g. Install pure copper strip under threshold)..."
                      className="flex-1 p-2.5 bg-[#FFF9F2] border border-orange-200 rounded-xl text-xs text-[#7C2D12]"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (!remedyInput.trim()) return;
                        setFormState({
                          ...formState,
                          nonDemolitionRemedies: [...formState.nonDemolitionRemedies, remedyInput.trim()]
                        });
                        setRemedyInput('');
                      }}
                      className="px-3 py-2 rounded-xl text-xs font-bold bg-[#EA580C] text-white cursor-pointer"
                    >
                      Add
                    </button>
                  </div>
                  <div className="space-y-1">
                    {formState.nonDemolitionRemedies.map((r, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-stone-50 border border-stone-200 text-xs">
                        <span className="text-stone-800">{r}</span>
                        <button
                          type="button"
                          onClick={() => setFormState({ ...formState, nonDemolitionRemedies: formState.nonDemolitionRemedies.filter((_, i) => i !== idx) })}
                          className="text-stone-400 hover:text-red-600"
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
                    Save Vastu Zone
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
