import { EngineData, TicketConversation } from '../types';

// Use environment variable or fallback to localhost
const BASE_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:8000';

// High-fidelity mock data to serve when API is unreachable
const MOCK_DATA: EngineData = {
  processed_count: 12450,
  urgent_count: 843,
  ignored_count: 4520,
  audit_accuracy: 98.4,
  results: [
    {
      ticket_id: "TKT-8821",
      final_score: 142,
      last_message_full: "URGENT: Production database is unresponsive. Customers cannot checkout. This is a P0 incident impacting all regions."
    },
    {
      ticket_id: "TKT-8824",
      final_score: 135,
      last_message_full: "Security Alert: Multiple failed login attempts detected from suspicious IP range (192.168.x.x) on the admin portal."
    },
    {
      ticket_id: "TKT-8819",
      final_score: 128,
      last_message_full: "I'm having trouble updating my billing information. The page keeps timing out when I hit save. Can you help?"
    },
    {
      ticket_id: "TKT-8805",
      final_score: 95,
      last_message_full: "When will the new reporting features be available? We are looking to upgrade our plan next quarter."
    },
    {
      ticket_id: "TKT-8792",
      final_score: 42,
      last_message_full: "Thanks for the update, that solved my issue. You can close this ticket now. Have a great day!"
    },
    {
      ticket_id: "TKT-8788",
      final_score: 15,
      last_message_full: "Automatic Reply: I will be out of the office until Monday. Please contact support@example.com for urgent matters."
    }
  ]
};

export const processTickets = async (): Promise<void> => {
  try {
    const response = await fetch(`${BASE_URL}/process-tickets`, {
      method: 'POST',
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  } catch (error) {
    console.warn("API unavailable, simulating processing delay...", error);
    // Simulate AI processing time for demo purposes
    await new Promise(resolve => setTimeout(resolve, 2500));
  }
};

export const getLatestResults = async (): Promise<EngineData> => {
  try {
    const response = await fetch(`${BASE_URL}/latest-results`, {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.warn("API unavailable, serving mock data...", error);
    // Return mock data so the app remains functional
    return MOCK_DATA;
  }
};

export const getTicketConversation = async (ticketId: string): Promise<TicketConversation | null> => {
  try {
    const response = await fetch(`${BASE_URL}/tickets/${ticketId}/conversation`, {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch conversation:", error);
    return null;
  }
};