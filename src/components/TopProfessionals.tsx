import React from 'react';
import { Star, CheckCircle2, Award, ArrowRight } from 'lucide-react';
import { Professional } from '../types';

interface TopProfessionalsProps {
  professionals: Professional[];
  onBookProfessional?: (pro: Professional) => void;
  onBookPro?: (pro: Professional) => void;
  onViewAll?: () => void;
  onViewProfile?: (pro: Professional) => void;
  onCallPro?: (name: string) => void;
}

export const TopProfessionals: React.FC<TopProfessionalsProps> = ({
  professionals,
  onBookProfessional,
  onBookPro,
  onViewAll,
  onViewProfile,
  onCallPro,
}) => {
  const handleBook = (pro: Professional) => {
    if (onBookProfessional) onBookProfessional(pro);
    else if (onBookPro) onBookPro(pro);
  };
  return (
    <section className="px-4 py-3">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-sm font-bold text-white tracking-tight flex items-center gap-1.5">
            <span>Top-Rated Professionals</span>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
          </h2>
          <p className="text-[11px] text-slate-400">
            Background verified & highly reviewed in Ranchi
          </p>
        </div>
        {onViewAll && (
          <button
            onClick={onViewAll}
            className="text-[11px] font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-0.5"
          >
            <span>See All</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* Horizontal scrolling card container */}
      <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 no-scrollbar scroll-smooth">
        {professionals.map((pro) => {
          return (
            <div
              key={pro.id}
              id={`pro-card-${pro.id}`}
              className="w-[280px] shrink-0 rounded-[20px] bg-[#0D1527] border border-slate-800/80 hover:border-blue-500/40 p-3.5 flex flex-col justify-between transition-all duration-200 shadow-lg shadow-black/40 relative group"
            >
              <div>
                {/* Top section: Photo + Name + Verification + Rating */}
                <div className="flex items-start gap-3">
                  <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-slate-800 shrink-0 border border-slate-700/80">
                    <img
                      src={pro.photoUrl}
                      alt={pro.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                    {pro.isVerified && (
                      <div className="absolute -bottom-1 -right-1 bg-[#0D1527] rounded-full p-0.5">
                        <CheckCircle2 className="w-4 h-4 text-blue-400 fill-blue-500/20" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                      <h3 className="text-sm font-bold text-white tracking-tight truncate">
                        {pro.name}
                      </h3>
                      {pro.isVerified && (
                        <span
                          title="Verified Professional"
                          className="text-blue-400 font-bold text-xs"
                        >
                          ✓
                        </span>
                      )}
                    </div>

                    {/* Skill tag */}
                    <div className="inline-block mt-0.5">
                      <span className="px-2 py-0.5 rounded-md bg-blue-500/15 border border-blue-500/25 text-blue-300 text-[10px] font-semibold">
                        {pro.mainSkill}
                      </span>
                    </div>

                    {/* Star rating & Reviews count */}
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <div className="flex items-center text-amber-400">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="text-xs font-bold text-white ml-1">
                          {pro.rating.toFixed(1)}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400">
                        ({pro.reviewsCount})
                      </span>
                    </div>
                  </div>
                </div>

                {/* Experience & Badge stats */}
                <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-1 text-slate-300">
                    <Award className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>{pro.experienceYears} Years Experience</span>
                  </div>
                  <span className="text-[10px] font-medium text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                    {pro.availability.split(' ')[0]} {pro.availability.split(' ')[1]}
                  </span>
                </div>
              </div>

              {/* Bottom bar: Starting Price + Book Now Button */}
              <div className="mt-3.5 pt-2.5 border-t border-slate-800/80 flex items-center justify-between">
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-slate-400 block">
                    Starting from
                  </span>
                  <span className="text-sm font-extrabold text-white tracking-tight">
                    ₹{pro.startingPrice}{' '}
                    <span className="text-[10px] font-normal text-slate-400">starting</span>
                  </span>
                </div>

                <button
                  id={`btn-book-${pro.id}`}
                  onClick={() => handleBook(pro)}
                  className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-95 text-white text-xs font-bold tracking-wide transition shadow-md shadow-blue-600/30 flex items-center gap-1"
                >
                  <span>Book Now</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
