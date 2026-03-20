from sqlalchemy.orm import Session
from app.repositories.task_repo import update_task_status
from app.agents.critic_agent import CriticAgent
from app.services.agent_selector import select_agent

critic = CriticAgent()

def execute_task(db: Session, task):
    update_task_status(db, task.id, "running")
    agent = select_agent(task.description)
    result = agent.run(task.description)
    improved_result = critic.run(result)
    update_task_status(db,task.id , "done")
    return improved_result