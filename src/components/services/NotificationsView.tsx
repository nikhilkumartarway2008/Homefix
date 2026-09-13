import React, { useState } from 'react';
import {
  Bell,
  CheckCircle2,
  Clock,
  ArrowLeft,
  Zap,
  ShieldCheck,
  Tag,
  AlertTriangle,
  Check,
  ExternalLink,
  Smartphone,
} from 'lucide-react';
import { Booking } from '../../types';

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type:
    | 'BOOKING_CREATED'
    | 'PRO_ASSIGNED'
    | 'PRO_ACCEPTED'
    | 'ON_THE_WAY'
    | 'ARRIVED'
    | 'WORK_STARTED'
    | 'WORK_COMPLETED'
    | 'PAYMENT_REQUIRED'
    | 'BOOKING_CANCELLED'
    | 'REVIEW_REMINDER'
    | 'NEW_JOB_REQUEST'
    | 'PAYMENT_EARNING_UPDATE';
  unread: boolean;
  bookingId?: string;
}

interface NotificationsViewProps {
  notifications: NotificationItem[];
  onMarkAllRead: () => void;
  onToggleRead: (id: string) => void;
  onOpenBooking: (bookingId: string) => void;
  onBack: () => void;
}

export const NotificationsView: React.FC<NotificationsViewProps> = ({
  notifications,
  onMarkAllRead,
  onToggleRead,
  onOpenBooking,
  onBack,
}) => {
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [pushEnabled, setPushEnabled] = useState<boolean>(true);

  const filteredNotifications =
    filter === 'unread' ? notifications.filter((n) => n.unread) : notifications;

  const getIconForType = (type: string) => {
    switch (type) {
      case 'BOOKING_CREATED':
      case 'PRO_ASSIGNED':
      case 'PRO_ACCEPTED':
        return <CheckCircle2 className="w-4 h-4 text-amber-700" />;
      case 'ON_THE_WAY':
      case 'ARRIVED':
        return <Zap className="w-4 h-4 text-amber-600 fill-amber-500" />;
      case 'WORK_STARTED':
      case 'WORK_COMPLETED':
        return <ShieldCheck className="w-4 h-4 text-emerald-700" />;
      case 'PAYMENT_REQUIRED':
      case 'PAYMENT_EARNING_UPDATE':
        return <Tag className="w-4 h-4 text-blue-600" />;
      case 'BOOKING_CANCELLED':
        return <AlertTriangle className="w-4 h-4 text-rose-600" />;
      default:
        return <Bell className="w-4 h-4 text-amber-700" />;
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#FFFDF9] text-slate-900 overflow-y-auto pb-32 animate-in fade-in duration-200">
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
            <h1 className="text-base font-bold text-slate-900 tracking-tight">Notifications Center</h1>
            <p className="text-[10px] text-amber-800 font-medium">Real-time alerts & service updates</p>
          </div>
        </div>

        <button
          onClick={onMarkAllRead}
          className="text-xs font-bold text-amber-800 bg-amber-100 hover:bg-amber-200 px-3 py-1.5 rounded-xl border border-amber-300 transition"
        >
          Mark all read
        </button>
      </div>

      <div className="p-4 max-w-md mx-auto w-full space-y-4">

        {/* Push Notification Banner */}
        <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-300 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold shadow-md shadow-amber-600/30">
              <Smartphone className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-extrabold text-slate-900 block">Push Notifications</span>
              <span className="text-[10px] text-slate-600">
                {pushEnabled ? 'Active (Receiving real-time SMS & Push)' : 'Paused'}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setPushEnabled(!pushEnabled)}
            className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors ${
              pushEnabled ? 'bg-amber-600' : 'bg-slate-300'
            }`}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform shadow ${
                pushEnabled ? 'translate-x-6' : 'translate-x-0.5'
              }`}
            />
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex bg-amber-100/60 p-1 rounded-xl border border-amber-200">
          <button
            onClick={() => setFilter('all')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition ${
              filter === 'all' ? 'bg-amber-600 text-white shadow' : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            All Alerts ({notifications.length})
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition ${
              filter === 'unread' ? 'bg-amber-600 text-white shadow' : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            Unread ({notifications.filter((n) => n.unread).length})
          </button>
        </div>

        {/* Notifications List */}
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-12 px-4 rounded-3xl bg-white border border-amber-200 shadow-sm">
            <Bell className="w-10 h-10 text-amber-400 mx-auto mb-2" />
            <p className="text-sm font-bold text-slate-800">No notifications found</p>
            <p className="text-xs text-slate-500 mt-0.5">You're all caught up with your service updates.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredNotifications.map((n) => (
              <div
                key={n.id}
                onClick={() => onToggleRead(n.id)}
                className={`p-4 rounded-3xl border transition shadow-sm cursor-pointer relative overflow-hidden ${
                  n.unread
                    ? 'bg-amber-50/80 border-amber-400 ring-1 ring-amber-300'
                    : 'bg-white border-amber-200'
                }`}
              >
                {n.unread && (
                  <span className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-amber-600 animate-pulse" />
                )}

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center shrink-0">
                    {getIconForType(n.type)}
                  </div>
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center justify-between pr-3">
                      <h2 className="text-xs font-extrabold text-slate-900 truncate">{n.title}</h2>
                      <span className="text-[10px] font-medium text-slate-500">{n.timestamp}</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{n.description}</p>

                    {n.bookingId && (
                      <div className="pt-2 flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold text-amber-800">
                          Booking ID: {n.bookingId}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenBooking(n.bookingId!);
                          }}
                          className="px-2.5 py-1 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-[10px] font-bold flex items-center gap-1 shadow-xs transition"
                        >
                          <span>View Booking</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
