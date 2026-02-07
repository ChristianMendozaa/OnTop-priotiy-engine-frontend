import React from 'react';
import { ShieldCheck, Activity, AlertCircle, XCircle } from 'lucide-react';
import { EngineData } from '../types';

interface StatsGridProps {
  data: EngineData | null;
}

const StatCard: React.FC<{
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ReactNode;
  accentColor?: string;
}> = ({ title, value, subtitle, icon, accentColor = "text-ontop-primary" }) => (
  <div className="bg-ontop-surface border border-ontop-border rounded-xl p-5 flex flex-col justify-between hover:border-ontop-primary/50 transition-colors duration-300 shadow-sm relative overflow-hidden group">
    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
       {React.cloneElement(icon as React.ReactElement, { className: `w-16 h-16 ${accentColor}` })}
    </div>
    <div className="flex items-center space-x-3 mb-4">
      <div className={`p-2 rounded-lg bg-ontop-bg border border-ontop-border ${accentColor}`}>
        {icon}
      </div>
      <h3 className="text-ontop-textMuted text-sm font-medium uppercase tracking-wide">{title}</h3>
    </div>
    <div>
      <div className="text-2xl font-bold text-ontop-text">{value}</div>
      <div className="text-xs text-ontop-textMuted mt-1">{subtitle}</div>
    </div>
  </div>
);

const StatsGrid: React.FC<StatsGridProps> = ({ data }) => {
  // Safe defaults if data is loading/null
  const accuracy = data ? `${Math.round(data.audit_accuracy)}%` : '--';
  const processed = data ? data.processed_count : '--';
  const urgent = data ? data.urgent_count : '--';
  const ignored = data ? data.ignored_count : '--';

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <StatCard
        title="Trust Score"
        value={accuracy}
        subtitle="AI Audit Accuracy"
        icon={<ShieldCheck className="w-5 h-5" />}
        accentColor="text-emerald-400"
      />
      <StatCard
        title="Processed"
        value={processed}
        subtitle="Total Tickets Analyzed"
        icon={<Activity className="w-5 h-5" />}
        accentColor="text-ontop-primary"
      />
      <StatCard
        title="Urgent"
        value={urgent}
        subtitle="Immediate Action Required"
        icon={<AlertCircle className="w-5 h-5" />}
        accentColor="text-[#FF85A1]"
      />
      <StatCard
        title="Ignored"
        value={ignored}
        subtitle="Low Priority / Spam"
        icon={<XCircle className="w-5 h-5" />}
        accentColor="text-gray-400"
      />
    </div>
  );
};

export default StatsGrid;