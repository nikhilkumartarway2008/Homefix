import React, { useState } from 'react';
import { Booking } from '../types';
import { Calendar, Clock, MapPin, Phone, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface BookingsViewProps {
  bookings: Booking[];
  onOpenBookingModal: () => void;
  onCallPro: (name: string) => void;
  onChatPro: () => void;
  onTrackBooking?: (b: Booking) => void;
}

export const BookingsView: React.FC<BookingsViewProps> = ({
  bookings,
  onOpenBookingModal,
  onCallPro,
  onChatPro,
  onTrackBooking,
}) => {
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('active');

  const activeBookings = bookings.filter(
    (b) => b.status !== 'COMPLETED' && b.status !== 'Completed' && b.status !== 'CANCELLED' && b.status !== 'Cancelled'
  );
  const completedBookings = bookings.filter((b) => b.status === 'COMPLETED' || b.status === 'Completed');

  const displayedBookings =
    filter === 'all'
      ? bookings
      : filter === 'active'
      ? activeBookings
      : completedBookings;

  return (
    <div className="p-4 space-y-4 pb-20 animate-in fade-in duration-200">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-white tracking-tight">Your Bookings</h2>
          <p className="text-xs text-slate-400">Track and manage upcoming services in Ranchi</p>
        </div>
        <button
          onClick={onOpenBookingModal}
          className="px-3 py-1.5 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 text-xs font-semibold hover:bg-blue-600/30"
        >
          + New Service
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex bg-slate-900/80 p-1 rounded-xl border border-slate-800">
        {(['active', 'completed', 'all'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg capitalize transition ${
              filter === tab
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {tab === 'active' ? `Active (${activeBookings.length})` : tab}
          </button>
        ))}
      </div>

      {/* Bookings List */}
      {displayedBookings.length === 0 ? (
        <div className="text-center py-12 px-4 rounded-2xl bg-[#0D1527] border border-slate-800">
          <Calendar className="w-10 h-10 text-slate-600 mx-auto mb-2" />
          <p className="text-sm font-semibold text-slate-300">No {filter} bookings found</p>
          <p className="text-xs text-slate-500 mt-1">Book trusted Ranchi professionals in 60 seconds</p>
          <button
            onClick={onOpenBookingModal}
            className="mt-4 px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-600/30"
          >
            Book a Professional Now
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {displayedBookings.map((b) => (
            <div
              key={b.id}
              className="p-4 rounded-[20px] bg-[#0D1527] border border-slate-800/90 shadow-lg relative overflow-hidden"
            >
              {b.isEmergency && (
                <div className="absolute top-0 right-0 bg-rose-600 text-white text-[9px] font-extrabold px-3 py-0.5 rounded-bl-xl uppercase tracking-wider">
                  Emergency SOS
                </div>
              )}

              {/* Status & ID */}
              <div className="flex items-center justify-between text-xs pb-2.5 border-b border-slate-800">
                <span className="font-mono text-slate-400 font-medium">ID: {b.id}</span>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    b.status === 'Confirmed'
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  }`}
                >
                  {b.status}
                </span>
              </div>

              {/* Service & Pro Info */}
              <div className="flex items-start gap-3 py-3">
                <img
                  src={b.professionalPhoto}
                  alt={b.professionalName}
                  className="w-12 h-12 rounded-xl object-cover border border-blue-500/30"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-white truncate">{b.serviceName}</h3>
                  <div className="flex items-center gap-1 mt-0.5 text-xs text-slate-300">
                    <span className="font-medium text-slate-200">{b.professionalName}</span>
                    <span className="text-blue-400 text-xs">✓</span>
                    <span className="text-slate-500">·</span>
                    <span className="text-slate-400 text-[11px]">{b.professionalSkill}</span>
                  </div>
                  <div className="flex items-center gap-3 mt-1.5 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-blue-400" />
                      {b.timeSlot}
                    </span>
                    <span className="text-emerald-400 font-semibold">
                      OTP: <strong className="text-white font-mono">{b.otp || '4819'}</strong>
                    </span>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-slate-950/60 p-2 rounded-xl border border-slate-800/80 mb-3">
                <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span className="truncate">{b.address}</span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">To Pay After Service</span>
                  <span className="text-sm font-bold text-white">₹{b.totalAmount}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onCallPro(b.professionalName)}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition"
                  >
                    <Phone className="w-3.5 h-3.5 text-blue-400" />
                    <span>Call</span>
                  </button>
                  <button
                    onClick={() => (onTrackBooking ? onTrackBooking(b) : onChatPro())}
                    className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-extrabold shadow-md shadow-amber-600/30 transition"
                  >
                    Track & Chat
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
