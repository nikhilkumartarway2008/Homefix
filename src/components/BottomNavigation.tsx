import React from 'react';
import { Home, Calendar, Plus, MessageSquare, User } from 'lucide-react';

export type NavTab = 'home' | 'bookings' | 'quick-book' | 'messages' | 'profile';

interface BottomNavigationProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  bookingsCount?: number;
  messagesCount?: number;
  onQuickBookClick: () => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeTab,
  onTabChange,
  bookingsCount = 1,
  messagesCount = 1,
  onQuickBookClick,
}) => {
  return (
    <div className="sticky bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-amber-200 px-3 py-2 shadow-lg">
      <nav className="flex items-center justify-between max-w-md mx-auto relative">
        {/* Tab 1: Home */}
        <button
          id="nav-tab-home"
          onClick={() => onTabChange('home')}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-all active:scale-95 ${
            activeTab === 'home' ? 'text-amber-800 font-bold' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <div className="relative">
            <Home className="w-5 h-5" />
            {activeTab === 'home' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-amber-600 rounded-full" />
            )}
          </div>
          <span className="text-[10px] font-semibold mt-1">Home</span>
        </button>

        {/* Tab 2: Bookings */}
        <button
          id="nav-tab-bookings"
          onClick={() => onTabChange('bookings')}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-all active:scale-95 relative ${
            activeTab === 'bookings' ? 'text-amber-800 font-bold' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <div className="relative">
            <Calendar className="w-5 h-5" />
            {bookingsCount > 0 && (
              <span className="absolute -top-1 -right-1.5 w-4 h-4 bg-amber-600 text-white rounded-full text-[9px] font-bold flex items-center justify-center">
                {bookingsCount}
              </span>
            )}
            {activeTab === 'bookings' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-amber-600 rounded-full" />
            )}
          </div>
          <span className="text-[10px] font-semibold mt-1">Bookings</span>
        </button>

        {/* Center: Large central "+" quick-book button */}
        <div className="flex-1 flex justify-center -mt-6">
          <button
            id="nav-btn-central-quick-book"
            onClick={onQuickBookClick}
            aria-label="Quick Book a Service"
            className="w-13 h-13 rounded-full bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-400 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-600/30 hover:shadow-amber-500/50 ring-4 ring-white transition-transform active:scale-90 group"
          >
            <Plus className="w-7 h-7 text-slate-950 stroke-[2.5] group-hover:rotate-90 transition-transform duration-200" />
          </button>
        </div>

        {/* Tab 3: Messages */}
        <button
          id="nav-tab-messages"
          onClick={() => onTabChange('messages')}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-all active:scale-95 relative ${
            activeTab === 'messages' ? 'text-amber-800 font-bold' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <div className="relative">
            <MessageSquare className="w-5 h-5" />
            {messagesCount > 0 && (
              <span className="absolute -top-1 -right-1.5 w-4 h-4 bg-emerald-600 text-white rounded-full text-[9px] font-bold flex items-center justify-center">
                {messagesCount}
              </span>
            )}
            {activeTab === 'messages' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-amber-600 rounded-full" />
            )}
          </div>
          <span className="text-[10px] font-semibold mt-1">Messages</span>
        </button>

        {/* Tab 4: Profile */}
        <button
          id="nav-tab-profile"
          onClick={() => onTabChange('profile')}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-all active:scale-95 ${
            activeTab === 'profile' ? 'text-amber-800 font-bold' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <div className="relative">
            <User className="w-5 h-5" />
            {activeTab === 'profile' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-amber-600 rounded-full" />
            )}
          </div>
          <span className="text-[10px] font-semibold mt-1">Profile</span>
        </button>
      </nav>
    </div>
  );
};
