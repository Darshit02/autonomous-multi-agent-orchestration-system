from sqlalchemy.orm import Session
from app.models.users import User

def create_user(db: Session, email: str, name: str):
    user = User(email=email, name=name)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

def get_users(db: Session):
    return db.query(User).all()