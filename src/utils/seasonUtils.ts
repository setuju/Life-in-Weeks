export const getSeason = (date: Date = new Date()) => {
  const month = date.getMonth();
  // Northern Hemisphere: Spring (Mar-May), Summer (Jun-Aug), Autumn (Sep-Nov), Winter (Dec-Feb)
  if (month >= 2 && month <= 4) return 'spring';
  if (month >= 5 && month <= 7) return 'summer';
  if (month >= 8 && month <= 10) return 'autumn';
  return 'winter';
};

export const getSeasonColors = (season: string) => {
  switch (season) {
    case 'spring': return 'bg-emerald-50';
    case 'summer': return 'bg-amber-50';
    case 'autumn': return 'bg-orange-50';
    case 'winter': return 'bg-sky-50';
    default: return 'bg-white';
  }
};
