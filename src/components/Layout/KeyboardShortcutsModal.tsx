import React from 'react';
import { X, Keyboard, ArrowRight, CornerDownLeft, Space } from 'lucide-react';

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KeyboardShortcutsModal: React.FC<KeyboardShortcutsModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const shortcuts = [
    { key: '←  →', description: 'Move one week backward or forward' },
    { key: '↑  ↓', description: 'Move one year earlier or later (same week)' },
    { key: 'Home', description: 'Jump to the first week of the year' },
    { key: 'End', description: 'Jump to the last week of the year (Week 52)' },
    { key: 'PageUp', description: 'Jump 10 years backward (1 decade)' },
    { key: 'PageDown', description: 'Jump 10 years forward (1 decade)' },
    { key: 'Enter / Space', description: 'Open week details & add/view milestone' },
    { key: 'Escape', description: 'Close modal dialog or tooltip' },
  ];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs no-print"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Keyboard className="w-5 h-5 text-slate-700" />
            <h3 className="font-bold text-slate-900 text-base">Grid Keyboard Navigation</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-3">
          <p className="text-xs text-slate-600 leading-relaxed">
            You can navigate the entire 5,460-week lifespan grid directly from your keyboard without touching a mouse:
          </p>

          <div className="space-y-2 divide-y divide-slate-100">
            {shortcuts.map((sc, i) => (
              <div key={i} className="flex items-center justify-between pt-2 text-xs">
                <span className="text-slate-600">{sc.description}</span>
                <kbd className="px-2.5 py-1 bg-slate-100 border border-slate-300 rounded font-mono font-bold text-slate-800 text-2xs shadow-2xs">
                  {sc.key}
                </kbd>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};
