import React from 'react';
import { CloudSun, Calendar as CalendarIcon, MapPin } from 'lucide-react';

export default function DesktopWidgets() {
  const today = new Date();
  const dayName = today.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
  const dayNumber = today.getDate();
  const monthName = today.toLocaleDateString('en-US', { month: 'long' });

  return (
    <div className="absolute right-5 top-5 hidden lg:flex flex-col space-y-4 pointer-events-auto select-none z-10">
      {/* Weather Widget */}
      <div className="w-44 h-44 rounded-widget glass-modal p-4 flex flex-col justify-between shadow-lg border border-white/20 dark:border-white/10 text-slate-800 dark:text-slate-100 backdrop-blur-xl">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center space-x-1 text-xs opacity-75 font-semibold">
              <MapPin className="w-3 h-3 text-red-500" />
              <span>San Francisco</span>
            </div>
            <div className="text-3xl font-bold tracking-tight mt-1">72°</div>
          </div>
          <CloudSun className="w-8 h-8 text-amber-400 drop-shadow" />
        </div>

        <div className="text-xs space-y-0.5">
          <div className="font-semibold text-slate-900 dark:text-white">Golden Gate Coast</div>
          <div className="text-[11px] opacity-75">Sunny • H:75° L:58°</div>
          <div className="text-[10px] text-emerald-500 font-medium">Air Quality: 28 (Good)</div>
        </div>
      </div>

      {/* Calendar Widget */}
      <div className="w-44 h-44 rounded-widget glass-modal p-4 flex flex-col justify-between shadow-lg border border-white/20 dark:border-white/10 text-slate-800 dark:text-slate-100 backdrop-blur-xl">
        <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-2">
          <div className="text-xs font-bold text-red-500 uppercase tracking-wider">{dayName}</div>
          <div className="text-xs opacity-75 font-medium">{monthName}</div>
        </div>

        <div className="text-center py-1">
          <span className="text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {dayNumber}
          </span>
        </div>

        <div className="text-[11px] bg-blue-500/10 dark:bg-blue-400/20 text-blue-600 dark:text-blue-300 rounded-lg px-2.5 py-1.5 font-medium flex items-center space-x-1.5">
          <CalendarIcon className="w-3 h-3 flex-shrink-0" />
          <span className="truncate">Design Review • 2 PM</span>
        </div>
      </div>
    </div>
  );
}
