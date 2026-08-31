/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useCallback } from 'react';
import SeasonalBackground from './components/Background/SeasonalBackground';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import StatsPanel from './components/Stats/StatsPanel';
import LifeGrid from './components/Grid/LifeGrid';
import EventManager from './components/Events/EventManager';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useLifeWeeks } from './hooks/useLifeWeeks';
import { AppState, LifeEvent } from './types';
import { getAgeFromWeeks, getApproxCalendarYear, DEFAULT_LIFESPAN } from './utils/dateUtils';
import { Calendar, Compass, Sparkles, Clock, Flag, ShieldCheck } from 'lucide-react';

const INITIAL_STATE: AppState = {
  birthDate: '1995-06-15',
  expectedLifespan: DEFAULT_LIFESPAN,
  events: [
    {
      id: 'initial_1',
      name: 'Birth & The Journey Begins',
      year: 0,
      week: 0,
      category: 'milestone',
      description: 'First week of conscious existence.',
    },
    {
      id: 'initial_2',
      name: 'High School Graduation',
      year: 18,
      week: 24,
      category: 'education',
      description: 'Stepping into adulthood.',
    },
    {
      id: 'initial_3',
      name: 'Turned 30 Horizon',
      year: 30,
      week: 0,
      category: 'milestone',
      description: 'A decade of purposeful execution.',
    },
    {
      id: 'initial_4',
      name: 'Encore & Freedom Chapter',
      year: 65,
      week: 0,
      category: 'career',
      description: 'Wisdom, mastery, and mentorship.',
    },
  ],
};

export default function App() {
  const [state, setState] = useLocalStorage<AppState>('life-in-weeks-data-v2', INITIAL_STATE);

  const {
    weeksLived,
    weeksRemaining,
    percentageUsed,
  } = useLifeWeeks(state.birthDate, state.events, state.expectedLifespan || DEFAULT_LIFESPAN);

  const handleBirthDateChange = useCallback((newBirthDate: string) => {
    setState({ ...state, birthDate: newBirthDate });
  }, [state, setState]);

  const handleLifespanChange = useCallback((newLifespan: number) => {
    setState({ ...state, expectedLifespan: newLifespan });
  }, [state, setState]);

  const addEvent = useCallback((event: LifeEvent) => {
    setState({ ...state, events: [...state.events, event] });
  }, [state, setState]);

  const deleteEvent = useCallback((id: string) => {
    setState({ ...state, events: state.events.filter((e) => e.id !== id) });
  }, [state, setState]);

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  const { years, weeks } = getAgeFromWeeks(weeksLived);

  return (
    <SeasonalBackground>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Header with App Title, Timeline Config, and Actions */}
        <Header
          birthDate={state.birthDate}
          onBirthDateChange={handleBirthDateChange}
          onPrint={handlePrint}
        />

        {/* Print-Only Header Summary */}
        <div className="hidden print-only mb-6 border-b-2 border-slate-900 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Life in Weeks</h1>
              <p className="text-xs text-slate-600">Personal Lifespan Grid (105 Years × 52 Weeks)</p>
            </div>
            <div className="text-right text-xs font-mono text-slate-700">
              <p>Birthdate: <strong>{state.birthDate}</strong></p>
              <p>Current Age: <strong>{years}y, {weeks}w ({weeksLived.toLocaleString()} weeks lived)</strong></p>
              <p>Lifespan Realized: <strong>{percentageUsed.toFixed(1)}%</strong></p>
            </div>
          </div>
        </div>

        {/* Stats Metrics Panel */}
        <StatsPanel
          weeksLived={weeksLived}
          weeksRemaining={weeksRemaining}
          percentageUsed={percentageUsed}
          birthDate={state.birthDate}
          events={state.events}
          expectedLifespan={state.expectedLifespan || DEFAULT_LIFESPAN}
          onLifespanChange={handleLifespanChange}
        />

        {/* Interactive 105x52 Life Grid */}
        <LifeGrid
          weeksLived={weeksLived}
          birthDate={state.birthDate}
          events={state.events}
          expectedLifespan={state.expectedLifespan || DEFAULT_LIFESPAN}
          onAddEvent={addEvent}
          onDeleteEvent={deleteEvent}
        />

        {/* Milestones & Life Events Manager */}
        <EventManager
          events={state.events}
          birthDate={state.birthDate}
          onAddEvent={addEvent}
          onDeleteEvent={deleteEvent}
        />

        {/* Print-Only Milestones Summary Table */}
        {state.events.length > 0 && (
          <div className="hidden print-only mt-8 print-page-break">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-3">
              Recorded Milestones & Chapters ({state.events.length})
            </h2>
            <div className="grid grid-cols-2 gap-3 text-xs">
              {state.events
                .sort((a, b) => (a.year * 52 + (a.week ?? 0)) - (b.year * 52 + (b.week ?? 0)))
                .map((evt) => {
                  const approxYear = getApproxCalendarYear(state.birthDate, evt.year);
                  return (
                    <div key={evt.id} className="p-2 border border-slate-200 rounded">
                      <div className="flex items-center justify-between font-bold text-slate-900">
                        <span>{evt.name}</span>
                        <span className="font-mono text-3xs">Age {evt.year}, Wk {(evt.week ?? 0) + 1} (~{approxYear})</span>
                      </div>
                      {evt.description && (
                        <p className="text-3xs text-slate-600 mt-1">{evt.description}</p>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* Footer */}
        <Footer />
      </div>
    </SeasonalBackground>
  );
}
