import React from 'react';
import { getAgeFromWeeks, getUpcomingEvents, getWeekDateRange } from '../../utils/dateUtils';
import { LifeEvent } from '../../types';
import { Hourglass, Calendar, Clock, Compass, Sparkles, Flag, Award, ArrowUpRight } from 'lucide-react';

interface StatsPanelProps {
  weeksLived: number;
  weeksRemaining: number;
  percentageUsed: number;
  birthDate: string;
  events: LifeEvent[];
  expectedLifespan: number;
  onLifespanChange: (lifespan: number) => void;
}

const StatsPanel: React.FC<StatsPanelProps> = ({
  weeksLived,
  weeksRemaining,
  percentageUsed,
  birthDate,
  events,
  expectedLifespan,
  onLifespanChange,
}) => {
  const { years, weeks } = getAgeFromWeeks(weeksLived);
  const upcomingEvents = getUpcomingEvents(events, birthDate, 3);

  const stats = [
    {
      id: 'current-age-card',
      label: 'Current Age',
      value: `${years} yrs, ${weeks} wks`,
      subtext: `Born ${birthDate}`,
      icon: Clock,
      color: 'text-slate-800',
      bg: 'bg-slate-50',
    },
    {
      id: 'weeks-lived-card',
      label: 'Weeks Lived',
      value: weeksLived.toLocaleString(),
      subtext: `${(weeksLived * 7).toLocaleString()} days elapsed`,
      icon: Hourglass,
      color: 'text-indigo-700',
      bg: 'bg-indigo-50/50',
    },
    {
      id: 'weeks-remaining-card',
      label: `Weeks Remaining (${expectedLifespan}y horizon)`,
      value: weeksRemaining.toLocaleString(),
      subtext: `${(weeksRemaining * 7).toLocaleString()} days remaining`,
      icon: Compass,
      color: 'text-amber-800',
      bg: 'bg-amber-50/50',
    },
    {
      id: 'percentage-card',
      label: 'Lifespan Realized',
      value: `${percentageUsed.toFixed(1)}%`,
      subtext: `${(100 - percentageUsed).toFixed(1)}% unwritten`,
      icon: Sparkles,
      color: 'text-emerald-800',
      bg: 'bg-emerald-50/50',
    },
  ];

  return (
    <div className="space-y-4">
      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              id={stat.id}
              className={`p-4 rounded-2xl bg-white/95 border border-slate-200/80 shadow-2xs hover:shadow-sm transition-all duration-200 backdrop-blur-xs flex flex-col justify-between`}
            >
              <div className="flex items-start justify-between">
                <span className="text-2xs font-bold uppercase tracking-wider text-slate-500">
                  {stat.label}
                </span>
                <div className={`p-1.5 rounded-lg ${stat.bg}`}>
                  <Icon className={`w-4 h-4 ${stat.color}`} />
                </div>
              </div>
              <div className="mt-2">
                <p className={`text-xl sm:text-2xl font-bold tracking-tight ${stat.color}`}>
                  {stat.value}
                </p>
                <p className="text-2xs text-slate-500 font-mono mt-0.5">
                  {stat.subtext}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lifespan Progress Bar & Horizon Config */}
      <div className="p-4 rounded-2xl bg-white/95 border border-slate-200/80 shadow-2xs backdrop-blur-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-900">Life Trajectory Progress</span>
            <span className="text-2xs font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
              {weeksLived.toLocaleString()} / {(expectedLifespan * 52).toLocaleString()} weeks
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-600 no-print">
            <span className="text-2xs font-semibold uppercase text-slate-400">Lifespan Horizon:</span>
            <select
              value={expectedLifespan}
              onChange={(e) => onLifespanChange(Number(e.target.value))}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-slate-800 cursor-pointer"
            >
              <option value={80}>80 Years (4,160 wks)</option>
              <option value={85}>85 Years (4,420 wks)</option>
              <option value={90}>90 Years (4,680 wks - Standard)</option>
              <option value={95}>95 Years (4,940 wks)</option>
              <option value={100}>100 Years (5,200 wks)</option>
              <option value={105}>105 Years (5,460 wks - Full Grid)</option>
            </select>
          </div>
        </div>

        {/* Multi-segment Progress bar */}
        <div className="w-full bg-slate-100 rounded-full h-3 p-0.5 overflow-hidden flex items-center border border-slate-200">
          <div
            className="bg-linear-to-r from-slate-700 to-indigo-700 h-full rounded-full transition-all duration-700 relative"
            style={{ width: `${Math.min(100, percentageUsed)}%` }}
          />
        </div>
      </div>

      {/* Upcoming Milestones Section */}
      {upcomingEvents.length > 0 && (
        <div className="p-4 rounded-2xl bg-white/95 border border-slate-200/80 shadow-2xs backdrop-blur-xs">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Flag className="w-3.5 h-3.5 text-amber-600" />
              Upcoming Milestones ({upcomingEvents.length})
            </h3>
            <span className="text-2xs text-slate-500 font-mono">Sorted chronologically</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {upcomingEvents.map((event) => {
              const dateRange = getWeekDateRange(birthDate, event.year, event.week ?? 0);
              const weeksAway = (event.weeksFromNow ?? 0);
              const yearsAway = (weeksAway / 52).toFixed(1);

              return (
                <div
                  key={event.id}
                  className="p-3 bg-slate-50/80 rounded-xl border border-slate-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-2xs font-semibold px-2 py-0.5 bg-amber-100 text-amber-900 rounded-md border border-amber-200">
                        Age {event.year} (Wk {(event.week ?? 0) + 1})
                      </span>
                      <span className="text-3xs font-mono font-bold text-indigo-700">
                        {weeksAway === 0 ? 'This Week!' : `in ~${weeksAway} weeks (${yearsAway} yrs)`}
                      </span>
                    </div>
                    <p className="font-semibold text-slate-900 text-xs sm:text-sm mt-1 truncate">
                      {event.name}
                    </p>
                    {event.description && (
                      <p className="text-2xs text-slate-500 line-clamp-1 mt-0.5">
                        {event.description}
                      </p>
                    )}
                  </div>
                  <p className="text-3xs text-slate-400 font-mono mt-2 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    {dateRange}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default StatsPanel;
