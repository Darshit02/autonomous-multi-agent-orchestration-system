from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.services.task_service import create_tasks_from_input
from app.core.deps import get_current_user

router = APIRouter()


@router.post("/tasks")
def create_tasks(message: str, db: Session = Depends(get_db), user=Depends(get_current_user)):
    tasks = create_tasks_from_input(db, user.id, message)
    return {"tasks": tasks}
