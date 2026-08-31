/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import SeasonalBackground from './components/Background/SeasonalBackground';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import StatsPanel from './components/Stats/StatsPanel';
import LifeGrid from './components/Grid/LifeGrid';
import EventManager from './components/Events/EventManager';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useLifeWeeks } from './hooks/useLifeWeeks';
import { AppState, LifeEvent } from './types';

export default function App() {
  const [state, setState] = useLocalStorage<AppState>('life-in-weeks-data', {
    birthDate: '1990-01-01', // Default for now
    events: [],
  });

  const { weeksLived, weeksRemaining, percentageUsed } = useLifeWeeks(state.birthDate, state.events);

  const addEvent = (event: LifeEvent) => {
    setState({ ...state, events: [...state.events, event] });
  };

  const deleteEvent = (id: string) => {
    setState({ ...state, events: state.events.filter(e => e.id !== id) });
  };

  return (
    <SeasonalBackground>
      <div className="max-w-5xl mx-auto">
        <Header />
        <StatsPanel weeksLived={weeksLived} weeksRemaining={weeksRemaining} percentageUsed={percentageUsed} />
        <LifeGrid weeksLived={weeksLived} />
        <EventManager events={state.events} onAddEvent={addEvent} onDeleteEvent={deleteEvent} />
        <Footer />
      </div>
    </SeasonalBackground>
  );
}
