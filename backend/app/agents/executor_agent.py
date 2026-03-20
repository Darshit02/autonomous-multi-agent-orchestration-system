from app.agents.base_agent import BaseAgent
from app.services.llm_service import generate_response


class ExecutorAgent(BaseAgent):
    def __init__(self):
        super().__init__("Executor")

    def run(self, task: str) -> str:
        prompt = f"""
You are an execution agent.

Your job is to COMPLETE the given task.

Task:
{task}

Instructions:
- Be practical
- Give actionable output
- If coding → include code
- If planning → give steps

Result:
"""
        return generate_response(prompt)
