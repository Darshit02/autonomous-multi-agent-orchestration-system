from app.agents.planner_agent import PlannerAgent
from app.agents.critic_agent import CriticAgent
from app.agents.coding_agent import CodingAgent
from app.agents.research_agent import ResearchAgent

planner = PlannerAgent()
research = ResearchAgent()
coder = CodingAgent()
critic = CriticAgent()


def select_agent(task: str):
    task_lower = task.lower()

    if "plan" in task_lower or "steps" in task_lower:
        return planner
    elif "research" in task_lower or "analyze" in task_lower:
        return research

    elif "code" in task_lower or "build" in task_lower:
        return coder

    else:
        return research
