import React, { useState } from 'react';
import { X, Plus, Calendar, Flag, Trash2, Clock } from 'lucide-react';
import { LifeEvent, EventCategory } from '../../types';
import { getWeekDateRange, getApproxCalendarYear } from '../../utils/dateUtils';

interface CellDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  yearIndex: number;
  weekIndex: number;
  birthDate: string;
  isPast: boolean;
  isCurrent: boolean;
  events: LifeEvent[];
  onAddEvent: (event: LifeEvent) => void;
  onDeleteEvent: (id: string) => void;
}

const CATEGORY_COLORS: Record<EventCategory, { bg: string; text: string; label: string }> = {
  milestone: { bg: 'bg-amber-100 text-amber-800 border-amber-200', text: 'text-amber-700', label: 'Milestone' },
  career: { bg: 'bg-blue-100 text-blue-800 border-blue-200', text: 'text-blue-700', label: 'Career & Work' },
  personal: { bg: 'bg-emerald-100 text-emerald-800 border-emerald-200', text: 'text-emerald-700', label: 'Personal Growth' },
  health: { bg: 'bg-rose-100 text-rose-800 border-rose-200', text: 'text-rose-700', label: 'Health & Wellness' },
  education: { bg: 'bg-purple-100 text-purple-800 border-purple-200', text: 'text-purple-700', label: 'Education' },
  family: { bg: 'bg-pink-100 text-pink-800 border-pink-200', text: 'text-pink-700', label: 'Family & Relationships' },
  travel: { bg: 'bg-indigo-100 text-indigo-800 border-indigo-200', text: 'text-indigo-700', label: 'Travel & Adventure' },
};

export const CellDetailModal: React.FC<CellDetailModalProps> = ({
  isOpen,
  onClose,
  yearIndex,
  weekIndex,
  birthDate,
  isPast,
  isCurrent,
  events,
  onAddEvent,
  onDeleteEvent,
}) => {
  const [eventName, setEventName] = useState('');
  const [category, setCategory] = useState<EventCategory>('milestone');
  const [description, setDescription] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  if (!isOpen) return null;

  const approxYear = getApproxCalendarYear(birthDate, yearIndex);
  const dateRange = getWeekDateRange(birthDate, yearIndex, weekIndex);
  const age = yearIndex;

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventName.trim()) return;

    const newEvent: LifeEvent = {
      id: 'event_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      name: eventName.trim(),
      year: yearIndex,
      week: weekIndex,
      category,
      description: description.trim() || undefined,
    };

    onAddEvent(newEvent);
    setEventName('');
    setDescription('');
    setIsAdding(false);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs no-print"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-slate-50 border-b border-slate-100 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                isCurrent 
                  ? 'bg-amber-100 text-amber-900 border border-amber-300' 
                  : isPast 
                    ? 'bg-slate-200 text-slate-800' 
                    : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              }`}>
                {isCurrent ? '● Current Week (Now)' : isPast ? 'Past Week' : 'Future Week'}
              </span>
              <span className="text-xs font-mono text-slate-500">
                Week {weekIndex + 1} of 52
              </span>
            </div>
            <h2 id="modal-title" className="text-xl font-bold text-slate-900">
              Year {yearIndex} (Age {age}) • ~{approxYear}
            </h2>
            <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-1 font-mono">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {dateRange}
            </p>
          </div>
          <button
            id="close-cell-modal-btn"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[65vh] overflow-y-auto custom-scrollbar">
          {/* Associated Events */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-1.5">
                <Flag className="w-4 h-4 text-slate-500" />
                Milestones & Events ({events.length})
              </h3>
              {!isAdding && (
                <button
                  id="toggle-add-event-in-cell-btn"
                  onClick={() => setIsAdding(true)}
                  className="inline-flex items-center gap-1 text-xs font-medium text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-md transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Event
                </button>
              )}
            </div>

            {events.length === 0 && !isAdding ? (
              <div className="text-center py-6 px-4 bg-slate-50/70 rounded-xl border border-dashed border-slate-200">
                <Calendar className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p className="text-sm text-slate-600 font-medium">No events logged for this week</p>
                <p className="text-xs text-slate-400 mt-0.5">Capture a memory, milestone, or goal for this point in time.</p>
                <button
                  onClick={() => setIsAdding(true)}
                  className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-slate-800 bg-white border border-slate-200 shadow-2xs hover:bg-slate-50 px-3 py-1.5 rounded-lg transition-colors"
                >
                  <Plus className="w-3.5 h-3.5 text-slate-600" />
                  Add Milestone Here
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                {events.map((evt) => {
                  const catMeta = evt.category ? CATEGORY_COLORS[evt.category] : CATEGORY_COLORS.milestone;
                  return (
                    <div
                      key={evt.id}
                      className="p-3.5 bg-slate-50/90 rounded-xl border border-slate-200/80 flex items-start justify-between gap-3 group"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-slate-900 text-sm">{evt.name}</span>
                          <span className={`text-2xs font-medium px-2 py-0.5 rounded-full border ${catMeta.bg}`}>
                            {catMeta.label}
                          </span>
                        </div>
                        {evt.description && (
                          <p className="text-xs text-slate-600 whitespace-pre-wrap">{evt.description}</p>
                        )}
                      </div>
                      <button
                        onClick={() => onDeleteEvent(evt.id)}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors opacity-80 group-hover:opacity-100"
                        title="Delete milestone"
                        aria-label={`Delete event ${evt.name}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Add Event Inline Form */}
          {isAdding && (
            <form onSubmit={handleAdd} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3 animate-in fade-in duration-150">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-600">New Milestone</h4>
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="text-xs text-slate-400 hover:text-slate-600"
                >
                  Cancel
                </button>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Milestone / Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Graduated University, Started Company, Traveled to Japan"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as EventCategory)}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
                >
                  <option value="milestone">Milestone & Life Chapter</option>
                  <option value="career">Career & Work</option>
                  <option value="personal">Personal Growth</option>
                  <option value="health">Health & Wellness</option>
                  <option value="education">Education</option>
                  <option value="family">Family & Relationships</option>
                  <option value="travel">Travel & Adventure</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Notes / Reflection (Optional)</label>
                <textarea
                  rows={2}
                  placeholder="What made this time meaningful?"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-slate-900 focus:border-slate-900 resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-200/70 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-2xs transition-colors"
                >
                  Save Milestone
                </button>
              </div>
            </form>
          )}

          {/* Life Perspective Quote / Context */}
          <div className="p-3.5 bg-slate-100/60 rounded-xl border border-slate-200/60 text-xs text-slate-600 leading-relaxed font-mono">
            {isCurrent ? (
              <p>📍 You are currently living this exact week. Each square on the grid is a precious 7 days of consciousness.</p>
            ) : isPast ? (
              <p>⏳ This week is part of your lived story. {events.length > 0 ? 'Marked with significant events.' : 'Part of your accumulated experience.'}</p>
            ) : (
              <p>🌱 A blank week in your future. How you spend your present shapes where you arrive here.</p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Keyboard: Arrow keys to navigate, Esc to close</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 font-medium text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
