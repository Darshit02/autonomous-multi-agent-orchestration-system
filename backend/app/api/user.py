from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.repositories.user_repo import create_user, get_users
from app.models.shcemas import UserCreate, UserResponse

router = APIRouter()

@router.post("/users", response_model=UserResponse)
def create(user: UserCreate, db: Session = Depends(get_db)):
    return create_user(db, user.email, user.name)

@router.get("/users", response_model=list[UserResponse])
def read(db: Session = Depends(get_db)):
    return get_users(db)