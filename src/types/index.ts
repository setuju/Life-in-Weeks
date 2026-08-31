export type EventCategory = 'milestone' | 'career' | 'personal' | 'health' | 'education' | 'family' | 'travel';

export interface LifeEvent {
  id: string;
  name: string;
  year: number; // Year of life (0 to 104)
  week?: number; // Week of the year (0 to 51)
  category?: EventCategory;
  date?: string; // Optional exact date string (YYYY-MM-DD)
  description?: string;
}

export interface AppState {
  birthDate: string;
  expectedLifespan: number; // Default 90 years
  events: LifeEvent[];
}

export interface WeekDetail {
  yearIndex: number; // 0 to 104
  weekIndex: number; // 0 to 51
  absoluteWeekIndex: number;
  age: number;
  approxCalendarYear: number;
  weekDateRange: string;
  isPast: boolean;
  isCurrent: boolean;
  isFuture: boolean;
  events: LifeEvent[];
}
