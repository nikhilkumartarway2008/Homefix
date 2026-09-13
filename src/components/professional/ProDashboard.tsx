import React, { useState } from 'react';
import {
  Wrench,
  Star,
  CheckCircle2,
  Clock,
  IndianRupee,
  Phone,
  ShieldCheck,
  MapPin,
  TrendingUp,
  Calendar,
  User,
  Zap,
  Briefcase,
  DollarSign,
  ChevronRight,
  Bell,
  Check,
  X,
} from 'lucide-react';
import { Booking } from '../../types';

interface ProDashboardProps {
  onSwitchToCustomer?: () => void;
  bookings?: Booking[];
  onUpdateBookingStatus?: (bookingId: string, status: any) => void;
}

export const ProDashboard: React.FC<ProDashboardProps> = ({ 
  onSwitchToCustomer, 
  bookings = [], 
  onUpdateBookingStatus 
}) => {
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'home' | 'jobs' | 'schedule' | 'earnings' | 'profile'>('home');
  
  const [completedJobsCount, setCompletedJobsCount] = useState<number>(24);
  const [todayEarnings, setTodayEarnings] = useState<number>(1450);
  const [rating, setRating] = useState<number>(4.9);

  // Filter real bookings assigned to this pro (or all bookings if demo)
  const activeBookings = bookings.filter((b) => b.status !== 'CANCELLED' && b.status !== 'Cancelled');
  const jobRequests = activeBookings.filter((b) => b.status === 'Confirmed' || b.status === 'PENDING' || b.status === 'ASSIGNED');
  const todaySchedule = activeBookings.filter((b) => b.status === 'Confirmed' || b.status === 'In Progress' || b.status === 'ON_THE_WAY');

  const handleAcceptJob = (bookingId: string, amount: number) => {
    if (onUpdateBookingStatus) {
      onUpdateBookingStatus(bookingId, 'In Progress');
    }
    setTodayEarnings((prev) => prev + amount);
    setCompletedJobsCount((prev) => prev + 1);
    alert(`Job ${bookingId} accepted successfully! Navigate to customer location in Ranchi.`);
  };

  const handleRejectJob = (bookingId: string) => {
    if (onUpdateBookingStatus) {
      onUpdateBookingStatus(bookingId, 'CANCELLED');
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#FFFDF9] text-slate-900 overflow-y-auto pb-32 animate-in fade-in duration-200">
      
      {/* Top Header */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md px-4 py-3.5 border-b border-amber-200 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150"
              alt="Rahul"
              className="w-11 h-11 rounded-full object-cover border-2 border-amber-400 shadow-sm"
              referrerPolicy="no-referrer"
            />
            <span className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white ${isOnline ? 'bg-emerald-500' : 'bg-slate-400'}`} />
          </div>
          <div>
            <h1 className="text-base font-extrabold text-slate-900 tracking-tight">Good Morning, Rahul 👋</h1>
            <p className="text-[10px] text-amber-800 font-bold flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-700" /> Verified Electrician Partner (Ranchi)
            </p>
          </div>
        </div>

        {onSwitchToCustomer && (
          <button
            onClick={onSwitchToCustomer}
            className="px-3 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold border border-amber-300 transition shadow-xs"
          >
            Customer View
          </button>
        )}
      </div>

      <div className="p-4 max-w-2xl mx-auto w-full space-y-5">

        {/* ================= PROMINENT ONLINE / OFFLINE SWITCH ================= */}
        <div className={`p-4 rounded-3xl border transition-all shadow-sm flex items-center justify-between ${
          isOnline ? 'bg-emerald-50/70 border-emerald-300' : 'bg-amber-50/70 border-amber-200'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold ${
              isOnline ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30' : 'bg-slate-300 text-slate-700'
            }`}>
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-extrabold text-slate-900 block">
                {isOnline ? 'You are Online & Receiving Leads' : 'You are currently Offline'}
              </span>
              <span className="text-[10px] text-slate-500 font-medium">
                {isOnline ? 'Ranchi Dispatch Node is streaming live customer bookings.' : 'Switch ON to start accepting service requests.'}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsOnline(!isOnline)}
            className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors focus:outline-none ${
              isOnline ? 'bg-emerald-600' : 'bg-slate-300'
            }`}
          >
            <span
              className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform shadow-md ${
                isOnline ? 'translate-x-9' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* ================= EARNINGS, COMPLETED, RATING ================= */}
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3.5 rounded-3xl bg-white border border-amber-300 shadow-sm space-y-1">
            <div className="flex items-center justify-between text-amber-800">
              <span className="text-[10px] font-extrabold uppercase">Today's Earnings</span>
              <IndianRupee className="w-3.5 h-3.5" />
            </div>
            <p className="text-lg font-black text-slate-900 font-mono">₹{todayEarnings}</p>
            <span className="text-[9px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 inline-block">
              +18% vs yesterday
            </span>
          </div>

          <div className="p-3.5 rounded-3xl bg-white border border-amber-300 shadow-sm space-y-1">
            <div className="flex items-center justify-between text-amber-800">
              <span className="text-[10px] font-extrabold uppercase">Completed Jobs</span>
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
            <p className="text-lg font-black text-slate-900 font-mono">{completedJobsCount}</p>
            <span className="text-[9px] text-amber-800 font-bold bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 inline-block">
              All time verified
            </span>
          </div>

          <div className="p-3.5 rounded-3xl bg-white border border-amber-300 shadow-sm space-y-1">
            <div className="flex items-center justify-between text-amber-800">
              <span className="text-[10px] font-extrabold uppercase">Rating</span>
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
            </div>
            <p className="text-lg font-black text-slate-900 font-mono">{rating} ⭐</p>
            <span className="text-[9px] text-amber-800 font-bold bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 inline-block">
              Top 5% Partner
            </span>
          </div>
        </div>

        {/* ================= SECTION 1: LIVE BOOKINGS & NEW JOB REQUESTS ================= */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-600 fill-amber-500" /> Booked Services & Job Requests ({jobRequests.length})
            </h2>
            <span className="text-[10px] text-amber-800 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200 animate-pulse">
              Live Dispatch Feed
            </span>
          </div>

          {jobRequests.length === 0 ? (
            <div className="p-8 rounded-3xl bg-white border border-amber-200 text-center space-y-2">
              <Clock className="w-8 h-8 text-amber-400 mx-auto" />
              <p className="text-xs font-bold text-slate-700">No active customer bookings yet.</p>
              <p className="text-[10px] text-slate-500">When a customer books a service in the Customer App, it will appear here instantly for you to accept!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {jobRequests.map((job) => (
                <div key={job.id} className="p-4 rounded-3xl bg-white border-2 border-amber-300 shadow-md space-y-3.5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-amber-600 text-white text-[9px] font-extrabold px-3 py-1 rounded-bl-xl">
                    ⚡ Assigned to {job.professionalName}
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold text-amber-800">Booking ID: {job.id}</span>
                    <h3 className="text-sm font-extrabold text-slate-900">{job.serviceName}</h3>
                    <p className="text-xs text-slate-600 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                      {job.address}
                    </p>
                    <p className="text-xs text-slate-600 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      {job.date} · {job.timeSlot}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-amber-100">
                    <div>
                      <span className="text-[10px] text-slate-500 font-bold block uppercase">Customer Payment</span>
                      <span className="text-base font-extrabold text-emerald-700 font-mono">₹{job.totalAmount}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleRejectJob(job.id)}
                        className="py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition border border-slate-300"
                      >
                        Decline
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAcceptJob(job.id, job.totalAmount)}
                        className="py-2.5 px-5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-extrabold shadow-md shadow-amber-600/30 transition flex items-center gap-1.5"
                      >
                        <Check className="w-4 h-4" />
                        <span>Accept & Start</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ================= SECTION 2: TODAY'S SCHEDULE ================= */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-amber-700" /> Today's Schedule ({todaySchedule.length})
            </h2>
          </div>

          {todaySchedule.length === 0 ? (
            <div className="p-6 rounded-2xl bg-white border border-amber-200 text-center text-xs text-slate-500">
              No scheduled appointments for today yet.
            </div>
          ) : (
            <div className="space-y-2.5">
              {todaySchedule.map((sch) => (
                <div key={sch.id} className="p-3.5 rounded-2xl bg-white border border-amber-300 shadow-sm flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        {sch.timeSlot}
                      </span>
                      <span className="text-xs font-bold text-slate-900">{sch.serviceName}</span>
                    </div>
                    <p className="text-[11px] text-slate-600">{sch.professionalName} · {sch.address}</p>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    {sch.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* ================= BOTTOM NAVIGATION ================= */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-amber-200 px-6 py-3 shadow-lg">
        <div className="max-w-md mx-auto flex items-center justify-between">
          {[
            { id: 'home', label: 'Home', icon: Wrench },
            { id: 'jobs', label: 'Jobs', icon: Briefcase },
            { id: 'schedule', label: 'Schedule', icon: Calendar },
            { id: 'earnings', label: 'Earnings', icon: DollarSign },
            { id: 'profile', label: 'Profile', icon: User },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex flex-col items-center gap-1 transition ${
                  isActive ? 'text-amber-700 font-extrabold' : 'text-slate-500 hover:text-slate-900 font-medium'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-amber-600 scale-110' : ''}`} />
                <span className="text-[10px]">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
};
