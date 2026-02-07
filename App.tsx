import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import StatsGrid from './components/StatsGrid';
import TicketList from './components/TicketList';
import LoadingOverlay from './components/LoadingOverlay';
import ConversationModal from './components/ConversationModal';
import { EngineData } from './types';
import { getLatestResults, processTickets } from './services/api';
import { Play, RotateCw } from 'lucide-react';

function App() {
  const [data, setData] = useState<EngineData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [processing, setProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);

  const fetchResults = useCallback(async (isSilent = false) => {
    if (!isSilent) setLoading(true);
    setError(null);
    try {
      const result = await getLatestResults();
      setData(result);
    } catch (err) {
      console.error(err);
      setError('Could not load prioritization results.');
    } finally {
      if (!isSilent) setLoading(false);
    }
  }, []);

  const handleRunEngine = async () => {
    setProcessing(true);
    setError(null);
    try {
      // 1. Trigger the process
      await processTickets();
      // 2. Fetch new results immediately after
      await fetchResults(true);
    } catch (err) {
      console.error(err);
      setError('Failed to run Priority Engine. Please check server connection.');
    } finally {
      setProcessing(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchResults();
  }, [fetchResults]);

  return (
    <div className="min-h-screen bg-ontop-bg p-4 md:p-8 font-sans">
      {processing && <LoadingOverlay />}
      {selectedTicketId && (
        <ConversationModal
          ticketId={selectedTicketId}
          onClose={() => setSelectedTicketId(null)}
        />
      )}

      <div className="max-w-6xl mx-auto space-y-8">
        <Header />

        {/* Main Content Area */}
        <main>
          {/* Action Center - Sticky on Mobile */}
          <div className="sticky top-4 z-30 mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between bg-ontop-surface/90 backdrop-blur-sm p-4 rounded-2xl border border-ontop-border shadow-2xl">
            <div>
              <h2 className="text-lg font-semibold text-ontop-text">Action Center</h2>
              <p className="text-sm text-ontop-textMuted">Sync with your helpdesk to prioritize new tickets.</p>
            </div>

            <div className="flex gap-3 w-full sm:w-auto">
              <button
                onClick={() => fetchResults(false)}
                disabled={loading || processing}
                className="p-3 rounded-xl bg-ontop-bg border border-ontop-border text-ontop-textMuted hover:text-ontop-primary hover:border-ontop-primary transition-colors disabled:opacity-50"
                title="Refresh Data"
              >
                <RotateCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
              </button>

              <button
                onClick={handleRunEngine}
                disabled={processing || loading}
                className="flex-1 sm:flex-none group relative overflow-hidden px-8 py-3 rounded-xl bg-ontop-primary hover:bg-ontop-accentStart text-white font-semibold shadow-lg shadow-ontop-primary/30 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Play className="w-4 h-4 fill-current" />
                  {processing ? 'Processing...' : 'Run Priority Engine'}
                </span>

                {/* Button Shine Effect */}
                {!processing && (
                  <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0"></div>
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-200 p-4 rounded-xl mb-6 text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
              {error}
            </div>
          )}

          <StatsGrid data={data} />

          {loading && !data ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-24 bg-ontop-surface rounded-xl animate-pulse border border-ontop-border"></div>
              ))}
            </div>
          ) : (
            data && (
              <TicketList
                tickets={data.results}
                onViewConversation={(id) => setSelectedTicketId(id)}
              />
            )
          )}
        </main>
      </div>
    </div>
  );
}


export default App;