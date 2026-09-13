import React, { useState } from 'react';
import { X, SlidersHorizontal, Check, Flame, Star } from 'lucide-react';
import { CATEGORIES_LIST } from '../../data/detailedServicesData';

interface FilterBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FilterState) => void;
}

export interface FilterState {
  categoryId: string;
  maxPrice: number;
  minRating: number;
  emergencyOnly: boolean;
}

export const FilterBottomSheet: React.FC<FilterBottomSheetProps> = ({
  isOpen,
  onClose,
  onApplyFilters,
}) => {
  const [categoryId, setCategoryId] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(2000);
  const [minRating, setMinRating] = useState<number>(4.5);
  const [emergencyOnly, setEmergencyOnly] = useState<boolean>(false);

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end justify-center p-0 animate-in fade-in duration-200">
      <div className="w-full sm:max-w-md bg-[#0D1527] border border-slate-800 rounded-t-[28px] p-5 space-y-5 shadow-2xl animate-in slide-in-from-bottom duration-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-blue-400" />
            <h3 className="text-sm font-bold text-white">Filter Home Services</h3>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Category Filter */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300 block">Category:</label>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setCategoryId('all')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${
                categoryId === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              All Categories
            </button>
            {CATEGORIES_LIST.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategoryId(cat.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${
                  categoryId === cat.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Price Range Slider */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-300">Max Starting Price:</label>
            <span className="text-xs font-bold text-blue-400">₹{maxPrice}</span>
          </div>
          <input
            type="range"
            min="200"
            max="3000"
            step="100"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full accent-blue-500 bg-slate-900 h-2 rounded-lg cursor-pointer"
          />
        </div>

        {/* Minimum Rating */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300 block">Minimum Rating:</label>
          <div className="flex gap-2">
            {[4.0, 4.5, 4.8, 4.9].map((rating) => (
              <button
                key={rating}
                onClick={() => setMinRating(rating)}
                className={`flex-1 py-2 rounded-xl border text-xs font-semibold transition flex items-center justify-center gap-1 ${
                  minRating === rating
                    ? 'bg-blue-600/20 border-blue-500 text-white'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                <span>{rating}+</span>
              </button>
            ))}
          </div>
        </div>

        {/* Emergency Toggle */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
          <div className="flex items-center gap-2.5">
            <Flame className="w-4 h-4 text-amber-400" />
            <div>
              <span className="text-xs font-bold text-white block">Emergency Available Only</span>
              <span className="text-[10px] text-slate-400">Show services supporting urgent dispatch</span>
            </div>
          </div>
          <button
            onClick={() => setEmergencyOnly(!emergencyOnly)}
            className={`w-11 h-6 rounded-full transition relative p-0.5 ${emergencyOnly ? 'bg-blue-600' : 'bg-slate-800'}`}
          >
            <div className={`w-5 h-5 rounded-full bg-white transition-transform ${emergencyOnly ? 'translate-x-5' : 'translate-x-0'}`} />
          </button>
        </div>

        {/* Actions */}
        <div className="pt-2 flex gap-3">
          <button
            onClick={() => {
              setCategoryId('all');
              setMaxPrice(3000);
              setMinRating(4.0);
              setEmergencyOnly(false);
            }}
            className="flex-1 py-3 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-700 transition"
          >
            Reset
          </button>
          <button
            onClick={() => {
              onApplyFilters({ categoryId, maxPrice, minRating, emergencyOnly });
              onClose();
            }}
            className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 transition flex items-center justify-center gap-1.5"
          >
            <Check className="w-4 h-4" />
            <span>Apply Filters</span>
          </button>
        </div>
      </div>
    </div>
  );
};
