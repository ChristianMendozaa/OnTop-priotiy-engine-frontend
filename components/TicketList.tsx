import React, { useState, useMemo } from 'react';
import { TicketResult } from '../types';
import TicketCard from './TicketCard';
import { Search, Filter, Layers } from 'lucide-react';

interface TicketListProps {
  tickets: TicketResult[];
  onViewConversation: (ticketId: string) => void;
}

const TicketList: React.FC<TicketListProps> = ({ tickets, onViewConversation }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showHighPriorityOnly, setShowHighPriorityOnly] = useState(false);

  // Memoize filtered tickets to avoid unnecessary recalculations
  const filteredTickets = useMemo(() => {
    return tickets
      .filter((ticket) => {
        const matchesSearch = ticket.ticket_id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesPriority = showHighPriorityOnly ? ticket.final_score > 130 : true;
        return matchesSearch && matchesPriority;
      })
      .sort((a, b) => b.final_score - a.final_score); // Sort by highest score
  }, [tickets, searchTerm, showHighPriorityOnly]);

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-ontop-surface p-4 rounded-xl border border-ontop-border">

        {/* Search */}
        <div className="relative w-full md:w-auto md:min-w-[300px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ontop-textMuted" />
          <input
            type="text"
            placeholder="Search by Ticket ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-ontop-bg border border-ontop-border rounded-lg text-ontop-text text-sm focus:outline-none focus:border-ontop-primary focus:ring-1 focus:ring-ontop-primary transition-all placeholder:text-ontop-textMuted/50"
          />
        </div>

        {/* Filter Toggle */}
        <div className="flex items-center space-x-2 w-full md:w-auto">
          <button
            onClick={() => setShowHighPriorityOnly(false)}
            className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 border ${!showHighPriorityOnly
                ? 'bg-ontop-primary text-white border-ontop-primary'
                : 'bg-ontop-bg text-ontop-textMuted border-ontop-border hover:border-ontop-textMuted'
              }`}
          >
            <Layers className="w-4 h-4" />
            All Tickets
          </button>
          <button
            onClick={() => setShowHighPriorityOnly(true)}
            className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 border ${showHighPriorityOnly
                ? 'bg-[#FF85A1]/20 text-[#FF85A1] border-[#FF85A1]'
                : 'bg-ontop-bg text-ontop-textMuted border-ontop-border hover:border-ontop-textMuted'
              }`}
          >
            <Filter className="w-4 h-4" />
            High Priority
          </button>
        </div>
      </div>

      {/* List */}
      <div className="space-y-4">
        {filteredTickets.length > 0 ? (
          filteredTickets.map((ticket) => (
            <TicketCard
              key={ticket.ticket_id}
              ticket={ticket}
              onViewConversation={() => onViewConversation(ticket.ticket_id)}
            />
          ))
        ) : (
          <div className="text-center py-20 bg-ontop-surface/50 rounded-xl border border-ontop-border border-dashed">
            <p className="text-ontop-textMuted">No tickets found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketList;