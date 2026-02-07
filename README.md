# Ontop Priority Engine - AI Operations Business Case

## The Problem

Our Customer Success team handles **5,000+ tickets monthly**. To manage this volume, we initially built a sentiment analysis system to flag "negative" tickets as urgent.

**It failed.**

The system had an **85% false positive rate**. Out of every 20 flagged accounts, only 3 were actual risks. CS agents wasted hours reviewing alerts that led nowhere, while real problems slipped through unnoticed.

### Why Sentiment Failed
**Core insight:** Sentiment is not the same as Actionability.

*   A frustrated customer complaining about industry tax regulations isn't urgent—we can't solve it.
*   A polite customer asking "Where is my payout?" IS urgent—their money is late.

We needed a system that identifies **Actionable Urgency**, not just angry words.

---

## The Solution: Ontop Priority Engine

We built a multi-dimensional scoring engine that prioritizes tickets based on business impact and true urgency, not just tone.

### How It Works

The engine calculates a **Priority Score (0-200)** for every ticket using four key signals:

1.  **Semantic Urgency (AI)**
    *   **Embeddings & Cosine Similarity** (Not LLMs).
    *   We use `text-embedding-3-small` to convert messages into vectors and compare them against "Golden Anchors" (Urgency patterns).
    *   LLMs were **only used during the analysis phase** to generate these anchors and validate the approach. The production engine relies purely on vector math for speed and deterministic results.

2.  **Financial Impact (MRR)**
    *   High-value Enterprise clients have a higher churn cost.
    *   The system boosts the score for clients with high Monthly Recurring Revenue (MRR).

3.  **Time-to-Resolve & Stagnation**
    *   Tickets that remain open for 7+ days or haven't received a response in 5+ days are automatically escalated.
    *   Speed matters. A small issue becomes a big problem if ignored.

4.  **AI Audit Layer**
    *   **Trust but Verify**: A secondary AI agent acts as an Auditor.
    *   It reviews the top 30 flagged tickets to double-check the "Urgent" classification.
    *   If the engine makes a mistake, the Auditor catches it, providing a feedback loop to improve accuracy.

---

## Why It Works

This approach succeeds where sentiment analysis failed because it aligns with **Business Reality**:

*   **Reduces Noise**: By filtering out non-actionable complaints (like tax laws), agents focus on solvable problems.
*   **Protects Revenue**: Prioritizing high-MRR clients ensures our most valuable relationships are protected.
*   **Prevents Stagnation**: By tracking time and silence, we prevent tickets from falling through the cracks.
*   **Scalable Accuracy**: The AI Auditor ensures high precision without requiring human review for every single ticket.

---

## Tech Stack

*   **Frontend**: React + Vite + Tailwind CSS
*   **Backend**: Python FastAPI
*   **Database**: Supabase (PostgreSQL)
*   **AI Engine**: Groq (Llama-3-70b)

## How to Run

1.  **Backend**:
    ```bash
    cd server
    uvicorn app.main:app --reload
    ```
2.  **Frontend**:
    ```bash
    cd ontop-priority-engine
    npm run dev
    ```
