import React, { useEffect, useState } from 'react';
import { TicketConversation } from '../types';
import { getTicketConversation } from '../services/api';
import { X, User, Headphones } from 'lucide-react';

interface ConversationModalProps {
    ticketId: string;
    onClose: () => void;
}

const ConversationModal: React.FC<ConversationModalProps> = ({ ticketId, onClose }) => {
    const [conversation, setConversation] = useState<TicketConversation | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchConversation = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getTicketConversation(ticketId);
                if (data) {
                    setConversation(data);
                } else {
                    setError('Failed to load conversation.');
                }
            } catch (err) {
                console.error(err);
                setError('An error occurred while fetching the conversation.');
            } finally {
                setLoading(false);
            }
        };

        if (ticketId) {
            fetchConversation();
        }
    }, [ticketId]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-ontop-surface w-full max-w-2xl rounded-2xl shadow-2xl border border-ontop-border flex flex-col max-h-[80vh] overflow-hidden">

                {/* Header */}
                <div className="p-4 border-b border-ontop-border flex justify-between items-center bg-ontop-bg/50">
                    <div>
                        <h3 className="text-lg font-semibold text-ontop-text">Ticket Conversation</h3>
                        <p className="text-sm text-ontop-textMuted">{ticketId} • {conversation?.client_name || 'Loading...'}</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                        <X className="w-5 h-5 text-ontop-textMuted" />
                    </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-ontop-bg/30">
                    {loading ? (
                        <div className="space-y-4">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="flex gap-4">
                                    <div className="w-10 h-10 rounded-full bg-ontop-surface animate-pulse"></div>
                                    <div className="flex-1 h-20 rounded-2xl bg-ontop-surface animate-pulse"></div>
                                </div>
                            ))}
                        </div>
                    ) : error ? (
                        <div className="text-center py-10 text-red-400">{error}</div>
                    ) : !conversation?.messages?.length ? (
                        <div className="text-center py-10 text-ontop-textMuted">No messages found for this ticket.</div>
                    ) : (
                        conversation.messages.map((msg) => {
                            const isAgent = msg.sender_type === 'agent';
                            return (
                                <div key={msg.message_id} className={`flex gap-4 ${isAgent ? 'flex-row-reverse' : ''}`}>
                                    {/* Avatar */}
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${isAgent ? 'bg-ontop-primary text-white' : 'bg-ontop-surface text-ontop-textMuted border border-ontop-border'
                                        }`}>
                                        {isAgent ? <Headphones className="w-5 h-5" /> : <User className="w-5 h-5" />}
                                    </div>

                                    {/* Message Bubble */}
                                    <div className={`flex flex-col max-w-[80%] ${isAgent ? 'items-end' : 'items-start'}`}>
                                        <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${isAgent
                                                ? 'bg-ontop-primary/10 text-ontop-primary border border-ontop-primary/20 rounded-tr-sm'
                                                : 'bg-ontop-surface text-ontop-text border border-ontop-border rounded-tl-sm'
                                            }`}>
                                            {msg.message_text}
                                        </div>
                                        <span className="text-xs text-ontop-textMuted mt-1 px-1 opacity-70">
                                            {new Date(msg.sent_at).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                                        </span>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

            </div>
        </div>
    );
};

export default ConversationModal;
