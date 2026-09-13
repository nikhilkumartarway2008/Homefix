import React, { useState } from 'react';
import {
  ArrowLeft,
  Star,
  Clock,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  ChevronDown,
  Flame,
  MapPin,
  Sparkles,
  Zap,
} from 'lucide-react';
import { DETAILED_SERVICES, DetailedService } from '../../data/detailedServicesData';

interface ServiceDetailViewProps {
  serviceId: string;
  onBack: () => void;
  onBookService: (service: DetailedService, emergencyType?: string) => void;
}

export const ServiceDetailView: React.FC<ServiceDetailViewProps> = ({
  serviceId,
  onBack,
  onBookService,
}) => {
  const service = DETAILED_SERVICES.find((s) => s.id === serviceId) || DETAILED_SERVICES[0];

  const [activeTab, setActiveTab] = useState<'overview' | 'reviews' | 'faqs'>('overview');
  const [selectedEmergencyOption, setSelectedEmergencyOption] = useState<string>('ASAP');
  const [showEmergencyModal, setShowEmergencyModal] = useState<boolean>(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleBookClick = () => {
    if (service.isEmergencyAvailable) {
      setShowEmergencyModal(true);
    } else {
      onBookService(service);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#080D1A] text-white overflow-y-auto pb-28 animate-in fade-in duration-200 relative">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-[#080D1A]/95 backdrop-blur-md px-4 py-3.5 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-800 transition"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-base font-bold text-white tracking-tight line-clamp-1">{service.name}</h1>
            <p className="text-[10px] text-slate-400">{service.categoryName} · Ranchi</p>
          </div>
        </div>

        {service.isEmergencyAvailable && (
          <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/25 text-amber-300 text-[10px] font-bold border border-amber-500/40 animate-pulse">
            <Flame className="w-3 h-3" /> Emergency Ready
          </span>
        )}
      </div>

      {/* Hero Image & Price Card */}
      <div className="p-4 space-y-4">
        <div className="relative rounded-[24px] overflow-hidden border border-slate-800 shadow-2xl h-52 bg-[#0D1527]">
          <img
            src={service.image}
            alt={service.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080D1A] via-[#080D1A]/40 to-transparent" />

          {/* Badge over image */}
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-blue-600/90 backdrop-blur-md text-white text-[10px] font-bold border border-blue-400/40 shadow">
              {service.categoryName}
            </span>
          </div>

          <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-300 tracking-wider block">Starting from</span>
              <div className="text-2xl font-extrabold text-white flex items-baseline gap-1">
                ₹{service.startingPrice}
                <span className="text-[11px] font-normal text-slate-400">/ service</span>
              </div>
            </div>

            <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700 text-xs font-semibold text-white shadow-lg">
              <Clock className="w-3.5 h-3.5 text-blue-400" />
              <span>{service.estimatedDuration}</span>
            </div>
          </div>
        </div>

        {/* Title & Tagline */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">{service.name}</h2>
            <div className="flex items-center gap-1 text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-xl border border-amber-500/20">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{service.rating}</span>
              <span className="text-slate-400 font-normal">({service.reviewCount} reviews)</span>
            </div>
          </div>
          <p className="text-xs text-slate-300">{service.tagline}</p>
          <p className="text-xs text-slate-400 leading-relaxed pt-1">{service.description}</p>
        </div>

        {/* Tabs: Overview | Reviews | FAQs */}
        <div className="flex border-b border-slate-800 text-xs font-semibold">
          {[
            { id: 'overview', label: "What's Included" },
            { id: 'reviews', label: `Reviews (${service.reviews.length})` },
            { id: 'faqs', label: `FAQs (${service.faqs.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 pb-2.5 text-center transition relative ${
                activeTab === tab.id ? 'text-blue-400 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-4 pt-1 animate-in fade-in duration-200">
            {/* Included Items */}
            <div className="p-4 rounded-2xl bg-[#0D1527] border border-slate-800 space-y-3">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 className="w-4 h-4" /> What's Included
              </h3>
              <ul className="space-y-2">
                {service.includedItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Excluded Items */}
            <div className="p-4 rounded-2xl bg-[#0D1527] border border-slate-800 space-y-3">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5 text-rose-400">
                <XCircle className="w-4 h-4" /> What's Not Included
              </h3>
              <ul className="space-y-2">
                {service.excludedItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-rose-400/80 mt-1.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* HomeFix Shield Banner */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-blue-950/40 to-slate-900 border border-blue-500/25 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/40 text-blue-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">HomeFix Safe Shield</h4>
                <p className="text-[10px] text-slate-300">₹10,000 damage protection & verified background check on all pros.</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-3 pt-1 animate-in fade-in duration-200">
            {service.reviews.map((rev, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-[#0D1527] border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                      {rev.author[0]}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block">{rev.author}</span>
                      <span className="text-[9px] text-slate-400 flex items-center gap-1">
                        <MapPin className="w-2.5 h-2.5 text-blue-400" /> {rev.location}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-0.5 text-amber-400 text-xs font-bold">
                      <Star className="w-3 h-3 fill-amber-400" /> {rev.rating}
                    </div>
                    <span className="text-[9px] text-slate-500">{rev.date}</span>
                  </div>
                </div>
                <p className="text-xs text-slate-300">{rev.comment}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'faqs' && (
          <div className="space-y-2.5 pt-1 animate-in fade-in duration-200">
            {service.faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} className="rounded-2xl bg-[#0D1527] border border-slate-800 overflow-hidden">
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-3.5 flex items-center justify-between text-left hover:bg-slate-800/40 transition"
                  >
                    <span className="text-xs font-bold text-white">{faq.question}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-blue-400' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-3.5 pb-3.5 text-xs text-slate-300 border-t border-slate-800/80 pt-2 bg-slate-900/40">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Sticky Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#080D1A]/95 backdrop-blur-md border-t border-slate-800 px-4 py-3 flex items-center justify-between max-w-[390px] sm:max-w-md mx-auto">
        <div>
          <span className="text-[10px] text-slate-400 uppercase font-semibold block">Total Estimate</span>
          <div className="text-lg font-extrabold text-white flex items-center gap-1.5">
            ₹{service.startingPrice}
            <span className="text-[10px] font-normal text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
              Fixed Rate
            </span>
          </div>
        </div>

        <button
          onClick={handleBookClick}
          className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 flex items-center gap-2 transition transform active:scale-95"
        >
          <span>Book This Service</span>
          <span className="text-base">→</span>
        </button>
      </div>

      {/* Emergency Modal if applicable */}
      {showEmergencyModal && (
        <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
          <div className="w-full sm:max-w-md bg-[#0D1527] border border-amber-500/40 rounded-t-[28px] sm:rounded-[28px] p-5 space-y-4 shadow-2xl animate-in slide-in-from-bottom duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-400">
                <Flame className="w-5 h-5 animate-bounce" />
                <h3 className="text-sm font-bold text-white">Emergency Booking Request</h3>
              </div>
              <button
                onClick={() => setShowEmergencyModal(false)}
                className="w-7 h-7 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200">
              <span className="font-bold">Need this fixed immediately?</span> Emergency dispatch ensures a certified pro arrives at your Ranchi doorstep with priority. Additional surge fee of ₹150 applies.
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 block">Select Urgency Timeline:</label>
              {[
                { id: 'ASAP', label: 'ASAP (Within 30 mins)', desc: 'Highest priority dispatch' },
                { id: 'Within 1 hour', label: 'Within 1 hour', desc: 'Standard emergency slot' },
                { id: 'Today', label: 'Today (Scheduled)', desc: 'Regular booking rate' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setSelectedEmergencyOption(opt.id)}
                  className={`w-full p-3 rounded-xl border text-left transition flex items-center justify-between ${
                    selectedEmergencyOption === opt.id
                      ? 'bg-blue-600/20 border-blue-500 text-white'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <span className="text-xs font-bold block">{opt.label}</span>
                    <span className="text-[10px] text-slate-400">{opt.desc}</span>
                  </div>
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${selectedEmergencyOption === opt.id ? 'border-blue-400 bg-blue-600' : 'border-slate-600'}`}>
                    {selectedEmergencyOption === opt.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                </button>
              ))}
            </div>

            <div className="pt-2 flex gap-3">
              <button
                onClick={() => setShowEmergencyModal(false)}
                className="flex-1 py-3 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-700 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowEmergencyModal(false);
                  onBookService(service, selectedEmergencyOption);
                }}
                className="flex-1 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold shadow-lg transition flex items-center justify-center gap-1.5"
              >
                <span>Confirm Emergency</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
