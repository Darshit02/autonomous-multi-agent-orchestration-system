from app.agents.base_agent import BaseAgent
from app.services.llm_service import generate_response
from app.tools.registry import TOOLS

class ResearchAgent(BaseAgent):
    def __init__(self):
        super().__init__("Research")

    def run(self, task: str, context: str = "") -> str:
        prompt = f"""
ROLE:
You are a research expert.

TASK:
{task}

CONTEXT:
{context}

INSTRUCTIONS:
- If external info needed, use:

TOOL: search
QUERY:
<search query>

- Otherwise answer directly
"""

        response = generate_response(prompt)

        if "TOOL:" in response:
            try:
                tool_name = response.split("TOOL:")[1].split("\n")[0].strip()

                if tool_name == "search":
                    query = response.split("QUERY:")[-1].strip()
                    result = TOOLS["search"](query)

                    return f"""
Search Result:
{result}
"""
            except Exception as e:
                return f"Error in research tool: {str(e)}"

        return response