from app.agents.planner_agent import PlannerAgent
from app.services.agent_selector import select_agent
from app.agents.critic_agent import CriticAgent
from app.services.working_memory import WorkingMemory

planner = PlannerAgent()
critic = CriticAgent()

def execute_task_graph(main_task: str):
    planner = PlannerAgent()
    critic = CriticAgent()
    memory = WorkingMemory()
    subtasks = planner.run(main_task)

    results = []

    for subtask in subtasks:
        agent = select_agent(subtask)
        context = memory.get_context()
        result = agent.run(subtask, context)
        memory.add(agent.name, subtask, result)

        results.append({
            "task": subtask,
            "agent": agent.name,
            "result": result
        })
    final_context = memory.get_context()
    final_result = critic.run(final_context)

    return {
        "steps": results,
        "final": final_result
    }
