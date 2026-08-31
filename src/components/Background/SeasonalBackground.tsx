import React from 'react';
import { getSeason, SEASONS } from '../../utils/seasonUtils';

interface SeasonalBackgroundProps {
  children: React.ReactNode;
}

const SeasonalBackground: React.FC<SeasonalBackgroundProps> = ({ children }) => {
  const currentSeason = getSeason();
  const season = SEASONS[currentSeason];

  return (
    <div className={`min-h-screen transition-colors duration-1000 ${season.bgGradient} text-slate-900 selection:bg-slate-900 selection:text-white`}>
      {/* Subtle ambient light rings for reflection atmosphere */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-40 z-0">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-amber-200/30 blur-3xl" />
        <div className="absolute top-1/3 -left-40 w-96 h-96 rounded-full bg-indigo-200/20 blur-3xl" />
        <div className="absolute -bottom-40 right-1/4 w-96 h-96 rounded-full bg-emerald-200/20 blur-3xl" />
      </div>

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default SeasonalBackground;
