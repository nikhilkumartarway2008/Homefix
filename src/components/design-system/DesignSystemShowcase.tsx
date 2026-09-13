import React, { useState } from 'react';
import { 
  Sparkles, Check, ChevronRight, AlertCircle, Loader2, Search, Bell, MapPin, 
  ShieldCheck, Wrench, Zap, User, Star, ArrowRight, RefreshCw, Layers 
} from 'lucide-react';

export const DesignSystemShowcase: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSegment, setSelectedSegment] = useState<'all' | 'active'>('all');

  const triggerToast = () => {
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2500);
  };

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto space-y-8 pb-20 animate-in fade-in duration-200">
      {/* Header */}
      <div className="p-6 rounded-[24px] bg-gradient-to-r from-[#121E38] via-[#0D1527] to-[#0A1020] border border-blue-500/30 shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-48 h-48 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="flex items-center gap-2 text-blue-400 mb-2">
          <Layers className="w-5 h-5" />
          <span className="text-xs font-bold uppercase tracking-wider">HomeFix UI Foundation</span>
        </div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight">Design System & Component Library</h1>
        <p className="text-xs text-slate-300 mt-1 max-w-xl leading-relaxed">
          Production-grade design tokens, interactive UI primitives, and reusable components built for the HomeFix home services marketplace platform.
        </p>
      </div>

      {/* 1. Colors */}
      <section className="space-y-3">
        <h2 className="text-sm font-bold text-white tracking-tight uppercase tracking-wider text-blue-400">
          1. Color Palette & Tokens
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { name: 'Dark Navy Primary', hex: '#050811 / #080D1A', bg: 'bg-[#080D1A]', border: 'border-slate-800' },
            { name: 'Card Surface', hex: '#0D1527', bg: 'bg-[#0D1527]', border: 'border-slate-800' },
            { name: 'Electric Blue Accent', hex: '#2563EB', bg: 'bg-blue-600', border: 'border-blue-500' },
            { name: 'Cyan Glow', hex: '#06B6D4', bg: 'bg-cyan-500', border: 'border-cyan-400' },
            { name: 'Success Emerald', hex: '#10B981', bg: 'bg-emerald-500', border: 'border-emerald-400' },
            { name: 'Warning Amber', hex: '#F59E0B', bg: 'bg-amber-500', border: 'border-amber-400' },
            { name: 'Danger Rose', hex: '#E11D48', bg: 'bg-rose-600', border: 'border-rose-500' },
            { name: 'Text Light Gray', hex: '#94A3B8', bg: 'bg-slate-400', border: 'border-slate-500' },
          ].map((c) => (
            <div key={c.name} className="p-3 rounded-2xl bg-[#0D1527] border border-slate-800/80 space-y-2">
              <div className={`w-full h-10 rounded-xl ${c.bg} border ${c.border} shadow-inner`} />
              <div>
                <span className="text-xs font-bold text-white block truncate">{c.name}</span>
                <span className="text-[10px] font-mono text-slate-400">{c.hex}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Typography */}
      <section className="space-y-3">
        <h2 className="text-sm font-bold text-white tracking-tight uppercase tracking-wider text-blue-400">
          2. Typography Hierarchy
        </h2>
        <div className="p-5 rounded-[20px] bg-[#0D1527] border border-slate-800 space-y-4">
          <div>
            <span className="text-[10px] uppercase font-mono text-slate-500 block">Heading 1 (Plus Jakarta Sans)</span>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">Let’s get your home fixed in Ranchi.</h1>
          </div>
          <div>
            <span className="text-[10px] uppercase font-mono text-slate-500 block">Heading 2</span>
            <h2 className="text-lg font-bold text-white tracking-tight">Top-Rated Verified Electricians</h2>
          </div>
          <div>
            <span className="text-[10px] uppercase font-mono text-slate-500 block">Body Text</span>
            <p className="text-xs text-slate-300 leading-relaxed">
              Certified industrial and domestic electrical technicians with 5+ years of verified local experience. Specialist in high-voltage wiring and MCB repairs.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Buttons & CTAs */}
      <section className="space-y-3">
        <h2 className="text-sm font-bold text-white tracking-tight uppercase tracking-wider text-blue-400">
          3. Buttons & Actions
        </h2>
        <div className="p-5 rounded-[20px] bg-[#0D1527] border border-slate-800 flex flex-wrap gap-3 items-center">
          <button className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-95 text-white text-xs font-bold shadow-lg shadow-blue-600/30 transition flex items-center gap-1.5">
            <span>Primary Electric Blue CTA</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-200 text-xs font-semibold border border-slate-700 transition">
            Secondary Action
          </button>

          <button className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 active:scale-95 text-white text-xs font-bold transition flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Emergency SOS Button</span>
          </button>

          <button 
            onClick={triggerToast}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white text-xs font-bold transition"
          >
            Trigger Toast Demo
          </button>
        </div>
      </section>

      {/* 4. Inputs & Search */}
      <section className="space-y-3">
        <h2 className="text-sm font-bold text-white tracking-tight uppercase tracking-wider text-blue-400">
          4. Inputs & Search Fields
        </h2>
        <div className="p-5 rounded-[20px] bg-[#0D1527] border border-slate-800 space-y-3 max-w-md">
          <div className="relative">
            <Search className="w-4 h-4 text-blue-400 absolute left-3.5 top-3" />
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Search for a service (e.g. Electrician, Plumbing)..." 
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition"
            />
          </div>
        </div>
      </section>

      {/* 5. Cards & Badges */}
      <section className="space-y-3">
        <h2 className="text-sm font-bold text-white tracking-tight uppercase tracking-wider text-blue-400">
          5. Cards & Status Badges
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 rounded-[20px] bg-[#0D1527] border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-bold border border-blue-500/30">
                Verified Pro
              </span>
              <span className="text-xs text-amber-400 font-bold">⭐ 4.9</span>
            </div>
            <h4 className="text-sm font-bold text-white">Rahul Kumar</h4>
            <p className="text-[11px] text-slate-400">Electrician · 5 Yrs Exp</p>
          </div>

          <div className="p-4 rounded-[20px] bg-[#0D1527] border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                Active Booking
              </span>
              <span className="text-xs font-mono text-white">₹399</span>
            </div>
            <h4 className="text-sm font-bold text-white">Switchboard Repair</h4>
            <p className="text-[11px] text-slate-400">Arriving in 20 mins</p>
          </div>

          <div className="p-4 rounded-[20px] bg-[#0D1527] border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-[10px] font-bold border border-rose-500/30">
                Emergency SOS
              </span>
              <span className="text-xs font-mono text-white">15m ETA</span>
            </div>
            <h4 className="text-sm font-bold text-white">Urgent Plumbing Leak</h4>
            <p className="text-[11px] text-slate-400">Boring Road, Ranchi</p>
          </div>
        </div>
      </section>

      {/* 6. States (Loading, Empty, Error, Toast Demo) */}
      <section className="space-y-3">
        <h2 className="text-sm font-bold text-white tracking-tight uppercase tracking-wider text-blue-400">
          6. UI States (Loading, Empty, Error)
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Loading State */}
          <div className="p-5 rounded-[20px] bg-[#0D1527] border border-slate-800 flex flex-col items-center text-center justify-center space-y-2">
            <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
            <span className="text-xs font-semibold text-white">Finding nearest Ranchi pro...</span>
            <span className="text-[10px] text-slate-400">Matching GPS coordinates</span>
          </div>

          {/* Empty State */}
          <div className="p-5 rounded-[20px] bg-[#0D1527] border border-slate-800 flex flex-col items-center text-center justify-center space-y-2">
            <ShieldCheck className="w-6 h-6 text-slate-600" />
            <span className="text-xs font-semibold text-white">No active bookings</span>
            <span className="text-[10px] text-slate-400">Book trusted pros in 60 seconds</span>
          </div>

          {/* Error State */}
          <div className="p-5 rounded-[20px] bg-[#0D1527] border border-slate-800 flex flex-col items-center text-center justify-center space-y-2">
            <AlertCircle className="w-6 h-6 text-rose-500" />
            <span className="text-xs font-semibold text-white">Connection Error</span>
            <span className="text-[10px] text-slate-400">Please check internet connection</span>
          </div>
        </div>
      </section>

      {/* Toast Demo Notification */}
      {toastVisible && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-blue-600 text-white text-xs font-bold shadow-2xl border border-blue-400 flex items-center gap-2 animate-in slide-in-from-bottom duration-200">
          <Check className="w-4 h-4 text-emerald-300" />
          <span>Design System Toast: Action executed successfully!</span>
        </div>
      )}
    </div>
  );
};
