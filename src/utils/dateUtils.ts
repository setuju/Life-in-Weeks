export const WEEKS_PER_YEAR = 52;
export const TOTAL_YEARS = 105;

export const calculateWeeksLived = (birthDate: string): number => {
  const birth = new Date(birthDate);
  const now = new Date();
  const diffInMs = now.getTime() - birth.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  return Math.floor(diffInDays / 7);
};

export const getAgeFromWeeks = (weeks: number) => {
  const years = Math.floor(weeks / WEEKS_PER_YEAR);
  const remainingWeeks = weeks % WEEKS_PER_YEAR;
  return { years, weeks: remainingWeeks };
};
