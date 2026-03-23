from app.agents.base_agent import BaseAgent
from app.services.llm_service import generate_response
import json


class PlannerAgent(BaseAgent):
    def __init__(self):
        super().__init__("Planner")

    def run(self, task: str ,context: str = "") -> str:
        prompt = f"""
ROLE:
You are a senior project planner.

OBJECTIVE:
Break down complex tasks into clear, actionable steps.

CONTEXT (IMPORTANT):
Below is compressed, relevant memory from previous steps.

{context}

TASK:
{task}

INSTRUCTIONS:
- Use context only if helpful
- Build on previous work
- Avoid repetition
- Divide into logical steps
- Keep each step concise and executable
- Avoid vague steps
- Order steps correctly
INSTRUCTIONS:
- Return tasks with dependencies
- Use this JSON format ONLY:

[
  {{
    "id": "task1",
    "description": "Design database",
    "depends_on": []
  }},
  {{
    "id": "task2",
    "description": "Build API",
    "depends_on": ["task1"]
  }}
]

OUTPUT FORMAT:
1. Step one
2. Step two
3. Step three

FINAL ANSWER:
"""
        
        return json.loads(response)
