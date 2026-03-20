from sqlalchemy.orm import Session
from app.repositories.memory_repo import save_memory, get_user_memory

def store_message(db: Session, user_id: str, content: str, role: str):
    return save_memory(db, user_id, content, role)

def fetch_memory(db: Session, user_id: str):
    return get_user_memory(db, user_id)