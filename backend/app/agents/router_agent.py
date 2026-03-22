from app.agents.base_agent import BaseAgent
from app.services.llm_service import generate_response

class RouterAgent(BaseAgent):
    def __init__(self):
        super().__init__("Router")

    def run(self, task: str) -> str:
        prompt = f"""
ROLE:
You are an AI task router.

OBJECTIVE:
Select the most appropriate agent for the given task.

AVAILABLE AGENTS:
- planner → for breaking tasks into steps
- research → for gathering info or explanation
- coder → for writing code or technical implementation
- critic → for improving or reviewing output

TASK:
{task}

INSTRUCTIONS:
- Choose ONLY ONE best agent
- Do NOT explain
- Return ONLY agent name

OUTPUT FORMAT:
planner OR research OR coder OR critic
"""

        return generate_response(prompt).strip().lower()