export interface SeasonInfo {
  id: 'spring' | 'summer' | 'autumn' | 'winter';
  name: string;
  description: string;
  bgGradient: string;
  cardBg: string;
  accentText: string;
  accentBadge: string;
  indicatorRing: string;
}

export const getSeason = (date: Date = new Date()): 'spring' | 'summer' | 'autumn' | 'winter' => {
  const month = date.getMonth(); // 0 = Jan, 11 = Dec
  // Northern Hemisphere:
  // Spring: March (2), April (3), May (4)
  // Summer: June (5), July (6), August (7)
  // Autumn: September (8), October (9), November (10)
  // Winter: December (11), January (0), February (1)
  if (month >= 2 && month <= 4) return 'spring';
  if (month >= 5 && month <= 7) return 'summer';
  if (month >= 8 && month <= 10) return 'autumn';
  return 'winter';
};

export const SEASONS: Record<string, SeasonInfo> = {
  spring: {
    id: 'spring',
    name: 'Spring',
    description: 'Soft greens & renewal',
    bgGradient: 'bg-gradient-to-b from-emerald-50/70 via-stone-50/80 to-teal-50/50',
    cardBg: 'bg-white/90 border-emerald-100',
    accentText: 'text-emerald-800',
    accentBadge: 'bg-emerald-100/80 text-emerald-800 border-emerald-200',
    indicatorRing: 'ring-emerald-400',
  },
  summer: {
    id: 'summer',
    name: 'Summer',
    description: 'Warm golds & bright vitality',
    bgGradient: 'bg-gradient-to-b from-amber-50/70 via-stone-50/80 to-orange-50/50',
    cardBg: 'bg-white/90 border-amber-100',
    accentText: 'text-amber-900',
    accentBadge: 'bg-amber-100/80 text-amber-900 border-amber-200',
    indicatorRing: 'ring-amber-400',
  },
  autumn: {
    id: 'autumn',
    name: 'Autumn',
    description: 'Earthy ambers & reflection',
    bgGradient: 'bg-gradient-to-b from-amber-100/40 via-stone-50/90 to-orange-100/40',
    cardBg: 'bg-white/90 border-orange-100',
    accentText: 'text-orange-950',
    accentBadge: 'bg-orange-100/80 text-orange-900 border-orange-200',
    indicatorRing: 'ring-orange-400',
  },
  winter: {
    id: 'winter',
    name: 'Winter',
    description: 'Crisp slates & quiet stillness',
    bgGradient: 'bg-gradient-to-b from-slate-100/70 via-stone-50/90 to-sky-50/60',
    cardBg: 'bg-white/90 border-slate-200',
    accentText: 'text-slate-900',
    accentBadge: 'bg-slate-100/80 text-slate-800 border-slate-200',
    indicatorRing: 'ring-sky-400',
  },
};

export const getSeasonColors = (season: string): string => {
  return SEASONS[season]?.bgGradient || SEASONS.autumn.bgGradient;
};
