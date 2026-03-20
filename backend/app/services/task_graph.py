from app.agents.planner_agent import PlannerAgent
from app.services.agent_selector import select_agent
from app.agents.critic_agent import CriticAgent

planner = PlannerAgent()
critic = CriticAgent()

def execute_task_graph(main_task: str):
    subtasks = planner.run(main_task)
    results = []
    for subtask in subtasks:
        agent = select_agent(subtask)
        result = agent.run(subtask)
        results.append({
            "task" : subtask,
            "agent" : agent.name,
            "result": result
        })
    combined = "\n\n".join([r["result"] for r in results])
    final_result = critic.run(combined)
    return {
        "subtasks" : results,
        "final" : final_result
    }
