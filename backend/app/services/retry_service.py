from app.services.utils import is_failure

MAX_RETRIES = 2

def run_with_retry(agent, task, context):
    for attempt in range(MAX_RETRIES):
        result = agent.run(task, context)

        if not is_failure(str(result)):
            return result

        context += f"\n\nPrevious attempt failed:\n{result}\nFix the issue."

    return result