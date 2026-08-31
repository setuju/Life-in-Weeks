import React, { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import GridCell from './GridCell';
import YearLabel from './YearLabel';
import { GridTooltip, TooltipData } from './GridTooltip';
import { CellDetailModal } from './CellDetailModal';
import { LifeEvent } from '../../types';
import { WEEKS_PER_YEAR, TOTAL_YEARS, DEFAULT_LIFESPAN } from '../../utils/dateUtils';
import { Sparkles, Flag, ArrowUpDown, CornerDownLeft, Eye, ZoomIn, ZoomOut, Compass } from 'lucide-react';

interface LifeGridProps {
  weeksLived: number;
  birthDate: string;
  events: LifeEvent[];
  expectedLifespan?: number;
  onAddEvent: (event: LifeEvent) => void;
  onDeleteEvent: (id: string) => void;
}

const LifeGrid: React.FC<LifeGridProps> = ({
  weeksLived,
  birthDate,
  events,
  expectedLifespan = DEFAULT_LIFESPAN,
  onAddEvent,
  onDeleteEvent,
}) => {
  const [focusedCell, setFocusedCell] = useState<{ year: number; week: number }>({
    year: Math.min(TOTAL_YEARS - 1, Math.floor(weeksLived / WEEKS_PER_YEAR)),
    week: Math.min(WEEKS_PER_YEAR - 1, weeksLived % WEEKS_PER_YEAR),
  });

  const [selectedCell, setSelectedCell] = useState<{ year: number; week: number } | null>(null);
  const [tooltipData, setTooltipData] = useState<TooltipData | null>(null);
  const [cellSize, setCellSize] = useState<'normal' | 'compact' | 'dense'>('normal');

  const gridRef = useRef<HTMLDivElement>(null);
  const currentWeekRef = useRef<HTMLDivElement>(null);

  const currentYearIndex = Math.floor(weeksLived / WEEKS_PER_YEAR);
  const currentWeekOfYear = weeksLived % WEEKS_PER_YEAR;

  // Map events for O(1) lookup: "year_week" -> LifeEvent[]
  const eventMap = useMemo(() => {
    const map = new Map<string, LifeEvent[]>();
    for (const evt of events) {
      // If event has no week specified, assign to week 0 of that year
      const week = evt.week ?? 0;
      const key = `${evt.year}_${week}`;
      const existing = map.get(key) || [];
      existing.push(evt);
      map.set(key, existing);
    }
    return map;
  }, [events]);

  const years = useMemo(() => Array.from({ length: TOTAL_YEARS }, (_, i) => i), []);
  const weeks = useMemo(() => Array.from({ length: WEEKS_PER_YEAR }, (_, i) => i), []);

  // Keyboard navigation handler
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    setFocusedCell((prev) => {
      let nextYear = prev.year;
      let nextWeek = prev.week;
      let handled = false;

      switch (e.key) {
        case 'ArrowRight':
          if (nextWeek < WEEKS_PER_YEAR - 1) {
            nextWeek += 1;
          } else if (nextYear < TOTAL_YEARS - 1) {
            nextYear += 1;
            nextWeek = 0;
          }
          handled = true;
          break;
        case 'ArrowLeft':
          if (nextWeek > 0) {
            nextWeek -= 1;
          } else if (nextYear > 0) {
            nextYear -= 1;
            nextWeek = WEEKS_PER_YEAR - 1;
          }
          handled = true;
          break;
        case 'ArrowDown':
          if (nextYear < TOTAL_YEARS - 1) {
            nextYear += 1;
          }
          handled = true;
          break;
        case 'ArrowUp':
          if (nextYear > 0) {
            nextYear -= 1;
          }
          handled = true;
          break;
        case 'Home':
          nextWeek = 0;
          handled = true;
          break;
        case 'End':
          nextWeek = WEEKS_PER_YEAR - 1;
          handled = true;
          break;
        case 'PageUp':
          nextYear = Math.max(0, nextYear - 10);
          handled = true;
          break;
        case 'PageDown':
          nextYear = Math.min(TOTAL_YEARS - 1, nextYear + 10);
          handled = true;
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          setSelectedCell({ year: prev.year, week: prev.week });
          handled = true;
          break;
        case 'Escape':
          setSelectedCell(null);
          setTooltipData(null);
          handled = true;
          break;
      }

      if (handled) {
        e.preventDefault();
        // Focus the button in DOM
        const targetBtn = document.getElementById(`cell-${nextYear}-${nextWeek}`);
        if (targetBtn) {
          targetBtn.focus();
        }
        return { year: nextYear, week: nextWeek };
      }

      return prev;
    });
  }, []);

  const jumpToCurrentWeek = () => {
    const cy = Math.min(TOTAL_YEARS - 1, currentYearIndex);
    const cw = Math.min(WEEKS_PER_YEAR - 1, currentWeekOfYear);
    setFocusedCell({ year: cy, week: cw });
    const target = document.getElementById(`cell-${cy}-${cw}`);
    if (target) {
      target.focus();
      target.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
    }
  };

  const handleCellHover = useCallback((
    e: React.MouseEvent<HTMLButtonElement>,
    year: number,
    week: number,
    isPast: boolean,
    isCurrent: boolean,
    cellEvents: LifeEvent[]
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipData({
      year,
      week,
      birthDate,
      isPast,
      isCurrent,
      events: cellEvents,
      x: rect.right,
      y: rect.top,
    });
  }, [birthDate]);

  const handleCellLeave = useCallback(() => {
    setTooltipData(null);
  }, []);

  const selectedCellEvents = useMemo(() => {
    if (!selectedCell) return [];
    return eventMap.get(`${selectedCell.year}_${selectedCell.week}`) || [];
  }, [selectedCell, eventMap]);

  const selectedIsPast = selectedCell ? (selectedCell.year * WEEKS_PER_YEAR + selectedCell.week) < weeksLived : false;
  const selectedIsCurrent = selectedCell ? (selectedCell.year * WEEKS_PER_YEAR + selectedCell.week) === weeksLived : false;

  // Selected size classes
  const gapClass = cellSize === 'dense' ? 'gap-0.5' : cellSize === 'compact' ? 'gap-1' : 'gap-1';

  return (
    <section 
      aria-label="Life in Weeks Grid"
      className="bg-white/95 rounded-2xl shadow-sm border border-slate-200/80 p-4 sm:p-6 backdrop-blur-xs relative overflow-hidden"
    >
      {/* Grid Toolbar / Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 no-print">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Compass className="w-5 h-5 text-slate-700" />
              105-Year Life Grid
            </h2>
            <span className="text-xs font-mono bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full font-medium">
              52 weeks × 105 years = 5,460 weeks
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Navigate with arrow keys, click any week to inspect or add milestones.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            id="jump-to-now-btn"
            onClick={jumpToCurrentWeek}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-900 bg-amber-100 hover:bg-amber-200/90 rounded-lg border border-amber-300 transition-colors shadow-2xs"
            title="Focus the current week cell"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
            Jump to Today (Week {weeksLived.toLocaleString()})
          </button>

          {/* Density Switcher */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
            <button
              onClick={() => setCellSize('normal')}
              className={`px-2.5 py-1 rounded-md transition-colors ${cellSize === 'normal' ? 'bg-white font-semibold text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'}`}
              title="Standard cell size"
            >
              Standard
            </button>
            <button
              onClick={() => setCellSize('compact')}
              className={`px-2.5 py-1 rounded-md transition-colors ${cellSize === 'compact' ? 'bg-white font-semibold text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'}`}
              title="Compact size for seeing more years"
            >
              Compact
            </button>
          </div>
        </div>
      </div>

      {/* Progress Indicator Bar for Current Year */}
      <div className="my-4 p-3.5 bg-linear-to-r from-amber-500/10 via-amber-100/50 to-slate-50 rounded-xl border border-amber-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 ring-4 ring-amber-200 animate-pulse" />
          <span className="text-xs sm:text-sm font-semibold text-slate-900">
            Current Position: Year {currentYearIndex} (Age {currentYearIndex}), Week {currentWeekOfYear + 1} of 52
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-36 sm:w-48 bg-slate-200 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-amber-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${((currentWeekOfYear + 1) / 52) * 100}%` }}
            />
          </div>
          <span className="text-xs font-mono font-medium text-slate-700">
            {(((currentWeekOfYear + 1) / 52) * 100).toFixed(0)}% of year
          </span>
        </div>
      </div>

      {/* Visual Legend */}
      <div className="flex items-center gap-4 sm:gap-6 py-2 px-1 text-xs text-slate-600 flex-wrap">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-2xs bg-slate-700" />
          <span>Past Weeks</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-2xs bg-amber-400 ring-2 ring-amber-500 relative">
            <span className="w-1 h-1 bg-white rounded-full absolute inset-0 m-auto" />
          </span>
          <span className="font-medium text-slate-900">Current Week</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-2xs bg-indigo-600 relative flex items-center justify-center">
            <span className="w-1 h-1 bg-amber-300 rounded-full" />
          </span>
          <span>Milestone / Event</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-2xs bg-slate-200" />
          <span>Future Weeks</span>
        </div>
        <div className="flex items-center gap-1.5 text-2xs text-slate-400 ml-auto hidden md:flex">
          <CornerDownLeft className="w-3 h-3" />
          <span>Press Enter on any cell to add event</span>
        </div>
      </div>

      {/* Grid Container with Horizontal Scroll */}
      <div 
        ref={gridRef}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="grid"
        aria-label="Lifespan Grid in Weeks"
        className="life-grid-container overflow-x-auto custom-scrollbar p-2 sm:p-4 bg-slate-50/50 rounded-xl border border-slate-200/60 focus:outline-hidden focus:ring-2 focus:ring-slate-400"
      >
        <div className="inline-block min-w-full">
          {/* Week Header (1, 10, 20, 30, 40, 52) */}
          <div className="flex items-center pb-2 border-b border-slate-200 mb-1 sticky top-0 bg-slate-50/95 z-10 backdrop-blur-xs">
            <div className="w-9 sm:w-11 text-right pr-2 text-2xs font-mono text-slate-400">
              Age
            </div>
            <div className="flex gap-0.5 sm:gap-1 text-2xs font-mono text-slate-400">
              {weeks.map((week) => {
                const isTen = (week + 1) % 10 === 0 || week === 0 || week === 51;
                return (
                  <div 
                    key={week} 
                    className="w-2.5 sm:w-3 text-center text-3xs sm:text-2xs"
                  >
                    {isTen ? (week === 0 ? '1' : week + 1) : '·'}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Grid Rows */}
          <div className="flex flex-col gap-0.5 sm:gap-1">
            {years.map((year) => {
              const isDecade = year > 0 && year % 10 === 0;
              const isCurrentYear = year === currentYearIndex;
              const isLifespanTarget = year === expectedLifespan;

              return (
                <React.Fragment key={year}>
                  {/* Decade separator marker */}
                  {isDecade && (
                    <div className="flex items-center gap-2 my-1 opacity-70">
                      <div className="w-9 sm:w-11 text-right pr-2 text-3xs font-mono text-indigo-700 font-bold">
                        {year}s
                      </div>
                      <div className="h-px bg-indigo-200 grow" />
                    </div>
                  )}

                  {/* Lifespan benchmark indicator */}
                  {isLifespanTarget && (
                    <div className="flex items-center gap-2 my-1">
                      <div className="w-9 sm:w-11 text-right pr-2 text-3xs font-mono text-amber-700 font-bold">
                        90y
                      </div>
                      <div className="h-px bg-dashed border-t border-dashed border-amber-400 grow" />
                      <span className="text-3xs font-mono text-amber-700 font-medium px-2 py-0.5 bg-amber-50 rounded border border-amber-200">
                        {expectedLifespan}-Year Lifespan Horizon
                      </span>
                    </div>
                  )}

                  <div 
                    role="row"
                    className={`flex items-center rounded transition-colors ${
                      isCurrentYear 
                        ? 'bg-amber-100/50 -mx-1 px-1 py-0.5 ring-1 ring-amber-300' 
                        : 'hover:bg-slate-100/60'
                    }`}
                  >
                    <YearLabel year={year} isCurrentYear={isCurrentYear} />
                    
                    <div className="flex gap-0.5 sm:gap-1">
                      {weeks.map((week) => {
                        const weekIndex = year * WEEKS_PER_YEAR + week;
                        const isPast = weekIndex < weeksLived;
                        const isCurrent = weekIndex === weeksLived;
                        const isFuture = weekIndex > weeksLived;
                        const cellEvents = eventMap.get(`${year}_${week}`) || [];
                        const isFocused = focusedCell.year === year && focusedCell.week === week;

                        return (
                          <GridCell
                            key={week}
                            year={year}
                            week={week}
                            isPast={isPast}
                            isCurrent={isCurrent}
                            isFuture={isFuture}
                            isFocused={isFocused}
                            events={cellEvents}
                            onClick={() => {
                              setFocusedCell({ year, week });
                              setSelectedCell({ year, week });
                            }}
                            onMouseEnter={(e) => handleCellHover(e, year, week, isPast, isCurrent, cellEvents)}
                            onMouseLeave={handleCellLeave}
                            onFocus={() => setFocusedCell({ year, week })}
                          />
                        );
                      })}
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>

      {/* Floating Hover Tooltip */}
      <GridTooltip data={tooltipData} />

      {/* Cell Detail & Event Modal */}
      {selectedCell && (
        <CellDetailModal
          isOpen={true}
          onClose={() => setSelectedCell(null)}
          yearIndex={selectedCell.year}
          weekIndex={selectedCell.week}
          birthDate={birthDate}
          isPast={selectedIsPast}
          isCurrent={selectedIsCurrent}
          events={selectedCellEvents}
          onAddEvent={onAddEvent}
          onDeleteEvent={onDeleteEvent}
        />
      )}
    </section>
  );
};

export default LifeGrid;
