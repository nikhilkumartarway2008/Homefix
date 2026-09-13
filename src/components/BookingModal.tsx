import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  Clock,
  MapPin,
  ShieldCheck,
  Tag,
  ArrowRight,
  Phone,
  MessageSquare,
  Sparkles,
  Zap,
} from 'lucide-react';
import { Booking, Professional, ServiceItem } from '../types';
import { TOP_PROFESSIONALS } from '../data/servicesData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  service?: ServiceItem | null;
  professional?: Professional | null;
  isEmergency?: boolean;
  appliedPromoCode?: string;
  onBookingSuccess: (newBooking: Booking) => void;
  onOpenChatWithPro?: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  service,
  professional,
  isEmergency = false,
  appliedPromoCode = '',
  onBookingSuccess,
  onOpenChatWithPro,
}) => {
  const selectedPro = professional || TOP_PROFESSIONALS[0];
  const serviceName = service ? service.name : selectedPro.category;

  const [selectedIssue, setSelectedIssue] = useState<string>(
    service?.popularSubServices?.[0] || 'Standard Inspection & Diagnostic Fix'
  );
  const [selectedSlot, setSelectedSlot] = useState<string>(
    isEmergency ? 'Express SOS (15-30 Mins)' : 'Express Arrival (30-45 mins)'
  );
  const [promoInput, setPromoInput] = useState<string>(appliedPromoCode || 'WELCOME20');
  const [promoApplied, setPromoApplied] = useState<boolean>(true);
  const [userNote, setUserNote] = useState<string>('');
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  if (!isOpen) return null;

  const basePrice = selectedPro.startingPrice || 399;
  const discount = promoApplied ? Math.round(basePrice * 0.2) : 0;
  const finalPrice = Math.max(basePrice - discount, 99);

  const handleConfirm = () => {
    const booking: Booking = {
      id: `HF-${Math.floor(10000 + Math.random() * 90000)}`,
      serviceName: `${serviceName} - ${selectedIssue}`,
      professionalName: selectedPro.name,
      professionalPhoto: selectedPro.photoUrl,
      professionalSkill: selectedPro.mainSkill,
      date: isEmergency ? 'Today (Emergency SOS)' : 'Today',
      timeSlot: selectedSlot,
      address: 'Flat 402, Anand Vihar, Lalpur, Ranchi',
      totalAmount: finalPrice,
      discountApplied: discount,
      status: 'Confirmed',
      etaMinutes: isEmergency ? 20 : 35,
      otp: `${Math.floor(1000 + Math.random() * 9000)}`,
      isEmergency,
    };

    setConfirmedBooking(booking);
    onBookingSuccess(booking);
  };

  const handleResetAndClose = () => {
    setConfirmedBooking(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-[420px] bg-[#0A1020] border-t sm:border border-slate-700/80 rounded-t-[28px] sm:rounded-[24px] overflow-hidden max-h-[92vh] flex flex-col shadow-2xl shadow-blue-950/60">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center gap-2">
            <div
              className={`w-2.5 h-2.5 rounded-full ${
                isEmergency ? 'bg-rose-500 animate-ping' : 'bg-blue-500'
              }`}
            />
            <h3 className="text-base font-bold text-white tracking-tight">
              {confirmedBooking
                ? 'Booking Confirmed! 🎉'
                : isEmergency
                ? '⚡ Express Emergency Booking'
                : `Book ${serviceName} Service`}
            </h3>
          </div>
          <button
            onClick={handleResetAndClose}
            className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 overflow-y-auto space-y-4 text-xs">
          {confirmedBooking ? (
            /* SUCCESS CONFIRMATION STATE */
            <div className="space-y-4 py-2 animate-in zoom-in-95 duration-200">
              <div className="text-center p-4 rounded-2xl bg-gradient-to-b from-blue-900/30 to-slate-900/50 border border-blue-500/30">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto mb-2">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="text-base font-bold text-white">Technician Dispatched!</h4>
                <p className="text-slate-300 text-[11px] mt-0.5">
                  Professional will arrive in <strong className="text-blue-400">{confirmedBooking.etaMinutes} minutes</strong>
                </p>
                <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950 border border-blue-400/40 text-blue-300 font-mono text-xs">
                  <span>Safety OTP for Doorstep:</span>
                  <strong className="text-white tracking-wider text-sm">{confirmedBooking.otp}</strong>
                </div>
              </div>

              {/* Assigned Pro Card */}
              <div className="p-3.5 rounded-2xl bg-[#0D1527] border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={confirmedBooking.professionalPhoto}
                    alt={confirmedBooking.professionalName}
                    className="w-12 h-12 rounded-xl object-cover border border-blue-500/40"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <div className="flex items-center gap-1 font-bold text-white text-sm">
                      <span>{confirmedBooking.professionalName}</span>
                      <span className="text-blue-400 text-xs">✓</span>
                    </div>
                    <p className="text-[11px] text-slate-400">{confirmedBooking.professionalSkill}</p>
                    <span className="inline-block mt-0.5 text-[10px] text-emerald-400 font-medium">
                      ● On the way to Boring Road
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => alert(`Calling ${confirmedBooking.professionalName} (+91 98765 43210)...`)}
                    className="p-2.5 rounded-xl bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 border border-blue-500/30"
                    title="Call Technician"
                  >
                    <Phone className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      onClose();
                      onOpenChatWithPro?.();
                    }}
                    className="p-2.5 rounded-xl bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30 border border-emerald-500/30"
                    title="Chat with Technician"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Summary Details */}
              <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2 text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Booking ID:</span>
                  <span className="font-mono text-white font-semibold">{confirmedBooking.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Service:</span>
                  <span className="text-white font-medium">{confirmedBooking.serviceName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Address:</span>
                  <span className="text-white font-medium text-right truncate max-w-[200px]">
                    {confirmedBooking.address}
                  </span>
                </div>
                <div className="flex justify-between border-t border-slate-800 pt-2 font-bold text-white text-sm">
                  <span>Amount to pay after job:</span>
                  <span className="text-blue-400">₹{confirmedBooking.totalAmount}</span>
                </div>
              </div>

              <button
                onClick={handleResetAndClose}
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-blue-600/30"
              >
                Done & Return to Dashboard
              </button>
            </div>
          ) : (
            /* STEPPED BOOKING FORM (< 60 SECONDS) */
            <>
              {/* Selected Pro Info */}
              <div className="p-3 rounded-2xl bg-[#0D1527] border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedPro.photoUrl}
                    alt={selectedPro.name}
                    className="w-11 h-11 rounded-xl object-cover border border-blue-500/30"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-white">{selectedPro.name}</span>
                      <span className="text-blue-400 text-xs">✓</span>
                    </div>
                    <span className="text-[11px] text-slate-400">{selectedPro.mainSkill}</span>
                    <div className="text-[10px] text-amber-400 font-semibold flex items-center gap-1 mt-0.5">
                      <span>⭐ {selectedPro.rating}</span>
                      <span className="text-slate-500">({selectedPro.reviewsCount})</span>
                      <span className="text-blue-400 ml-1">· {selectedPro.experienceYears} Yrs Exp</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[9px] uppercase text-slate-400 block">Base Rate</span>
                  <span className="text-sm font-bold text-white">₹{basePrice}</span>
                </div>
              </div>

              {/* Sub-Service Selection */}
              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Select Specific Requirement
                </label>
                <div className="space-y-1.5">
                  {(service?.popularSubServices || [
                    'Standard Diagnostic & Inspection',
                    'Immediate Fix & Spare Part Replacement',
                    'Complete Tune-up & Safety Check',
                  ]).map((issue) => (
                    <button
                      key={issue}
                      type="button"
                      onClick={() => setSelectedIssue(issue)}
                      className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between transition ${
                        selectedIssue === issue
                          ? 'bg-blue-600/20 border-blue-500 text-white font-medium'
                          : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <span>{issue}</span>
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          selectedIssue === issue
                            ? 'border-blue-400 bg-blue-500 text-white'
                            : 'border-slate-700'
                        }`}
                      >
                        {selectedIssue === issue && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slot */}
              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                  <span>Preferred Arrival Time</span>
                  <span className="text-[10px] text-blue-400 font-normal">Express available</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    {
                      label: isEmergency ? 'Express SOS' : 'Express (30-45m)',
                      sub: 'Fastest technician dispatch',
                      icon: Zap,
                    },
                    {
                      label: 'Today Evening',
                      sub: '5:00 PM - 7:00 PM',
                      icon: Clock,
                    },
                    {
                      label: 'Tomorrow Morning',
                      sub: '10:00 AM - 12:00 PM',
                      icon: Clock,
                    },
                    {
                      label: 'Tomorrow Afternoon',
                      sub: '2:00 PM - 4:00 PM',
                      icon: Clock,
                    },
                  ].map((slot) => {
                    const isSelected = selectedSlot.startsWith(slot.label.split(' ')[0]);
                    const Icon = slot.icon;
                    return (
                      <button
                        key={slot.label}
                        type="button"
                        onClick={() => setSelectedSlot(slot.label)}
                        className={`p-2.5 rounded-xl border text-left transition ${
                          isSelected
                            ? 'bg-blue-600/20 border-blue-500 text-white shadow-sm'
                            : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-1 font-bold text-xs">
                          <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-blue-400' : 'text-slate-500'}`} />
                          <span className={isSelected ? 'text-white' : 'text-slate-200'}>{slot.label}</span>
                        </div>
                        <span className="text-[10px] text-slate-400 block mt-0.5">{slot.sub}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Service Address */}
              <div className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Service Address
                    </span>
                    <span className="text-xs font-semibold text-white">
                      Flat 402, Anand Vihar, Lalpur, Ranchi
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => alert('Address change modal')}
                  className="text-[11px] font-semibold text-blue-400 hover:text-blue-300"
                >
                  Change
                </button>
              </div>

              {/* Coupon / Promo Code */}
              <div className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-blue-400" />
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                    placeholder="Enter Coupon Code (WELCOME20)"
                    className="flex-1 bg-transparent text-xs text-white uppercase font-mono tracking-wider focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setPromoApplied(promoInput === 'WELCOME20')}
                    className="px-2.5 py-1 bg-blue-600/30 text-blue-300 hover:bg-blue-600/50 rounded-lg text-[10px] font-bold"
                  >
                    {promoApplied ? 'Applied' : 'Apply'}
                  </button>
                </div>
                {promoApplied && (
                  <p className="text-[10px] text-emerald-400 mt-1 flex items-center gap-1 font-medium">
                    <Sparkles className="w-3 h-3" />
                    20% discount applied successfully! (Saved ₹{discount})
                  </p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 pt-1 border-t border-slate-800 text-slate-400 text-xs">
                <div className="flex justify-between">
                  <span>Standard Visiting & Service Charge:</span>
                  <span className="text-slate-200">₹{basePrice}</span>
                </div>
                <div className="flex justify-between text-emerald-400">
                  <span>HomeFix Shield Insurance & Safety Kit:</span>
                  <span>FREE</span>
                </div>
                {promoApplied && (
                  <div className="flex justify-between text-emerald-400 font-medium">
                    <span>Coupon Discount (WELCOME20):</span>
                    <span>-₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-bold text-white pt-1.5 border-t border-slate-800">
                  <span>Total Payable:</span>
                  <span className="text-blue-400 font-extrabold text-base">₹{finalPrice}</span>
                </div>
                <span className="text-[10px] text-slate-500 block">
                  * Pay securely via UPI, Card, or Cash after work inspection.
                </span>
              </div>

              {/* Confirm Booking CTA */}
              <button
                id="btn-confirm-booking-action"
                onClick={handleConfirm}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 active:scale-95 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-600/40 transition flex items-center justify-center gap-2"
              >
                <span>Confirm & Book Professional</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1 text-[10px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                <span>100% Free Cancellation before pro reaches doorstep</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
