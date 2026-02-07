export interface TicketResult {
  ticket_id: string;
  final_score: number;
  last_message_full: string;
}

export interface EngineData {
  processed_count: number;
  urgent_count: number;
  ignored_count: number;
  audit_accuracy: number;
  results: TicketResult[];
}

export interface ConversationMessage {
  message_id: string;
  sender_type: 'customer' | 'agent';
  message_text: string;
  sent_at: string;
}

export interface TicketConversation {
  ticket_id: string;
  client_name: string;
  status: string;
  messages: ConversationMessage[];
}

export interface ApiResponse {
  data?: EngineData;
  error?: string;
}