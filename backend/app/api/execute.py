from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.services.task_runner import run_all_tasks
from app.core.deps import get_current_user
from app.core.queue import task_queue
from app.workers.task_worker import process_tasks

router = APIRouter()

@router.post("/execute")
def execute(db: Session = Depends(get_db), user=Depends(get_current_user)):
    job = task_queue.enqueue(process_tasks, user.id)
    return {
        "message": "Task started" , 
        "job_id" : job.id
    }