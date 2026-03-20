from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.services.task_service import create_tasks_from_input

router = APIRouter()

@router.post("/tasks")
def create_tasks(user_id: str, message: str, db: Session = Depends(get_db)):
    tasks = create_tasks_from_input(db, user_id, message)
    return {"tasks": tasks}