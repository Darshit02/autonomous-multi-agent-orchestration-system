from sqlalchemy.orm import Session
from app.repositories.task_repo import create_task
from app.services.planner_service import generate_plan

def create_tasks_from_input(db:Session , user_id:str , user_input:str):
    tasks = generate_plan(user_input)

    created_tasks = []

    for t in tasks:
        task = create_task(db,user_id,title =t ,description=t)
        created_tasks.append(task)
    
    return created_tasks
    
