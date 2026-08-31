import React from 'react';
import { getSeason, getSeasonColors } from '../../utils/seasonUtils';

const SeasonalBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const season = getSeason();
  const colorClass = getSeasonColors(season);
  
  return (
    <div className={`min-h-screen transition-colors duration-1000 ${colorClass}`}>
      {children}
    </div>
  );
};

export default SeasonalBackground;
