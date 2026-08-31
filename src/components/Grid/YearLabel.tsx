import React from 'react';

interface YearLabelProps {
  year: number;
  isCurrentYear?: boolean;
}

const YearLabel: React.FC<YearLabelProps> = ({ year, isCurrentYear }) => {
  const isDecade = year % 10 === 0;
  const isFiveYear = year % 5 === 0;

  return (
    <div 
      className={`text-2xs sm:text-xs w-9 sm:w-11 text-right pr-2 font-mono flex items-center justify-end transition-colors ${
        isCurrentYear
          ? 'font-bold text-amber-900 bg-amber-100/80 rounded-l px-1'
          : isDecade
            ? 'font-bold text-slate-900'
            : isFiveYear
              ? 'font-semibold text-slate-600'
              : 'text-slate-400 opacity-60 hover:opacity-100'
      }`}
      title={`Age ${year}`}
    >
      {isCurrentYear && (
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1 animate-pulse no-print" />
      )}
      {year}
    </div>
  );
};

export default YearLabel;
