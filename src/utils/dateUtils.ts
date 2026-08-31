import { LifeEvent } from '../types';

export const WEEKS_PER_YEAR = 52;
export const TOTAL_YEARS = 105;
export const DEFAULT_LIFESPAN = 90;

export const calculateWeeksLived = (birthDate: string): number => {
  if (!birthDate) return 0;
  const birth = new Date(birthDate);
  if (isNaN(birth.getTime())) return 0;
  
  const now = new Date();
  const diffInMs = now.getTime() - birth.getTime();
  if (diffInMs < 0) return 0;
  
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
  return Math.floor(diffInDays / 7);
};

export const getAgeFromWeeks = (weeks: number) => {
  const safeWeeks = Math.max(0, weeks);
  const years = Math.floor(safeWeeks / WEEKS_PER_YEAR);
  const remainingWeeks = safeWeeks % WEEKS_PER_YEAR;
  return { years, weeks: remainingWeeks };
};

export const getWeekStartDate = (birthDate: string, yearIndex: number, weekIndex: number): Date => {
  const birth = new Date(birthDate || '1990-01-01');
  const totalDays = (yearIndex * WEEKS_PER_YEAR + weekIndex) * 7;
  const startDate = new Date(birth.getTime() + totalDays * 24 * 60 * 60 * 1000);
  return startDate;
};

export const getWeekDateRange = (birthDate: string, yearIndex: number, weekIndex: number): string => {
  try {
    const start = getWeekStartDate(birthDate, yearIndex, weekIndex);
    const end = new Date(start.getTime() + 6 * 24 * 60 * 60 * 1000);
    
    const startFormatter = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const endFormatter = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    
    return `${startFormatter.format(start)} – ${endFormatter.format(end)}`;
  } catch {
    return `Year ${yearIndex}, Week ${weekIndex + 1}`;
  }
};

export const getApproxCalendarYear = (birthDate: string, yearIndex: number): number => {
  if (!birthDate) return new Date().getFullYear();
  const birth = new Date(birthDate);
  const birthYear = isNaN(birth.getFullYear()) ? 1990 : birth.getFullYear();
  return birthYear + yearIndex;
};

export const getUpcomingEvents = (events: LifeEvent[], birthDate: string, limit = 3): (LifeEvent & { formattedDateStr?: string; weeksFromNow?: number })[] => {
  const currentWeeks = calculateWeeksLived(birthDate);
  
  return [...events]
    .map(event => {
      const eventWeekIndex = event.year * WEEKS_PER_YEAR + (event.week ?? 0);
      const weeksFromNow = eventWeekIndex - currentWeeks;
      return { ...event, eventWeekIndex, weeksFromNow };
    })
    .filter(event => event.eventWeekIndex >= currentWeeks)
    .sort((a, b) => a.eventWeekIndex - b.eventWeekIndex)
    .slice(0, limit);
};
