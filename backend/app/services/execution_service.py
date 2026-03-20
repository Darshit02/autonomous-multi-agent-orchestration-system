from sqlalchemy.orm import Session
from app.repositories.task_repo import update_task_status
from app.agents.executor_agent import ExecutorAgent

executor = ExecutorAgent()

def execute_task(db: Session, task):
    update_task_status(db, task.id, "running")
    result = executor.run(task.description)
    update_task_status(db, task.id, "done")
    return result