from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.services.task_runner import run_all_tasks

router = APIRouter()

@router.post("/execute")
def execute(user_id: str, db: Session = Depends(get_db)):
    results = run_all_tasks(db, user_id)
    return {"results": results}