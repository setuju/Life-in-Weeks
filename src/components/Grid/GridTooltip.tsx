import React from 'react';
import { LifeEvent } from '../../types';
import { getWeekDateRange, getApproxCalendarYear } from '../../utils/dateUtils';
import { Calendar, Flag, Sparkles } from 'lucide-react';

export interface TooltipData {
  year: number;
  week: number;
  birthDate: string;
  isPast: boolean;
  isCurrent: boolean;
  events: LifeEvent[];
  x: number;
  y: number;
}

interface GridTooltipProps {
  data: TooltipData | null;
}

export const GridTooltip: React.FC<GridTooltipProps> = ({ data }) => {
  if (!data) return null;

  const { year, week, birthDate, isPast, isCurrent, events, x, y } = data;
  const approxYear = getApproxCalendarYear(birthDate, year);
  const dateRange = getWeekDateRange(birthDate, year, week);

  // Position calculations with screen boundaries
  const tooltipWidth = 260;
  const padding = 12;
  
  let left = x + 16;
  let top = y - 10;

  // Adjust if overflow right
  if (typeof window !== 'undefined') {
    if (left + tooltipWidth > window.innerWidth - padding) {
      left = x - tooltipWidth - 16;
    }
    if (left < padding) {
      left = padding;
    }
    // Adjust if overflow bottom
    if (top + 180 > window.innerHeight) {
      top = Math.max(padding, window.innerHeight - 200);
    }
  }

  return (
    <div
      className="fixed z-40 pointer-events-none transition-all duration-75 no-print"
      style={{
        left: `${left}px`,
        top: `${top}px`,
        width: `${tooltipWidth}px`,
      }}
    >
      <div className="bg-slate-900/95 text-slate-100 p-3.5 rounded-xl shadow-xl border border-slate-700/80 backdrop-blur-md text-xs space-y-2 animate-in fade-in zoom-in-95 duration-100">
        {/* Header Status */}
        <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-2">
          <div className="flex items-center gap-1.5 font-semibold text-slate-200">
            {isCurrent ? (
              <span className="flex items-center gap-1 text-amber-400 font-bold">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                Current Week (Now)
              </span>
            ) : isPast ? (
              <span className="text-slate-400">Past Week</span>
            ) : (
              <span className="text-emerald-400">Future Week</span>
            )}
          </div>
          <span className="font-mono text-2xs text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
            Age {year}
          </span>
        </div>

        {/* Details */}
        <div>
          <p className="font-bold text-white text-sm">
            Year {year} • Week {week + 1} of 52
          </p>
          <p className="text-slate-300 font-mono text-2xs mt-0.5">
            Approx. {approxYear}
          </p>
          <p className="text-slate-400 font-mono text-2xs mt-0.5 flex items-center gap-1">
            <Calendar className="w-3 h-3 text-slate-500" />
            {dateRange}
          </p>
        </div>

        {/* Life Events on this week */}
        {events.length > 0 && (
          <div className="pt-1 border-t border-slate-800 space-y-1">
            <div className="flex items-center gap-1 text-amber-300 font-semibold text-2xs">
              <Flag className="w-3 h-3 text-amber-400" />
              <span>{events.length} Event{events.length > 1 ? 's' : ''}:</span>
            </div>
            {events.map((evt) => (
              <div key={evt.id} className="bg-slate-800/80 px-2 py-1 rounded text-2xs text-slate-200 truncate">
                • {evt.name}
              </div>
            ))}
          </div>
        )}

        {/* Prompt */}
        <div className="pt-1 text-2xs text-slate-400 italic">
          Click or press Enter for details & milestones
        </div>
      </div>
    </div>
  );
};
