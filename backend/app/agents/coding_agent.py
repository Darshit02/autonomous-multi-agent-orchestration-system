from app.agents.base_agent import BaseAgent
from app.services.llm_service import generate_response


class CodingAgent(BaseAgent):
    def __init__(self):
        super().__init__("Coder")

    def run(self, task: str) -> str:
        prompt = f"""
ROLE:
You are a senior software engineer.

OBJECTIVE:
Write clean, correct, and production-ready code.

TASK:
{task}

INSTRUCTIONS:
- Write working code (no pseudo-code)
- Follow best practices
- Keep it simple and readable
- Add minimal explanation

OUTPUT FORMAT:
CODE:
<your code here>

EXPLANATION:
<short explanation>

FINAL ANSWER:
"""
        return generate_response(prompt)
