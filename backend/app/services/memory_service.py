from sqlalchemy import select
from sqlalchemy.orm import Session
from app.services.embedding_service import get_embedding
from app.services.vector_store import vector_store
from app.repositories.memory_repo import get_user_memory, save_memory
from app.models.memory import Memory

def store_message(db, user_id, content, role):
    memory = save_memory(db, user_id, content, role)
    if role == "user":
        embedding = get_embedding(content)
        vector_store.add(content, embedding)

    return memory
def semantic_search(query: str, k=3):
    embedding = get_embedding(query)
    return vector_store.search(embedding, k)

def get_relevant_memories(db, query: str, user_id: str):
    memories = semantic_search(db, query, user_id)
    return [m.content for m in memories]

def fetch_memory(db: Session, user_id: str, limit: int = 6):
    return get_user_memory(db, user_id, limit)

def store_message(db, user_id, content, role):
    embedding = get_embedding(content)

    memory = Memory(
        user_id=user_id,
        content=content,
        role=role,
        embedding=embedding
    )

    db.add(memory)
    db.commit()
    db.refresh(memory)

    return memory


def semantic_search(db, query_embedding, user_id, k=5):
    result =  db.execute(
        select(Memory)
        .where(Memory.user_id == user_id)
        .order_by(Memory.embedding.l2_distance(query_embedding))
        .limit(k)
    ).scalars().all()

    return result
