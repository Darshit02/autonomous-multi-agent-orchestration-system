from app.services.llm_service import generate_response
from app.services.memory_service import get_relevant_memories


def rank_memories(memories: list[str], query: str):
    ranked = []
    for mem in memories:
        score = 0
        if any(word in mem.lower() for word in query.lower().split()):
            score += 2
        if len(mem) > 50:
            score += 1
        ranked.append((mem, score))
    ranked.sort(key=lambda x: x[1], reverse=True)
    return [m[0] for m in ranked]


def compress_memory(memories: list[str]):
    combined = "\n".join(memories)

    prompt = f"""
Summarize the following memory into concise key points.

MEMORY:
{combined}

OUTPUT:
- Key point 1
- Key point 2
"""

    return generate_response(prompt)

def build_intelligent_context(db, query: str, user_id: str):
    memories = get_relevant_memories(db, query, user_id)
    ranked = rank_memories(memories, query)
    compressed = compress_memory(ranked)

    return compressed