import React from 'react';
import { Search, X, Mic, ShieldCheck } from 'lucide-react';

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onQuickBookClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  searchQuery,
  onSearchChange,
  onQuickBookClick,
}) => {
  return (
    <section className="relative px-4 pt-4 pb-2">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-4 w-52 h-44 bg-amber-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 left-2 w-36 h-36 bg-yellow-100/60 rounded-full blur-2xl pointer-events-none" />

      {/* Hero Content Card */}
      <div className="relative overflow-hidden rounded-[20px] bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100 border border-amber-200 p-4 shadow-xl shadow-amber-900/5">
        <div className="flex items-start justify-between">
          <div className="flex-1 pr-2 z-10">
            {/* Safety tag */}
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-200/80 border border-amber-300 mb-2">
              <ShieldCheck className="w-3 h-3 text-amber-800" />
              <span className="text-[10px] font-bold text-amber-900 uppercase tracking-wider">
                HomeFix Assured
              </span>
            </div>

            {/* Greeting and Subtitle */}
            <h1 className="text-xl font-extrabold tracking-tight text-slate-900 flex items-center gap-1.5">
              <span>Good Morning, Sarah</span>
              <span className="text-lg">👋</span>
            </h1>
            <p className="text-xs text-slate-700 mt-1 font-medium leading-relaxed">
              Let’s get your home fixed.
            </p>

            <div className="mt-3 flex items-center gap-2">
              <button
                onClick={onQuickBookClick}
                className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 active:scale-95 text-white text-[11px] font-bold tracking-wide transition shadow-md shadow-amber-600/30 inline-flex items-center gap-1.5"
              >
                <span>Fast 1-Tap Booking</span>
                <span className="text-amber-200">→</span>
              </button>
            </div>
          </div>

          {/* Integrated Professional Electrician/Plumber Worker Image */}
          <div className="relative w-28 h-28 shrink-0 -mr-1 -mt-1">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-amber-100 via-transparent to-transparent z-10 pointer-events-none" />
            <div className="w-full h-full rounded-2xl overflow-hidden border border-amber-300 shadow-inner bg-amber-100/50 relative">
              <img
                src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=400&q=80"
                alt="Professional technician at work"
                className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-1 left-1 right-1 z-20 bg-white/90 backdrop-blur-sm px-1.5 py-0.5 rounded-md border border-amber-200 flex items-center justify-between">
                <span className="text-[9px] font-bold text-slate-900 tracking-tight">Verified Pro</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mt-4 relative">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-amber-700 absolute left-3.5 pointer-events-none" />
            <input
              id="search-services-input"
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search for a service… (e.g. Electrician, Tap, AC)"
              className="w-full pl-10 pr-16 py-3 rounded-xl bg-white/90 border border-amber-200 text-xs text-slate-900 placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition shadow-sm"
            />
            <div className="absolute right-2.5 flex items-center gap-1.5">
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  aria-label="Clear search"
                  className="p-1 rounded-md text-slate-500 hover:text-slate-900"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                type="button"
                onClick={() => onSearchChange(searchQuery ? '' : 'Electrician')}
                aria-label="Voice or quick search"
                className="p-1.5 rounded-lg bg-amber-100 text-amber-800 hover:bg-amber-200 transition"
              >
                <Mic className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
