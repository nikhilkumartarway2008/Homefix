import React, { useState } from 'react';
import { Users, Search, Filter, Shield, Ban, CheckCircle2, Calendar, Phone, Mail, MapPin } from 'lucide-react';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  region: string;
  totalBookings: number;
  status: 'ACTIVE' | 'SUSPENDED';
  joinedDate: string;
}

export const CustomersModule: React.FC = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'ACTIVE' | 'SUSPENDED'>('ALL');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const [customers, setCustomers] = useState<Customer[]>([]);

  const filteredCustomers = customers.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.phone.includes(search) || c.region.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const toggleSuspend = (id: string) => {
    setCustomers((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: c.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE' } : c))
    );
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-extrabold text-slate-900">Customer Management</h2>
          <p className="text-xs text-slate-500">Manage Ranchi region customers, view booking histories, and account statuses.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search customers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 rounded-xl border border-amber-300 bg-white text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 w-64"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-3 py-2 rounded-xl border border-amber-300 bg-white text-xs font-bold text-slate-900 focus:outline-none"
          >
            <option value="ALL">All Status</option>
            <option value="ACTIVE">Active</option>
            <option value="SUSPENDED">Suspended</option>
          </select>
        </div>
      </div>

      {filteredCustomers.length === 0 ? (
        <div className="p-12 bg-white rounded-3xl border border-amber-300 text-center space-y-2">
          <Users className="w-10 h-10 text-amber-400 mx-auto" />
          <h3 className="text-sm font-bold text-slate-900">No customers found</h3>
          <p className="text-xs text-slate-500">Try adjusting your search query or status filter.</p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-amber-300 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-amber-50/60 border-b border-amber-200 text-[11px] font-extrabold uppercase text-amber-900 tracking-wider">
                <th className="p-4">Customer</th>
                <th className="p-4">Contact</th>
                <th className="p-4">Region</th>
                <th className="p-4">Bookings</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-100 text-xs font-medium">
              {filteredCustomers.map((cust) => (
                <tr key={cust.id} className="hover:bg-amber-50/30 transition">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-extrabold">
                        {cust.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-extrabold text-slate-900">{cust.name}</div>
                        <div className="text-[10px] text-slate-500 font-mono">ID: {cust.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-slate-900 font-semibold">{cust.phone}</div>
                    <div className="text-[10px] text-slate-500">{cust.email}</div>
                  </td>
                  <td className="p-4">
                    <span className="text-slate-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">{cust.region}</span>
                  </td>
                  <td className="p-4 font-mono font-bold text-slate-900">{cust.totalBookings} orders</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                      cust.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-rose-100 text-rose-800 border border-rose-200'
                    }`}>
                      {cust.status}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => setSelectedCustomer(cust)}
                      className="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 text-xs font-bold transition"
                    >
                      View Profile
                    </button>
                    <button
                      onClick={() => toggleSuspend(cust.id)}
                      className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition ${
                        cust.status === 'ACTIVE' ? 'bg-rose-50 hover:bg-rose-100 border-rose-200 text-rose-700' : 'bg-emerald-50 hover:bg-emerald-100 border-emerald-200 text-emerald-700'
                      }`}
                    >
                      {cust.status === 'ACTIVE' ? 'Suspend' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Customer Profile Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white rounded-3xl border border-amber-300 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-amber-200 pb-3">
              <h3 className="text-base font-extrabold text-slate-900">Customer Profile</h3>
              <button onClick={() => setSelectedCustomer(null)} className="text-slate-500 font-bold hover:text-slate-900">✕</button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-600 text-white flex items-center justify-center font-black text-lg">
                  {selectedCustomer.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900">{selectedCustomer.name}</h4>
                  <p className="text-[10px] text-amber-800 font-mono">Member since {selectedCustomer.joinedDate}</p>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-600">Phone</span>
                  <span className="font-semibold">{selectedCustomer.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Email</span>
                  <span className="font-semibold">{selectedCustomer.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Region</span>
                  <span className="font-semibold">{selectedCustomer.region}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Total Bookings</span>
                  <span className="font-mono font-bold">{selectedCustomer.totalBookings}</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="font-extrabold text-slate-800 block uppercase text-[10px]">Recent Booking History</span>
                <div className="p-2.5 rounded-xl bg-white border border-amber-200 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-slate-900">Fan Repair & Installation</span>
                    <span className="block text-[10px] text-slate-500">Completed · ₹399 · 2 days ago</span>
                  </div>
                  <span className="text-emerald-700 font-bold text-[10px]">Success</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setSelectedCustomer(null)}
              className="w-full py-3 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-extrabold shadow-md transition"
            >
              Close Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
