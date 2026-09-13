import React from 'react';
import {
  ShieldCheck,
  MapPin,
  Wallet,
  Headphones,
  Award,
  ChevronRight,
  LogOut,
  Sparkles,
} from 'lucide-react';

interface ProfileViewProps {
  onBackToHome?: () => void;
  onLogout?: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ onLogout }) => {
  return (
    <div className="p-4 space-y-4 pb-20 animate-in fade-in duration-200">
      {/* Profile Header */}
      <div className="p-4 rounded-[22px] bg-gradient-to-br from-[#121E38] via-[#0D1527] to-[#091020] border border-blue-500/25 shadow-xl relative overflow-hidden">
        <div className="flex items-center gap-3.5">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
              alt="Sarah"
              className="w-16 h-16 rounded-2xl object-cover border-2 border-blue-400"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-1 -right-1 bg-blue-600 rounded-full p-1 text-white">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="text-base font-bold text-white">Sarah Sharma</h2>
              <span className="px-1.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[9px] font-bold border border-blue-500/30">
                PRO PLUS
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">+91 98350 12480</p>
            <div className="flex items-center gap-1 text-[11px] text-emerald-400 mt-1">
              <Sparkles className="w-3 h-3" />
              <span>Ranchi Verified Resident</span>
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-800 text-center">
          <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-[10px] uppercase text-slate-400 block font-semibold">Bookings</span>
            <span className="text-sm font-bold text-white">12</span>
          </div>
          <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-[10px] uppercase text-slate-400 block font-semibold">Wallet</span>
            <span className="text-sm font-bold text-blue-400">₹450</span>
          </div>
          <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-[10px] uppercase text-slate-400 block font-semibold">Saved</span>
            <span className="text-sm font-bold text-emerald-400">₹1,280</span>
          </div>
        </div>
      </div>

      {/* HomeFix Shield Card */}
      <div className="p-3.5 rounded-[18px] bg-[#0E1A33] border border-blue-500/30 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/40 text-blue-400 flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white">HomeFix Shield Protection</h4>
            <p className="text-[10px] text-slate-300">Up to ₹10,000 damage coverage on every job</p>
          </div>
        </div>
        <span className="text-[10px] font-bold text-emerald-400 uppercase bg-emerald-500/10 px-2 py-0.5 rounded-full">
          Active
        </span>
      </div>

      {/* Menu Options */}
      <div className="rounded-[20px] bg-[#0D1527] border border-slate-800 divide-y divide-slate-800/80 overflow-hidden">
        {[
          {
            icon: MapPin,
            title: 'Saved Addresses',
            subtitle: 'Flat 402, Anand Vihar, Lalpur, Ranchi',
          },
          {
            icon: Wallet,
            title: 'Payment & UPI Methods',
            subtitle: 'Google Pay, PhonePe, Cards, Cash',
          },
          {
            icon: Headphones,
            title: '24x7 Customer Support Helpline',
            subtitle: 'Immediate Ranchi escalation desk',
          },
          {
            icon: ShieldCheck,
            title: 'Safety & Technician Verification',
            subtitle: 'Police background check details',
          },
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <button
              key={idx}
              onClick={() => alert(`${item.title}: Active and configured for Ranchi.`)}
              className="w-full p-3.5 flex items-center justify-between hover:bg-slate-800/50 transition text-left group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-blue-400 group-hover:border-blue-500/40 transition">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-white block">{item.title}</span>
                  <span className="text-[10px] text-slate-400 block">{item.subtitle}</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-transform group-hover:translate-x-0.5" />
            </button>
          );
        })}
      </div>

      {/* App Version & Logout */}
      <div className="pt-2 text-center space-y-2">
        <button
          onClick={() => {
            if (onLogout) {
              onLogout();
            } else {
              alert('Logged out safely.');
            }
          }}
          className="inline-flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 font-semibold px-4 py-2 rounded-xl hover:bg-rose-950/30 transition"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out of HomeFix</span>
        </button>
        <p className="text-[10px] text-slate-600">HomeFix App v2.4.0 · Ranchi Region</p>
      </div>
    </div>
  );
};
