from app.agents.base_agent import BaseAgent
from app.services.llm_service import generate_response


class CriticAgent(BaseAgent):
    def __init__(self):
        super().__init__("Critic")

    def run(self, task: str ,context:str = "") -> str:
        prompt = f"""
ROLE:
You are a strict technical reviewer.

OBJECTIVE:
Improve the quality of the given result.

CONTEXT FROM OTHER AGENTS:
{context}

INPUT:
{task}

INSTRUCTIONS:
- Fix errors or unclear parts
- Improve clarity and structure
- Make output more useful
- Do NOT repeat original blindly

OUTPUT FORMAT:
IMPROVED RESULT:
<better version>

CHANGES MADE:
- improvement 1
- improvement 2

FINAL ANSWER:
"""
        return generate_response(prompt)
