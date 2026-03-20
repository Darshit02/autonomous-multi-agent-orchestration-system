from sqlalchemy.orm import Session
from backend.app.services.memory_service import fetch_memory


def build_context(memory):
    if not memory:
        return ""
    memory = list(reversed(memory))
    context = ""
    for m in memory:
        role = "User" if m.role == "user" else "Assistant"
        context += f"{role}: {m.content.strip()}\n"

    return context.strip()

def generate_twin_response(db: Session, user_id: str, message: str):
    memory = fetch_memory(db, user_id)

    context = build_context(memory)

    prompt = f"""
SYSTEM ROLE:
You are an advanced AI Twin — a persistent, intelligent assistant that represents the user.
You have memory of past interactions and must use it to provide contextual, relevant responses.

BEHAVIOR RULES:
- Be clear, concise, and practical
- Prefer structured answers when helpful
- Do NOT hallucinate facts
- If unsure, say "I’m not certain" instead of guessing
- Maintain continuity with past conversation
- Prioritize usefulness over verbosity

MEMORY CONTEXT:
Below is past conversation history. Use it only if relevant.

{context}

CURRENT USER MESSAGE:
{message}

INSTRUCTIONS:
- Understand the user's intent deeply
- Use memory if it improves the answer
- If the request is technical, give actionable steps
- If the request is vague, ask a clarifying question
- Avoid repeating memory unless necessary

OUTPUT FORMAT:
- Default: concise paragraph
- If needed: bullet points or steps
- No unnecessary fluff

RESPONSE:
"""

    response = generate_response(prompt)

    store_message(db, user_id, message, "user")
    store_message(db, user_id, response, "ai")

    return response
