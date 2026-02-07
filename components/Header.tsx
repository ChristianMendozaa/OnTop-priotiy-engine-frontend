import React from 'react';
import { Zap } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="py-6 mb-2 border-b border-ontop-border/50">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-ontop-primary to-ontop-accentStart flex items-center justify-center shadow-lg shadow-ontop-primary/20 overflow-hidden">
          <img src="/ontop_icon.png" alt="Ontop Logo" className="w-full h-full object-cover" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-ontop-text">
            OnTop
          </h1>
          <p className="text-xs text-ontop-textMuted font-medium uppercase tracking-widest">
            Priority Engine Dashboard
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;