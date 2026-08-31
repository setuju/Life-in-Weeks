import React, { useState } from 'react';
import { LifeEvent, EventCategory } from '../../types';
import { getApproxCalendarYear, getWeekDateRange } from '../../utils/dateUtils';
import { Plus, Trash2, Calendar, Flag, Sparkles, Filter, Search, Tag, CheckCircle2 } from 'lucide-react';

interface EventManagerProps {
  events: LifeEvent[];
  birthDate: string;
  onAddEvent: (event: LifeEvent) => void;
  onDeleteEvent: (id: string) => void;
}

const CATEGORIES: { id: EventCategory; label: string; bg: string; text: string }[] = [
  { id: 'milestone', label: 'Milestone', bg: 'bg-amber-100 border-amber-300 text-amber-900', text: 'text-amber-700' },
  { id: 'career', label: 'Career', bg: 'bg-blue-100 border-blue-300 text-blue-900', text: 'text-blue-700' },
  { id: 'personal', label: 'Personal', bg: 'bg-emerald-100 border-emerald-300 text-emerald-900', text: 'text-emerald-700' },
  { id: 'health', label: 'Health', bg: 'bg-rose-100 border-rose-300 text-rose-900', text: 'text-rose-700' },
  { id: 'education', label: 'Education', bg: 'bg-purple-100 border-purple-300 text-purple-900', text: 'text-purple-700' },
  { id: 'family', label: 'Family', bg: 'bg-pink-100 border-pink-300 text-pink-900', text: 'text-pink-700' },
  { id: 'travel', label: 'Travel', bg: 'bg-indigo-100 border-indigo-300 text-indigo-900', text: 'text-indigo-700' },
];

const PRESET_IDEAS = [
  { name: 'Graduated High School', year: 18, category: 'education' as EventCategory },
  { name: 'University / College Graduation', year: 22, category: 'education' as EventCategory },
  { name: 'First Full-Time Career Role', year: 23, category: 'career' as EventCategory },
  { name: 'Turned 30 Milestone', year: 30, category: 'milestone' as EventCategory },
  { name: 'Bought First Home', year: 32, category: 'personal' as EventCategory },
  { name: 'Child Born', year: 34, category: 'family' as EventCategory },
  { name: 'Turned 50 Wisdom Chapter', year: 50, category: 'milestone' as EventCategory },
  { name: 'Retirement & Encore Career', year: 65, category: 'career' as EventCategory },
];

