from fastapi import APIRouter, Depends, HTTPException, Body
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional
from app.db.session import get_db
from app.core.deps import get_current_user
from app.repositories.task_repo import create_task, get_tasks, update_task_result
from app.models.task import Task
from app.services.task_graph import execute_task_graph
import threading

router = APIRouter()


class TaskCreate(BaseModel):
    title: Optional[str] = None
    description: str


def _run_task_async(task_id: int, user_id: str, description: str):
    """Run a task in background and save result to DB."""
    from app.db.session import SessionLocal
    db = SessionLocal()
    try:
        result_data = execute_task_graph(db, user_id, description)
        if isinstance(result_data, dict):
            result_str = result_data.get("final") or str(result_data)
        else:
            result_str = str(result_data)
        update_task_result(db, task_id, "done", result_str)
    except Exception as e:
        update_task_result(db, task_id, "failed", str(e))
    finally:
        db.close()


@router.post("/tasks")
def create_new_task(
    body: TaskCreate = Body(...),
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    title = body.title or body.description[:60]
    task = create_task(db, str(user.id), title=title, description=body.description)
    # Run in background thread so API responds immediately
    t = threading.Thread(target=_run_task_async, args=(task.id, str(user.id), body.description), daemon=True)
    t.start()
    return {
        "id": task.id,
        "title": task.title,
        "description": task.description,
        "status": task.status,
        "result": task.result,
        "created_at": task.created_at.isoformat() if task.created_at else None,
    }


@router.get("/tasks")
def list_tasks(db: Session = Depends(get_db), user=Depends(get_current_user)):
    tasks = get_tasks(db, str(user.id))
    return [
        {
            "id": t.id,
            "title": t.title,
            "description": t.description,
            "status": t.status,
            "result": t.result,
            "created_at": t.created_at.isoformat() if t.created_at else None,
        }
        for t in reversed(tasks)
    ]


@router.get("/tasks/{task_id}")
def get_task(task_id: int, db: Session = Depends(get_db), user=Depends(get_current_user)):
    task = db.query(Task).filter(Task.id == task_id, Task.user_id == str(user.id)).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return {
        "id": task.id,
        "title": task.title,
        "description": task.description,
        "status": task.status,
        "result": task.result,
        "created_at": task.created_at.isoformat() if task.created_at else None,
    }


@router.get("/stats")
def get_stats(db: Session = Depends(get_db), user=Depends(get_current_user)):
    from app.services.agent_selector import AGENT_MAP
    tasks = get_tasks(db, str(user.id))
    done_count = sum(1 for t in tasks if t.status == "done")
    running_count = sum(1 for t in tasks if t.status == "running")
    return {
        "active_agents": len(AGENT_MAP),
        "tasks_completed": done_count,
        "tasks_running": running_count,
        "total_tasks": len(tasks),
    }
