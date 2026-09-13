import React from 'react';
import {
  X,
  Wrench,
  Shield,
  FileText,
  PhoneCall,
  Gift,
  HelpCircle,
  MapPin,
  ChevronRight,
} from 'lucide-react';

interface SideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategoryModal: () => void;
  onOpenBookings: () => void;
  onOpenProOnboarding: () => void;
}

export const SideDrawer: React.FC<SideDrawerProps> = ({
  isOpen,
  onClose,
  onSelectCategoryModal,
  onOpenBookings,
  onOpenProOnboarding,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-[300px] max-w-[80%] bg-[#0A1022] border-r border-slate-800 h-full p-5 flex flex-col justify-between z-10 animate-in slide-in-from-left duration-200">
        <div>
          {/* Top close & Brand */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-sm shadow-md shadow-blue-600/40">
                HF
              </div>
              <div>
                <span className="text-base font-extrabold text-white tracking-tight">HomeFix</span>
                <span className="text-[10px] text-blue-400 block font-medium">Ranchi, Jharkhand</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* User Preview */}
          <div className="py-4 flex items-center gap-3 border-b border-slate-800/80">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
              alt="Sarah"
              className="w-11 h-11 rounded-xl object-cover border border-blue-400"
              referrerPolicy="no-referrer"
            />
            <div>
              <h4 className="text-sm font-bold text-white">Sarah Sharma</h4>
              <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-blue-400" />
                Lalpur, Ranchi
              </p>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-3 space-y-1">
            {[
              {
                icon: Wrench,
                label: 'All Home Services',
                action: () => {
                  onClose();
                  onSelectCategoryModal();
                },
              },
              {
                icon: FileText,
                label: 'My Bookings & History',
                action: () => {
                  onClose();
                  onOpenBookings();
                },
              },
              {
                icon: Wrench,
                label: 'Become a Professional Partner',
                badge: 'Earn ₹45k+',
                action: () => {
                  onClose();
                  onOpenProOnboarding();
                },
              },
              {
                icon: Shield,
                label: 'Safety & Police Verification',
                badge: 'Verified',
                action: () => alert('All HomeFix professionals undergo strict background verification and police clearance.'),
              },
              {
                icon: Gift,
                label: 'Coupons & Offers',
                badge: '20% OFF',
                action: () => alert('WELCOME20 applied! Save 20% on any home service booking.'),
              },
              {
                icon: FileText,
                label: 'Transparent Rate Card',
                action: () => alert('Fixed, upfront pricing with no hidden charges across Ranchi.'),
              },
              {
                icon: PhoneCall,
                label: '24x7 Ranchi Emergency Helpline',
                action: () => alert('Helpline: 1800-HOMEFIX (Toll Free)'),
              },
              {
                icon: HelpCircle,
                label: 'Help & FAQs',
                action: () => alert('Got questions? Call 1800-HOMEFIX or chat with us in the app.'),
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <button
                  key={i}
                  onClick={item.action}
                  className="w-full px-3 py-2.5 rounded-xl flex items-center justify-between text-xs text-slate-300 hover:text-white hover:bg-slate-900 transition text-left group"
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 text-blue-400" />
                    <span>{item.label}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {item.badge && (
                      <span className="px-1.5 py-0.5 rounded-md bg-blue-500/20 text-blue-300 text-[9px] font-bold">
                        {item.badge}
                      </span>
                    )}
                    <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-blue-400" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-500">
          <p className="font-semibold text-slate-400">HomeFix Technologies</p>
          <p className="text-[10px]">Serving Ranchi, Jharkhand with 100% Assurance</p>
        </div>
      </div>
    </div>
  );
};
