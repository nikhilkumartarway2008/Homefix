import React, { useState } from 'react';
import { Tag, Check, Copy, Sparkles } from 'lucide-react';

interface PromoBannerProps {
  onApplyPromo: (code: string) => void;
}

export const PromoBanner: React.FC<PromoBannerProps> = ({ onApplyPromo }) => {
  const [copied, setCopied] = useState(false);
  const code = 'WELCOME20';

  const handleCopy = () => {
    navigator.clipboard?.writeText(code);
    setCopied(true);
    onApplyPromo(code);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="px-4 py-2">
      <div className="relative overflow-hidden rounded-[20px] bg-gradient-to-r from-[#0E1E42] via-[#0F2859] to-[#0A1633] border border-blue-500/30 p-4 shadow-lg shadow-blue-950/40">
        {/* Subtle decorative glow circles */}
        <div className="absolute -right-8 -bottom-8 w-28 h-28 bg-blue-500/20 rounded-full blur-xl pointer-events-none" />
        <div className="absolute left-1/3 -top-6 w-20 h-20 bg-cyan-400/10 rounded-full blur-lg pointer-events-none" />

        <div className="flex items-center justify-between relative z-10">
          <div className="space-y-0.5">
            <div className="flex items-center gap-1 text-blue-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="text-[10px] font-bold uppercase tracking-wider">
                Special Introductory Offer
              </span>
            </div>
            <h3 className="text-lg font-extrabold text-white tracking-tight flex items-baseline gap-1.5">
              <span>Get 20% OFF</span>
              <span className="text-xs font-normal text-blue-200">Max ₹150</span>
            </h3>
            <p className="text-xs text-slate-300 font-medium">
              On your first booking
            </p>
          </div>

          {/* CTA / Code button with interactive copy action */}
          <button
            id="btn-promo-code"
            onClick={handleCopy}
            className={`flex flex-col items-center justify-center px-3.5 py-2 rounded-xl border transition-all active:scale-95 shadow-md ${
              copied
                ? 'bg-emerald-600/30 border-emerald-500 text-emerald-300'
                : 'bg-blue-600 hover:bg-blue-500 border-blue-400/50 text-white shadow-blue-600/30'
            }`}
          >
            <span className="text-[9px] font-medium tracking-wider uppercase text-blue-200">
              {copied ? 'Code Applied' : 'Tap to Copy'}
            </span>
            <div className="flex items-center gap-1 font-mono font-bold text-xs tracking-wider mt-0.5">
              <Tag className="w-3 h-3" />
              <span>{code}</span>
              {copied ? (
                <Check className="w-3 h-3 text-emerald-300 ml-0.5" />
              ) : (
                <Copy className="w-3 h-3 text-blue-200 ml-0.5" />
              )}
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};
