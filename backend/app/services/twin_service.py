from sqlalchemy.orm import Session
from app.services.llm_service import generate_response
from app.services.memory_service import fetch_memory
from app.services.memory_service import semantic_search, store_message


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
    relevant_memories = semantic_search(message)

    semantic_context = "\n".join(relevant_memories)

    prompt = f"""
SYSTEM ROLE:
You are an AI Twin with long-term semantic memory.

BEHAVIOR RULES:
- Use relevant past knowledge when helpful
- Do not repeat irrelevant history
- Be precise and useful

RECENT CONTEXT:
{context}

RELEVANT MEMORIES:
{semantic_context}

USER:
{message}

AI:
"""

    response = generate_response(prompt)

    store_message(db, user_id, message, "user")
    store_message(db, user_id, response, "ai")

    return response
