from sqlalchemy.orm import Session
from app.services.embedding_service import get_embedding
from app.services.vector_store import vector_store
from app.repositories.memory_repo import get_user_memory, save_memory

def store_message(db, user_id, content, role):
    memory = save_memory(db, user_id, content, role)
    if role == "user":
        embedding = get_embedding(content)
        vector_store.add(content, embedding)

    return memory
def semantic_search(query: str, k=3):
    embedding = get_embedding(query)
    return vector_store.search(embedding, k)

def get_relevant_memories(query: str, k: int = 5):
    return semantic_search(query, k)

def fetch_memory(db: Session, user_id: str, limit: int = 6):
    return get_user_memory(db, user_id, limit)