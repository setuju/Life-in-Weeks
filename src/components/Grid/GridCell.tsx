import React from 'react';

interface GridCellProps {
  isPast: boolean;
  isCurrent: boolean;
  tooltip: string;
}

const GridCell: React.FC<GridCellProps> = ({ isPast, isCurrent, tooltip }) => {
  const baseClasses = 'w-2 h-2 sm:w-3 sm:h-3 rounded-sm transition-all duration-300';
  const colorClasses = isPast 
    ? 'bg-slate-600' 
    : isCurrent 
      ? 'bg-amber-400 ring-2 ring-amber-200' 
      : 'bg-gray-200';
  
  return (
    <div 
      className={`${baseClasses} ${colorClasses}`} 
      title={tooltip}
    />
  );
};

export default GridCell;
