import { useMemo } from 'react';
import { calculateWeeksLived, WEEKS_PER_YEAR } from '../utils/dateUtils';
import { LifeEvent } from '../types';

export const useLifeWeeks = (birthDate: string, events: LifeEvent[], expectedLifespan: number = 90) => {
  const weeksLived = useMemo(() => {
    return calculateWeeksLived(birthDate);
  }, [birthDate]);

  const totalGridWeeks = 105 * WEEKS_PER_YEAR; // 5,460 weeks in 105 years
  const targetLifespanWeeks = expectedLifespan * WEEKS_PER_YEAR; // e.g. 90 * 52 = 4,680 weeks
  
  const weeksRemaining = Math.max(0, targetLifespanWeeks - weeksLived);
  const percentageUsed = Math.min(100, Math.max(0, (weeksLived / targetLifespanWeeks) * 100));

  const currentYearIndex = Math.floor(weeksLived / WEEKS_PER_YEAR);
  const currentWeekOfYear = weeksLived % WEEKS_PER_YEAR;

  return {
    weeksLived,
    weeksRemaining,
    percentageUsed,
    currentYearIndex,
    currentWeekOfYear,
    totalGridWeeks,
    targetLifespanWeeks,
  };
};

