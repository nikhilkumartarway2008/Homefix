import React, { useState } from 'react';
import {
  ShieldCheck,
  Users,
  Wrench,
  IndianRupee,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Search,
  Filter,
  MoreVertical,
  RefreshCw,
  BarChart3,
  Database,
  Calendar,
  Briefcase,
  DollarSign,
  Star,
  MessageSquare,
  Tag,
  Bell,
  FileText,
  Settings,
  ChevronRight,
  ArrowUpRight,
  Clock,
  XCircle,
  Check,
  Sliders,
} from 'lucide-react';
import { CustomersModule } from './modules/CustomersModule';
import { ProfessionalsModule } from './modules/ProfessionalsModule';
import { ServicesModule } from './modules/ServicesModule';
import { BookingsModule } from './modules/BookingsModule';

export const AdminDashboard: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [filterRegion, setFilterRegion] = useState<string>('All Ranchi Regions');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Pending verification professionals
  const [pendingPros, setPendingPros] = useState<any[]>([]);

  const approvePro = (id: string) => {
    setPendingPros((prev) => prev.filter((p) => p.id !== id));
  };

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'bookings', label: 'Bookings', icon: Calendar },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'professionals', label: 'Professionals', icon: Wrench },
    { id: 'services', label: 'Services', icon: Briefcase },
    { id: 'payments', label: 'Payments', icon: DollarSign },
    { id: 'reviews', label: 'Reviews', icon: Star },
    { id: 'complaints', label: 'Complaints', icon: AlertCircle },
    { id: 'offers', label: 'Offers', icon: Tag },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-[#FFFDF9] text-slate-900 overflow-hidden font-sans">
      
      {/* ================= DESKTOP SIDEBAR ================= */}
      <div className="w-64 bg-slate-900 text-slate-300 flex flex-col border-r border-slate-800 shrink-0">
        {/* Brand Header */}
        <div className="p-4 border-b border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-600 flex items-center justify-center text-white font-black shadow-lg">
            HF
          </div>
          <div>
            <h1 className="text-sm font-extrabold text-white tracking-tight">HomeFix Admin</h1>
            <p className="text-[10px] text-amber-400 font-mono">Ranchi Central Command</p>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto py-3 px-3 space-y-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition ${
                  isActive
                    ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Admin Footer Profile */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/50 flex items-center gap-3">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"
            alt="Admin"
            className="w-9 h-9 rounded-xl object-cover border border-amber-500"
            referrerPolicy="no-referrer"
          />
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold text-white truncate">Priya Sinha</h4>
            <p className="text-[10px] text-emerald-400 font-mono">Super Admin</p>
          </div>
        </div>
      </div>

      {/* ================= MAIN CONTENT AREA ================= */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* Top Header */}
        <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md px-6 py-3.5 border-b border-amber-200 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-4">
            <h2 className="text-base font-extrabold text-slate-900 capitalize tracking-tight">
              {currentTab} Overview
            </h2>
            <div className="hidden sm:flex items-center gap-2 bg-amber-50 border border-amber-200 px-3 py-1 rounded-xl">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-bold text-amber-900">Live Marketplace Operational</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search bookings, pros..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-1.5 rounded-xl border border-amber-300 bg-amber-50/40 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 w-56"
              />
            </div>

            <select
              value={filterRegion}
              onChange={(e) => setFilterRegion(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-amber-300 bg-amber-50/40 text-xs font-bold text-slate-900 focus:outline-none"
            >
              <option>All Ranchi Regions</option>
              <option>Boring Road</option>
              <option>Kankarbagh</option>
              <option>Patliputra</option>
              <option>Danapur</option>
            </select>
          </div>
        </div>

        {/* ================= DYNAMIC MODULE ROUTER ================= */}
        <div className="p-6 max-w-7xl mx-auto w-full space-y-6">
          {currentTab === 'dashboard' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* 8 DASHBOARD KPI CARDS */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { title: 'Total Bookings', value: '18,420', change: '+12.4% this mo', icon: Calendar, color: 'text-amber-700', bg: 'bg-amber-50' },
                  { title: "Today's Bookings", value: '342', change: '84 in progress', icon: Clock, color: 'text-blue-700', bg: 'bg-blue-50' },
                  { title: 'Active Professionals', value: '1,480', change: '92% online', icon: Wrench, color: 'text-emerald-700', bg: 'bg-emerald-50' },
                  { title: 'Customers', value: '45,290', change: '+1,240 new', icon: Users, color: 'text-purple-700', bg: 'bg-purple-50' },
                  { title: 'Revenue (Gross)', value: '₹48,92,400', change: '+18.2% vs last mo', icon: IndianRupee, color: 'text-emerald-800', bg: 'bg-emerald-100/60' },
                  { title: 'Pending Requests', value: '29', change: 'Needs dispatch', icon: AlertCircle, color: 'text-rose-700', bg: 'bg-rose-50' },
                  { title: 'Completed Jobs', value: '16,980', change: '98.2% success rate', icon: CheckCircle2, color: 'text-emerald-700', bg: 'bg-emerald-50' },
                  { title: 'Cancelled Jobs', value: '412', change: '2.2% cancellation', icon: XCircle, color: 'text-slate-700', bg: 'bg-slate-100' },
                ].map((card, idx) => {
                  const Icon = card.icon;
                  return (
                    <div key={idx} className="p-4 rounded-3xl bg-white border border-amber-300 shadow-sm space-y-2 hover:shadow-md transition">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-500">{card.title}</span>
                        <div className={`w-8 h-8 rounded-xl ${card.bg} ${card.color} flex items-center justify-center font-bold`}>
                          <Icon className="w-4 h-4" />
                        </div>
                      </div>
                      <div className="flex items-baseline justify-between">
                        <span className="text-lg font-black text-slate-900 font-mono">{card.value}</span>
                        <span className="text-[10px] font-bold text-amber-800">{card.change}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* CHARTS GRID */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="p-5 rounded-3xl bg-white border border-amber-300 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-amber-100 pb-3">
                    <div>
                      <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">Bookings & Revenue Trends</h3>
                      <p className="text-[10px] text-slate-500">Hourly gross volume & order volume across Ranchi</p>
                    </div>
                    <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-xl border border-amber-200">
                      Live Analytics
                    </span>
                  </div>

                  <div className="h-48 flex items-end gap-3 pt-6 px-2 border-b border-amber-100">
                    {[45, 60, 75, 50, 90, 110, 140, 125, 160, 190, 170, 210].map((val, idx) => (
                      <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                        <div
                          className="w-full bg-gradient-to-t from-amber-600 to-yellow-400 rounded-t-lg transition-all group-hover:from-amber-500 group-hover:to-yellow-300"
                          style={{ height: `${(val / 220) * 100}%` }}
                        />
                        <span className="text-[9px] font-mono text-slate-500">{idx * 2 + 2}h</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-600 font-semibold pt-1">
                    <span>Peak Hours: 10 AM - 1 PM & 5 PM - 8 PM</span>
                    <span className="text-emerald-700 font-bold">+24% vs yesterday</span>
                  </div>
                </div>

                <div className="p-5 rounded-3xl bg-white border border-amber-300 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-amber-100 pb-3">
                    <div>
                      <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">Top Service Categories</h3>
                      <p className="text-[10px] text-slate-500">Distribution of customer requests by trade</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {[
                      { name: 'Electrical & Wiring', share: '34%', count: '6,240 jobs', color: 'bg-amber-600' },
                      { name: 'Plumbing & Sanitary', share: '28%', count: '5,120 jobs', color: 'bg-yellow-500' },
                      { name: 'AC & Appliance Repair', share: '22%', count: '4,020 jobs', color: 'bg-blue-600' },
                      { name: 'Carpentry & Furniture', share: '16%', count: '3,040 jobs', color: 'bg-emerald-600' },
                    ].map((cat, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between text-xs font-bold text-slate-800">
                          <span>{cat.name}</span>
                          <span className="font-mono">{cat.share} ({cat.count})</span>
                        </div>
                        <div className="h-2.5 w-full bg-amber-100 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${cat.color}`} style={{ width: cat.share }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentTab === 'customers' && <CustomersModule />}
          {currentTab === 'professionals' && <ProfessionalsModule />}
          {currentTab === 'services' && <ServicesModule />}
          {currentTab === 'bookings' && <BookingsModule />}

          {currentTab !== 'dashboard' && currentTab !== 'customers' && currentTab !== 'professionals' && currentTab !== 'services' && currentTab !== 'bookings' && (
            <div className="p-12 text-center space-y-4 bg-white rounded-3xl border border-amber-300">
              <div className="w-16 h-16 rounded-3xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto shadow-inner">
                <Sliders className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-black text-slate-900 capitalize">{currentTab} Module Management</h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  Fully operational admin control panel for {currentTab} in HomeFix Ranchi Central Command.
                </p>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
