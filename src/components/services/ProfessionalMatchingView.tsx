import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  Loader2,
  Star,
  ShieldCheck,
  MapPin,
  Clock,
  Award,
  Sparkles,
  UserCheck,
  Calendar,
  AlertTriangle,
  HelpCircle,
} from 'lucide-react';
import { DetailedService } from '../../data/detailedServicesData';
import { TOP_PROFESSIONALS } from '../../data/servicesData';
import { Professional } from '../../types';

interface ProfessionalMatchingViewProps {
  service: DetailedService;
  problemDescription: string;
  appointmentDate: string;
  appointmentTime: string;
  address: {
    house: string;
    street: string;
    city: string;
    pinCode: string;
  };
  onBack: () => void;
  onSelectProfessional: (pro: Professional) => void;
  onChooseAnotherTime: () => void;
  onChooseAnotherDate: () => void;
  onManualAssistance: () => void;
}

export const ProfessionalMatchingView: React.FC<ProfessionalMatchingViewProps> = ({
  service,
  problemDescription,
  appointmentDate,
  appointmentTime,
  address,
  onBack,
  onSelectProfessional,
  onChooseAnotherTime,
  onChooseAnotherDate,
  onManualAssistance,
}) => {
  const [matchingState, setMatchingState] = useState<'searching' | 'matched' | 'no-match'>('searching');
  const [searchStep, setSearchStep] = useState<number>(0);
  const [autoAssigned, setAutoAssigned] = useState<boolean>(false);

  // Search progress steps simulation
  useEffect(() => {
    if (matchingState !== 'searching') return;

    const timers = [
      setTimeout(() => setSearchStep(1), 800),  // Checking service availability
      setTimeout(() => setSearchStep(2), 1700), // Checking nearby professionals
      setTimeout(() => setSearchStep(3), 2600), // Checking schedule
      setTimeout(() => {
        setSearchStep(4);                       // Confirming professional & finishing search
        // Check if we should simulate no-match for certain test cases, otherwise show matched
        const hasPros = matchedPros.length > 0;
        setMatchingState(hasPros ? 'matched' : 'no-match');
      }, 3500),
    ];

    return () => timers.forEach((t) => clearTimeout(t));
  }, [matchingState]);

  // Filter & sort professionals based on criteria: Skill match, availability, distance, rating
  const matchedPros: (Professional & { distanceKm: number; matchScore: number })[] = TOP_PROFESSIONALS
    .filter((pro) => {
      // Match category or skill roughly
      const matchCat = pro.category.toLowerCase() === service.categoryName.toLowerCase() ||
        pro.mainSkill.toLowerCase().includes(service.categoryName.toLowerCase()) ||
        service.name.toLowerCase().includes(pro.category.toLowerCase());
      return matchCat || true; // fallback to show versatile top pros
    })
    .map((pro, index) => {
      // Mock computed distance (0.8 km to 4.5 km)
      const distanceKm = Number((1.2 + index * 0.9).toFixed(1));
      // Skill match score
      const skillMatch = pro.category.toLowerCase() === service.categoryName.toLowerCase() ? 98 : 85;
      const matchScore = skillMatch + (pro.rating * 2) - distanceKm;
      return {
        ...pro,
        distanceKm,
        matchScore,
      };
    })
    .sort((a, b) => b.matchScore - a.matchScore);

  const bestPro = matchedPros[0];

  return (
    <div className="flex flex-col h-full bg-[#FFFDF9] text-slate-900 overflow-y-auto pb-32 animate-in fade-in duration-200 relative">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md px-4 py-3.5 border-b border-amber-200 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-slate-700 hover:text-slate-900 hover:bg-amber-100 transition shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 text-amber-800" />
          </button>
          <div>
            <h1 className="text-base font-bold text-slate-900 tracking-tight">Professional Matching</h1>
            <p className="text-[10px] text-amber-800 font-medium">{service.name} · {appointmentDate}</p>
          </div>
        </div>

        <span className="text-xs font-bold text-amber-900 bg-amber-100 px-2.5 py-1 rounded-full border border-amber-200">
          Smart Match
        </span>
      </div>

      <div className="p-4 space-y-5 max-w-md mx-auto w-full">

        {/* ================= STATE 1: SEARCHING SCREEN ================= */}
        {matchingState === 'searching' && (
          <div className="py-12 px-6 rounded-3xl bg-white border border-amber-300 shadow-xl text-center space-y-6 my-auto">
            <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-amber-100 animate-ping opacity-75" />
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-600 to-yellow-400 text-slate-950 flex items-center justify-center shadow-lg relative z-10">
                <Loader2 className="w-9 h-9 animate-spin text-slate-950" />
              </div>
            </div>

            <div className="space-y-1">
              <h2 className="text-lg font-extrabold text-slate-900">Finding the right professional...</h2>
              <p className="text-xs text-slate-600">Matching top-rated verified experts near {address.city}</p>
            </div>

            {/* Progress checklist */}
            <div className="space-y-2.5 text-left max-w-xs mx-auto pt-2">
              <div className="flex items-center gap-3 text-xs font-semibold">
                {searchStep >= 1 ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                ) : (
                  <Loader2 className="w-4 h-4 text-amber-600 animate-spin shrink-0" />
                )}
                <span className={searchStep >= 1 ? 'text-slate-900 font-bold' : 'text-slate-400'}>
                  Checking service availability
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs font-semibold">
                {searchStep >= 2 ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                ) : searchStep === 1 ? (
                  <Loader2 className="w-4 h-4 text-amber-600 animate-spin shrink-0" />
                ) : (
                  <div className="w-5 h-5 rounded-full border border-slate-300 shrink-0" />
                )}
                <span className={searchStep >= 2 ? 'text-slate-900 font-bold' : 'text-slate-400'}>
                  Checking nearby professionals
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs font-semibold">
                {searchStep >= 3 ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                ) : searchStep === 2 ? (
                  <Loader2 className="w-4 h-4 text-amber-600 animate-spin shrink-0" />
                ) : (
                  <div className="w-5 h-5 rounded-full border border-slate-300 shrink-0" />
                )}
                <span className={searchStep >= 3 ? 'text-slate-900 font-bold' : 'text-slate-400'}>
                  Checking schedule ({appointmentTime})
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs font-semibold">
                {searchStep >= 4 ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                ) : searchStep === 3 ? (
                  <Loader2 className="w-4 h-4 text-amber-600 animate-spin shrink-0" />
                ) : (
                  <div className="w-5 h-5 rounded-full border border-slate-300 shrink-0" />
                )}
                <span className={searchStep >= 4 ? 'text-slate-900 font-bold' : 'text-slate-400'}>
                  Confirming professional match
                </span>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setMatchingState('matched')}
                className="text-[11px] text-amber-700 underline font-medium"
              >
                Skip animation & view results
              </button>
            </div>
          </div>
        )}

        {/* ================= STATE 2: MATCHED PROFESSIONALS ================= */}
        {matchingState === 'matched' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            {/* Auto Assignment Banner */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 shadow-md flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-[10px] font-extrabold uppercase tracking-wider bg-slate-950/10 px-2 py-0.5 rounded-md inline-block">
                  Primary Flow
                </span>
                <h3 className="text-sm font-extrabold">Best Expert Automatically Matched</h3>
                <p className="text-[11px] opacity-90">Sorted by skill, rating & distance for {appointmentTime}</p>
              </div>
              <Sparkles className="w-8 h-8 text-slate-950 shrink-0 opacity-80" />
            </div>

            <div>
              <h2 className="text-sm font-extrabold text-slate-900">Top Recommended Professionals ({matchedPros.length})</h2>
              <p className="text-xs text-slate-600">You can book instantly or choose another verified expert.</p>
            </div>

            {/* Professionals List */}
            <div className="space-y-3.5">
              {matchedPros.map((pro, idx) => {
                const isTopBest = idx === 0;
                return (
                  <div
                    key={pro.id}
                    className={`p-4 rounded-2xl border transition shadow-sm bg-white relative overflow-hidden ${
                      isTopBest ? 'border-amber-500 ring-2 ring-amber-400/20 shadow-md' : 'border-amber-200 hover:border-amber-300'
                    }`}
                  >
                    {isTopBest && (
                      <span className="absolute top-0 right-0 bg-amber-600 text-white text-[9px] font-extrabold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                        ★ Best Match
                      </span>
                    )}

                    <div className="flex items-start gap-3.5">
                      {/* Photo */}
                      <div className="relative shrink-0">
                        <img
                          src={pro.photoUrl}
                          alt={pro.name}
                          className="w-14 h-14 rounded-2xl object-cover border border-amber-300 shadow-sm"
                          referrerPolicy="no-referrer"
                        />
                        {pro.isVerified && (
                          <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-600 text-white rounded-full flex items-center justify-center text-[10px] shadow" title="Verified">
                            ✓
                          </span>
                        )}
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-extrabold text-slate-900 truncate">{pro.name}</h3>
                          {pro.isVerified && (
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 flex items-center gap-0.5">
                              <ShieldCheck className="w-3 h-3" /> Verified
                            </span>
                          )}
                        </div>

                        <p className="text-xs font-semibold text-amber-800 mt-0.5">
                          {pro.mainSkill} · <span className="text-slate-600 font-normal">{pro.experienceYears} yrs experience</span>
                        </p>

                        {/* Rating & Distance */}
                        <div className="flex items-center gap-3 mt-1.5 text-xs">
                          <span className="flex items-center gap-1 font-bold text-slate-900">
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                            {pro.rating} <span className="text-slate-500 font-normal">({pro.reviewsCount})</span>
                          </span>

                          <span className="flex items-center gap-1 text-slate-600">
                            <MapPin className="w-3.5 h-3.5 text-amber-600" />
                            {pro.distanceKm} km away
                          </span>
                        </div>

                        {/* Badges / Skills */}
                        <div className="flex flex-wrap gap-1 mt-2">
                          {pro.badges.map((b, bIdx) => (
                            <span key={bIdx} className="text-[9px] font-medium bg-amber-50 text-amber-900 px-2 py-0.5 rounded-md border border-amber-200">
                              {b}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Footer price & book button */}
                    <div className="mt-4 pt-3 border-t border-amber-100 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-slate-500 block">Starting Price & Time</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-extrabold text-slate-900">₹{pro.startingPrice}</span>
                          <span className="text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                            {appointmentTime} ({appointmentDate})
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => onSelectProfessional(pro)}
                        className="py-2.5 px-5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-extrabold shadow-md shadow-amber-600/30 transition active:scale-95"
                      >
                        Book Now →
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= STATE 3: NO PROFESSIONAL AVAILABLE ================= */}
        {matchingState === 'no-match' && (
          <div className="py-12 px-6 rounded-3xl bg-white border border-amber-300 shadow-lg text-center space-y-6 my-auto">
            <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto shadow-inner">
              <AlertTriangle className="w-8 h-8 text-amber-700" />
            </div>

            <div className="space-y-2">
              <h2 className="text-base font-extrabold text-slate-900">No professional is available for this time.</h2>
              <p className="text-xs text-slate-600">
                All our certified {service.categoryName} experts are fully booked at {appointmentTime} on {appointmentDate}.
              </p>
            </div>

            <div className="space-y-2.5 pt-2 max-w-xs mx-auto">
              <button
                type="button"
                onClick={onChooseAnotherTime}
                className="w-full py-3 px-4 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-extrabold shadow transition active:scale-95 flex items-center justify-center gap-2"
              >
                <Clock className="w-4 h-4" />
                <span>Choose Another Time Slot</span>
              </button>

              <button
                type="button"
                onClick={onChooseAnotherDate}
                className="w-full py-3 px-4 rounded-2xl bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold border border-amber-300 transition active:scale-95 flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Choose Another Date</span>
              </button>

              <button
                type="button"
                onClick={onManualAssistance}
                className="w-full py-3 px-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold border border-slate-300 transition active:scale-95 flex items-center justify-center gap-2"
              >
                <HelpCircle className="w-4 h-4 text-amber-700" />
                <span>Request Manual Assistance</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
