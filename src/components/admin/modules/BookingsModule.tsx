import React, { useState } from 'react';
import { Calendar, Search, Filter, UserCheck, XCircle, RotateCcw, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

interface BookingRecord {
  id: string;
  serviceName: string;
  customerName: string;
  professionalName: string;
  date: string;
  status: 'PENDING' | 'ASSIGNED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  amount: number;
}

export const BookingsModule: React.FC = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [selectedBooking, setSelectedBooking] = useState<BookingRecord | null>(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [newProName, setNewProName] = useState('Rahul Kumar');

  const [bookings, setBookings] = useState<BookingRecord[]>([]);

  const filteredBookings = bookings.filter((b) => {
    const matchesSearch = b.id.toLowerCase().includes(search.toLowerCase()) || b.customerName.toLowerCase().includes(search.toLowerCase()) || b.serviceName.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCancel = (id: string) => {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status: 'CANCELLED' } : b)));
  };

  const handleRefund = (id: string) => {
    alert(`Refund initiated successfully for booking ${id}.`);
  };

  const handleAssignPro = (id: string, proName: string) => {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, professionalName: proName, status: 'ASSIGNED' } : b)));
    setShowAssignModal(false);
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-extrabold text-slate-900">Bookings Command Center</h2>
          <p className="text-xs text-slate-500">Monitor live job allocations, reassign professionals, process refunds, and view booking timelines.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search booking ID, customer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 rounded-xl border border-amber-300 bg-white text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 w-64"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-amber-300 bg-white text-xs font-bold text-slate-900 focus:outline-none"
          >
            <option value="ALL">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="ASSIGNED">Assigned</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>
      </div>

      {filteredBookings.length === 0 ? (
        <div className="p-12 bg-white rounded-3xl border border-amber-300 text-center space-y-2">
          <Calendar className="w-10 h-10 text-amber-400 mx-auto" />
          <h3 className="text-sm font-bold text-slate-900">No bookings found</h3>
          <p className="text-xs text-slate-500">Try adjusting your search criteria or status filter.</p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-amber-300 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-amber-50/60 border-b border-amber-200 text-[11px] font-extrabold uppercase text-amber-900 tracking-wider">
                <th className="p-4">Booking ID & Service</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Professional</th>
                <th className="p-4">Date & Time</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-100 text-xs font-medium">
              {filteredBookings.map((b) => (
                <tr key={b.id} className="hover:bg-amber-50/30 transition">
                  <td className="p-4">
                    <span className="text-[10px] font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">{b.id}</span>
                    <div className="font-extrabold text-slate-900 mt-0.5">{b.serviceName}</div>
                  </td>
                  <td className="p-4 font-bold text-slate-800">{b.customerName}</td>
                  <td className="p-4">
                    <span className={`font-bold ${b.professionalName === 'Unassigned' ? 'text-rose-600' : 'text-slate-800'}`}>
                      {b.professionalName}
                    </span>
                  </td>
                  <td className="p-4 text-slate-600">{b.date}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                      b.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                      b.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-800 border border-blue-200 animate-pulse' :
                      b.status === 'CANCELLED' ? 'bg-rose-100 text-rose-800 border border-rose-200' :
                      'bg-amber-100 text-amber-900 border border-amber-200'
                    }`}>
                      {b.status}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => setSelectedBooking(b)}
                      className="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 text-xs font-bold transition"
                    >
                      Timeline
                    </button>
                    <button
                      onClick={() => {
                        setSelectedBooking(b);
                        setShowAssignModal(true);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold transition"
                    >
                      Reassign
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Booking Details & Timeline Modal */}
      {selectedBooking && !showAssignModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white rounded-3xl border border-amber-300 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-amber-200 pb-3">
              <div>
                <span className="text-[10px] font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  {selectedBooking.id}
                </span>
                <h3 className="text-base font-extrabold text-slate-900 mt-1">Booking Timeline & Actions</h3>
              </div>
              <button onClick={() => setSelectedBooking(null)} className="text-slate-500 font-bold hover:text-slate-900">✕</button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-600">Service</span>
                  <span className="font-bold text-slate-900">{selectedBooking.serviceName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Customer</span>
                  <span className="font-bold text-slate-900">{selectedBooking.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Assigned Professional</span>
                  <span className="font-bold text-amber-900">{selectedBooking.professionalName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Amount</span>
                  <span className="font-mono font-bold text-emerald-700">₹{selectedBooking.amount}</span>
                </div>
              </div>

              {/* Timeline Flow */}
              <div className="space-y-2">
                <span className="font-extrabold text-slate-800 uppercase text-[10px]">Execution Timeline</span>
                <div className="space-y-2 pl-2 border-l-2 border-amber-300">
                  <div className="relative pl-3">
                    <div className="absolute -left-[17px] top-1 w-2.5 h-2.5 rounded-full bg-emerald-600" />
                    <span className="font-bold text-slate-900">Booking Created</span>
                    <span className="block text-[10px] text-slate-500">Confirmed via Ranchi gateway</span>
                  </div>
                  <div className="relative pl-3">
                    <div className="absolute -left-[17px] top-1 w-2.5 h-2.5 rounded-full bg-emerald-600" />
                    <span className="font-bold text-slate-900">Professional Assigned ({selectedBooking.professionalName})</span>
                    <span className="block text-[10px] text-slate-500">OTP verified</span>
                  </div>
                  <div className="relative pl-3">
                    <div className="absolute -left-[17px] top-1 w-2.5 h-2.5 rounded-full bg-amber-600 animate-pulse" />
                    <span className="font-bold text-amber-900">Service Execution Active</span>
                    <span className="block text-[10px] text-slate-500">In progress</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => {
                  handleRefund(selectedBooking.id);
                  setSelectedBooking(null);
                }}
                className="flex-1 py-3 rounded-2xl bg-amber-100 text-amber-900 text-xs font-bold transition"
              >
                Issue Refund
              </button>
              <button
                onClick={() => {
                  handleCancel(selectedBooking.id);
                  setSelectedBooking(null);
                }}
                className="flex-1 py-3 rounded-2xl bg-rose-600 text-white text-xs font-extrabold shadow-md transition"
              >
                Cancel Booking
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reassign Professional Modal */}
      {showAssignModal && selectedBooking && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-sm bg-white rounded-3xl border border-amber-300 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-amber-200 pb-3">
              <h3 className="text-base font-extrabold text-slate-900">Reassign Professional</h3>
              <button onClick={() => setShowAssignModal(false)} className="text-slate-500 font-bold hover:text-slate-900">✕</button>
            </div>

            <div className="space-y-3 text-xs">
              <p className="text-slate-600">Select a verified professional to assign to booking <span className="font-mono font-bold">{selectedBooking.id}</span>:</p>
              
              <select
                value={newProName}
                onChange={(e) => setNewProName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-amber-300 bg-amber-50/40 font-bold"
              >
                <option value="Rahul Kumar">Rahul Kumar (Electrician - 4.92 ⭐)</option>
                <option value="Manoj Sharma">Manoj Sharma (Plumber - 4.9 ⭐)</option>
                <option value="Deepak Sinha">Deepak Sinha (AC Repair - 4.89 ⭐)</option>
                <option value="Alok Mishra">Alok Mishra (Technician - 4.85 ⭐)</option>
              </select>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setShowAssignModal(false)}
                className="flex-1 py-3 rounded-2xl bg-amber-100 text-amber-900 text-xs font-bold transition"
              >
                Cancel
              </button>
              <button
                onClick={() => handleAssignPro(selectedBooking.id, newProName)}
                className="flex-1 py-3 rounded-2xl bg-amber-600 text-white text-xs font-extrabold shadow-md transition"
              >
                Confirm Reassignment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
