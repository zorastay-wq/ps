import React, { useState } from 'react';
import { DOCTOR_INFO } from '../data/brandData';
import { MapPin, Phone, Mail, Globe, MessageCircle, Clock, Send, CheckCircle2, Calendar, ExternalLink } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('Lal Kitab Remedies');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    // Send formatted WhatsApp message
    const waText = `*New Consultation Inquiry via Website:*
*Name:* ${name}
*Phone:* ${phone}
*Interested In:* ${service}
*Details:* ${message || 'N/A'}`;

    window.open(`https://wa.me/${DOCTOR_INFO.whatsappNumber}?text=${encodeURIComponent(waText)}`, '_blank');
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-8 sm:py-12 lg:py-16 bg-[#FFF9F2] text-[#7C2D12] border-b border-orange-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 border border-orange-300 bg-orange-50 px-3.5 py-1 rounded-full text-[11px] font-bold text-[#C2410C] tracking-[0.2em] uppercase mb-3 sm:mb-4 shadow-sm">
            <MapPin className="w-3.5 h-3.5 text-[#F97316]" />
            <span>Chambers & Direct Helpline</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-playfair font-bold text-[#431407] tracking-tight">
            Consultation Offices & Contact Details
          </h2>
          <p className="text-[#431407] mt-2 sm:mt-3 text-xs sm:text-sm md:text-base font-normal max-w-2xl mx-auto leading-relaxed">
            Visit our Delhi chambers in Roop Nagar or Kamla Nagar, or connect instantly from anywhere in the world via HD Video & WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-8 items-start">
          
          {/* Left Column: Office Details & Direct Channels */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* 2 Delhi Chambers Cards */}
            {DOCTOR_INFO.addresses.map((addr, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-orange-200 p-6 shadow-md transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl hover:shadow-orange-500/20 hover:border-orange-400"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-playfair text-lg font-bold text-[#431407] flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#F97316]" />
                    <span>{addr.title}</span>
                  </h3>
                  <a
                    href={DOCTOR_INFO.googleShareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold uppercase tracking-wider text-[#C2410C] hover:text-[#EA580C] hover:underline flex items-center gap-1 transition-colors"
                  >
                    <span>Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="text-xs sm:text-sm text-[#7C2D12] space-y-1 mb-3 font-normal leading-relaxed">
                  <p>{addr.line1}</p>
                  <p className="font-bold text-[#431407]">{addr.line2}</p>
                </div>

                <div className="pt-3 border-t border-orange-100 flex items-center gap-1.5 text-xs text-[#7C2D12] font-semibold">
                  <Clock className="w-4 h-4 text-[#F97316] flex-shrink-0" />
                  <span>{addr.timings}</span>
                </div>
              </div>
            ))}

            {/* Direct Helpline Matrix */}
            <div className="bg-white rounded-2xl p-6 text-[#7C2D12] shadow-md border border-orange-200 space-y-4">
              <h4 className="font-playfair text-sm font-bold text-[#431407] uppercase tracking-wider">
                Direct Contact & Support Channels
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                <a
                  href={`tel:${DOCTOR_INFO.primaryPhone}`}
                  className="flex items-center gap-2.5 bg-orange-50/70 hover:bg-orange-100 p-3.5 rounded-xl border border-orange-200 hover:border-orange-300 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-md hover:shadow-orange-500/10"
                >
                  <Phone className="w-4 h-4 text-[#F97316] flex-shrink-0" />
                  <div>
                    <div className="text-[9px] text-[#C2410C] uppercase tracking-widest font-bold">Primary Helpline</div>
                    <div className="font-bold text-[#431407] text-xs sm:text-sm">{DOCTOR_INFO.primaryPhone}</div>
                  </div>
                </a>

                <a
                  href={`tel:${DOCTOR_INFO.secondaryPhone}`}
                  className="flex items-center gap-2.5 bg-orange-50/70 hover:bg-orange-100 p-3.5 rounded-xl border border-orange-200 hover:border-orange-300 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-md hover:shadow-orange-500/10"
                >
                  <Phone className="w-4 h-4 text-[#F97316] flex-shrink-0" />
                  <div>
                    <div className="text-[9px] text-[#C2410C] uppercase tracking-widest font-bold">Alternate Number</div>
                    <div className="font-bold text-[#431407] text-xs sm:text-sm">{DOCTOR_INFO.secondaryPhone}</div>
                  </div>
                </a>

                <a
                  href={`mailto:${DOCTOR_INFO.email}`}
                  className="flex items-center gap-2.5 bg-orange-50/70 hover:bg-orange-100 p-3.5 rounded-xl border border-orange-200 hover:border-orange-300 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-md hover:shadow-orange-500/10 sm:col-span-2"
                >
                  <Mail className="w-4 h-4 text-[#F97316] flex-shrink-0" />
                  <div>
                    <div className="text-[9px] text-[#C2410C] uppercase tracking-widest font-bold">Official Email</div>
                    <div className="font-bold text-[#431407] text-xs sm:text-sm">{DOCTOR_INFO.email}</div>
                  </div>
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Direct Quick Inquiry Form */}
          <div className="lg:col-span-6 bg-white rounded-2xl border border-orange-200 p-6 sm:p-8 lg:p-9 shadow-md transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/10">
            <h3 className="font-playfair text-2xl font-bold text-[#431407] mb-1">
              Send Consultation Inquiry
            </h3>
            <p className="text-xs sm:text-sm text-[#7C2D12] mb-6 font-normal leading-relaxed">
              Our clinic manager will connect with you via WhatsApp or Phone to confirm suitable time slots.
            </p>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-300 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-playfair text-xl font-bold text-[#431407]">
                  Inquiry Sent Successfully!
                </h4>
                <p className="text-xs sm:text-sm text-[#431407] leading-relaxed font-normal">
                  Your details have been forwarded to Dr. Preeti Sehgal's appointment desk. We will respond promptly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-bold text-[#C2410C] underline uppercase tracking-wider mt-2 cursor-pointer hover:text-[#EA580C] transition-colors"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-[#431407] mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Sanya Kapoor"
                    className="w-full bg-orange-50/40 border border-orange-300 rounded-xl px-3 py-2 sm:px-3.5 sm:py-2.5 text-xs sm:text-sm font-medium text-[#431407] placeholder:text-orange-900/50 transition-all duration-300 ease-in-out hover:border-orange-400 focus:outline-none focus:border-[#F97316] focus:ring-2 focus:ring-orange-500/30 focus:shadow-[0_0_12px_rgba(249,115,22,0.2)]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-[#431407] mb-1">
                    Phone / WhatsApp Number (with Country Code) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full bg-orange-50/40 border border-orange-300 rounded-xl px-3 py-2 sm:px-3.5 sm:py-2.5 text-xs sm:text-sm font-medium text-[#431407] placeholder:text-orange-900/50 transition-all duration-300 ease-in-out hover:border-orange-400 focus:outline-none focus:border-[#F97316] focus:ring-2 focus:ring-orange-500/30 focus:shadow-[0_0_12px_rgba(249,115,22,0.2)]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-[#431407] mb-1">
                    Select Consultation Service
                  </label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full bg-orange-50/40 border border-orange-300 rounded-xl px-3 py-2 sm:px-3.5 sm:py-2.5 text-xs sm:text-sm font-medium text-[#431407] transition-all duration-300 ease-in-out hover:border-orange-400 focus:outline-none focus:border-[#F97316] focus:ring-2 focus:ring-orange-500/30 focus:shadow-[0_0_12px_rgba(249,115,22,0.2)]"
                  >
                    <option value="Lal Kitab Remedies & Darpan">Lal Kitab Remedies & Darpan</option>
                    <option value="Vedic Janam Kundli Analysis">Vedic Janam Kundli Analysis</option>
                    <option value="Kundli Milan & Marriage Matching">Kundli Milan & Marriage Matching</option>
                    <option value="Vastu Shastra (Residential/Commercial)">Vastu Shastra (Residential/Commercial)</option>
                    <option value="Tarot Card Intuitive Reading">Tarot Card Intuitive Reading</option>
                    <option value="Numerology & Name Correction">Numerology & Name Correction</option>
                    <option value="Gemstone & Rudraksha Audit">Gemstone & Rudraksha Audit</option>
                    <option value="Palmistry (Hasta Rekha)">Palmistry (Hasta Rekha)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-[#431407] mb-1">
                    Brief Query / Concern (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Briefly state your concern (e.g., career, marriage matching, home vastu)..."
                    className="w-full bg-orange-50/40 border border-orange-300 rounded-xl px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs sm:text-sm font-medium text-[#431407] placeholder:text-orange-900/50 transition-all duration-300 ease-in-out hover:border-orange-400 focus:outline-none focus:border-[#F97316] focus:ring-2 focus:ring-orange-500/30 focus:shadow-[0_0_12px_rgba(249,115,22,0.2)]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-xs uppercase tracking-wider py-3 sm:py-3.5 rounded-xl shadow-md transition-all duration-300 ease-in-out hover:scale-[1.01] hover:shadow-xl hover:shadow-orange-500/25 cursor-pointer cta-glow-hover"
                >
                  <Send className="w-4 h-4 text-white" />
                  <span>Submit & Connect on WhatsApp</span>
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
