import React, { useState } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  ShieldCheck,
  FileImage,
  Bell,
  Sparkles,
  UserCheck,
  Wallet,
  Building,
  Check,
  Download,
  Printer,
  FileText,
} from 'lucide-react';
import { DetailedService } from '../../data/detailedServicesData';
import { Professional, Booking } from '../../types';

interface BookingConfirmationViewProps {
  service: DetailedService;
  professional: Professional;
  appointmentDate: string;
  appointmentTime: string;
  address: {
    name: string;
    phone: string;
    house: string;
    street: string;
    landmark: string;
    city: string;
    pinCode: string;
  };
  problemDescription: string;
  photos: string[];
  notes: string;
  emergencyType?: string;
  onBack: () => void;
  onConfirmSuccess: (newBooking: Booking) => void;
}

export const BookingConfirmationView: React.FC<BookingConfirmationViewProps> = ({
  service,
  professional,
  appointmentDate,
  appointmentTime,
  address,
  problemDescription,
  photos,
  notes,
  emergencyType,
  onBack,
  onConfirmSuccess,
}) => {
  const [isConfirming, setIsConfirming] = useState<boolean>(false);
  const [confirmedBookingId, setConfirmedBookingId] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

  // Pricing calculations
  const servicePrice = service.startingPrice;
  const platformFee = 49;
  const totalAmount = servicePrice + platformFee;

  const handleConfirmBooking = () => {
    setIsConfirming(true);

    setTimeout(() => {
      const uniqueId = `HF-${Math.floor(100000 + Math.random() * 900000)}`;
      const newBooking: Booking = {
        id: uniqueId,
        serviceName: `${service.name} (${service.categoryName})`,
        professionalName: professional.name,
        professionalPhoto: professional.photoUrl,
        professionalSkill: professional.mainSkill,
        date: appointmentDate,
        timeSlot: appointmentTime,
        address: `${address.house}, ${address.street}, ${address.city} - ${address.pinCode}`,
        totalAmount,
        discountApplied: 0,
        status: 'ASSIGNED',
        otp: String(Math.floor(1000 + Math.random() * 9000)),
        isEmergency: !!emergencyType,
        problemDescription,
        uploadedPhotos: photos,
        platformFee,
      } as any;

      setIsConfirming(false);
      setConfirmedBookingId(uniqueId);
      setShowSuccessModal(true);
      onConfirmSuccess(newBooking);
    }, 1200);
  };

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
            <h1 className="text-base font-bold text-slate-900 tracking-tight">Booking Confirmation</h1>
            <p className="text-[10px] text-amber-800 font-medium">Review your service request</p>
          </div>
        </div>

        <span className="text-xs font-bold text-amber-900 bg-amber-100 px-2.5 py-1 rounded-full border border-amber-200">
          Final Step
        </span>
      </div>

      <div className="p-4 space-y-4 max-w-md mx-auto w-full">

        {/* 1. Service Details Card */}
        <div className="p-4 rounded-2xl bg-white border border-amber-300 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-amber-100 pb-2.5">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              Selected Service
            </span>
            <span className="text-xs font-bold text-slate-900">{service.categoryName}</span>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center shrink-0 font-extrabold text-amber-800 text-base">
              🔧
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-slate-900">{service.name}</h2>
              <p className="text-xs text-slate-600 mt-0.5 line-clamp-2">{problemDescription}</p>
            </div>
          </div>

          {/* Uploaded Photos preview */}
          {photos.length > 0 && (
            <div className="pt-2 border-t border-amber-100">
              <span className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1 mb-1.5">
                <FileImage className="w-3.5 h-3.5 text-amber-700" /> Uploaded Problem Photos ({photos.length})
              </span>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {photos.map((url, idx) => (
                  <img
                    key={idx}
                    src={url}
                    alt={`Problem ${idx + 1}`}
                    className="w-14 h-14 rounded-xl object-cover border border-amber-300 shrink-0 shadow-sm"
                    referrerPolicy="no-referrer"
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 2. Professional Assigned Card */}
        <div className="p-4 rounded-2xl bg-white border border-amber-300 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-amber-100 pb-2.5">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Matched Professional
            </span>
            <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Verified Expert
            </span>
          </div>

          <div className="flex items-center gap-3">
            <img
              src={professional.photoUrl}
              alt={professional.name}
              className="w-14 h-14 rounded-2xl object-cover border border-amber-300 shadow-sm"
              referrerPolicy="no-referrer"
            />
            <div>
              <h3 className="text-sm font-extrabold text-slate-900">{professional.name}</h3>
              <p className="text-xs font-semibold text-amber-800">{professional.mainSkill}</p>
              <div className="flex items-center gap-2 mt-1 text-xs text-slate-600">
                <span className="flex items-center gap-0.5 font-bold text-slate-900">
                  ★ {professional.rating}
                </span>
                <span>·</span>
                <span>{professional.experienceYears} yrs experience</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Date, Time & Address Card */}
        <div className="p-4 rounded-2xl bg-white border border-amber-300 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-amber-100 pb-2.5">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              Schedule & Location
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-amber-50/60 border border-amber-200">
              <Calendar className="w-4 h-4 text-amber-700 shrink-0" />
              <div>
                <span className="text-[9px] text-slate-500 uppercase block font-bold">Date</span>
                <span className="font-bold text-slate-900">{appointmentDate}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-amber-50/60 border border-amber-200">
              <Clock className="w-4 h-4 text-amber-700 shrink-0" />
              <div>
                <span className="text-[9px] text-slate-500 uppercase block font-bold">Time Slot</span>
                <span className="font-bold text-slate-900">{appointmentTime}</span>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-50/60 border border-amber-200 text-xs">
            <MapPin className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <span className="text-[9px] text-slate-500 uppercase block font-bold">Service Address</span>
              <p className="font-bold text-slate-900 mt-0.5">{address.house}, {address.street}</p>
              <p className="text-slate-600 text-[11px]">{address.city} - {address.pinCode} · {address.name} ({address.phone})</p>
            </div>
          </div>
        </div>

        {/* 4. Price Breakdown Card */}
        <div className="p-4 rounded-2xl bg-white border border-amber-300 shadow-sm space-y-2.5">
          <div className="flex items-center justify-between border-b border-amber-100 pb-2.5">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              Payment Summary
            </span>
            <span className="text-xs font-bold text-emerald-700">Pay after service</span>
          </div>

          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between text-slate-700">
              <span>Service Charge ({service.name})</span>
              <span className="font-semibold">₹{servicePrice}</span>
            </div>
            <div className="flex justify-between text-slate-700">
              <span>Platform & Inspection Fee</span>
              <span className="font-semibold">₹{platformFee}</span>
            </div>
            <div className="pt-2 border-t border-amber-100 flex justify-between text-sm font-extrabold text-slate-900">
              <span>Total Estimated Amount</span>
              <span className="text-amber-700">₹{totalAmount}</span>
            </div>
          </div>
        </div>

        {/* Notifications Dispatch Note */}
        <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 flex items-center gap-3 text-xs text-amber-900">
          <Bell className="w-5 h-5 text-amber-700 shrink-0" />
          <p className="leading-tight">
            Upon confirmation, instant SMS & push notifications will be dispatched to both you and <strong>{professional.name}</strong>.
          </p>
        </div>

        {/* Primary CTA */}
        <button
          type="button"
          disabled={isConfirming}
          onClick={handleConfirmBooking}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 hover:from-amber-500 hover:to-yellow-400 text-white text-sm font-extrabold shadow-lg shadow-amber-600/30 transition flex items-center justify-center gap-2 active:scale-95 cursor-pointer disabled:opacity-50"
        >
          {isConfirming ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Confirming Booking & Dispatching Expert...</span>
            </>
          ) : (
            <>
              <CheckCircle2 className="w-5 h-5" />
              <span>Confirm Booking (₹{totalAmount})</span>
            </>
          )}
        </button>

      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-sm bg-white rounded-3xl border border-amber-300 p-6 shadow-2xl text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full">
                Booking Successful
              </span>
              <h2 className="text-xl font-extrabold text-slate-900">You're All Set!</h2>
              <p className="text-xs font-mono text-emerald-700 font-bold">Booking ID: {confirmedBookingId}</p>
            </div>

            <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-left space-y-1.5 text-xs">
              <div className="flex items-center gap-2 text-slate-800 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Customer notification sent (SMS & Push)</span>
              </div>
              <div className="flex items-center gap-2 text-slate-800 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Professional notification dispatched to {professional.name}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-800 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Status set to: <strong className="text-amber-800 font-mono">ASSIGNED</strong></span>
              </div>
            </div>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => {
                  const slipContent = `HOMEFIX SERVICE CONFIRMATION SLIP\n-----------------------------------\nBooking ID: ${confirmedBookingId}\nService: ${service.name}\nProfessional: ${professional.name} (${professional.phone})\nDate & Time: ${appointmentDate} at ${appointmentTime}\nAddress: ${address.house}, ${address.street}, ${address.city} - ${address.pinCode}\nTotal Amount: ₹${totalAmount}\nStatus: ASSIGNED & DISPATCHED\n-----------------------------------\nThank you for booking with HomeFix Ranchi!`;
                  const blob = new Blob([slipContent], { type: 'text/plain' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `HomeFix_Slip_${confirmedBookingId}.txt`;
                  a.click();
                }}
                className="w-full py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center gap-2 shadow transition"
              >
                <Download className="w-4 h-4 text-amber-400" />
                <span>Download Official Confirmation Slip</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowSuccessModal(false);
                }}
                className="w-full py-3.5 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-extrabold shadow-lg shadow-amber-600/30 transition active:scale-95"
              >
                View My Bookings & Track Expert
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
toolSummary: "Create BookingConfirmationView.tsx"
toolAction: "Create BookingConfirmationView.tsx"
