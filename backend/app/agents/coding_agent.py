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
Return JSON:

{{
  "result": "...",
  "insights": "...",
  "next_suggestions": "..."
}}

- If no tool needed, return plain text
"""

    response = generate_response(prompt)
    try:
        return json.loads(response)
    except:
        return {
            "result": response,
            "insights": "",
            "next_suggestions": ""
        }