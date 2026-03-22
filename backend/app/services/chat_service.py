from sqlalchemy.orm import Session
from app.services.twin_service import generate_twin_response

def handle_chat(db: Session, user_id: str, message: str):
    return generate_twin_response(db, user_id, message)