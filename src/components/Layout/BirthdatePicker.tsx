import React, { useState } from 'react';
import { Calendar, User, Check, Sparkles, ShieldCheck } from 'lucide-react';
import { getAgeFromWeeks, calculateWeeksLived } from '../../utils/dateUtils';

interface BirthdatePickerProps {
  birthDate: string;
  onBirthDateChange: (date: string) => void;
}

export const BirthdatePicker: React.FC<BirthdatePickerProps> = ({
  birthDate,
  onBirthDateChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tempDate, setTempDate] = useState(birthDate || '1995-06-15');

  const weeksLived = calculateWeeksLived(birthDate);
  const { years, weeks } = getAgeFromWeeks(weeksLived);

  const handleSave = (dateToSave: string) => {
    if (!dateToSave) return;
    onBirthDateChange(dateToSave);
    setIsOpen(false);
  };

  const currentYear = new Date().getFullYear();
  const maxDate = new Date().toISOString().split('T')[0];
  const minDate = `${currentYear - 105}-01-01`;

  // Quick preset shortcuts
  const presets = [
    { label: '1985 (Age ~41)', date: '1985-05-15' },
    { label: '1990 (Age ~36)', date: '1990-08-20' },
    { label: '1995 (Age ~31)', date: '1995-03-12' },
    { label: '2000 (Age ~26)', date: '2000-01-01' },
    { label: '2005 (Age ~21)', date: '2005-09-18' },
  ];

  return (
    <div className="relative">
      <div className="flex items-center gap-2 flex-wrap">
        <div className="flex items-center gap-2 bg-white/90 border border-slate-200 shadow-2xs rounded-xl px-3 py-2">
          <Calendar className="w-4 h-4 text-slate-500" />
          <div className="text-left">
            <span className="block text-3xs font-semibold uppercase tracking-wider text-slate-400">
              Birthdate
            </span>
            <input
              id="birthdate-input"
              type="date"
              value={birthDate}
              min={minDate}
              max={maxDate}
              onChange={(e) => {
                if (e.target.value) {
                  onBirthDateChange(e.target.value);
                  setTempDate(e.target.value);
                }
              }}
              className="text-xs sm:text-sm font-semibold text-slate-900 bg-transparent focus:outline-hidden cursor-pointer"
              title="Select your birth date to calculate your personal life grid"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="px-2.5 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 rounded-xl border border-slate-200/60 transition-colors no-print"
          title="Quick presets and privacy note"
        >
          {isOpen ? 'Close' : 'Presets & Info'}
        </button>
      </div>

      {/* Popover for Presets & Info */}
      {isOpen && (
        <div className="absolute right-0 sm:left-0 top-full mt-2 w-72 sm:w-80 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 z-30 animate-in fade-in zoom-in-95 duration-150 no-print">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-slate-500" />
              Customize Timeline
            </h4>
            <span className="text-3xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              Local & Private
            </span>
          </div>

          <p className="text-xs text-slate-600 mb-3 leading-relaxed">
            Your birthdate defines the timeline starting point. All calculations happen purely in your browser and are stored in your device's <code className="text-2xs bg-slate-100 px-1 py-0.5 rounded text-slate-700 font-mono">localStorage</code>.
          </p>

          <div className="space-y-1.5 mb-3">
            <span className="text-3xs font-semibold text-slate-400 uppercase tracking-wider block">
              Quick Presets
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              {presets.map((preset) => (
                <button
                  key={preset.date}
                  onClick={() => handleSave(preset.date)}
                  className={`text-xs px-2.5 py-1.5 rounded-lg border text-left transition-colors flex items-center justify-between ${
                    birthDate === preset.date
                      ? 'bg-slate-900 text-white border-slate-900 font-medium'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  <span>{preset.label}</span>
                  {birthDate === preset.date && <Check className="w-3 h-3" />}
                </button>
              ))}
            </div>
          </div>

          <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-2xs text-slate-500 flex items-center justify-between">
            <span>Current Age: <strong>{years}y, {weeks}w</strong></span>
            <span>{weeksLived.toLocaleString()} weeks lived</span>
          </div>
        </div>
      )}
    </div>
  );
};
