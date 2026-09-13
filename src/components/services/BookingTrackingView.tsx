import React, { useState } from 'react';
import {
  ArrowLeft,
  Phone,
  MessageSquare,
  MapPin,
  Clock,
  ShieldCheck,
  Star,
  CheckCircle2,
  Circle,
  AlertTriangle,
  HelpCircle,
  Navigation,
  XCircle,
  Share2,
  Sparkles,
  Wallet,
  Download,
} from 'lucide-react';
import { Booking, BookingStatus } from '../../types';

interface BookingTrackingViewProps {
  booking: Booking;
  onBack: () => void;
  onCallPro: (name: string) => void;
  onChatPro: () => void;
  onCancelBooking: (bookingId: string) => void;
  onContactSupport: () => void;
  onOpenPayment?: () => void;
}

export const BookingTrackingView: React.FC<BookingTrackingViewProps> = ({
  booking,
  onBack,
  onCallPro,
  onChatPro,
  onCancelBooking,
  onContactSupport,
  onOpenPayment,
}) => {
  // Allow interactive status change for demo/simulation testing
  const [currentStatus, setCurrentStatus] = useState<BookingStatus>(booking.status || 'ASSIGNED');
  const [showCancelModal, setShowCancelModal] = useState<boolean>(false);
  const [cancelReason, setCancelReason] = useState<string>('Plan changed');

  // Status timeline steps
  const timelineSteps: { key: BookingStatus; label: string; description: string }[] = [
    { key: 'ASSIGNED', label: 'Booking Confirmed & Assigned', description: 'Expert assigned to your request' },
    { key: 'ACCEPTED', label: 'Professional Accepted', description: 'Expert accepted your job' },
    { key: 'ON_THE_WAY', label: 'On The Way', description: 'Expert is traveling to your location' },
    { key: 'ARRIVED', label: 'Arrived at Location', description: 'Expert reached your doorstep' },
    { key: 'IN_PROGRESS', label: 'Work Started (In Progress)', description: 'Service is currently being performed' },
    { key: 'COMPLETED', label: 'Completed', description: 'Service completed & verified' },
  ];

  // Determine active step index
  const getStepIndex = (status: BookingStatus) => {
    switch (status) {
      case 'PENDING':
      case 'SEARCHING':
      case 'ASSIGNED': return 0;
      case 'ACCEPTED': return 1;
      case 'ON_THE_WAY': return 2;
      case 'ARRIVED': return 3;
      case 'IN_PROGRESS': return 4;
      case 'COMPLETED': return 5;
      default: return 0;
    }
  };

  const activeIndex = getStepIndex(currentStatus);

  return (
    <div className="flex flex-col h-full bg-[#FFFDF9] text-slate-900 overflow-y-auto pb-32 animate-in fade-in duration-200 relative">
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
            <h1 className="text-base font-bold text-slate-900 tracking-tight">Booking Tracking</h1>
            <p className="text-[10px] text-amber-800 font-medium font-mono">ID: {booking.id}</p>
          </div>
        </div>

        <span className={`text-xs font-bold px-3 py-1 rounded-full border shadow-xs ${
          currentStatus === 'COMPLETED' ? 'bg-emerald-100 text-emerald-800 border-emerald-300' :
          currentStatus === 'ON_THE_WAY' ? 'bg-amber-100 text-amber-900 border-amber-300 animate-pulse' :
          'bg-amber-50 text-amber-900 border-amber-200'
        }`}>
          {currentStatus.replace(/_/g, ' ')}
        </span>
      </div>

      <div className="p-4 space-y-4 max-w-md mx-auto w-full">

        {/* ================= MAP PREVIEW (Shown when ON_THE_WAY or ARRIVED) ================= */}
        {(currentStatus === 'ON_THE_WAY' || currentStatus === 'ARRIVED') && (
          <div className="relative w-full h-48 rounded-3xl overflow-hidden border border-amber-300 shadow-md bg-amber-100">
            {/* Simulated live map grid */}
            <div className="absolute inset-0 opacity-50 bg-[radial-gradient(#d97706_1.5px,transparent_1.5px)] [background-size:20px_20px]" />
            <div className="absolute inset-0 bg-gradient-to-t from-amber-200/60 via-transparent to-transparent" />

            {/* Simulated Live Marker */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-amber-600 text-white flex items-center justify-center shadow-xl animate-bounce">
                <Navigation className="w-5 h-5" />
              </div>
              <span className="bg-slate-900 text-white text-[10px] font-bold px-2 py-0.5 rounded-full mt-1 shadow">
                {currentStatus === 'ON_THE_WAY' ? 'Expert 1.4 km away' : 'Expert at your location'}
              </span>
            </div>

            {/* ETA Overlay */}
            <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-sm p-3 rounded-2xl border border-amber-300 shadow flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 font-bold uppercase">Estimated Arrival</span>
                  <span className="text-xs font-extrabold text-slate-900">
                    {currentStatus === 'ON_THE_WAY' ? '12 mins (Approx 1.4 km)' : 'Arrived at doorstep'}
                  </span>
                </div>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                Live GPS Active
              </span>
            </div>
          </div>
        )}

        {/* ================= PROFESSIONAL CARD ================= */}
        <div className="p-4 rounded-3xl bg-white border border-amber-300 shadow-sm space-y-3.5">
          <div className="flex items-center justify-between border-b border-amber-100 pb-3">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              Assigned Professional
            </span>
            <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> ID Verified
            </span>
          </div>

          <div className="flex items-center gap-3.5">
            <img
              src={booking.professionalPhoto || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
              alt={booking.professionalName}
              className="w-14 h-14 rounded-2xl object-cover border border-amber-300 shadow-sm"
              referrerPolicy="no-referrer"
            />
            <div className="flex-1 min-w-0">
              <h2 className="text-sm font-extrabold text-slate-900 truncate">{booking.professionalName}</h2>
              <p className="text-xs font-semibold text-amber-800">{booking.professionalSkill}</p>
              <div className="flex items-center gap-2 mt-1 text-xs text-slate-600">
                <span className="flex items-center gap-0.5 font-bold text-slate-900">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" /> 4.9
                </span>
                <span>·</span>
                <span>{booking.serviceName}</span>
              </div>
            </div>
          </div>

          {/* Quick Call & Chat Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <button
              type="button"
              onClick={() => onCallPro(booking.professionalName)}
              className="py-3 px-4 rounded-2xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-slate-900 text-xs font-extrabold flex items-center justify-center gap-2 transition active:scale-95 shadow-sm"
            >
              <Phone className="w-4 h-4 text-amber-700" />
              <span>Call Professional</span>
            </button>

            <button
              type="button"
              onClick={onChatPro}
              className="py-3 px-4 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-extrabold flex items-center justify-center gap-2 transition active:scale-95 shadow-md shadow-amber-600/30"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Live Chat</span>
            </button>
          </div>
        </div>

        {/* ================= STATUS TIMELINE ================= */}
        <div className="p-4 rounded-3xl bg-white border border-amber-300 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-amber-100 pb-3">
            <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-700" /> Service Status Timeline
            </h3>
            <span className="text-[10px] text-amber-800 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              Interactive Demo
            </span>
          </div>

          <div className="space-y-3 pl-2">
            {timelineSteps.map((step, idx) => {
              const isCompleted = idx <= activeIndex;
              const isCurrent = idx === activeIndex;

              return (
                <div key={step.key} className="flex items-start gap-3 relative">
                  {/* Vertical connecting line */}
                  {idx < timelineSteps.length - 1 && (
                    <div className={`absolute top-5 left-2.5 w-0.5 h-full -ml-px ${idx < activeIndex ? 'bg-emerald-600' : 'bg-slate-200'}`} />
                  )}

                  <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 z-10 ${
                    isCurrent ? 'bg-amber-600 text-white ring-4 ring-amber-200' :
                    isCompleted ? 'bg-emerald-600 text-white' :
                    'bg-slate-200 text-slate-400'
                  }`}>
                    {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Circle className="w-3 h-3" />}
                  </div>

                  <div className="flex-1 pb-3">
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-bold ${isCurrent ? 'text-amber-900 font-extrabold' : isCompleted ? 'text-slate-900' : 'text-slate-400'}`}>
                        {step.label}
                      </span>
                      <button
                        type="button"
                        onClick={() => setCurrentStatus(step.key)}
                        className="text-[9px] font-bold text-amber-700 hover:underline bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200"
                        title="Click to simulate status"
                      >
                        Set Status
                      </button>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-0.5">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================= BOOKING DETAILS SUMMARY ================= */}
        <div className="p-4 rounded-3xl bg-white border border-amber-300 shadow-sm space-y-2.5 text-xs">
          <div className="flex justify-between border-b border-amber-100 pb-2">
            <span className="text-slate-500 font-medium">Service Address</span>
            <span className="font-bold text-slate-900 text-right max-w-[200px] truncate">{booking.address}</span>
          </div>
          <div className="flex justify-between border-b border-amber-100 pb-2">
            <span className="text-slate-500 font-medium">Date & Time</span>
            <span className="font-bold text-slate-900">{booking.date} · {booking.timeSlot}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-500 font-medium">Service OTP Verification</span>
            <span className="font-mono font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
              {booking.otp || '4819'}
            </span>
          </div>

          <div className="pt-2 border-t border-amber-100 space-y-2">
            <button
              type="button"
              onClick={onOpenPayment}
              className="w-full py-3 px-4 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-extrabold flex items-center justify-center gap-2 shadow-md shadow-amber-600/30 transition"
            >
              <Wallet className="w-4 h-4" />
              <span>Proceed to Secure Payment & Invoice (₹369)</span>
            </button>

            <button
              type="button"
              onClick={() => {
                const slipContent = `HOMEFIX OFFICIAL SERVICE CONFIRMATION SLIP\n-----------------------------------\nBooking ID: ${booking.id}\nService: ${booking.serviceName}\nProfessional: ${booking.professionalName} (${booking.professionalPhone || '+91 98765 43210'})\nDate & Time: ${booking.date} at ${booking.timeSlot}\nAddress: ${booking.address}\nVerification OTP: ${booking.otp || '4819'}\nStatus: ${booking.status}\n-----------------------------------\nThank you for choosing HomeFix Ranchi!`;
                const blob = new Blob([slipContent], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `HomeFix_Slip_${booking.id}.txt`;
                a.click();
              }}
              className="w-full py-2.5 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-2 transition border border-slate-300"
            >
              <Download className="w-4 h-4 text-amber-700" />
              <span>Download Confirmation Slip</span>
            </button>
          </div>
        </div>

        {/* ================= CANCELLATION POLICY & SUPPORT ================= */}
        <div className="p-4 rounded-3xl bg-amber-50/70 border border-amber-200 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900">Cancellation Policy</span>
            <button
              type="button"
              onClick={() => setShowCancelModal(true)}
              className="text-xs font-extrabold text-rose-700 hover:underline flex items-center gap-1"
            >
              <XCircle className="w-3.5 h-3.5" /> Cancel Booking
            </button>
          </div>
          <p className="text-[10px] text-slate-600">
            Free cancellation up to 2 hours before scheduled slot. A nominal ₹49 inspection fee may apply if cancelled after professional departure.
          </p>

          <div className="pt-2 border-t border-amber-200 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900">Need Help?</span>
            <button
              type="button"
              onClick={onContactSupport}
              className="py-2 px-3 rounded-xl bg-white hover:bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold flex items-center gap-1.5 transition active:scale-95 shadow-xs"
            >
              <HelpCircle className="w-3.5 h-3.5 text-amber-700" />
              <span>Contact Support</span>
            </button>
          </div>
        </div>

      </div>

      {/* Cancel Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-sm bg-white rounded-3xl border border-amber-300 p-6 shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-base font-extrabold text-slate-900">Cancel Booking?</h3>
              <p className="text-xs text-slate-600">Please select a reason for cancellation.</p>
            </div>

            <div className="space-y-2">
              {['Plan changed', 'Found another service', 'Booked by mistake', 'Emergency resolved'].map((reason) => (
                <button
                  key={reason}
                  type="button"
                  onClick={() => setCancelReason(reason)}
                  className={`w-full p-2.5 rounded-xl border text-xs font-bold text-left transition ${
                    cancelReason === reason ? 'bg-amber-100 border-amber-500 text-amber-900' : 'bg-white border-amber-200 text-slate-700'
                  }`}
                >
                  {reason}
                </button>
              ))}
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowCancelModal(false)}
                className="flex-1 py-3 rounded-2xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold transition"
              >
                Keep Booking
              </button>
              <button
                type="button"
                onClick={() => {
                  onCancelBooking(booking.id);
                  setShowCancelModal(false);
                }}
                className="flex-1 py-3 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-extrabold shadow-md shadow-rose-600/30 transition"
              >
                Confirm Cancellation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
