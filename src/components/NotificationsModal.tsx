import React from 'react';
import { X, Bell, Zap, Tag, ShieldCheck, Check } from 'lucide-react';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onMarkAllRead: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  onMarkAllRead,
}) => {
  if (!isOpen) return null;

  const notifications = [
    {
      id: 1,
      icon: Zap,
      iconColor: 'text-amber-400 bg-amber-500/10',
      title: 'Technician Dispatched',
      description: 'Rahul Kumar (Electrician) is on the way to Boring Road. ETA 25 mins.',
      time: '10 mins ago',
      unread: true,
    },
    {
      id: 2,
      icon: Tag,
      iconColor: 'text-blue-400 bg-blue-500/10',
      title: 'WELCOME20 Unlocked',
      description: 'Use code WELCOME20 to get flat 20% off on your first booking.',
      time: '1 hour ago',
      unread: true,
    },
    {
      id: 3,
      icon: ShieldCheck,
      iconColor: 'text-emerald-400 bg-emerald-500/10',
      title: 'HomeFix Shield Active',
      description: 'Your upcoming home service is insured up to ₹10,000 for total peace of mind.',
      time: 'Yesterday',
      unread: false,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-[360px] mt-12 bg-[#0D1527] border border-slate-700/80 rounded-2xl shadow-2xl p-4 overflow-hidden">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-blue-400" />
            <h3 className="text-sm font-bold text-white">Notifications</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onMarkAllRead}
              className="text-[10px] text-blue-400 hover:text-blue-300 font-semibold"
            >
              Mark all read
            </button>
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-lg bg-slate-900 text-slate-400 hover:text-white flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="py-2 space-y-2 max-h-[380px] overflow-y-auto">
          {notifications.map((n) => {
            const Icon = n.icon;
            return (
              <div
                key={n.id}
                className={`p-3 rounded-xl border transition ${
                  n.unread
                    ? 'bg-blue-950/20 border-blue-500/30'
                    : 'bg-slate-900/50 border-slate-800/80'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <div className={`p-2 rounded-lg shrink-0 ${n.iconColor}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-white">{n.title}</h4>
                      <span className="text-[9px] text-slate-500">{n.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">
                      {n.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={onClose}
          className="w-full mt-2 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
        >
          Close
        </button>
      </div>
    </div>
  );
};
