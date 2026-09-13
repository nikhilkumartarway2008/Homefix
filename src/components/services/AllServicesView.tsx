import React, { useState, useMemo } from 'react';
import {
  ArrowLeft,
  Search,
  Wrench,
  Zap,
  Hammer,
  Paintbrush,
  Wind,
  Cpu,
  Sparkles,
  ShieldAlert,
  Grid,
  ChevronRight,
  SlidersHorizontal,
  Flame,
} from 'lucide-react';
import { CATEGORIES_LIST, DETAILED_SERVICES, DetailedService } from '../../data/detailedServicesData';

interface AllServicesViewProps {
  onBack: () => void;
  onSelectCategory: (categoryId: string) => void;
  onSelectService: (serviceId: string) => void;
  onOpenFilter: () => void;
}

const iconMap: Record<string, React.ElementType> = {
  Wrench,
  Zap,
  Hammer,
  Paintbrush,
  Wind,
  Cpu,
  Sparkles,
  ShieldAlert,
  Grid,
};

export const AllServicesView: React.FC<AllServicesViewProps> = ({
  onBack,
  onSelectCategory,
  onSelectService,
  onOpenFilter,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCatFilter, setSelectedCatFilter] = useState<string>('all');

  // Filter categories and search services
  const filteredServices = useMemo(() => {
    return DETAILED_SERVICES.filter((srv) => {
      const matchesSearch =
        searchQuery.trim() === '' ||
        srv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        srv.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        srv.categoryName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCat =
        selectedCatFilter === 'all' || srv.categoryId === selectedCatFilter;

      return matchesSearch && matchesCat;
    });
  }, [searchQuery, selectedCatFilter]);

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
            <h1 className="text-base font-bold text-white tracking-tight">All Services</h1>
            <p className="text-[10px] text-slate-400">Ranchi Verified Professionals</p>
          </div>
        </div>

        <button
          onClick={onOpenFilter}
          className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 hover:bg-blue-600/30 transition"
        >
          <SlidersHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* Search Bar */}
      <div className="px-4 pt-4">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search for a service (e.g. fan, tap, ac)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0D1527] border border-slate-800 rounded-2xl pl-10 pr-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* If Searching, show search results list */}
      {searchQuery.trim() !== '' ? (
        <div className="px-4 pt-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300">
              Search Results for "{searchQuery}" ({filteredServices.length})
            </span>
          </div>

          {filteredServices.length === 0 ? (
            <div className="p-8 text-center bg-[#0D1527] rounded-2xl border border-slate-800/80 my-4 space-y-3">
              <div className="w-12 h-12 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center mx-auto border border-rose-500/20">
                <Search className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white">No services found</h3>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                We couldn't find any exact match for "{searchQuery}". Try searching for terms like "fan", "tap", "ac", or "cleaning".
              </p>
              <div className="pt-2 flex flex-wrap gap-1.5 justify-center">
                {['Fan Repair', 'Tap Repair', 'AC Service', 'Washing Machine'].map((sug) => (
                  <button
                    key={sug}
                    onClick={() => setSearchQuery(sug)}
                    className="px-3 py-1 rounded-full bg-blue-600/15 text-blue-300 text-[11px] font-semibold border border-blue-500/30 hover:bg-blue-600/35 transition"
                  >
                    {sug}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            filteredServices.map((srv) => (
              <div
                key={srv.id}
                onClick={() => onSelectService(srv.id)}
                className="p-3.5 rounded-2xl bg-[#0D1527] border border-slate-800/80 hover:border-blue-500/40 transition flex items-center justify-between group cursor-pointer shadow-md"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={srv.image}
                    alt={srv.name}
                    className="w-12 h-12 rounded-xl object-cover border border-slate-800 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div>
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
                    <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">{srv.tagline}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[11px] font-bold text-blue-400">₹{srv.startingPrice}</span>
                      <span className="text-[10px] text-slate-500">·</span>
                      <span className="text-[10px] text-slate-400">⭐ {srv.rating} ({srv.reviewCount})</span>
                    </div>
                  </div>
                </div>
                <div className="w-7 h-7 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-500 transition">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        <>
          {/* Category Filter Pills */}
          <div className="px-4 pt-3 flex gap-2 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setSelectedCatFilter('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                selectedCatFilter === 'all'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-[#0D1527] text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              All Categories
            </button>
            {CATEGORIES_LIST.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCatFilter(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                  selectedCatFilter === cat.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-[#0D1527] text-slate-400 border border-slate-800 hover:text-white'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Categories Grid (PLUMBING, ELECTRICAL, etc.) */}
          <div className="px-4 pt-4 space-y-6 pb-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xs uppercase tracking-wider text-slate-400 font-bold">
                Explore Categories ({CATEGORIES_LIST.length})
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {CATEGORIES_LIST.map((cat) => {
                const IconComponent = iconMap[cat.iconName] || Wrench;
                return (
                  <div
                    key={cat.id}
                    onClick={() => onSelectCategory(cat.id)}
                    className="p-3.5 rounded-[20px] bg-gradient-to-br from-[#121E38] via-[#0D1527] to-[#091020] border border-slate-800 hover:border-blue-500/40 transition group cursor-pointer flex flex-col justify-between shadow-lg relative overflow-hidden"
                  >
                    <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-blue-600/5 rounded-full blur-xl group-hover:bg-blue-500/15 transition" />
                    
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-400 flex items-center justify-center group-hover:scale-110 transition duration-200">
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] text-slate-400 group-hover:text-blue-400 transition font-medium flex items-center gap-0.5">
                          View <ChevronRight className="w-3 h-3" />
                        </span>
                      </div>

                      <h3 className="text-xs font-bold text-white group-hover:text-blue-300 transition">
                        {cat.name}
                      </h3>
                      <p className="text-[10px] text-slate-400 line-clamp-2 mt-1">
                        {cat.description}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px]">
                      <span className="text-blue-400 font-bold">From ₹249</span>
                      <span className="text-emerald-400 font-semibold bg-emerald-500/10 px-1.5 py-0.5 rounded">
                        Verified Pros
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* More Services Banner */}
            <div className="p-4 rounded-[22px] bg-gradient-to-r from-blue-950/50 via-slate-900 to-indigo-950/40 border border-blue-500/30 flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">Custom Request</span>
                <h4 className="text-xs font-bold text-white">Can't find what you're looking for?</h4>
                <p className="text-[10px] text-slate-300">Request a custom home service inspection in Ranchi.</p>
              </div>
              <button
                onClick={() => alert('Custom service request desk opened. Our support will call you within 15 mins.')}
                className="px-3.5 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-md hover:bg-blue-500 transition whitespace-nowrap"
              >
                Request Custom
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
