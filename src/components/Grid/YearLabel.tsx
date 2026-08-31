import React from 'react';

interface YearLabelProps {
  year: number;
}

const YearLabel: React.FC<YearLabelProps> = ({ year }) => {
  return (
    <div className="text-xs text-gray-500 w-8 text-right pr-2 font-mono">
      {year}
    </div>
  );
};

export default YearLabel;
