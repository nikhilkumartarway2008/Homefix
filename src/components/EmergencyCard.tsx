import React from 'react';
import { AlertCircle, Zap, Clock } from 'lucide-react';

interface EmergencyCardProps {
  onEmergencyBook: () => void;
}

export const EmergencyCard: React.FC<EmergencyCardProps> = ({ onEmergencyBook }) => {
  return (
    <section className="px-4 py-2">
      <div className="relative overflow-hidden rounded-[20px] bg-gradient-to-r from-[#1E1318] via-[#1A1524] to-[#11162A] border border-rose-500/30 p-3.5 shadow-lg shadow-black/30">
        {/* Subtle amber/orange glow */}
        <div className="absolute right-0 top-0 w-24 h-24 bg-rose-500/10 rounded-full blur-xl pointer-events-none" />

        <div className="flex items-center justify-between gap-3 relative z-10">
          <div className="flex items-start gap-3">
            {/* Warning Icon Badge */}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500/20 to-amber-500/20 border border-rose-500/40 flex items-center justify-center shrink-0 text-rose-400 mt-0.5">
              <AlertCircle className="w-5 h-5 animate-pulse" />
            </div>

            <div>
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded-full bg-rose-500/20 text-[9px] font-bold text-rose-300 uppercase tracking-wide border border-rose-500/30">
                  <Zap className="w-2.5 h-2.5 text-amber-400" />
                  Express SOS
                </span>
                <span className="text-[10px] text-amber-300/90 font-medium flex items-center gap-0.5">
                  <Clock className="w-3 h-3" />
                  15-30 min arrival
                </span>
              </div>
              <h4 className="text-sm font-bold text-white tracking-tight">
                Need help right now?
              </h4>
              <p className="text-xs text-slate-300 font-medium mt-0.5">
                Get a professional at your doorstep
              </p>
            </div>
          </div>

          {/* CTA Book Now button */}
          <button
            id="btn-emergency-book-now"
            onClick={onEmergencyBook}
            className="shrink-0 px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-orange-600 hover:from-rose-500 hover:to-orange-500 active:scale-95 text-white text-xs font-bold tracking-wide shadow-md shadow-rose-900/40 transition flex items-center gap-1"
          >
            <span>Book Now</span>
            <span className="text-sm leading-none">→</span>
          </button>
        </div>
      </div>
    </section>
  );
};
