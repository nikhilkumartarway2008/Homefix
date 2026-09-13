import React, { useState } from 'react';
import { Wrench, Search, ShieldCheck, CheckCircle2, XCircle, AlertCircle, Star, IndianRupee, FileText } from 'lucide-react';

interface Professional {
  id: string;
  name: string;
  category: string;
  phone: string;
  verificationStatus: 'PENDING' | 'VERIFIED' | 'REJECTED';
  status: 'ACTIVE' | 'SUSPENDED';
  rating: number;
  totalEarnings: number;
  kycDoc: string;
}

export const ProfessionalsModule: React.FC = () => {
  const [search, setSearch] = useState('');
  const [skillFilter, setSkillFilter] = useState<string>('ALL');
  const [verificationFilter, setVerificationFilter] = useState<string>('ALL');
  const [selectedPro, setSelectedPro] = useState<Professional | null>(null);

  const [professionals, setProfessionals] = useState<Professional[]>([]);

  const filteredPros = professionals.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.phone.includes(search);
    const matchesSkill = skillFilter === 'ALL' || p.category === skillFilter;
    const matchesVerification = verificationFilter === 'ALL' || p.verificationStatus === verificationFilter;
    return matchesSearch && matchesSkill && matchesVerification;
  });

  const handleVerify = (id: string, status: 'VERIFIED' | 'REJECTED') => {
    setProfessionals((prev) =>
      prev.map((p) => (p.id === id ? { ...p, verificationStatus: status, status: status === 'VERIFIED' ? 'ACTIVE' : 'SUSPENDED' } : p))
    );
  };

  const toggleSuspend = (id: string) => {
    setProfessionals((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: p.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE' } : p))
    );
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-extrabold text-slate-900">Professional Partners Management</h2>
          <p className="text-xs text-slate-500">Approve KYC documents, audit skill ratings, and manage partner availability.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search professionals..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 rounded-xl border border-amber-300 bg-white text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 w-52"
            />
          </div>

          <select
            value={skillFilter}
            onChange={(e) => setSkillFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-amber-300 bg-white text-xs font-bold text-slate-900 focus:outline-none"
          >
            <option value="ALL">All Skills</option>
            <option value="Plumbing">Plumbing</option>
            <option value="Electrical">Electrical</option>
            <option value="AC Repair">AC Repair</option>
          </select>

          <select
            value={verificationFilter}
            onChange={(e) => setVerificationFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-amber-300 bg-white text-xs font-bold text-slate-900 focus:outline-none"
          >
            <option value="ALL">All Verification</option>
            <option value="VERIFIED">Verified</option>
            <option value="PENDING">Pending</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>
      </div>

      {filteredPros.length === 0 ? (
        <div className="p-12 bg-white rounded-3xl border border-amber-300 text-center space-y-2">
          <Wrench className="w-10 h-10 text-amber-400 mx-auto" />
          <h3 className="text-sm font-bold text-slate-900">No professionals found</h3>
          <p className="text-xs text-slate-500">Try adjusting your skill filter or search criteria.</p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-amber-300 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-amber-50/60 border-b border-amber-200 text-[11px] font-extrabold uppercase text-amber-900 tracking-wider">
                <th className="p-4">Professional</th>
                <th className="p-4">Skill / Category</th>
                <th className="p-4">KYC Verification</th>
                <th className="p-4">Rating</th>
                <th className="p-4">Earnings</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-100 text-xs font-medium">
              {filteredPros.map((pro) => (
                <tr key={pro.id} className="hover:bg-amber-50/30 transition">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-extrabold">
                        {pro.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-extrabold text-slate-900">{pro.name}</div>
                        <div className="text-[10px] text-slate-500 font-mono">{pro.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="font-bold text-slate-800 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">{pro.category}</span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                      pro.verificationStatus === 'VERIFIED' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                      pro.verificationStatus === 'PENDING' ? 'bg-amber-100 text-amber-900 border border-amber-200 animate-pulse' :
                      'bg-rose-100 text-rose-800 border border-rose-200'
                    }`}>
                      {pro.verificationStatus}
                    </span>
                  </td>
                  <td className="p-4 font-mono font-bold text-slate-900">
                    {pro.rating > 0 ? `${pro.rating} ⭐` : 'Unrated'}
                  </td>
                  <td className="p-4 font-mono font-extrabold text-emerald-700">₹{pro.totalEarnings}</td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => setSelectedPro(pro)}
                      className="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 text-xs font-bold transition"
                    >
                      Profile & KYC
                    </button>
                    {pro.verificationStatus === 'PENDING' && (
                      <>
                        <button
                          onClick={() => handleVerify(pro.id, 'VERIFIED')}
                          className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold transition"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleVerify(pro.id, 'REJECTED')}
                          className="px-3 py-1.5 rounded-xl bg-rose-600 text-white text-xs font-bold transition"
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Professional Profile & KYC Modal */}
      {selectedPro && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white rounded-3xl border border-amber-300 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-amber-200 pb-3">
              <h3 className="text-base font-extrabold text-slate-900">Professional KYC & Performance</h3>
              <button onClick={() => setSelectedPro(null)} className="text-slate-500 font-bold hover:text-slate-900">✕</button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-600 text-white flex items-center justify-center font-black text-lg">
                  {selectedPro.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900">{selectedPro.name}</h4>
                  <p className="text-[10px] text-amber-800 font-semibold">{selectedPro.category} · {selectedPro.phone}</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-600">Verification Status</span>
                  <span className="font-extrabold text-amber-900">{selectedPro.verificationStatus}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">KYC Documents</span>
                  <span className="font-semibold text-emerald-700">{selectedPro.kycDoc}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Total Lifetime Earnings</span>
                  <span className="font-mono font-bold text-emerald-700">₹{selectedPro.totalEarnings}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Customer Rating</span>
                  <span className="font-bold">{selectedPro.rating > 0 ? `${selectedPro.rating} ⭐` : 'N/A'}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => {
                  toggleSuspend(selectedPro.id);
                  setSelectedPro(null);
                }}
                className={`flex-1 py-3 rounded-2xl border text-xs font-extrabold transition ${
                  selectedPro.status === 'ACTIVE' ? 'bg-rose-50 text-rose-700 border-rose-300' : 'bg-emerald-50 text-emerald-700 border-emerald-300'
                }`}
              >
                {selectedPro.status === 'ACTIVE' ? 'Suspend Account' : 'Activate Account'}
              </button>
              <button
                onClick={() => setSelectedPro(null)}
                className="flex-1 py-3 rounded-2xl bg-amber-600 text-white text-xs font-extrabold shadow-md transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
