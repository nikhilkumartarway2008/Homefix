import React, { useState } from 'react';
import { Briefcase, Plus, Edit3, Trash2, CheckCircle2, IndianRupee, Clock, Tag } from 'lucide-react';

interface ServiceItem {
  id: string;
  name: string;
  category: string;
  price: number;
  duration: string;
  available: boolean;
}

export const ServicesModule: React.FC = () => {
  const [services, setServices] = useState<ServiceItem[]>([
    { id: 'SRV-101', name: 'Ceiling Fan Repair & Installation', category: 'Electrical', price: 399, duration: '45 mins', available: true },
    { id: 'SRV-102', name: 'AC Deep Foam Cleaning Service', category: 'AC Repair', price: 699, duration: '60 mins', available: true },
    { id: 'SRV-103', name: 'Tap Leakage & Flush Tank Fix', category: 'Plumbing', price: 299, duration: '30 mins', available: true },
    { id: 'SRV-104', name: 'Inverter Battery Maintenance', category: 'Electrical', price: 499, duration: '40 mins', available: false },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Electrical');
  const [price, setPrice] = useState('399');
  const [duration, setDuration] = useState('45 mins');
  const [available, setAvailable] = useState(true);

  const handleCreateService = (e: React.FormEvent) => {
    e.preventDefault();
    const newSrv: ServiceItem = {
      id: `SRV-${Math.floor(100 + Math.random() * 900)}`,
      name,
      category,
      price: Number(price),
      duration,
      available,
    };
    setServices([newSrv, ...services]);
    setShowAddModal(false);
    setName('');
  };

  const deleteService = (id: string) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
  };

  const toggleAvailability = (id: string) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, available: !s.available } : s))
    );
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-extrabold text-slate-900">Services Catalog Management</h2>
          <p className="text-xs text-slate-500">Create, price, configure duration, and manage service availability across Ranchi.</p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="py-2.5 px-5 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-extrabold shadow-md shadow-amber-600/30 flex items-center gap-2 transition"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Service</span>
        </button>
      </div>

      {services.length === 0 ? (
        <div className="p-12 bg-white rounded-3xl border border-amber-300 text-center space-y-2">
          <Briefcase className="w-10 h-10 text-amber-400 mx-auto" />
          <h3 className="text-sm font-bold text-slate-900">No services in catalog</h3>
          <p className="text-xs text-slate-500">Click 'Add New Service' to list a service.</p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-amber-300 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-amber-50/60 border-b border-amber-200 text-[11px] font-extrabold uppercase text-amber-900 tracking-wider">
                <th className="p-4">Service Name</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Duration</th>
                <th className="p-4">Availability</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-100 text-xs font-medium">
              {services.map((srv) => (
                <tr key={srv.id} className="hover:bg-amber-50/30 transition">
                  <td className="p-4">
                    <div className="font-extrabold text-slate-900">{srv.name}</div>
                    <div className="text-[10px] text-slate-500 font-mono">ID: {srv.id}</div>
                  </td>
                  <td className="p-4">
                    <span className="font-bold text-slate-800 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">{srv.category}</span>
                  </td>
                  <td className="p-4 font-mono font-extrabold text-emerald-700">₹{srv.price}</td>
                  <td className="p-4 font-mono text-slate-600">{srv.duration}</td>
                  <td className="p-4">
                    <button
                      onClick={() => toggleAvailability(srv.id)}
                      className={`px-3 py-1 rounded-full text-[10px] font-extrabold transition ${
                        srv.available ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {srv.available ? 'Available' : 'Paused'}
                    </button>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => deleteService(srv.id)}
                      className="p-2 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 transition border border-rose-200"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Service Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <form onSubmit={handleCreateService} className="w-full max-w-md bg-white rounded-3xl border border-amber-300 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-amber-200 pb-3">
              <h3 className="text-base font-extrabold text-slate-900">Create New Service</h3>
              <button type="button" onClick={() => setShowAddModal(false)} className="text-slate-500 font-bold hover:text-slate-900">✕</button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Service Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Geyser Installation"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-amber-300 bg-amber-50/40 font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-amber-300 bg-amber-50/40 font-semibold"
                  >
                    <option>Electrical</option>
                    <option>Plumbing</option>
                    <option>AC Repair</option>
                    <option>Carpentry</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-amber-300 bg-amber-50/40 font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Duration</label>
                  <input
                    type="text"
                    required
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-amber-300 bg-amber-50/40 font-semibold"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Status</label>
                  <select
                    value={available ? 'yes' : 'no'}
                    onChange={(e) => setAvailable(e.target.value === 'yes')}
                    className="w-full px-3 py-2.5 rounded-xl border border-amber-300 bg-amber-50/40 font-semibold"
                  >
                    <option value="yes">Available immediately</option>
                    <option value="no">Paused / Inactive</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-3 rounded-2xl bg-amber-100 text-amber-900 text-xs font-bold transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-3 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-extrabold shadow-md transition"
              >
                Create Service
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
