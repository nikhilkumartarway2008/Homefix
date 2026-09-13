import React, { useState } from 'react';
import { Menu, MapPin, Bell, ChevronDown, CheckCircle2 } from 'lucide-react';
import { RANCHI_LOCATIONS } from '../data/servicesData';

interface TopHeaderProps {
  currentLocation: string;
  onSelectLocation: (loc: string) => void;
  onOpenMenu: () => void;
  onOpenNotifications: () => void;
  unreadCount?: number;
  onOpenProfile: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  currentLocation,
  onSelectLocation,
  onOpenMenu,
  onOpenNotifications,
  unreadCount = 2,
  onOpenProfile,
}) => {
  const [isLocationOpen, setIsLocationOpen] = useState(false);

  return (
    <header className="relative z-30 flex items-center justify-between px-4 pt-3 pb-3 bg-white/95 backdrop-blur-md border-b border-amber-200/80 shadow-sm">
      {/* Left: Hamburger menu */}
      <button
        id="btn-hamburger-menu"
        onClick={onOpenMenu}
        aria-label="Open navigation menu"
        className="flex items-center justify-center w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 text-slate-700 hover:text-slate-900 hover:bg-amber-100 transition active:scale-95 shadow-sm"
      >
        <Menu className="w-5 h-5 text-amber-800" />
      </button>

      {/* Center: Location selector */}
      <div className="relative">
        <button
          id="btn-location-selector"
          onClick={() => setIsLocationOpen(!isLocationOpen)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50/80 border border-amber-200 hover:border-amber-400 transition active:scale-95 text-left shadow-sm"
        >
          <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
          <span className="text-xs font-semibold text-slate-900 max-w-[130px] truncate tracking-tight">
            {currentLocation.split('(')[0].trim()}
          </span>
          <ChevronDown
            className={`w-3.5 h-3.5 text-slate-600 transition-transform duration-200 ${
              isLocationOpen ? 'rotate-180 text-amber-700' : ''
            }`}
          />
        </button>

        {/* Location Dropdown Modal */}
        {isLocationOpen && (
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-white border border-amber-200 rounded-2xl shadow-xl shadow-amber-900/10 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
            <div className="px-3.5 py-1.5 border-b border-amber-100">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
                Select Service Area
              </span>
            </div>
            <div className="max-h-56 overflow-y-auto py-1">
              {RANCHI_LOCATIONS.map((loc) => {
                const isSelected = currentLocation === loc;
                return (
                  <button
                    key={loc}
                    onClick={() => {
                      onSelectLocation(loc);
                      setIsLocationOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between transition ${
                      isSelected
                        ? 'bg-amber-100 text-amber-900 font-bold'
                        : 'text-slate-700 hover:bg-amber-50 hover:text-slate-900'
                    }`}
                  >
                    <span className="truncate">{loc}</span>
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 shrink-0 ml-2" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Right: Notification bell and Profile Avatar */}
      <div className="flex items-center gap-2">
        <button
          id="btn-notifications"
          onClick={onOpenNotifications}
          aria-label="View notifications"
          className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 text-slate-700 hover:text-slate-900 hover:bg-amber-100 transition active:scale-95 shadow-sm"
        >
          <Bell className="w-5 h-5 text-amber-800" />
          {unreadCount > 0 && (
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-white animate-pulse" />
          )}
        </button>

        <button
          id="btn-header-profile-avatar"
          onClick={onOpenProfile}
          className="relative w-9 h-9 rounded-xl overflow-hidden border border-amber-300 hover:border-amber-500 transition active:scale-95 focus:outline-none shadow-sm"
        >
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
            alt="Sarah profile"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-1 ring-white" />
        </button>
      </div>
    </header>
  );
};
