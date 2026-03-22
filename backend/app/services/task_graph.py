from app.agents.planner_agent import PlannerAgent
from app.services.agent_selector import select_agent
from app.agents.critic_agent import CriticAgent
from concurrent.futures import ThreadPoolExecutor

from app.services.working_memory import WorkingMemory
from app.agents.evaluator_agent import EvaluatorAgent
from app.services.memory_intelligence import build_intelligent_context

planner = PlannerAgent()
critic = CriticAgent()


def execute_subtask(subtask, db, user_id, memory):
    agent = select_agent(subtask)

    context = build_intelligent_context(db, subtask, user_id)
    working_context = memory.get_context()

    full_context = f"""
LONG TERM MEMORY:
{context}

RECENT WORK:
{working_context}
"""

    result = agent.run(subtask, full_context)

    memory.add(agent.name, subtask, result)

    return result

def execute_task_graph(db, user_id: str, main_task: str, max_iterations=3):
    planner = PlannerAgent()
    critic = CriticAgent()
    evaluator = EvaluatorAgent()

    best_result = None

    subtasks = planner.run(main_task)

    for iteration in range(max_iterations):
        memory = WorkingMemory()
        with ThreadPoolExecutor(max_workers=4) as executor:
            futures = [
                executor.submit(execute_subtask, subtask, db, user_id, memory)
                for subtask in subtasks
            ]

            results = [f.result() for f in futures]

        combined = "\n\n".join(results)

        improved = critic.run(combined)
        evaluation = evaluator.run(improved)

        if evaluation["score"] >= 8:
            return {
                "final": improved,
                "score": evaluation["score"],
                "iterations": iteration + 1
            }

        best_result = improved

    return {
        "final": best_result,
        "score": evaluation["score"],
        "iterations": max_iterations
    }