import React, { useState } from 'react';
import { BirthdatePicker } from './BirthdatePicker';
import { KeyboardShortcutsModal } from './KeyboardShortcutsModal';
import { Printer, Keyboard, Sparkles, Compass, Download, Info } from 'lucide-react';
import { getSeason, SEASONS } from '../../utils/seasonUtils';

interface HeaderProps {
  birthDate: string;
  onBirthDateChange: (date: string) => void;
  onPrint: () => void;
}

const Header: React.FC<HeaderProps> = ({
  birthDate,
  onBirthDateChange,
  onPrint,
}) => {
  const [showKeyboardModal, setShowKeyboardModal] = useState(false);
  const currentSeason = getSeason();
  const seasonInfo = SEASONS[currentSeason];

  return (
    <header className="py-6 px-4 sm:px-0 space-y-6">
      {/* Top Banner & Season Mood */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-2xs font-semibold uppercase tracking-wider bg-slate-900 text-white shadow-2xs">
              <Compass className="w-3 h-3 text-amber-400" />
              Memento Mori
            </span>
            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-2xs font-medium border ${seasonInfo.accentBadge}`}>
              <Sparkles className="w-3 h-3" />
              {seasonInfo.name} Season ({seasonInfo.description})
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
            Life in Weeks
          </h1>
          <p className="text-sm text-slate-600 max-w-2xl mt-1 leading-relaxed">
            A 105×52 visual grid of human time. Each square is one week of consciousness. Reflect on your past, ground yourself in today, and plan your remaining chapters intentionally.
          </p>
        </div>

        {/* Global Action Controls */}
        <div className="flex items-center gap-2 flex-wrap self-start md:self-center no-print">
          <button
            id="keyboard-shortcuts-btn"
            onClick={() => setShowKeyboardModal(true)}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 shadow-2xs rounded-xl transition-colors"
            title="View keyboard navigation shortcuts"
          >
            <Keyboard className="w-4 h-4 text-slate-500" />
            <span className="hidden sm:inline">Keyboard Nav</span>
          </button>

          <button
            id="print-export-btn"
            onClick={onPrint}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 shadow-sm rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
            title="Export full life grid to PDF or printout"
          >
            <Printer className="w-4 h-4 text-amber-400" />
            <span>Export / Print PDF</span>
          </button>
        </div>
      </div>

      {/* Birthdate Customizer Bar */}
      <div className="p-4 bg-white/95 rounded-2xl border border-slate-200/90 shadow-2xs backdrop-blur-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Timeline Configuration
          </h2>
          <p className="text-2xs text-slate-500 mt-0.5">
            Adjust your birthdate below to tailor your personalized 105-year timeline.
          </p>
        </div>

        <BirthdatePicker
          birthDate={birthDate}
          onBirthDateChange={onBirthDateChange}
        />
      </div>

      {/* Keyboard Shortcuts Dialog */}
      <KeyboardShortcutsModal
        isOpen={showKeyboardModal}
        onClose={() => setShowKeyboardModal(false)}
      />
    </header>
  );
};

export default Header;