const EventManager: React.FC<EventManagerProps> = ({
  events,
  birthDate,
  onAddEvent,
  onDeleteEvent,
}) => {
  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const [week, setWeek] = useState('');
  const [category, setCategory] = useState<EventCategory>('milestone');
  const [description, setDescription] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [showPresets, setShowPresets] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || year === '') return;

    const parsedYear = Math.max(0, Math.min(104, parseInt(year, 10)));
    const parsedWeek = week !== '' ? Math.max(0, Math.min(51, parseInt(week, 10) - 1)) : undefined;

    const newEvent: LifeEvent = {
      id: 'event_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      name: name.trim(),
      year: parsedYear,
      week: parsedWeek,
      category,
      description: description.trim() || undefined,
    };

    onAddEvent(newEvent);
    setName('');
    setYear('');
    setWeek('');
    setDescription('');
  };

  const handleAddPreset = (preset: typeof PRESET_IDEAS[0]) => {
    const newEvent: LifeEvent = {
      id: 'event_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      name: preset.name,
      year: preset.year,
      category: preset.category,
    };
    onAddEvent(newEvent);
  };

  const filteredEvents = events
    .filter((e) => {
      const matchesSearch = e.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        (e.description && e.description.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCat = selectedCategoryFilter === 'all' || e.category === selectedCategoryFilter;
      return matchesSearch && matchesCat;
    })
    .sort((a, b) => {
      const aIndex = a.year * 52 + (a.week ?? 0);
      const bIndex = b.year * 52 + (b.week ?? 0);
      return aIndex - bIndex;
    });

  return (
    <section 
      aria-label="Milestones & Events Management"
      className="bg-white/95 rounded-2xl shadow-sm border border-slate-200/80 p-4 sm:p-6 backdrop-blur-xs space-y-6"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Flag className="w-5 h-5 text-amber-600" />
            Life Milestones & Events ({events.length})
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Map meaningful memories, achievements, and future ambitions onto specific weeks of your life.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowPresets(!showPresets)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-200 transition-colors no-print"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          {showPresets ? 'Hide Ideas' : 'Brainstorm Ideas'}
        </button>
      </div>

      {/* Preset Ideas Drawer */}
      {showPresets && (
        <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200 animate-in fade-in duration-200 no-print">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-900">
              Quick Life Milestone Templates
            </h3>
            <span className="text-3xs text-amber-700">Click to instantly add</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
            {PRESET_IDEAS.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => handleAddPreset(preset)}
                className="p-2 bg-white hover:bg-amber-100/70 border border-amber-200/80 rounded-lg text-left transition-colors flex items-center justify-between group shadow-2xs"
              >
                <div>
                  <p className="text-xs font-semibold text-slate-800 group-hover:text-amber-950">
                    {preset.name}
                  </p>
                  <span className="text-3xs text-slate-500 font-mono">Age {preset.year}</span>
                </div>
                <Plus className="w-3.5 h-3.5 text-amber-600 opacity-60 group-hover:opacity-100" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Add Event Form */}
      <form onSubmit={handleSubmit} className="p-4 bg-slate-50/80 rounded-xl border border-slate-200 space-y-4 no-print">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
          Add New Milestone
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          {/* Event Title */}
          <div className="sm:col-span-6">
            <label className="block text-2xs font-semibold text-slate-700 uppercase mb-1">
              Milestone Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Moved to New City, Published Book, Run Marathon"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-slate-900 text-slate-900"
            />
          </div>

          {/* Age / Year of Life */}
          <div className="sm:col-span-3">
            <label className="block text-2xs font-semibold text-slate-700 uppercase mb-1">
              Age (Year 0–104) *
            </label>
            <input
              type="number"
              required
              min={0}
              max={104}
              placeholder="e.g. 28"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-slate-900 text-slate-900"
            />
          </div>

          {/* Week of that Year (1-52) */}
          <div className="sm:col-span-3">
            <label className="block text-2xs font-semibold text-slate-700 uppercase mb-1">
              Week (1–52, Optional)
            </label>
            <input
              type="number"
              min={1}
              max={52}
              placeholder="1–52"
              value={week}
              onChange={(e) => setWeek(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-slate-900 text-slate-900"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
          {/* Category */}
          <div className="sm:col-span-4">
            <label className="block text-2xs font-semibold text-slate-700 uppercase mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as EventCategory)}
              className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-slate-900 text-slate-900"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div className="sm:col-span-6">
            <label className="block text-2xs font-semibold text-slate-700 uppercase mb-1">
              Notes (Optional)
            </label>
            <input
              type="text"
              placeholder="Reflection, goals, or memories..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-slate-900 text-slate-900"
            />
          </div>

          {/* Submit */}
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-lg shadow-2xs transition-colors flex items-center justify-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Event
            </button>
          </div>
        </div>
      </form>

      {/* Events List Controls */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 no-print">
          {/* Search */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search milestones..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-slate-800"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1 overflow-x-auto custom-scrollbar pb-1 text-xs">
            <button
              onClick={() => setSelectedCategoryFilter('all')}
              className={`px-2.5 py-1 rounded-full text-2xs font-medium transition-colors ${
                selectedCategoryFilter === 'all'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All ({events.length})
            </button>
            {CATEGORIES.map((cat) => {
              const count = events.filter((e) => e.category === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategoryFilter(cat.id)}
                  className={`px-2.5 py-1 rounded-full text-2xs font-medium transition-colors whitespace-nowrap ${
                    selectedCategoryFilter === cat.id
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat.label} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Milestone List */}
        {filteredEvents.length === 0 ? (
          <div className="text-center py-8 px-4 bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
            <Calendar className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-sm font-medium text-slate-600">
              {events.length === 0 ? 'No milestones added yet' : 'No matching milestones found'}
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Add your past memories or future milestones to illuminate your life grid.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {filteredEvents.map((evt) => {
              const approxYear = getApproxCalendarYear(birthDate, evt.year);
              const weekNum = (evt.week ?? 0) + 1;
              const dateRange = getWeekDateRange(birthDate, evt.year, evt.week ?? 0);
              const catMeta = CATEGORIES.find((c) => c.id === evt.category) || CATEGORIES[0];

              return (
                <div
                  key={evt.id}
                  className="p-3.5 bg-slate-50/90 rounded-xl border border-slate-200/80 flex items-start justify-between gap-3 group hover:bg-slate-50 transition-colors shadow-2xs"
                >
                  <div className="space-y-1 grow min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-slate-900 text-sm truncate">
                        {evt.name}
                      </span>
                      <span className={`text-3xs font-semibold px-2 py-0.5 rounded-full border ${catMeta.bg}`}>
                        {catMeta.label}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-2xs text-slate-500 font-mono flex-wrap">
                      <span className="font-semibold text-slate-700">Age {evt.year}</span>
                      <span>•</span>
                      <span>Week {weekNum} of 52</span>
                      <span>•</span>
                      <span>~{approxYear}</span>
                    </div>

                    {evt.description && (
                      <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                        {evt.description}
                      </p>
                    )}

                    <p className="text-3xs text-slate-400 font-mono">
                      {dateRange}
                    </p>
                  </div>

                  <button
                    onClick={() => onDeleteEvent(evt.id)}
                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors no-print"
                    title="Delete milestone"
                    aria-label={`Delete milestone ${evt.name}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default EventManager;
