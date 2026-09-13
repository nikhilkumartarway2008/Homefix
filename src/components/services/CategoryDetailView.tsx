import React from 'react';
import { ArrowLeft, ChevronRight, Star, Flame, ShieldCheck, Sparkles, Clock } from 'lucide-react';
import { CATEGORIES_LIST, DETAILED_SERVICES, DetailedService } from '../../data/detailedServicesData';

interface CategoryDetailViewProps {
  categoryId: string;
  onBack: () => void;
  onSelectService: (serviceId: string) => void;
}

export const CategoryDetailView: React.FC<CategoryDetailViewProps> = ({
  categoryId,
  onBack,
  onSelectService,
}) => {
  const category = CATEGORIES_LIST.find((c) => c.id === categoryId) || CATEGORIES_LIST[1];
  const services = DETAILED_SERVICES.filter((s) => s.categoryId === categoryId);

  return (
    <div className="flex flex-col h-full bg-[#080D1A] text-white overflow-y-auto pb-24 animate-in fade-in duration-200">
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
            <h1 className="text-base font-bold text-white tracking-tight">{category.name} Services</h1>
            <p className="text-[10px] text-slate-400">Ranchi Certified & Verified</p>
          </div>
        </div>

        <span className="px-2.5 py-1 rounded-full bg-blue-600/20 text-blue-300 text-[10px] font-bold border border-blue-500/30">
          {services.length} Services
        </span>
      </div>

      {/* Hero Banner */}
      <div className="p-4">
        <div className="p-4 rounded-[22px] bg-gradient-to-br from-[#121E38] via-[#0D1527] to-[#091020] border border-blue-500/25 shadow-xl relative overflow-hidden flex items-center justify-between">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-30 bg-cover bg-center pointer-events-none" style={{ backgroundImage: `url(${category.image})` }} />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D1527] via-[#0D1527]/90 to-transparent pointer-events-none" />

          <div className="relative z-10 space-y-1.5 max-w-[220px]">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[9px] font-bold border border-blue-500/30">
              <Sparkles className="w-3 h-3" /> Expert {category.name}
            </span>
            <h2 className="text-sm font-bold text-white leading-snug">
              Professional {category.name.toLowerCase()} for your home
            </h2>
            <p className="text-[10px] text-slate-300 leading-relaxed">
              {category.description}
            </p>
            <div className="flex items-center gap-2 pt-1 text-[10px] text-emerald-400 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" /> 30-Day Service Guarantee
            </div>
          </div>

          <div className="relative z-10 shrink-0">
            <img
              src={category.image}
              alt={category.name}
              className="w-20 h-20 rounded-2xl object-cover border-2 border-blue-400/50 shadow-lg"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>

      {/* Popular Services Section */}
      <div className="px-4 pt-2 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs uppercase tracking-wider text-slate-400 font-bold">
            Popular {category.name} Services
          </h3>
          <span className="text-[10px] text-blue-400 font-semibold">Starting from ₹199</span>
        </div>

        {services.length === 0 ? (
          <div className="p-8 text-center bg-[#0D1527] rounded-2xl border border-slate-800 my-4 space-y-2">
            <p className="text-xs text-slate-400">No services listed under {category.name} yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {services.map((srv) => (
              <div
                key={srv.id}
                onClick={() => onSelectService(srv.id)}
                className="p-4 rounded-[20px] bg-[#0D1527] border border-slate-800 hover:border-blue-500/40 transition group cursor-pointer shadow-lg flex items-center justify-between relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-bl-full pointer-events-none group-hover:bg-blue-600/10 transition" />

                <div className="flex items-start gap-3.5 relative z-10">
                  <img
                    src={srv.image}
                    alt={srv.name}
                    className="w-14 h-14 rounded-2xl object-cover border border-slate-800 shrink-0 group-hover:scale-105 transition duration-200"
                    referrerPolicy="no-referrer"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-white group-hover:text-blue-300 transition">
                        {srv.name}
                      </h4>
                      {srv.isEmergencyAvailable && (
                        <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-amber-500/15 text-amber-300 text-[9px] font-bold border border-amber-500/30">
                          <Flame className="w-2.5 h-2.5" /> Emergency
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-slate-400 line-clamp-1 leading-normal">
                      {srv.tagline}
                    </p>

                    <div className="flex items-center gap-3 pt-1">
                      <span className="text-xs font-bold text-blue-400">
                        Starting from ₹{srv.startingPrice}
                      </span>
                      <span className="text-[10px] text-slate-500">·</span>
                      <span className="flex items-center gap-1 text-[10px] text-slate-400">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                        <strong className="text-white">{srv.rating}</strong> ({srv.reviewCount})
                      </span>
                    </div>
                  </div>
                </div>

                <div className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-500 transition shadow-sm shrink-0 ml-2">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Trust Guarantee Footer */}
      <div className="px-4 pt-4">
        <div className="p-3.5 rounded-2xl bg-blue-950/20 border border-blue-500/20 flex items-center gap-3 text-xs text-slate-300">
          <div className="w-8 h-8 rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-400 flex items-center justify-center shrink-0">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-white block">On-Time Arrival in Ranchi</span>
            <span className="text-[10px] text-slate-400">Professionals arrive within 45 minutes of booking confirmation.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
