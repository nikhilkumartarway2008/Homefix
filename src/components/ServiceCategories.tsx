import React from 'react';
import {
  Wrench,
  Zap,
  Hammer,
  Paintbrush,
  Wind,
  Cpu,
  Sparkles,
  ShieldAlert,
  Grid,
} from 'lucide-react';
import { SERVICE_CATEGORIES } from '../data/servicesData';
import { ServiceCategory, ServiceItem } from '../types';

interface ServiceCategoriesProps {
  selectedCategory: ServiceCategory | null;
  onSelectCategory: (cat: ServiceItem) => void;
}

export const ServiceCategories: React.FC<ServiceCategoriesProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const getIcon = (iconName: string) => {
    const props = { className: 'w-5 h-5 text-amber-700 group-hover:text-amber-900 transition-colors' };
    switch (iconName) {
      case 'Wrench':
        return <Wrench {...props} />;
      case 'Zap':
        return <Zap {...props} />;
      case 'Hammer':
        return <Hammer {...props} />;
      case 'Paintbrush':
        return <Paintbrush {...props} />;
      case 'Wind':
        return <Wind {...props} />;
      case 'Cpu':
        return <Cpu {...props} />;
      case 'Sparkles':
        return <Sparkles {...props} />;
      case 'ShieldAlert':
        return <ShieldAlert {...props} />;
      case 'Grid':
      default:
        return <Grid {...props} />;
    }
  };

  return (
    <section className="px-4 py-3">
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-bold text-slate-900 tracking-tight">
            Service Categories
          </h2>
          <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-200">
            9 Services
          </span>
        </div>
        {selectedCategory && (
          <button
            onClick={() => onSelectCategory(SERVICE_CATEGORIES[0])}
            className="text-[11px] font-bold text-amber-700 hover:text-amber-900"
          >
            Reset
          </button>
        )}
      </div>

      {/* 2-row category grid */}
      <div className="grid grid-cols-4 sm:grid-cols-4 gap-2.5">
        {SERVICE_CATEGORIES.map((service) => {
          const isSelected = selectedCategory === service.name;
          return (
            <button
              key={service.id}
              id={`cat-card-${service.id}`}
              onClick={() => onSelectCategory(service)}
              className={`group relative flex flex-col items-center justify-center p-2.5 rounded-[18px] transition-all duration-200 border text-center active:scale-95 ${
                isSelected
                  ? 'bg-amber-100 border-amber-400 shadow-md shadow-amber-900/10 text-slate-900 font-bold'
                  : 'bg-white hover:bg-amber-50/80 border-amber-200/80 hover:border-amber-300 text-slate-800'
              }`}
            >
              {service.badge && (
                <span className="absolute -top-1.5 -right-1 px-1.5 py-0.2 bg-amber-500 text-[8px] font-bold text-slate-950 rounded-full uppercase tracking-wider shadow-sm">
                  {service.badge}
                </span>
              )}

              {/* Icon Container with subtle gradient */}
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center mb-1.5 transition ${
                  isSelected
                    ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-500/30'
                    : 'bg-amber-50 border border-amber-200 group-hover:border-amber-300'
                }`}
              >
                {getIcon(service.iconName)}
              </div>

              {/* Category Name */}
              <span className="text-[11px] font-semibold leading-tight line-clamp-1">
                {service.name}
              </span>

              {/* Starting price tag */}
              <span className="text-[9px] text-slate-600 mt-0.5 group-hover:text-amber-800 font-medium">
                ₹{service.startingPrice}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
