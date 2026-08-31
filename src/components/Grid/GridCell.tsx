import React, { memo } from 'react';
import { LifeEvent } from '../../types';

interface GridCellProps {
  year: number;
  week: number;
  isPast: boolean;
  isCurrent: boolean;
  isFuture: boolean;
  isFocused: boolean;
  events: LifeEvent[];
  onClick: () => void;
  onMouseEnter: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseLeave: () => void;
  onFocus: () => void;
}

const GridCellComponent: React.FC<GridCellProps> = ({
  year,
  week,
  isPast,
  isCurrent,
  isFuture,
  isFocused,
  events,
  onClick,
  onMouseEnter,
  onMouseLeave,
  onFocus,
}) => {
  const hasEvents = events.length > 0;

  // Base cell styling
  let colorClasses = '';
  if (isCurrent) {
    colorClasses = 'bg-amber-400 ring-2 ring-amber-500 shadow-md ring-offset-1 z-10 scale-125';
  } else if (hasEvents) {
    colorClasses = isPast 
      ? 'bg-indigo-600 ring-1 ring-indigo-400' 
      : 'bg-indigo-400 ring-1 ring-indigo-300';
  } else if (isPast) {
    colorClasses = 'bg-slate-700 hover:bg-slate-600';
  } else {
    colorClasses = 'bg-slate-200/90 hover:bg-slate-300';
  }

  const focusClass = isFocused 
    ? 'ring-2 ring-blue-600 ring-offset-2 scale-135 z-20 shadow-lg' 
    : '';

  const ariaLabel = `Year ${year}, Week ${week + 1}. ${
    isCurrent ? 'Current week.' : isPast ? 'Past week.' : 'Future week.'
  } ${hasEvents ? `${events.length} milestone(s).` : ''}`;

  return (
    <button
      type="button"
      id={`cell-${year}-${week}`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      tabIndex={isFocused ? 0 : -1}
      aria-label={ariaLabel}
      aria-selected={isFocused}
      role="gridcell"
      className={`relative w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-2xs transition-all duration-150 flex items-center justify-center cursor-pointer focus:outline-hidden grid-cell-print ${colorClasses} ${focusClass}`}
    >
      {/* Event marker dot */}
      {hasEvents && !isCurrent && (
        <span className="w-1 h-1 rounded-full bg-amber-300 absolute inset-auto" />
      )}

      {/* Current week pulse animation */}
      {isCurrent && (
        <span className="absolute -inset-0.5 rounded-xs bg-amber-400 animate-ping opacity-60 pointer-events-none no-print" />
      )}
    </button>
  );
};

export default memo(GridCellComponent);
