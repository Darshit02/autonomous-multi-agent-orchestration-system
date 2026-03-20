from sqlalchemy.orm import Session
from app.models.memory import Memory

def save_memory(db: Session, user_id: str, content: str, role: str):
    memory = Memory(user_id=user_id, content=content, role=role)
    db.add(memory)
    db.commit()
    db.refresh(memory)
    return memory

def get_user_memory(db: Session, user_id: str, limit: int = 10):
    return (
        db.query(Memory)
        .filter(Memory.user_id == user_id)
        .order_by(Memory.id.desc())
        .limit(limit)
        .all()
    )