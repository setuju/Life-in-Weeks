import { useState, useEffect } from 'react';
import { calculateWeeksLived } from '../utils/dateUtils';
import { LifeEvent } from '../types';

export const useLifeWeeks = (birthDate: string | null, events: LifeEvent[]) => {
  const [weeksLived, setWeeksLived] = useState(0);

  useEffect(() => {
    if (birthDate) {
      setWeeksLived(calculateWeeksLived(birthDate));
    }
  }, [birthDate]);

  const totalWeeks = 105 * 52;
  const weeksRemaining = totalWeeks - weeksLived;
  const percentageUsed = (weeksLived / totalWeeks) * 100;

  return {
    weeksLived,
    weeksRemaining,
    percentageUsed,
  };
};
