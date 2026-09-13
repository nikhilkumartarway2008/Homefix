import React, { useState } from 'react';
import {
  ArrowLeft,
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  CheckCircle2,
  Plus,
  Home as HomeIcon,
  Briefcase,
  Building,
  ShieldCheck,
  ChevronRight,
  AlertCircle,
} from 'lucide-react';
import { DetailedService } from '../../data/detailedServicesData';

interface AddressItem {
  id: string;
  type: 'Home' | 'Work' | 'Other';
  name: string;
  phone: string;
  house: string;
  street: string;
  landmark: string;
  city: string;
  state: string;
  pinCode: string;
}

interface AppointmentSchedulerViewProps {
  service: DetailedService;
  problemDescription: string;
  photos: string[];
  notes: string;
  emergencyType?: string;
  onBack: () => void;
  onCompleteBooking: (bookingDetails: {
    date: string;
    timeSlot: string;
    address: AddressItem;
  }) => void;
}

export const AppointmentSchedulerView: React.FC<AppointmentSchedulerViewProps> = ({
  service,
  problemDescription,
  photos,
  notes,
  emergencyType,
  onBack,
  onCompleteBooking,
}) => {
  // Step management: 1 = Date, 2 = Time, 3 = Address
  const [schedulerStep, setSchedulerStep] = useState<1 | 2 | 3>(1);

  // Selected Date state
  const [selectedDateOption, setSelectedDateOption] = useState<'Today' | 'Tomorrow' | 'Custom'>('Today');
  const [customDate, setCustomDate] = useState<string>('2026-09-15');

  // Selected Time Slot state
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('11:00 AM');

  // Address list & selection state
  const [savedAddresses, setSavedAddresses] = useState<AddressItem[]>([
    {
      id: 'addr-1',
      type: 'Home',
      name: 'Sarah Jenkins',
      phone: '+91 98765 43210',
      house: 'Flat 402, Anand Vihar',
      street: 'Boring Road',
      landmark: 'Near Petrol Pump',
      city: 'Ranchi',
      state: 'Bihar',
      pinCode: '800001',
    },
    {
      id: 'addr-2',
      type: 'Work',
      name: 'Sarah Jenkins (Office)',
      phone: '+91 98765 43210',
      house: 'Suite 301, Tech Park',
      street: 'Exhibition Road',
      landmark: 'Opposite ICAI Bhawan',
      city: 'Ranchi',
      state: 'Bihar',
      pinCode: '800001',
    },
  ]);

  const [selectedAddressId, setSelectedAddressId] = useState<string>('addr-1');
  const [isAddingNewAddress, setIsAddingNewAddress] = useState<boolean>(false);

  // New address form state
  const [newType, setNewType] = useState<'Home' | 'Work' | 'Other'>('Home');
  const [newName, setNewName] = useState<string>('Sarah Jenkins');
  const [newPhone, setNewPhone] = useState<string>('+91 98765 43210');
  const [newHouse, setNewHouse] = useState<string>('');
  const [newStreet, setNewStreet] = useState<string>('');
  const [newLandmark, setNewLandmark] = useState<string>('');
  const [newCity, setNewCity] = useState<string>('Ranchi');
  const [newState, setNewState] = useState<string>('Bihar');
  const [newPinCode, setNewPinCode] = useState<string>('');
  const [addressError, setAddressError] = useState<string | null>(null);

  // Time slots with simulated availability (some disabled)
  const timeSlots = [
    { time: '9:00 AM', available: true },
    { time: '11:00 AM', available: true },
    { time: '1:00 PM', available: false, reason: 'Already booked' },
    { time: '3:00 PM', available: true },
    { time: '5:00 PM', available: true },
    { time: '7:00 PM', available: false, reason: 'Pro shift ended' },
  ];

  const handleAddNewAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHouse || !newStreet || !newPinCode || !newPhone) {
      setAddressError('Please fill in all required address fields (House, Street, PIN code, Phone).');
      return;
    }

    const newAddr: AddressItem = {
      id: `addr-${Date.now()}`,
      type: newType,
      name: newName,
      phone: newPhone,
      house: newHouse,
      street: newStreet,
      landmark: newLandmark,
      city: newCity,
      state: newState,
      pinCode: newPinCode,
    };

    setSavedAddresses([newAddr, ...savedAddresses]);
    setSelectedAddressId(newAddr.id);
    setIsAddingNewAddress(false);
    setAddressError(null);
  };

  const currentSelectedAddress = savedAddresses.find((a) => a.id === selectedAddressId) || savedAddresses[0];

  const getDateDisplayString = () => {
    if (selectedDateOption === 'Today') return 'Today (Fast Dispatch)';
    if (selectedDateOption === 'Tomorrow') return 'Tomorrow';
    return customDate;
  };

  return (
    <div className="flex flex-col h-full bg-[#FFFDF9] text-slate-900 overflow-y-auto pb-32 animate-in fade-in duration-200 relative">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md px-4 py-3.5 border-b border-amber-200 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (schedulerStep === 3) setSchedulerStep(2);
              else if (schedulerStep === 2) setSchedulerStep(1);
              else onBack();
            }}
            className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-slate-700 hover:text-slate-900 hover:bg-amber-100 transition shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 text-amber-800" />
          </button>
          <div>
            <h1 className="text-base font-bold text-slate-900 tracking-tight">Appointment Schedule</h1>
            <p className="text-[10px] text-amber-800 font-medium">Step {schedulerStep} of 3 · {service.name}</p>
          </div>
        </div>

        {/* Step Indicator Badges */}
        <div className="flex items-center gap-1">
          <div className={`w-2 h-2 rounded-full ${schedulerStep >= 1 ? 'bg-amber-600' : 'bg-amber-200'}`} />
          <div className={`w-2 h-2 rounded-full ${schedulerStep >= 2 ? 'bg-amber-600' : 'bg-amber-200'}`} />
          <div className={`w-2 h-2 rounded-full ${schedulerStep >= 3 ? 'bg-amber-600' : 'bg-amber-200'}`} />
        </div>
      </div>

      {/* Body content */}
      <div className="p-4 space-y-5 max-w-md mx-auto w-full">

        {/* ================= SCREEN 1: SELECT DATE ================= */}
        {schedulerStep === 1 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div>
              <h2 className="text-base font-extrabold text-slate-900">Select Date</h2>
              <p className="text-xs text-slate-600 mt-0.5">When would you like the professional to arrive?</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* Today Option */}
              <button
                type="button"
                onClick={() => setSelectedDateOption('Today')}
                className={`p-4 rounded-2xl border text-left transition flex flex-col justify-between active:scale-95 ${
                  selectedDateOption === 'Today'
                    ? 'bg-amber-100 border-amber-500 shadow-md shadow-amber-900/10'
                    : 'bg-white border-amber-200 hover:border-amber-300'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-3">
                  <span className="text-xs font-bold text-amber-900 bg-amber-200 px-2 py-0.5 rounded-md">Fastest</span>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${selectedDateOption === 'Today' ? 'bg-amber-600 text-white border-amber-600' : 'border-amber-300'}`}>
                    {selectedDateOption === 'Today' && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </div>
                </div>
                <div>
                  <span className="text-sm font-extrabold text-slate-900 block">Today</span>
                  <span className="text-[11px] text-slate-600">Arrival in 30-45 mins</span>
                </div>
              </button>

              {/* Tomorrow Option */}
              <button
                type="button"
                onClick={() => setSelectedDateOption('Tomorrow')}
                className={`p-4 rounded-2xl border text-left transition flex flex-col justify-between active:scale-95 ${
                  selectedDateOption === 'Tomorrow'
                    ? 'bg-amber-100 border-amber-500 shadow-md shadow-amber-900/10'
                    : 'bg-white border-amber-200 hover:border-amber-300'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-3">
                  <span className="text-xs font-bold text-slate-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">Scheduled</span>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${selectedDateOption === 'Tomorrow' ? 'bg-amber-600 text-white border-amber-600' : 'border-amber-300'}`}>
                    {selectedDateOption === 'Tomorrow' && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </div>
                </div>
                <div>
                  <span className="text-sm font-extrabold text-slate-900 block">Tomorrow</span>
                  <span className="text-[11px] text-slate-600">Pick preferred time slot</span>
                </div>
              </button>
            </div>

            {/* Custom Calendar Picker Option */}
            <div className="p-4 rounded-2xl bg-white border border-amber-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <CalendarIcon className="w-4 h-4 text-amber-700" /> Choose Custom Date from Calendar
                </span>
                <span className="text-[10px] text-amber-800 font-semibold">Optional</span>
              </div>
              <input
                type="date"
                value={customDate}
                onChange={(e) => {
                  setCustomDate(e.target.value);
                  setSelectedDateOption('Custom');
                }}
                className="w-full p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs font-semibold text-slate-900 focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Continue Button */}
            <button
              type="button"
              onClick={() => setSchedulerStep(2)}
              className="w-full py-3.5 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-extrabold shadow-lg shadow-amber-600/30 transition flex items-center justify-center gap-2 mt-4 active:scale-95"
            >
              <span>Next: Select Time Slot</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ================= SCREEN 2: SELECT TIME ================= */}
        {schedulerStep === 2 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div>
              <h2 className="text-base font-extrabold text-slate-900">Select Time Slot</h2>
              <p className="text-xs text-slate-600 mt-0.5">
                Available slots for <strong className="text-amber-800">{getDateDisplayString()}</strong>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {timeSlots.map((slot, idx) => {
                const isSelected = selectedTimeSlot === slot.time;
                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={!slot.available}
                    onClick={() => setSelectedTimeSlot(slot.time)}
                    className={`p-3.5 rounded-2xl border text-left transition flex items-center justify-between ${
                      !slot.available
                        ? 'bg-slate-100 border-slate-200 opacity-60 cursor-not-allowed'
                        : isSelected
                        ? 'bg-amber-100 border-amber-500 shadow-md shadow-amber-900/10'
                        : 'bg-white border-amber-200 hover:border-amber-300 active:scale-95'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${slot.available ? (isSelected ? 'bg-amber-500 text-white' : 'bg-amber-50 text-amber-800') : 'bg-slate-200 text-slate-400'}`}>
                        <Clock className="w-4 h-4" />
                      </div>
                      <div>
                        <span className={`text-xs font-extrabold block ${!slot.available ? 'text-slate-500 line-through' : 'text-slate-900'}`}>
                          {slot.time}
                        </span>
                        <span className={`text-[10px] ${!slot.available ? 'text-rose-600 font-semibold' : 'text-emerald-700 font-medium'}`}>
                          {slot.available ? 'Available' : slot.reason}
                        </span>
                      </div>
                    </div>

                    {slot.available && (
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? 'bg-amber-600 text-white border-amber-600' : 'border-amber-300'}`}>
                        {isSelected && <CheckCircle2 className="w-3 h-3" />}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Continue Button */}
            <button
              type="button"
              onClick={() => setSchedulerStep(3)}
              className="w-full py-3.5 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-extrabold shadow-lg shadow-amber-600/30 transition flex items-center justify-center gap-2 mt-4 active:scale-95"
            >
              <span>Next: Select Service Address</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ================= SCREEN 3: SELECT ADDRESS ================= */}
        {schedulerStep === 3 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div>
              <h2 className="text-base font-extrabold text-slate-900">Select Service Address</h2>
              <p className="text-xs text-slate-600 mt-0.5">Where should our professional arrive?</p>
            </div>

            {/* Simulated Live Map Preview */}
            <div className="relative w-full h-36 rounded-2xl overflow-hidden border border-amber-300 shadow-sm bg-amber-100 flex items-center justify-center">
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:16px_16px]" />
              <div className="absolute inset-0 bg-gradient-to-t from-amber-200/50 via-transparent to-transparent" />
              <div className="relative z-10 flex flex-col items-center p-3 text-center bg-white/90 backdrop-blur-sm rounded-xl border border-amber-300 shadow">
                <MapPin className="w-6 h-6 text-amber-600 animate-bounce mb-1" />
                <span className="text-xs font-bold text-slate-900">{currentSelectedAddress.house}, {currentSelectedAddress.street}</span>
                <span className="text-[10px] text-slate-600">{currentSelectedAddress.city} - {currentSelectedAddress.pinCode}</span>
              </div>
            </div>

            {/* Add New Address Toggle Button */}
            {!isAddingNewAddress ? (
              <button
                type="button"
                onClick={() => setIsAddingNewAddress(true)}
                className="w-full py-3 px-4 rounded-2xl bg-amber-50 hover:bg-amber-100 border border-amber-300 border-dashed text-amber-900 text-xs font-bold flex items-center justify-center gap-2 transition active:scale-95"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Address</span>
              </button>
            ) : (
              /* Add New Address Form */
              <form onSubmit={handleAddNewAddressSubmit} className="p-4 rounded-2xl bg-white border border-amber-300 shadow-md space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-amber-100">
                  <h3 className="text-xs font-extrabold text-slate-900">Add New Service Address</h3>
                  <button
                    type="button"
                    onClick={() => setIsAddingNewAddress(false)}
                    className="text-[11px] text-amber-700 hover:underline"
                  >
                    Cancel
                  </button>
                </div>

                {/* Type Selection */}
                <div className="flex gap-2">
                  {(['Home', 'Work', 'Other'] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setNewType(t)}
                      className={`flex-1 py-1.5 rounded-xl text-xs font-bold border transition ${
                        newType === t
                          ? 'bg-amber-500 text-white border-amber-600 shadow'
                          : 'bg-amber-50 text-slate-700 border-amber-200'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-bold text-slate-700 block mb-0.5">Contact Name *</label>
                    <input
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      required
                      className="w-full p-2.5 rounded-xl bg-amber-50/50 border border-amber-200 text-xs text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-700 block mb-0.5">Phone Number *</label>
                    <input
                      type="text"
                      value={newPhone}
                      onChange={(e) => setNewPhone(e.target.value)}
                      required
                      className="w-full p-2.5 rounded-xl bg-amber-50/50 border border-amber-200 text-xs text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-700 block mb-0.5">House / Flat / Block No. *</label>
                  <input
                    type="text"
                    placeholder="e.g. Flat 402, Anand Vihar"
                    value={newHouse}
                    onChange={(e) => setNewHouse(e.target.value)}
                    required
                    className="w-full p-2.5 rounded-xl bg-amber-50/50 border border-amber-200 text-xs text-slate-900"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-700 block mb-0.5">Street / Colony *</label>
                  <input
                    type="text"
                    placeholder="e.g. Boring Road"
                    value={newStreet}
                    onChange={(e) => setNewStreet(e.target.value)}
                    required
                    className="w-full p-2.5 rounded-xl bg-amber-50/50 border border-amber-200 text-xs text-slate-900"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-[10px] font-bold text-slate-700 block mb-0.5">Landmark</label>
                    <input
                      type="text"
                      placeholder="Near Pump"
                      value={newLandmark}
                      onChange={(e) => setNewLandmark(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-amber-50/50 border border-amber-200 text-xs text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-700 block mb-0.5">City</label>
                    <input
                      type="text"
                      value={newCity}
                      onChange={(e) => setNewCity(e.target.value)}
                      required
                      className="w-full p-2.5 rounded-xl bg-amber-50/50 border border-amber-200 text-xs text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-700 block mb-0.5">PIN Code *</label>
                    <input
                      type="text"
                      placeholder="800001"
                      value={newPinCode}
                      onChange={(e) => setNewPinCode(e.target.value)}
                      required
                      className="w-full p-2.5 rounded-xl bg-amber-50/50 border border-amber-200 text-xs text-slate-900"
                    />
                  </div>
                </div>

                {addressError && (
                  <p className="text-[11px] text-rose-600 font-medium">{addressError}</p>
                )}

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-extrabold shadow transition active:scale-95"
                >
                  Save & Use This Address
                </button>
              </form>
            )}

            {/* Saved Addresses List */}
            <div className="space-y-2 pt-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Saved Addresses</span>
              {savedAddresses.map((addr) => {
                const isSelected = selectedAddressId === addr.id;
                return (
                  <button
                    key={addr.id}
                    type="button"
                    onClick={() => setSelectedAddressId(addr.id)}
                    className={`w-full p-3.5 rounded-2xl border text-left transition flex items-start justify-between ${
                      isSelected
                        ? 'bg-amber-100 border-amber-500 shadow-md shadow-amber-900/10'
                        : 'bg-white border-amber-200 hover:border-amber-300'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${isSelected ? 'bg-amber-500 text-white' : 'bg-amber-50 text-amber-800'}`}>
                        {addr.type === 'Home' ? <HomeIcon className="w-4 h-4" /> : addr.type === 'Work' ? <Briefcase className="w-4 h-4" /> : <Building className="w-4 h-4" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-900">{addr.name}</span>
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-200 text-amber-900 uppercase">{addr.type}</span>
                        </div>
                        <p className="text-[11px] text-slate-700 mt-0.5">{addr.house}, {addr.street}{addr.landmark ? `, ${addr.landmark}` : ''}</p>
                        <p className="text-[10px] text-slate-500">{addr.city} - {addr.pinCode} · {addr.phone}</p>
                      </div>
                    </div>

                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-1 ${isSelected ? 'bg-amber-600 text-white border-amber-600' : 'border-amber-300'}`}>
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Final Booking Confirmation CTA */}
            <button
              type="button"
              onClick={() => {
                onCompleteBooking({
                  date: getDateDisplayString(),
                  timeSlot: selectedTimeSlot,
                  address: currentSelectedAddress,
                });
              }}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-white text-xs font-extrabold shadow-lg shadow-amber-600/30 transition flex items-center justify-center gap-2 mt-4 active:scale-95 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Confirm & Book Appointment (₹{service.startingPrice})</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
