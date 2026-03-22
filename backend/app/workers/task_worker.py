from app.services.task_runner import run_all_tasks
from app.db.session import SessionLocal

def process_tasks(user_id:str):
    db = SessionLocal()
    try:
        run_all_tasks(db,user_id)
    finally:
        db.close()