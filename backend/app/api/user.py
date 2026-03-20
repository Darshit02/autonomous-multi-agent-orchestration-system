from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.services.user_service import create_user_service, get_user_service
from app.models.shcemas import UserCreate, UserResponse

router = APIRouter()


@router.post("/users", response_model=UserResponse)
def create(user: UserCreate, db: Session = Depends(get_db)):
    return create_user_service(db, user.email, user.name)


@router.get("/users", response_model=list[UserResponse])
def read(db: Session = Depends(get_db)):
    return get_user_service(db)
