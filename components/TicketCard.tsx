import React, { useState } from 'react';
import { TicketResult } from '../types';
import { ChevronDown, ChevronUp, AlertTriangle } from 'lucide-react';

interface TicketCardProps {
  ticket: TicketResult;
  onViewConversation: () => void;
}

const TicketCard: React.FC<TicketCardProps> = ({ ticket, onViewConversation }) => {
  const [expanded, setExpanded] = useState(false);
  const isHighPriority = ticket.final_score > 130;

  return (
    <div className={`
      bg-ontop-surface border rounded-xl transition-all duration-300 overflow-hidden
      ${isHighPriority
        ? 'border-[#FF85A1]/50 shadow-[0_0_15px_-5px_rgba(255,133,161,0.2)]'
        : 'border-ontop-border hover:border-ontop-primary/30'}
    `}>
      <div className="flex flex-col md:flex-row md:items-center">
        <div
          className="flex-1 p-5 cursor-pointer"
          onClick={() => setExpanded(!expanded)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`
                  w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm
                  ${isHighPriority
                  ? 'bg-gradient-to-br from-[#FF85A1] to-[#8E76FF] text-white shadow-lg'
                  : 'bg-ontop-bg text-ontop-textMuted border border-ontop-border'}
                `}>
                {Math.round(ticket.final_score)}
              </div>

              <div>
                <div className="flex items-center space-x-2">
                  <h4 className="text-ontop-text font-medium text-lg">
                    {ticket.ticket_id}
                  </h4>
                  {isHighPriority && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FF85A1]/20 text-[#FF85A1] border border-[#FF85A1]/30 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" /> CRITICAL
                    </span>
                  )}
                </div>
                <p className="text-ontop-textMuted text-sm truncate max-w-[200px] sm:max-w-xs md:max-w-md mt-1">
                  {ticket.last_message_full}
                </p>
              </div>
            </div>

            <div className="text-ontop-textMuted md:hidden">
              {expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </div>
          </div>
        </div>

        <div className="px-5 pb-5 md:pb-0 md:pr-5 flex items-center justify-end">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewConversation();
            }}
            className="px-4 py-2 bg-ontop-bg border border-ontop-border rounded-lg text-xs font-medium text-ontop-text hover:bg-ontop-border/30 transition-colors"
          >
            View Conversation
          </button>
        </div>
      </div>

      <div className={`
        bg-ontop-bg/50 border-t border-ontop-border/50
        transition-all duration-300 ease-in-out
        ${expanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}
      `}>
        <div className="p-5 text-sm leading-relaxed text-ontop-text/90">
          <p className="font-semibold text-ontop-textMuted text-xs uppercase mb-2">Message Content</p>
          {ticket.last_message_full}
        </div>
      </div>
    </div>
  );
};

export default TicketCard;