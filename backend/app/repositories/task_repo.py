from sqlalchemy.orm import Session
from app.models.task import Task


def create_task(db: Session, user_id: str, title: str, description: str):
    task = Task(
        user_id=user_id,
        title=title,
        description=description,
        status="pending"
    )
    db.add(task)
    db.commit()
    db.refresh(task)
    return task


def get_tasks(db: Session, user_id: str):
    return db.query(Task).filter(Task.user_id == user_id).all()


def update_task_status(db: Session, task_id: int, status: str):
    task = db.query(Task).filter(Task.id == task_id).first()
    task.status = status
    db.commit()
    return task
