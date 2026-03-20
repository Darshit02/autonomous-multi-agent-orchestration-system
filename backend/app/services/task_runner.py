from sqlalchemy.orm import Session
from app.repositories.task_repo import get_tasks
from app.services.execution_service import execute_task

def run_all_tasks(db: Session, user_id: str):
    tasks = get_tasks(db, user_id)
    results = []
    for task in tasks:
        if task.status == "pending":
            result = execute_task(db, task)
            results.append({
                "task": task.title,
                "result": result
            })
    return results