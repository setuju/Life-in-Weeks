import React from 'react';
import { Heart, Compass, ShieldCheck } from 'lucide-react';

const Footer: React.FC = () => (
  <footer className="py-8 px-4 text-center space-y-3 text-xs text-slate-500 border-t border-slate-200/60 mt-8">
    <div className="flex items-center justify-center gap-2 flex-wrap">
      <span className="flex items-center gap-1 font-medium text-slate-700">
        <Compass className="w-3.5 h-3.5 text-slate-500" />
        Life in Weeks
      </span>
      <span>•</span>
      <span>Inspired by Tim Urban's iconic <em>"Your Life in Weeks"</em> (Wait But Why)</span>
    </div>

    <div className="flex items-center justify-center gap-4 text-2xs text-slate-400 flex-wrap">
      <span className="flex items-center gap-1 text-emerald-700 font-medium">
        <ShieldCheck className="w-3 h-3" />
        Zero backend • 100% Client-Side & Private
      </span>
      <span>•</span>
      <span>Saved automatically to localStorage</span>
    </div>

    <p className="text-3xs text-slate-400 font-mono">
      "You could leave life right now. Let that determine what you do and say and think." — Marcus Aurelius
    </p>
  </footer>
);

export default Footer;
