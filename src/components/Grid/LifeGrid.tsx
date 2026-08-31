import React from 'react';
import GridCell from './GridCell';
import YearLabel from './YearLabel';

interface LifeGridProps {
  weeksLived: number;
}

const LifeGrid: React.FC<LifeGridProps> = ({ weeksLived }) => {
  const years = Array.from({ length: 105 }, (_, i) => i);
  const weeks = Array.from({ length: 52 }, (_, i) => i);

  return (
    <div className="overflow-x-auto p-4">
      <div className="flex flex-col gap-1">
        {years.map((year) => (
          <div key={year} className="flex items-center gap-1">
            <YearLabel year={year} />
            <div className="flex gap-0.5">
              {weeks.map((week) => {
                const weekIndex = year * 52 + week;
                return (
                  <GridCell 
                    key={week} 
                    isPast={weekIndex < weeksLived} 
                    isCurrent={weekIndex === weeksLived}
                    tooltip={`Week ${week + 1} of Year ${year + 1}`}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LifeGrid;
