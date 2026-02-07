import React from 'react';
import { Loader2, Sparkles } from 'lucide-react';

const LoadingOverlay: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ontop-bg/80 backdrop-blur-md">
      <div className="relative flex flex-col items-center p-8 rounded-2xl bg-ontop-surface border border-ontop-border shadow-2xl max-w-sm w-full mx-4">
        
        {/* Animated Gradient Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-ontop-accentStart to-ontop-accentEnd opacity-10 blur-xl rounded-2xl animate-pulse-slow"></div>

        <div className="relative z-10 flex flex-col items-center text-center space-y-6">
          <div className="relative">
            <div className="absolute inset-0 bg-ontop-primary rounded-full blur-lg opacity-40 animate-ping"></div>
            <div className="bg-ontop-surface p-4 rounded-full border border-ontop-primary/30 relative">
              <Sparkles className="w-8 h-8 text-ontop-accentEnd animate-pulse" />
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-ontop-text mb-2">
              Ontop AI is Processing
            </h3>
            <p className="text-ontop-textMuted text-sm">
              Analyzing ticket sentiment, urgency, and context to prioritize your workflow.
            </p>
          </div>

          <div className="w-full bg-ontop-bg rounded-full h-1.5 overflow-hidden">
             <div className="h-full bg-gradient-to-r from-ontop-primary to-ontop-accentEnd animate-[shimmer_1.5s_infinite] w-2/3 rounded-full relative overflow-hidden">
                <div className="absolute inset-0 bg-white/20"></div>
             </div>
          </div>
          
          <div className="flex items-center space-x-2 text-xs text-ontop-textMuted uppercase tracking-wider">
            <Loader2 className="w-3 h-3 animate-spin" />
            <span>Syncing with Priority Engine</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;