from concurrent.futures import ThreadPoolExecutor
from app.services.retry_service import run_with_retry
from app.agents.research_agent import ResearchAgent



def run_task(task, db, user_id):
    from app.services.agent_selector import select_agent
    from app.services.memory_intelligence import build_intelligent_context

    fallback_agent = ResearchAgent()
    agent = select_agent(task["description"])


    context = build_intelligent_context(db, task["description"], user_id)

    output = run_with_retry(agent, task["description"], context)

    if isinstance(output, dict):
        result = output.get("result", "")
    else:
        result = output

    if is_failure(str(result)):
        result = fallback_agent.run(task["description"], context)
    results[task["id"]] = result
    return result


def execute_dag(tasks, db, user_id):
    completed = {}
    results = {}

    def can_run(task):
        return all(dep in completed for dep in task["depends_on"])

    while len(completed) < len(tasks):
        runnable = [
            t for t in tasks
            if t["id"] not in completed and can_run(t)
        ]

        with ThreadPoolExecutor(max_workers=4) as executor:
            futures = {
                executor.submit(run_task, task, db, user_id): task
                for task in runnable
            }

            for future in futures:
                task = futures[future]
                result = future.result()

                completed[task["id"]] = True
                results[task["id"]] = result

    return results