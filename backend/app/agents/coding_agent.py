from app.tools.executor import execute_tool
from app.services.llm_service import generate_response

def run(self, task: str, context: str = "") -> str:
    prompt = f"""
ROLE:
You are a senior software engineer.

TASK:
{task}

CONTEXT:
{context}

INSTRUCTIONS:
- If tool needed, return ONLY valid JSON:

{{
  "tool": "python",
  "input": "<python code>"
}}

- If no tool needed, return plain text
"""

    response = generate_response(prompt)
    if response.strip().startswith("{"):
        result = execute_tool(response)

        return f"""
Tool executed.

Result:
{result}
"""

    return response