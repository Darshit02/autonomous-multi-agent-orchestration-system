from app.agents.base_agent import BaseAgent
from app.services.llm_service import generate_response
from app.tools.registry import TOOLS
import json

class SuperAgent(BaseAgent):
    def __init__(self):
        super().__init__("Super")
        self.description = "A maximum-capability agent that manages complex tasks."

    def run(self, task: str, context: str = "") -> str:
        prompt = f"""
ROLE:
You are the Master Agent of the AI-OS. You have access to a variety of tools and your goal is to fulfill the user's request with maximum efficiency and accuracy.

TOOLS AVAILABLE:
{json.dumps(list(TOOLS.keys()))}

TASK:
{task}

CONTEXT:
{context}

INSTRUCTIONS:
1. Reason about the task step-by-step.
2. If you need more information, use the 'search' tool.
3. If you need to manipulate files or the system, use 'list_dir', 'read_file', 'write_file', or 'shell'.
4. If you need to execute Python, JavaScript, or Bash code, use 'python', 'javascript', or 'bash'.
5. Always provide a final consolidated answer or result.

Think carefully.
"""
        response = generate_response(prompt)
        return response
